
import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 24, paddingBottom: 40 },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: 12,
    },
    heading: { fontSize: 24, fontWeight: "800", color: COLORS.text },
    muted: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
    count: { fontSize: 13, fontWeight: "700", color: COLORS.gradientEnd },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.border,
    },
    number: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },
    numberText: { fontSize: 16, fontWeight: "800", color: COLORS.primary },
    info: { flex: 1 },
    title: { fontSize: 15, fontWeight: "700", color: COLORS.text },
    status: { fontSize: 12, fontWeight: "600", marginTop: 4 },
    play: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },

    empty: { alignItems: "center", paddingVertical: 64, gap: 8 },
    emptyTitle: { fontSize: 18, fontWeight: "800", color: COLORS.text, marginTop: 8 },
});

export default styles;
