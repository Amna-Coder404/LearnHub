
import { StyleSheet } from "react-native";
import COLORS from "../constants/color";

const styles = StyleSheet.create({
    modal: {
        marginHorizontal: 18,
        height: "85%",
        maxHeight: 680,
        backgroundColor: COLORS.background || "#FFFFFF",
        borderRadius: 24,
        overflow: "hidden",
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 12,
        elevation: 8,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.textMuted,
    },

    headerText: {
        flex: 1,
    },

    title: {
        color: COLORS.text,
        fontWeight: "700",
    },

    subtitle: {
        color: COLORS.textSecondary,
        marginTop: 4,
    },

    scrollView: {
        flex: 1,
    },

    form: {
        paddingTop: 8,
        paddingBottom: 12,
    },

    imageSection: {
        alignItems: "center",
        paddingVertical: 14,
        marginBottom: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.textMuted,
    },

    profileImage: {
        width: 86,
        height: 86,
        borderRadius: 43,
        marginBottom: 10,
        backgroundColor: "#E5E7EB",
    },

    avatar: {
        backgroundColor: COLORS.primary,
        marginBottom: 10,
    },

    imageButton: {
        borderRadius: 12,
        marginTop: 4,
    },

    imageHint: {
        color: COLORS.textSecondary,
        marginTop: 6,
        textAlign: "center",
    },

    field: {
        marginBottom: 12,
    },

    label: {
        color: COLORS.text,
        marginBottom: 6,
        fontWeight: "600",
    },

    input: {
        backgroundColor: COLORS.background || "#FFFFFF",
        fontSize: 14,
    },

    inputOutline: {
        borderRadius: 12,
    },

    multilineContent: {
        minHeight: 65,
        paddingTop: 10,
    },

    saveButton: {
        marginTop: 8,
        borderRadius: 12,
    },

    buttonContent: {
        minHeight: 46,
    },

    cancelButton: {
        marginTop: 2,
        borderRadius: 12,
    },
});

export default styles;
