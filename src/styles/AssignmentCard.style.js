import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10,
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 23,
        color: COLORS.text,
    },
    badge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    submittedBadge: {
        backgroundColor: COLORS.successBackground,
    },
    notSubmittedBadge: {
        backgroundColor: COLORS.warningBackground,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "700",
    },
    submittedText: {
        color: COLORS.success,
    },
    notSubmittedText: {
        color: COLORS.warning,
    },

    // Due date and marks
    metaRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },
    metaBox: {
        flex: 1,
        backgroundColor: COLORS.surfaceSecondary,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    metaLabel: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginBottom: 3,
    },
    metaValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },

    description: {
        marginTop: 14,
        color: COLORS.textSecondary,
        fontSize: 14,
        lineHeight: 22,
    },

    // PDF and answer buttons
    buttonRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    outlineButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
        borderRadius: 12,
        paddingVertical: 11,
        alignItems: "center",
    },
    outlineButtonText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "600",
    },

    // Result
    resultBox: {
        marginTop: 16,
        padding: 14,
        backgroundColor: COLORS.surfaceSecondary,
        borderRadius: 14,
    },
    resultHeading: {
        fontSize: 15,
        fontWeight: "700",
        color: COLORS.text,
        marginBottom: 10,
    },
    resultText: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 20,
    },
    marks: {
        fontSize: 26,
        fontWeight: "800",
        color: COLORS.success,
    },
    status: {
        marginTop: 4,
        color: COLORS.success,
        fontSize: 13,
        fontWeight: "600",
    },
    feedbackBox: {
        marginTop: 12,
        padding: 12,
        backgroundColor: COLORS.surface,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    feedbackLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.primary,
        marginBottom: 5,
    },
    feedback: {
        color: COLORS.text,
        fontSize: 14,
        lineHeight: 21,
    },
    gradedDate: {
        marginTop: 10,
        color: COLORS.textMuted,
        fontSize: 12,
    },
    refreshButton: {
        alignSelf: "flex-start",
        marginTop: 10,
        paddingVertical: 6,
    },
    refreshButtonText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: "600",
    },

    // Submit
    submitButton: {
        marginTop: 16,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    submitButtonText: {
        color: COLORS.textOnPrimary,
        fontSize: 15,
        fontWeight: "700",
    },
});

export default styles;