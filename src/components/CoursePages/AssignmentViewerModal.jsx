
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { WebView } from "react-native-webview";

import COLORS from "../../constants/color";

const AssignmentViewerModal = ({ visible, url, title, onClose }) => {
    const [downloading, setDownloading] = useState(false);

    const pdfViewerUrl = url
        ? `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(url)}`
        : null;

    const handleDownload = async () => {
        console.log("[PDF DOWNLOAD] Button clicked");
        console.log("[PDF DOWNLOAD] URL:", url);

        if (!url) {
            Alert.alert("Download failed", "PDF URL is unavailable.");
            return;
        }

        if (downloading) return;

        setDownloading(true);

        try {
            // Ask where the student wants to save the PDF.
            console.log("[PDF DOWNLOAD] Selecting destination folder...");

            const permission =
                await FileSystem.StorageAccessFramework
                    .requestDirectoryPermissionsAsync();

            if (!permission.granted) {
                console.log("[PDF DOWNLOAD] Folder selection cancelled");
                return;
            }

            // Download the actual PDF into the app cache.
            const filename = `Assignment-${Date.now()}.pdf`;
            const tempUri = `${FileSystem.cacheDirectory}${filename}`;

            console.log("[PDF DOWNLOAD] Starting download:", tempUri);

            const result = await FileSystem.downloadAsync(url, tempUri);

            console.log("[PDF DOWNLOAD] HTTP status:", result.status);
            console.log("[PDF DOWNLOAD] Temporary file:", result.uri);

            if (result.status < 200 || result.status >= 300) {
                throw new Error(`Server returned HTTP ${result.status}`);
            }

            const info = await FileSystem.getInfoAsync(result.uri);

            if (!info.exists || !info.size) {
                throw new Error("The downloaded PDF is empty or missing.");
            }

            console.log("[PDF DOWNLOAD] File size:", info.size);

            // Create the PDF in the selected Android folder.
            const destinationUri =
                await FileSystem.StorageAccessFramework.createFileAsync(
                    permission.directoryUri,
                    filename,
                    "application/pdf"
                );

            console.log("[PDF DOWNLOAD] Saving to:", destinationUri);

            // Write the downloaded PDF bytes to the selected folder.
            const base64 = await FileSystem.readAsStringAsync(result.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            await FileSystem.writeAsStringAsync(destinationUri, base64, {
                encoding: FileSystem.EncodingType.Base64,
            });

            console.log("[PDF DOWNLOAD] Saved successfully:", destinationUri);

            Alert.alert(
                "Download complete",
                `${title || "Assignment PDF"} has been saved successfully.`
            );
        } catch (error) {
            console.error("[PDF DOWNLOAD] Error:", error);

            Alert.alert(
                "Download failed",
                error.message || "Unable to download this PDF."
            );
        } finally {
            setDownloading(false);
        }
    };


    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} style={styles.action}>
                        <Ionicons
                            name="close"
                            size={24}
                            color="#FFFFFF"
                        />
                    </Pressable>

                    <Text style={styles.title} numberOfLines={1}>
                        {title || "Assignment"}
                    </Text>

                    <Pressable
                        onPress={handleDownload}
                        disabled={!url || downloading}
                        style={styles.action}
                    >
                        {downloading ? (
                            <ActivityIndicator
                                size="small"
                                color="#FFFFFF"
                            />
                        ) : (
                            <Ionicons
                                name="download-outline"
                                size={24}
                                color="#FFFFFF"
                            />
                        )}
                    </Pressable>
                </View>

                {pdfViewerUrl ? (
                    <WebView
                        key={pdfViewerUrl}
                        source={{ uri: pdfViewerUrl }}
                        style={styles.pdf}
                        startInLoadingState
                    />
                ) : (
                    <View style={styles.empty}>
                        <Text style={styles.message}>
                            PDF URL is unavailable.
                        </Text>
                    </View>
                )}
            </View>
        </Modal>
    );
};

export default AssignmentViewerModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101114",
        paddingTop: 42,
    },
    header: {
        minHeight: 58,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        backgroundColor: COLORS.surface,
    },
    action: {
        minWidth: 40,
        minHeight: 40,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
    },
    title: {
        flex: 1,
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
    },
    pdf: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    message: {
        color: "#FFFFFF",
    },
});
