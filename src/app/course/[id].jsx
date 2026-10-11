import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import AssignmentList from "../../components/AssignmentList";
import Loader from "../../components/Loader";
import SubmitAssignmentModel from "../../components/SubmitAssignmentModel";
import { useCourses } from "../../hooks/useCourses";

const SingleCourse = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const {
        course,
        loading, error,
        fetchSingleCourse,
        getAssignmentById,
        assignments,
        assignmentsError,
        assignmentsLoading,
        submitting,
        submitCourseAssignment,
    } = useCourses();



    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        if (typeof id !== "string") return;

        fetchSingleCourse(id);
        getAssignmentById(id);
    }, [id]);

    const handleOpenSubmitModal = (assignment) => {
        setSelectedAssignment(assignment);
        setModalVisible(true);
    };

    const handleSubmitAssignment = async (file) => {
        if (!selectedAssignment || !id) {
            throw new Error("Assignment or course ID is missing.");
        }
        await submitCourseAssignment(
            selectedAssignment._id,
            file,
            id
        );

        setModalVisible(false);
        setSelectedAssignment(null);

        Alert.alert("Success", "Assignment submitted successfully.");
    };



    if (loading && !course) {
        return <Loader />;
    }

    if (error && !course) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    // Adjust this if your API wraps the course in another property.
    const details = course?.course || course?.data || course;

    if (!details) {
        return (
            <View style={styles.center}>
                <Text>No course details found.</Text>
            </View>
        );
    }

    const title =
        details.title ||
        details.name ||
        details.courseName ||
        "Course Details";

    const description =
        details.description ||
        details.shortDescription ||
        "No description available.";

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.back} onPress={() => router.back()}>
                ← Back to Courses
            </Text> */}

            <View style={styles.card}>
                <Text style={styles.title}>{title}</Text>

                <Text style={styles.description}>
                    {description}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    Course Information
                </Text>

                <DetailRow label="Course ID" value={details._id || id} />

                <DetailRow
                    label="Category"
                    value={details.category?.name || details.category}
                />

                <DetailRow
                    label="Level"
                    value={details.level}
                />

                <DetailRow
                    label="Duration"
                    value={details.duration}
                />


            </View>
            <View style={styles.assignmentSection}>
                <Text style={styles.assignmentHeading}>Assignments</Text>

                <Text style={styles.assignmentSubtitle}>
                    Complete your course assignments here.
                </Text>

                <AssignmentList
                    assignments={assignments}
                    loading={assignmentsLoading}
                    error={assignmentsError}
                    onSubmit={handleOpenSubmitModal}
                />
                <SubmitAssignmentModel
                    visible={modalVisible}
                    assignment={selectedAssignment}
                    submitting={submitting}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleSubmitAssignment}
                />
            </View>
        </ScrollView>
    );
};

const DetailRow = ({ label, value }) => {
    if (!value || typeof value === "object") {
        return null;
    }

    return (
        <View style={styles.detailRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{String(value)}</Text>
        </View>
    );
};

export default SingleCourse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    back: {
        color: "#16803D",
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 24,
    },
    title: {
        color: "#111827",
        fontSize: 24,
        fontWeight: "700",
    },
    description: {
        color: "#6B7280",
        fontSize: 15,
        lineHeight: 23,
        marginTop: 12,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 20,
    },
    sectionTitle: {
        color: "#111827",
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 16,
    },
    detailRow: {
        marginBottom: 16,
    },
    label: {
        color: "#6B7280",
        fontSize: 13,
        marginBottom: 5,
    },
    value: {
        color: "#111827",
        fontSize: 15,
        fontWeight: "500",
    },
    error: {
        color: "#DC2626",
        textAlign: "center",
        fontSize: 15,
    },
});