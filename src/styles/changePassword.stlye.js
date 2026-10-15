import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: 48,
        paddingBottom: 32,
    },

    // Header
    header: {
        alignItems: "center",
        marginBottom: 36,
    },
    badgeWrap: {
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    badgeRing: {
        position: "absolute",
        width: 88,
        height: 88,
        borderRadius: 44,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    iconBadge: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 8,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.textSecondary,
        marginTop: 6,
        textAlign: "center",
    },

    // Form
    form: {
        marginBottom: 8,
    },
    input: {
        backgroundColor: "transparent",
        marginBottom: 12,
        fontSize: 15,
    },

    // Strength meter
    strengthWrap: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: -2,
        marginBottom: 16,
    },
    strengthBars: {
        flex: 1,
        flexDirection: "row",
        gap: 6,
    },
    strengthBar: {
        flex: 1,
        height: 4,
        borderRadius: 2,
    },
    strengthLabel: {
        width: 56,
        textAlign: "right",
        fontSize: 12,
        fontWeight: "700",
    },

    // Requirements
    rules: {
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        marginTop: 8,
        marginBottom: 24,
    },
    ruleItem: {
        width: "50%",
        flexDirection: "row",
        alignItems: "center",
    },
    ruleText: {
        marginLeft: 8,
        fontSize: 13,
        color: COLORS.textMuted,
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

    // Buttons
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
    cancelButton: {
        alignSelf: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        marginTop: 8,
    },
    cancelLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
});