
import { Ionicons } from "@expo/vector-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/color";

const LessonVideoModal = ({ visible, videoUrl, title, onClose }) => {
    const player = useVideoPlayer(videoUrl || null, (player) => {
        player.loop = false;
        player.play();
    });

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>

                    <Pressable onPress={onClose}>
                        <Ionicons name="close" size={30} color="#FFFFFF" />
                    </Pressable>
                </View>

                {videoUrl ? (
                    <VideoView
                        player={player}
                        style={styles.video}
                        nativeControls
                        contentFit="contain"
                        fullscreenOptions={{ enable: true }}
                    />
                ) : (
                    <Text style={styles.error}>Video URL is unavailable.</Text>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
    },
    header: {
        position: "absolute",
        top: 55,
        left: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        zIndex: 1,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 17,
        fontWeight: "600",
        flex: 1,
    },
    video: {
        width: "100%",
        aspectRatio: 16 / 9,
        backgroundColor: "#000000",
    },
    error: {
        color: "#FFFFFF",
        textAlign: "center",
    },
});

export default LessonVideoModal;
