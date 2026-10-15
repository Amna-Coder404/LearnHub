import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 28,
        paddingVertical: 32,
    },

    container: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        alignItems: "center",
    },

    // Logo
    logoWrap: {
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },
    logoRing: {
        position: "absolute",
        width: 88,
        height: 88,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    logo: {
        width: 88,
        height: 88,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 22,
        elevation: 10,
    },

    // Headings
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.6,
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

    // Form (no card)
    form: {
        width: "100%",
    },
    input: {
        backgroundColor: COLORS.surface,
        marginBottom: 16,
        fontSize: 15,
    },
    inputOutline: {
        borderRadius: 14,
        borderWidth: 1.2,
    },

    // Forgot password
    forgotButton: {
        alignSelf: "flex-end",
        paddingVertical: 4,
        marginTop: -4,
        marginBottom: 20,
    },
    forgotLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.gradientEnd,
    },

    // Error
    errorRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    errorText: {
        flex: 1,
        marginLeft: 8,
        fontSize: 13,
        fontWeight: "500",
        color: COLORS.error,
    },

    // Sign in button
    submitWrap: {
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
    submitLabel: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
        color: COLORS.textOnPrimary,
    },

    footer: {
        marginTop: 36,
        textAlign: "center",
        fontSize: 12,
        color: COLORS.textMuted,
        letterSpacing: 0.4,
    },
});