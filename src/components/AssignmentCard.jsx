
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

const AssignmentCard = ({ assignment, onSubmit }) => {
    const dueDate = assignment.dueDate
        ? new Date(assignment.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "No due date";

    const isSubmitted = Boolean(assignment.submission);

    const openAssignmentPdf = async () => {
        if (!assignment.pdfUrl) return;

        try {
            await Linking.openURL(assignment.pdfUrl);
        } catch (error) {
            console.error("Failed to open assignment PDF:", error);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Text style={styles.iconText}>PDF</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{assignment.title}</Text>

                    <Text style={styles.meta}>
                        Due {dueDate} · {assignment.totalMarks} marks
                    </Text>
                </View>
            </View>

            <View
                style={[
                    styles.statusBadge,
                    isSubmitted && styles.submittedBadge,
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        isSubmitted && styles.submittedText,
                    ]}
                >
                    {isSubmitted ? "Submitted" : "Not submitted"}
                </Text>
            </View>

            <Text style={styles.description}>
                {assignment.description || "No description provided."}
            </Text>

            {assignment.pdfUrl ? (
                <Pressable
                    onPress={openAssignmentPdf}
                    style={({ pressed }) => [
                        styles.pdfButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Text style={styles.pdfIcon}>↗</Text>
                    <Text style={styles.pdfText}>Assignment PDF</Text>
                </Pressable>
            ) : null}

            <Pressable
                onPress={() => onSubmit?.(assignment)}
                style={({ pressed }) => [
                    styles.submitButton,
                    pressed && styles.pressed,
                ]}
            >
                <Text style={styles.submitText}>
                    {isSubmitted ? "View Submission" : "Submit Assignment"}
                </Text>
            </Pressable>
        </View>
    );
};

export default AssignmentCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 46,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    icon: {
        width: 46,
        height: 46,
        borderRadius: 12,
        backgroundColor: "#F3E8FF",
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        color: "#7C3AED",
        fontSize: 13,
        fontWeight: "800",
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        color: "#111827",
        fontSize: 18,
        fontWeight: "700",
    },
    meta: {
        color: "#6B7280",
        fontSize: 12,
        marginTop: 5,
    },
    statusBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 16,
    },
    submittedBadge: {
        backgroundColor: "#DCFCE7",
    },
    statusText: {
        color: "#92400E",
        fontSize: 12,
        fontWeight: "600",
    },
    submittedText: {
        color: "#166534",
    },
    description: {
        color: "#374151",
        fontSize: 14,
        lineHeight: 21,
        marginTop: 14,
    },
    pdfButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 8,
        marginTop: 18,
        paddingVertical: 8,
    },
    pdfIcon: {
        color: "#7C3AED",
        fontSize: 18,
        fontWeight: "700",
    },
    pdfText: {
        color: "#7C3AED",
        fontSize: 14,
        fontWeight: "700",
        textDecorationLine: "underline",
    },
    submitButton: {
        backgroundColor: "#7C3AED",
        paddingVertical: 13,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 12,
    },
    submitText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    pressed: {
        opacity: 0.75,
    },
});
