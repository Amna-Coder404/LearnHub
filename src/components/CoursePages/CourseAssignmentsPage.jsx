import { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import COLORS from "../../constants/color";
import { useCourses } from "../../hooks/useCourses";
import AssignmentList from "../AssignmentList";
import SubmitAssignmentModel from "../SubmitAssignmentModel";
import AssignmentViewerModal from "./AssignmentViewerModal";




const CourseAssignmentsPage = ({ courseId }) => {
    const {
        getAssignmentById,
        assignments,
        assignmentsError,
        assignmentsLoading,
        submitting,
        submitCourseAssignment,
    } = useCourses();

    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [viewingAssignment, setViewingAssignment] = useState(null);


    const fetchAssignments = async () => {
        if (typeof courseId !== "string") return;

        await getAssignmentById(courseId);
    };

    useEffect(() => {
        if (typeof courseId !== "string") return;

        fetchAssignments();
    }, [courseId]);

    const handleRefresh = async () => {
        try {
            setRefreshing(true);
            await fetchAssignments();
        } catch (error) {
            Alert.alert(
                "Refresh failed",
                error.message || "Unable to refresh assignments."
            );
        } finally {
            setRefreshing(false);
        }
    };

    const handleOpenSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setModalVisible(true);
    };

    const handleSubmitAssignment = async (file) => {
        if (!selectedAssignment || !courseId) {
            throw new Error("Assignment or course ID is missing.");
        }

        await submitCourseAssignment(selectedAssignment._id, file, courseId);

        setModalVisible(false);
        setSelectedAssignment(null);

        await fetchAssignments();

        Alert.alert("Success", "Assignment submitted successfully.");
    };

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                        progressBackgroundColor={COLORS.surface}
                    />
                }
            >
                <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                    <View style={styles.flex}>
                        <Text style={styles.heading}>Assignments</Text>
                        <Text style={styles.muted}>
                            Complete your course assignments here.
                        </Text>
                    </View>
                    {Array.isArray(assignments) && assignments.length > 0 ? (
                        <Text style={styles.count}>{assignments.length} total</Text>
                    ) : null}
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(150).springify().damping(16)}>
                    <AssignmentList
                        assignments={assignments}
                        loading={assignmentsLoading}
                        error={assignmentsError}
                        onSubmit={handleOpenSubmitModal}
                         onView={(assignment) => setViewingAssignment(assignment)}
                    />
                </Animated.View>
            </ScrollView>

            <SubmitAssignmentModel
                visible={modalVisible}
                assignment={selectedAssignment}
                submitting={submitting}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmitAssignment}
            />

            <AssignmentViewerModal
                visible={!!viewingAssignment}
                url={
                    viewingAssignment?.pdfUrl ||
                    viewingAssignment?.fileUrl ||
                    viewingAssignment?.documentUrl ||
                    viewingAssignment?.url
                }
                title={viewingAssignment?.title || "Assignment"}
                onClose={() => setViewingAssignment(null)}
            />
        </>
    );
};

export default CourseAssignmentsPage;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: 24, paddingBottom: 40 },
    flex: { flex: 1 },

    header: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 20,
    },
    heading: { fontSize: 24, fontWeight: "800", color: COLORS.text },
    muted: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
    count: { fontSize: 13, fontWeight: "700", color: COLORS.gradientEnd },
});