import { StyleSheet } from "react-native";
import COLORS from "../constants/color";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    list: {
        paddingHorizontal: 20,
        paddingTop: 56,
        paddingBottom: 32,
        flexGrow: 1,
    },

    // Hero header
    hero: {
        borderRadius: 24,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    heroTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },
    heroIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.5,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    countChip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: COLORS.infoBackground,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    countText: {
        color: COLORS.info,
        fontSize: 12,
        fontWeight: "700",
    },
    heading: {
        color: COLORS.text,
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: 0.3,
    },
    subtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 6,
    },

    // Error
    errorBox: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: COLORS.errorBackground,
        borderRadius: 14,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        flex: 1,
        color: COLORS.error,
        fontSize: 13,
        fontWeight: "500",
    },

    // Empty state
    emptyBox: {
        alignItems: "center",
        marginTop: 40,
        paddingHorizontal: 24,
    },
    emptyIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    emptyTitle: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: "700",
    },
    emptyText: {
        color: COLORS.textSecondary,
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
        marginTop: 6,
    },
    greeting: {
        color: COLORS.info,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
});


export default styles