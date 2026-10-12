import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.otpBackground,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    container: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.5,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginTop: 8,
        marginBottom: 32,
        paddingHorizontal: 12,
    },
    username: {
        color: COLORS.text,
        fontWeight: "700",
    },

    // OTP boxes
    otpRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 24,
    },
    otpBox: {
        width: 48,
        height: 62,
        borderRadius: 12,
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    otpBoxActive: {
        borderColor: COLORS.accent,
    },
    otpBoxError: {
        borderColor: COLORS.error,
    },
    otpDigit: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.text,
    },
    hiddenInput: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0,
    },

    error: {
        color: COLORS.error,
        backgroundColor: COLORS.errorBackground,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 16,
        overflow: "hidden",
        width: "100%",
    },

    // Buttons
    submitButton: {
        width: "75%",
        borderRadius: 10,
        shadowColor: COLORS.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    submitContent: {
        height: 52,
    },
    submitLabel: {
        fontSize: 17,
        fontWeight: "700",
        letterSpacing: 0.3,
        color: COLORS.textOnPrimary,
    },
    linkButton: {
        marginTop: 12,
    },
});