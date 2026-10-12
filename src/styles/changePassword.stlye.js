import { StyleSheet } from "react-native";
import COLORS from "../constants/color";


export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 24,
    },
    iconBadge: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: COLORS.text,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: COLORS.textSecondary,
        marginTop: 2,
    },

    // Form card
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 3,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: COLORS.text,
        marginBottom: 6,
        marginLeft: 2,
    },
    input: {
        backgroundColor: COLORS.inputBackground,
        marginBottom: 16,
        fontSize: 15,
    },
    inputOutline: {
        borderRadius: 12,
        borderWidth: 1.2,
    },

    // Password rules hint
    hintBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: COLORS.infoBackground,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    hintText: {
        flex: 1,
        fontSize: 12.5,
        lineHeight: 18,
        color: COLORS.info,
        marginLeft: 8,
    },

    // Error message
    error: {
        color: COLORS.error,
        backgroundColor: COLORS.errorBackground,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginBottom: 14,
        overflow: "hidden",
    },

    // Buttons
    submitButton: {
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    submitContent: {
        height: 52,
    },
    submitLabel: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
        color: COLORS.textOnPrimary,
    },
    cancelButton: {
        alignSelf: "center",
        marginTop: 8,
    },
});