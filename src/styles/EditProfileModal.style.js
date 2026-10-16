
import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    flex: { flex: 1 },

    modal: {
        height: "90%",
        marginHorizontal: 14,
        backgroundColor: COLORS.background,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: "hidden",
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerText: { flex: 1 },
    title: {
        color: COLORS.text,
        fontSize: 22,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 13,
        marginTop: 2,
    },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.surfaceSecondary,
        alignItems: "center",
        justifyContent: "center",
    },

    // Form
    form: {
        paddingHorizontal: 20,
        paddingTop: 22,
        paddingBottom: 24,
    },

    // Avatar
    avatarSection: {
        alignItems: "center",
        marginBottom: 26,
    },
    avatarRing: {
        width: 108,
        height: 108,
        borderRadius: 54,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarInner: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    avatarImage: {
        width: 100,
        height: 100,
    },
    cameraBadge: {
        position: "absolute",
        right: 2,
        bottom: 2,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryDark,
        borderWidth: 3,
        borderColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarHint: {
        color: COLORS.textMuted,
        fontSize: 12,
        marginTop: 10,
    },

    // Sections
    section: { marginBottom: 8 },
    sectionTitle: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.8,
        marginBottom: 10,
    },
    field: { marginBottom: 6 },
    input: {
        backgroundColor: COLORS.inputBackground,
    },
    inputMultiline: {
        minHeight: 92,
    },
    inputOutline: {
        borderRadius: 14,
        borderWidth: 1,
    },
    helper: {
        color: COLORS.textMuted,
        paddingHorizontal: 4,
    },

    // Footer
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        backgroundColor: COLORS.surface,
    },
    cancelBtn: { borderRadius: 14 },
    saveBtn: {
        flex: 1,
        marginLeft: 12,
        borderRadius: 14,
    },
    saveContent: { height: 48 },
});

export default styles;
