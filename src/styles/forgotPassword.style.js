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

    // Step indicator
    steps: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 32,
    },
    step: {
        width: 36,
        height: 4,
        borderRadius: 2,
        backgroundColor: COLORS.border,
    },
    stepActive: {
        backgroundColor: COLORS.primary,
    },

    // Icon
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

    // Email info
    emailText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: "center",
        marginBottom: 14,
    },
    emailHighlight: {
        color: COLORS.gradientEnd,
        fontWeight: "700",
    },

    // Success
    successRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    successText: {
        marginLeft: 8,
        fontSize: 13,
        fontWeight: "500",
        color: COLORS.success,
    },

    // OTP boxes
    otpRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    otpBox: {
        width: 46,
        height: 56,
        borderRadius: 14,
        backgroundColor: COLORS.surface,
        borderWidth: 1.2,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
    },
    otpBoxFilled: {
        borderColor: COLORS.primary,
    },
    otpBoxActive: {
        borderColor: COLORS.gradientEnd,
        borderWidth: 2,
    },
    otpDigit: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.text,
    },
    hiddenInput: {
        position: "absolute",
        width: 1,
        height: 1,
        opacity: 0,
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

    // Submit button
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

    // Link button
    linkButton: {
        alignSelf: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginTop: 8,
    },
    linkLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.gradientEnd,
    },
});