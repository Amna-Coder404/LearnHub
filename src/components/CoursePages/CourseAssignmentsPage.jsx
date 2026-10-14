
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import {
    Alert,
    RefreshControl,
    ScrollView,
    Text
} from "react-native";

import { useCourses } from "../../hooks/useCourses";
import styles from "../../styles/SingleCourse.style";
import AssignmentList from "../AssignmentList";
import SubmitAssignmentModel from "../SubmitAssignmentModel";

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

        await submitCourseAssignment(
            selectedAssignment._id,
            file,
            courseId
        );

        setModalVisible(false);
        setSelectedAssignment(null);

        await fetchAssignments();

        Alert.alert(
            "Success",
            "Assignment submitted successfully."
        );
    };

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.page}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={["#2563EB"]}
                        tintColor="#2563EB"
                    />
                }
            >
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: "timing",
                        duration: 400,
                    }}
                >


                    <Text style={styles.assignmentSubtitle}>
                        Complete your course assignments here.
                    </Text>
                </MotiView>

                <MotiView
                    from={{ opacity: 0, translateY: 25 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: "timing",
                        duration: 500,
                        delay: 150,
                    }}
                >
                    <AssignmentList
                        assignments={assignments}
                        loading={assignmentsLoading}
                        error={assignmentsError}
                        onSubmit={handleOpenSubmitModal}
                    />
                </MotiView>
            </ScrollView>

            <SubmitAssignmentModel
                visible={modalVisible}
                assignment={selectedAssignment}
                submitting={submitting}
                onClose={() => setModalVisible(false)}
                onSubmit={handleSubmitAssignment}
            />
        </>
    );
};

export default CourseAssignmentsPage;