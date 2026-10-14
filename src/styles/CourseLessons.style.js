
import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        flexGrow: 1,
    },

    headingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },

    heading: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginTop: 7,
    },

    countBadge: {
        minWidth: 42,
        height: 42,
        paddingHorizontal: 10,
        borderRadius: 14,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    countText: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "800",
    },

    lessonRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    lessonIcon: {
        width: 46,
        height: 46,
        borderRadius: 15,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    lessonInfo: {
        flex: 1,
        marginLeft: 14,
        marginRight: 10,
    },

    lessonNumber: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1,
        marginBottom: 5,
    },

    lessonTitle: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "700",
        lineHeight: 20,
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        marginRight: 6,
    },

    publishedDot: {
        backgroundColor: "#22A06B",
    },

    draftDot: {
        backgroundColor: COLORS.textMuted,
    },

    lessonStatus: {
        color: COLORS.textSecondary,
        fontSize: 11,
        fontWeight: "500",
    },

    watchButton: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    lockIcon: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: COLORS.surfaceSecondary,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 55,
    },

    emptyIcon: {
        width: 68,
        height: 68,
        borderRadius: 22,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },

    emptyTitle: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "800",
        textAlign: "center",
    },

    emptyDescription: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 21,
        textAlign: "center",
        marginTop: 9,
    },
});

export default styles;
