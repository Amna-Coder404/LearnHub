import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.surface,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        flex: 1,
        textAlign: "center",
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "700",
        marginHorizontal: 12,
    },
    headerSpace: {
        width: 38,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: COLORS.background,
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    tab: {
        flex: 1,
        paddingVertical: 14,
        alignItems: "center",
        borderBottomWidth: 3,
        borderTopWidth: 3,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
    },
    tabActive: {
        borderBottomColor: COLORS.primary,
        borderTopColor: COLORS.primary,

        // backgroundColor: COLORS.primaryLight,
        borderRadius: 20,
        borderColor: "white"
    },
    tabText: {
        color: COLORS.textSecondary,
        fontSize: 15,
        fontWeight: "600",
    },
    tabTextActive: {
        color: COLORS.primary,
    },
    pager: {
        flex: 1,
    },
    page: {
        padding: 20,
    },
    card: {
        paddingHorizontal: 12,
        paddingVertical: 12

    },
    courseImage: {
        width: "100%",
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
        backgroundColor: COLORS.surfaceSecondary,
    },
    tagRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    tag: {
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 50,
    },
    tagText: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    price: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "700",
    },
    lessonRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 10,
    },
    lessonNumber: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    lessonNumberText: {
        color: COLORS.primary,
        fontWeight: "700",
    },
    lessonInfo: {
        flex: 1,
    },
    lessonTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "600",
    },
    lessonMeta: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginTop: 2,
    },
    watchButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    watchButtonText: {
        color: COLORS.textOnPrimary,
        fontSize: 13,
        fontWeight: "600",
    },
    title: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: "700",
    },
    description: {
        color: COLORS.textSecondary,
        fontSize: 15,
        lineHeight: 23,
        marginTop: 12,
    },
    seeMore: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 20,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 16,
    },
    detailRow: {
        marginBottom: 16,
    },
    label: {
        color: COLORS.textMuted,
        fontSize: 13,
        marginBottom: 5,
    },
    value: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "500",
    },
    assignmentHeading: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "700",
    },
    assignmentSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 4,
        marginBottom: 16,
    },
    error: {
        color: COLORS.error,
        textAlign: "center",
        fontSize: 15,
    },

    enrollHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    enrollTitle: {
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "700",
    },
    progressRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    progressLabel: {
        color: COLORS.textSecondary,
        fontSize: 13,
    },
    progressPercent: {
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
        backgroundColor: COLORS.primary,
    },
    statRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 16,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.surfaceSecondary,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    statLabel: {
        color: COLORS.textMuted,
        fontSize: 11,
        marginBottom: 3,
    },
    statValue: {
        color: COLORS.text,
        fontSize: 13,
        fontWeight: "700",
    },

    // Trainer
    trainerHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    trainerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    trainerAvatarText: {
        color: COLORS.textOnPrimary,
        fontSize: 20,
        fontWeight: "700",
    },
    trainerInfo: {
        flex: 1,
    },
    trainerLabel: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginBottom: 2,
    },
    trainerName: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    toggleCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    trainerBody: {
        marginTop: 16,
        gap: 10,
    },
    trainerItem: {
        backgroundColor: COLORS.surfaceSecondary,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    trainerItemLabel: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginBottom: 3,
    },
    trainerItemValue: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },
    trainerEmail: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: "600",
    },


});

export default styles;