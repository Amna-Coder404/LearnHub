import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    page: { paddingBottom: 40, backgroundColor: COLORS.background },
    center: { flex: 1, alignItems: "center", justifyContent: "center" },
    flex: { flex: 1 },
    section: { paddingHorizontal: 24, marginTop: -40 },
    heroFallback: { alignItems: "center", justifyContent: "center" },
    block: { marginTop: 32 },

    hero: { width: "100%", height: 260 },
    category: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5, color: COLORS.gradientEnd },
    title: { fontSize: 28, fontWeight: "800", color: COLORS.text, marginTop: 6, letterSpacing: -0.5 },
    description: { fontSize: 15, lineHeight: 23, color: COLORS.textSecondary, marginTop: 12 },
    link: { fontSize: 14, fontWeight: "700", color: COLORS.primary, marginTop: 8 },
    muted: { fontSize: 12, color: COLORS.textMuted },

    trainerRow: { flexDirection: "row", alignItems: "center", gap: 14 },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: { fontSize: 18, fontWeight: "800", color: COLORS.primary },
    trainerName: { fontSize: 16, fontWeight: "700", color: COLORS.text, marginTop: 2 },
    trainerBody: { marginTop: 12, marginLeft: 60, gap: 6 },
    trainerLine: { fontSize: 14, color: COLORS.textSecondary },

    progressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    heading: { fontSize: 18, fontWeight: "800", color: COLORS.text },
    status: { fontSize: 12, fontWeight: "700", color: COLORS.success },
    track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.border,
        overflow: "hidden",
        marginTop: 16,
    },
    fill: { height: 8, borderRadius: 4, overflow: "hidden" },
    percent: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary, marginTop: 8 },

    stats: { flexDirection: "row", marginTop: 24 },
    stat: { flex: 1, alignItems: "center", gap: 4 },
    statDivider: { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: COLORS.border },
    statValue: { fontSize: 15, fontWeight: "800", color: COLORS.text },
});


export default styles