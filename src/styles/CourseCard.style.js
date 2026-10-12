import { StyleSheet } from "react-native";
import COLORS from "../constants/color";



const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.07,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    pressed: {
        opacity: 0.85,
        transform: [{ scale: 0.99 }],
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    icon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        color: COLORS.textOnPrimary,
        fontSize: 22,
        fontWeight: "700",
    },
    details: {
        flex: 1,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8,
    },
    title: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "700",
        lineHeight: 22,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
    },
    badgeText: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 6,
        lineHeight: 19,
    },
    progressBox: {
        backgroundColor: COLORS.surfaceSecondary,
        borderRadius: 14,
        padding: 12,
        marginTop: 16,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    progressFill: {
        height: "100%",
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
    label: {
        color: COLORS.textSecondary,
        fontSize: 13,
        fontWeight: "500",
    },
    progressText: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: "700",
    },
    progressTrack: {
        height: 8,
        backgroundColor: COLORS.border,
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 10,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 14,
    },
    viewCourse: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },
    arrowCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    arrow: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "700",
    },
});

export default styles;