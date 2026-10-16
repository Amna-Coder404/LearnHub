
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";


const OfflineScreen = () => {
    return (
        <View style={styles.container}>
            <MotiView
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 450 }}
                style={styles.content}
            >
                <Svg width={220} height={190} viewBox="0 0 220 190">
                    <Circle cx="110" cy="95" r="78" fill="#17172A" />
                    <Circle cx="110" cy="95" r="60" fill="#22203B" />

                    <Path
                        d="M54 76 Q110 25 166 76"
                        stroke="#8B5CF6"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <Path
                        d="M70 94 Q110 59 150 94"
                        stroke="#A78BFA"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <Path
                        d="M89 111 Q110 92 131 111"
                        stroke="#C4B5FD"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <Circle cx="110" cy="128" r="5" fill="#C4B5FD" />

                    <Path
                        d="M74 49 L146 139"
                        stroke="#F87171"
                        strokeWidth="9"
                        strokeLinecap="round"
                    />
                    <Circle cx="162" cy="48" r="5" fill="#8B5CF6" />
                    <Circle cx="55" cy="137" r="4" fill="#A78BFA" />
                </Svg>

                <Text style={styles.title}>You're offline</Text>

                <Text style={styles.description}>
                    Oops! No internet connection.
                </Text>

                <Text style={styles.hint}>
                    Check your connection and try again.
                </Text>

                <View style={styles.status}>
                    <Ionicons
                        name="cloud-offline-outline"
                        size={17}
                        color="#A78BFA"
                    />
                    <Text style={styles.statusText}>
                        Waiting for connection
                    </Text>
                </View>
            </MotiView>
        </View>
    );
};

export default OfflineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0B14",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    content: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "700",
        marginTop: 10,
    },
    description: {
        color: "#A1A1AA",
        fontSize: 15,
        textAlign: "center",
        marginTop: 10,
    },
    hint: {
        color: "#71717A",
        fontSize: 13,
        textAlign: "center",
        marginTop: 8,
    },
    status: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#191629",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 24,
        marginTop: 24,
    },
    statusText: {
        color: "#C4B5FD",
        fontSize: 12,
        fontWeight: "600",
    },
});
