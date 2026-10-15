import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    accent: {
        width: 6,
        backgroundColor: COLORS.primary,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    topRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 8,
    },
    title: {
        flex: 1,
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "700",
        lineHeight: 23,
    },
    badge: {
        flexShrink: 0,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        marginTop: 2,
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: "800",
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    description: {
        color: COLORS.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        marginTop: 6,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    meta: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    metaText: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: "500",
    },
    viewCourse: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    arrowCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default styles;