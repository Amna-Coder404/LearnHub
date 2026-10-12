import { Linking, Pressable, Text, View } from "react-native";

import { useAssignmentResult } from "../hooks/useAssignmentResult";
import { formatDate } from "../lib/utils";
import styles from "../styles/AssignmentCard.style";


const AssignmentCard = ({ assignment, onSubmit }) => {
    const isSubmitted = Boolean(assignment.submission);

    const {
        result: response,
        loading: resultLoading,
        refreshing,
        error: resultError,
        hasResult,
        refreshResult,
    } = useAssignmentResult(isSubmitted ? assignment._id : null);

    // Your API response format: { success: true, result: {...} }
    const result = response?.result ?? null;

    const dueDate = assignment.dueDate
        ? formatDate(assignment.dueDate)
        : "No due date";

    const resultIsReady =
        hasResult && result?.status === "graded" && result?.marks != null;

    const totalMarks = result?.assignment?.totalMarks ?? assignment.totalMarks;

    const answerUrl = result?.answerUrl ?? assignment.submission?.answerUrl;

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
            {/* Title and status */}
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

            {/* Due date and total marks */}
            <View style={styles.metaRow}>
                <View style={styles.metaBox}>
                    <Text style={styles.metaLabel}>Due date</Text>
                    <Text style={styles.metaValue}>{dueDate}</Text>
                </View>

                {assignment.totalMarks != null && (
                    <View style={styles.metaBox}>
                        <Text style={styles.metaLabel}>Total marks</Text>
                        <Text style={styles.metaValue}>
                            {assignment.totalMarks}
                        </Text>
                    </View>
                )}
            </View>

            {assignment.description ? (
                <Text style={styles.description}>{assignment.description}</Text>
            ) : null}

            {/* PDF and answer buttons */}
            {(assignment.pdfUrl || (isSubmitted && answerUrl)) && (
                <View style={styles.buttonRow}>
                    {assignment.pdfUrl ? (
                        <Pressable
                            style={styles.outlineButton}
                            onPress={() => openUrl(assignment.pdfUrl)}
                        >
                            <Text style={styles.outlineButtonText}>
                                View PDF
                            </Text>
                        </Pressable>
                    ) : null}

                    {isSubmitted && answerUrl ? (
                        <Pressable
                            style={styles.outlineButton}
                            onPress={() => openUrl(answerUrl)}
                        >
                            <Text style={styles.outlineButtonText}>
                                My Answer
                            </Text>
                        </Pressable>
                    ) : null}
                </View>
            )}

            {/* Result */}
            {isSubmitted && (
                <View style={styles.resultBox}>
                    <Text style={styles.resultHeading}>Result</Text>

                    {resultLoading && !response ? (
                        <Text style={styles.resultText}>Loading result...</Text>
                    ) : resultIsReady ? (
                        <>
                            <Text style={styles.marks}>
                                {result.marks} / {totalMarks} marks
                            </Text>

                            <Text style={styles.status}>Graded</Text>

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
                                    Graded on {formatDate(result.gradedAt)}
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
                            {refreshing ? "Refreshing..." : "Refresh Result"}
                        </Text>
                    </Pressable>
                </View>
            )}

            {/* Submit */}
            {!assignment.submission && (
                <Pressable
                    style={styles.submitButton}
                    onPress={() => onSubmit(assignment)}
                >
                    <Text style={styles.submitButtonText}>
                        Submit Assignment
                    </Text>
                </Pressable>
            )}
        </View>
    );
};

export default AssignmentCard;