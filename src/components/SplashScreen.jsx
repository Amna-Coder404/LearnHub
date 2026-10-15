import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("screen");

export default function SplashScreen({ onFinish }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish?.();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#0B0B14", "#17102D", "#0B0B14"]}
                locations={[0, 0.5, 1]}
                style={styles.gradient}
            />

            <MotiView
                from={{ opacity: 0.15, scale: 0.7 }}
                animate={{ opacity: 0.4, scale: 1.3 }}
                transition={{
                    type: "timing",
                    duration: 1800,
                    loop: true,
                    repeatReverse: true,
                }}
                style={styles.glow}
            />

            <MotiView
                from={{ opacity: 0, translateY: 30, scale: 0.6 }}
                animate={{ opacity: 1, translateY: 0, scale: 1 }}
                transition={{
                    type: "timing",
                    duration: 1000,
                    delay: 300,
                }}
                style={styles.logoOuter}
            >
                <LinearGradient
                    colors={["#A78BFA", "#7C3AED", "#4F46E5"]}
                    style={styles.logo}
                >
                    <Ionicons name="book" size={54} color="#FFFFFF" />
                </LinearGradient>
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    type: "timing",
                    duration: 900,
                    delay: 900,
                }}
                style={styles.brand}
            >
                <Text style={styles.title}>
                    Learn<Text style={styles.purpleText}>Hub</Text>
                </Text>

                <View style={styles.line} />

                <Text style={styles.tagline}>LEARN. GROW. ACHIEVE.</Text>
            </MotiView>

            <MotiView
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 700, delay: 1500 }}
                style={styles.footer}
            >
                <View style={styles.loadingTrack}>
                    <MotiView
                        from={{ translateX: -35 }}
                        animate={{ translateX: 110 }}
                        transition={{
                            type: "timing",
                            duration: 1000,
                            loop: true,
                        }}
                        style={styles.loadingBar}
                    />
                </View>

                <Text style={styles.footerText}>
                    YOUR LEARNING JOURNEY STARTS HERE
                </Text>
            </MotiView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_W,
        height: SCREEN_H,
        backgroundColor: "#0B0B14",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        width: SCREEN_W,
        height: SCREEN_H,
    },
    glow: {
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#7C3AED",
    },
    logoOuter: {
        marginBottom: 30,
        borderRadius: 32,
        elevation: 18,
        shadowColor: "#8B5CF6",
        shadowOpacity: 0.5,
        shadowRadius: 35,
        shadowOffset: { width: 0, height: 0 },
    },
    logo: {
        width: 118,
        height: 118,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: "#C4B5FD",
        alignItems: "center",
        justifyContent: "center",
    },
    brand: {
        alignItems: "center",
    },
    title: {
        color: "#FFFFFF",
        fontSize: 38,
        fontWeight: "800",
        letterSpacing: -1.5,
    },
    purpleText: {
        color: "#A78BFA",
    },
    line: {
        width: 46,
        height: 3,
        borderRadius: 3,
        backgroundColor: "#8B5CF6",
        marginTop: 15,
        marginBottom: 12,
    },
    tagline: {
        color: "#B8B4CC",
        fontSize: 10,
        letterSpacing: 2.5,
        fontWeight: "600",
    },
    footer: {
        position: "absolute",
        bottom: 65,
        alignItems: "center",
        gap: 16,
    },
    loadingTrack: {
        width: 110,
        height: 3,
        borderRadius: 3,
        backgroundColor: "#30254B",
        overflow: "hidden",
    },
    loadingBar: {
        width: 25,
        height: 3,
        borderRadius: 3,
        backgroundColor: "#A78BFA",
    },
    footerText: {
        color: "#B8B4CC",
        fontSize: 9,
        letterSpacing: 1.5,
        fontWeight: "600",
    },
});