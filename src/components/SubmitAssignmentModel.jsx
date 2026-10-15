import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, { FadeIn, SlideInDown, ZoomIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import COLORS from "../constants/color";

const SubmitAssignmentModel = ({
    visible,
    assignment,
    submitting,
    onClose,
    onSubmit,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const insets = useSafeAreaInsets();

    const pickFile = async () => {
        try {
            setError("");
            console.log("[PDF] Opening document picker...");

            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
                copyToCacheDirectory: false,
                multiple: false,
            });

            console.log("[PDF] Picker result:", JSON.stringify(result, null, 2));

            if (result.canceled || !result.assets?.length) {
                console.log("[PDF] Selection cancelled or no file selected.");
                return;
            }

            const asset = result.assets[0];

            console.log("[PDF] Selected file:", {
                name: asset.name,
                uri: asset.uri,
                mimeType: asset.mimeType,
                size: asset.size,
            });

            const destination =
                `${FileSystem.cacheDirectory}assignment-${Date.now()}.pdf`;

            console.log("[PDF] Copying to:", destination);

            await FileSystem.copyAsync({
                from: asset.uri,
                to: destination,
            });

            const info = await FileSystem.getInfoAsync(destination);

            console.log("[PDF] Copied file info:", info);

            if (!info.exists || !info.size) {
                throw new Error("The PDF could not be copied or is empty.");
            }

            const selected = {
                ...asset,
                uri: destination,
                name: asset.name || "assignment.pdf",
                mimeType: "application/pdf",
            };

            setSelectedFile(selected);

            console.log("[PDF] Selected file saved in state:", {
                name: selected.name,
                uri: selected.uri,
                mimeType: selected.mimeType,
                size: info.size,
            });
        } catch (err) {
            console.error("[PDF] PICK/COPY ERROR:", err);
            setError(err.message || "Unable to access the selected PDF.");
        }
    };

    const handleSubmit = async () => {
        console.log("[SUBMIT] Button clicked.");
        console.log("[SUBMIT] Selected file:", selectedFile);

        if (!selectedFile) {
            console.error("[SUBMIT] ERROR: selectedFile is null.");
            setError("Please select your assignment file first.");
            return;
        }

        try {
            setError("");

            console.log("[SUBMIT] Sending file to parent:", {
                name: selectedFile.name,
                uri: selectedFile.uri,
                mimeType: selectedFile.mimeType,
            });

            const result = await onSubmit(selectedFile);

            console.log("[SUBMIT] Parent submission result:", result);
            setSelectedFile(null);
        } catch (err) {
            console.error("[SUBMIT] SUBMISSION ERROR:", err);
            setError(err.message || "Failed to submit assignment.");
        }
    };

    const handleClose = () => {
        if (submitting) return;

        setSelectedFile(null);
        setError("");
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                {/* Backdrop: tap to close */}
                <Animated.View entering={FadeIn.duration(250)} style={StyleSheet.absoluteFill}>
                    <Pressable style={styles.backdrop} onPress={handleClose} />
                </Animated.View>

                {/* Sheet */}
                <Animated.View
                    entering={SlideInDown.springify().damping(18)}
                    style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}
                >
                    <View style={styles.handle} />

                    <LinearGradient
                        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.icon}
                    >
                        <Ionicons name="cloud-upload-outline" size={30} color={COLORS.textOnPrimary} />
                    </LinearGradient>

                    <Text style={styles.title}>Submit assignment</Text>
                    <Text style={styles.muted}>Upload your completed work for</Text>
                    <Text style={styles.assignmentTitle} numberOfLines={2}>
                        {assignment?.title}
                    </Text>

                    {/* Upload area */}
                    {selectedFile ? (
                        <Animated.View entering={ZoomIn.springify().damping(14)} style={styles.fileRow}>
                            <Ionicons name="document-text" size={28} color={COLORS.primary} />
                            <View style={styles.flex}>
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {selectedFile.name}
                                </Text>
                                <Text style={styles.muted}>PDF ready to submit</Text>
                            </View>
                            <Pressable
                                onPress={() => setSelectedFile(null)}
                                disabled={submitting}
                                hitSlop={10}
                            >
                                <Ionicons name="close-circle" size={24} color={COLORS.textMuted} />
                            </Pressable>
                        </Animated.View>
                    ) : (
                        <Pressable onPress={pickFile} disabled={submitting} style={styles.dropZone}>
                            <Ionicons name="add-circle-outline" size={30} color={COLORS.primary} />
                            <Text style={styles.dropText}>Choose assignment file</Text>
                            <Text style={styles.muted}>PDF only</Text>
                        </Pressable>
                    )}

                    {!!error && (
                        <View style={styles.errorRow}>
                            <Ionicons name="alert-circle-outline" size={18} color={COLORS.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    {/* Buttons */}
                    <Pressable
                        onPress={handleSubmit}
                        disabled={submitting}
                        style={({ pressed }) => [
                            styles.submitWrap,
                            (pressed || submitting) && { opacity: 0.8 },
                        ]}
                    >
                        <LinearGradient
                            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.submit}
                        >
                            {submitting ? (
                                <ActivityIndicator color={COLORS.textOnPrimary} />
                            ) : (
                                <Text style={styles.submitLabel}>Submit</Text>
                            )}
                        </LinearGradient>
                    </Pressable>

                    <Pressable onPress={handleClose} disabled={submitting} style={styles.cancel}>
                        <Text style={styles.cancelLabel}>Cancel</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SubmitAssignmentModel;

const styles = StyleSheet.create({
    overlay: { flex: 1, justifyContent: "flex-end" },
    backdrop: { flex: 1, backgroundColor: COLORS.overlay },
    flex: { flex: 1 },

    sheet: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 12,
        alignItems: "center",
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
        marginBottom: 24,
    },
    icon: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    title: { fontSize: 22, fontWeight: "800", color: COLORS.text },
    muted: { fontSize: 12, color: COLORS.textMuted, marginTop: 4 },
    assignmentTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.gradientEnd,
        marginTop: 4,
        textAlign: "center",
    },

    dropZone: {
        alignSelf: "stretch",
        alignItems: "center",
        gap: 4,
        marginTop: 24,
        paddingVertical: 24,
        borderWidth: 1.5,
        borderStyle: "dashed",
        borderColor: COLORS.primary,
        borderRadius: 18,
        backgroundColor: COLORS.primaryLight,
    },
    dropText: { fontSize: 15, fontWeight: "700", color: COLORS.text, marginTop: 4 },

    fileRow: {
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 24,
        padding: 16,
        borderRadius: 18,
        backgroundColor: COLORS.surfaceSecondary,
    },
    fileName: { fontSize: 15, fontWeight: "700", color: COLORS.text },

    errorRow: {
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 16,
    },
    errorText: { flex: 1, fontSize: 13, fontWeight: "500", color: COLORS.error },

    submitWrap: {
        alignSelf: "stretch",
        marginTop: 24,
        borderRadius: 16,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 8,
    },
    submit: {
        height: 54,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    submitLabel: { fontSize: 16, fontWeight: "700", color: COLORS.textOnPrimary },

    cancel: { paddingVertical: 14, paddingHorizontal: 24, marginTop: 4 },
    cancelLabel: { fontSize: 14, fontWeight: "600", color: COLORS.textSecondary },
});