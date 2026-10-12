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
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    container: {
        width: "100%",
        maxWidth: 420,
        alignSelf: "center",
        alignItems: "center",
    },

    // Header
    logo: {
        width: 76,
        height: 76,
        borderRadius: 22,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 14,
        elevation: 8,
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
        marginBottom: 28,
        paddingHorizontal: 12,
    },

    // Form card
    form: {
        width: "100%",
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 6,
        marginLeft: 2,
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        marginBottom: 16,
        fontSize: 15,
    },
    inputOutline: {
        borderRadius: 12,
        borderWidth: 1.2,
    },
    otpInput: {
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 8,
        textAlign: "center",
    },

    // Email info
    emailText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 16,
    },
    emailHighlight: {
        color: COLORS.text,
        fontWeight: "700",
    },

    // Messages
    success: {
        color: COLORS.success,
        backgroundColor: COLORS.successBackground,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 14,
        overflow: "hidden",
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
        marginBottom: 14,
        overflow: "hidden",
    },

    // Buttons
    submitButton: {
        borderRadius: 12,
        marginTop: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    submitContent: {
        height: 52,
    },
    submitLabel: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
        color: COLORS.textOnPrimary,
    },
    linkButton: {
        alignSelf: "center",
        marginTop: 8,
    },
});