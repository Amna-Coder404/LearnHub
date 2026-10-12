import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useAssignmentResult } from "../hooks/useAssignmentResult";

const AssignmentCard = ({ assignment, onSubmit }) => {
    const isSubmitted = Boolean(assignment.submission);

    const {
        result: response,
        loading: resultLoading,
        refreshing,
        error: resultError,
        hasResult,
        refreshResult,
    } = useAssignmentResult(
        isSubmitted ? assignment._id : null
    );

    // Your API response format: { success: true, result: {...} }
    const result = response?.result ?? null;

    const dueDate = assignment.dueDate
        ? new Date(assignment.dueDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
        : "No due date";

    const resultIsReady =
        hasResult &&
        result?.status === "graded" &&
        result?.marks != null;

    const totalMarks =
        result?.assignment?.totalMarks ??
        assignment.totalMarks;

    const answerUrl =
        result?.answerUrl ??
        assignment.submission?.answerUrl;

    const openUrl = async (url) => {
        if (!url) return;

        try {
            await Linking.openURL(url);
        } catch {
            // Ignore URL opening errors.
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {assignment.title || "Assignment"}
                </Text>

                <View
                    style={[
                        styles.badge,
                        isSubmitted
                            ? styles.submittedBadge
                            : styles.notSubmittedBadge,
                    ]}
                >
                    <Text
                        style={[
                            styles.badgeText,
                            isSubmitted
                                ? styles.submittedText
                                : styles.notSubmittedText,
                        ]}
                    >
                        {isSubmitted ? "Submitted" : "Not submitted"}
                    </Text>
                </View>
            </View>

            <Text style={styles.dueDate}>
                Due date: {dueDate}
            </Text>

            {assignment.totalMarks != null && (
                <Text style={styles.info}>
                    Total marks: {assignment.totalMarks}
                </Text>
            )}

            {assignment.description ? (
                <Text style={styles.description}>
                    {assignment.description}
                </Text>
            ) : null}

            {assignment.pdfUrl ? (
                <Pressable
                    style={styles.outlineButton}
                    onPress={() => openUrl(assignment.pdfUrl)}
                >
                    <Text style={styles.outlineButtonText}>
                        View Assignment PDF
                    </Text>
                </Pressable>
            ) : null}

            {isSubmitted && answerUrl ? (
                <Pressable
                    style={styles.outlineButton}
                    onPress={() => openUrl(answerUrl)}
                >
                    <Text style={styles.outlineButtonText}>
                        View My Answer
                    </Text>
                </Pressable>
            ) : null}

            {isSubmitted && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultHeading}>
                        Assignment Result
                    </Text>

                    {resultLoading && !response ? (
                        <Text style={styles.resultText}>
                            Loading result...
                        </Text>
                    ) : resultIsReady ? (
                        <>
                            <Text style={styles.marks}>
                                {result.marks} / {totalMarks} marks
                            </Text>

                            <Text style={styles.status}>
                                Status: Graded
                            </Text>

                            {result.feedback ? (
                                <View style={styles.feedbackBox}>
                                    <Text style={styles.feedbackLabel}>
                                        Teacher's Feedback
                                    </Text>

                                    <Text style={styles.feedback}>
                                        {result.feedback}
                                    </Text>
                                </View>
                            ) : null}

                            {result.gradedAt ? (
                                <Text style={styles.gradedDate}>
                                    Graded on{" "}
                                    {new Date(
                                        result.gradedAt
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </Text>
                            ) : null}
                        </>
                    ) : (
                        <Text style={styles.resultText}>
                            {resultError
                                ? "Unable to load result. Please refresh."
                                : "Pending — your teacher has not graded this assignment yet."}
                        </Text>
                    )}

                    <Pressable
                        style={styles.refreshButton}
                        onPress={refreshResult}
                        disabled={refreshing}
                    >
                        <Text style={styles.refreshButtonText}>
                            {refreshing
                                ? "Refreshing..."
                                : "Refresh Result"}
                        </Text>
                    </Pressable>
                </View>
            )}

            {!assignment.submission && (
                <Button
                    mode="contained"
                    onPress={() => onSubmit(assignment)}
                >
                    Submit Assignment
                </Button>
            )}
        </View>
    );
};

export default AssignmentCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },
    badge: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    submittedBadge: {
        backgroundColor: "#DCFCE7",
    },
    notSubmittedBadge: {
        backgroundColor: "#FEF3C7",
    },
    badgeText: {
        fontSize: 11,
        fontWeight: "600",
    },
    submittedText: {
        color: "#166534",
    },
    notSubmittedText: {
        color: "#92400E",
    },
    dueDate: {
        marginTop: 10,
        color: "#6B7280",
        fontSize: 13,
    },
    info: {
        marginTop: 6,
        color: "#374151",
        fontSize: 13,
    },
    description: {
        marginTop: 10,
        color: "#4B5563",
        fontSize: 14,
        lineHeight: 21,
    },
    outlineButton: {
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#7C3AED",
        borderRadius: 10,
        padding: 11,
        alignItems: "center",
    },
    outlineButtonText: {
        color: "#7C3AED",
        fontWeight: "600",
    },
    resultBox: {
        marginTop: 14,
        padding: 14,
        backgroundColor: "#F5F3FF",
        borderRadius: 12,
    },
    resultHeading: {
        fontSize: 15,
        fontWeight: "700",
        color: "#4C1D95",
        marginBottom: 10,
    },
    resultText: {
        color: "#6B7280",
        fontSize: 13,
        lineHeight: 20,
    },
    marks: {
        fontSize: 24,
        fontWeight: "800",
        color: "#15803D",
    },
    status: {
        marginTop: 5,
        color: "#166534",
        fontSize: 13,
        fontWeight: "600",
    },
    feedbackBox: {
        marginTop: 12,
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
    },
    feedbackLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "#6D28D9",
        marginBottom: 5,
    },
    feedback: {
        color: "#374151",
        fontSize: 14,
        lineHeight: 21,
    },
    gradedDate: {
        marginTop: 10,
        color: "#6B7280",
        fontSize: 12,
    },
    refreshButton: {
        alignSelf: "flex-start",
        marginTop: 10,
        paddingVertical: 6,
    },
    refreshButtonText: {
        color: "#6D28D9",
        fontSize: 13,
        fontWeight: "600",
    },
    submitButton: {
        marginTop: 14,
        backgroundColor: "#7C3AED",
        borderRadius: 10,
        padding: 13,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});