import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const SubmitAssignmentModel = ({
    visible,
    assignment,
    submitting,
    onClose,
    onSubmit,
}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");


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
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Submit Assignment</Text>

                    <Text style={styles.description}>
                        Upload your completed work for:
                    </Text>

                    <Text style={styles.assignmentTitle}>
                        {assignment?.title}
                    </Text>

                    <Pressable
                        onPress={pickFile}
                        disabled={submitting}
                        style={styles.fileButton}
                    >
                        <Text style={styles.fileIcon}>＋</Text>
                        <Text style={styles.fileText}>
                            {selectedFile
                                ? selectedFile.name
                                : "Choose assignment file"}
                        </Text>
                    </Pressable>

                    <Text style={styles.hint}>
                        Select the file you want to submit.
                    </Text>

                    {!!error && (
                        <Text style={styles.error}>{error}</Text>
                    )}

                    <View style={styles.actions}>
                        <Pressable
                            onPress={handleClose}
                            disabled={submitting}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            onPress={handleSubmit}
                            disabled={submitting}
                            style={[
                                styles.submitButton,
                                submitting && styles.disabled,
                            ]}
                        >
                            {submitting ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitText}>
                                    Submit
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default SubmitAssignmentModel;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        justifyContent: "center",
        padding: 22,
    },
    modal: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 22,
    },
    title: {
        fontSize: 21,
        fontWeight: "700",
        color: "#17152B",
    },
    description: {
        marginTop: 12,
        color: "#64748B",
        fontSize: 14,
    },
    assignmentTitle: {
        marginTop: 5,
        fontSize: 17,
        fontWeight: "600",
        color: "#7C3AED",
    },
    fileButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 22,
        padding: 15,
        borderWidth: 1,
        borderColor: "#C4B5FD",
        borderStyle: "dashed",
        borderRadius: 12,
        backgroundColor: "#F5F3FF",
    },
    fileIcon: {
        fontSize: 24,
        color: "#7C3AED",
    },
    fileText: {
        flex: 1,
        color: "#4C1D95",
        fontWeight: "600",
    },
    hint: {
        marginTop: 9,
        color: "#64748B",
        fontSize: 12,
    },
    error: {
        marginTop: 12,
        color: "#DC2626",
        fontSize: 13,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#F1F5F9",
    },
    cancelText: {
        color: "#334155",
        fontWeight: "600",
    },
    submitButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#7C3AED",
    },
    submitText: {
        color: "#fff",
        fontWeight: "700",
    },
    disabled: {
        opacity: 0.6,
    },
});