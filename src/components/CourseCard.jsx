import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CourseCard = ({ enrollment }) => {
    const router = useRouter();
    const course = enrollment?.course || {};

    const title =
        course.title ||
        course.name ||
        course.courseName ||
        "Untitled Course";

    const description =
        course.description ||
        course.shortDescription ||
        "Explore your course and learning materials.";

    const progress = Math.min(
        100,
        Math.max(0, Number(enrollment?.progress) || 0)
    );

    // Use the actual course ID, not the enrollment ID.
    const courseId = typeof enrollment?.course === "object"
        ? enrollment.course?._id
        : enrollment?.course;

    const openCourse = () => {
        if (!courseId) {
            console.log("Course ID is missing.");
            return;
        }

        router.push({
            pathname: "/course/[id]",
            params: { id: courseId },
        });
    };

    return (
        <Pressable
            onPress={openCourse}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.header}>
                <View style={styles.icon}>
                    <Text style={styles.iconText}>C</Text>
                </View>

                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={2}>
                        {title}
                    </Text>

                    <Text style={styles.description} numberOfLines={2}>
                        {description}
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
                <Text style={styles.label}>Status</Text>

                <Text style={styles.status}>
                    {enrollment?.status || "Unknown"}
                </Text>
            </View>

            <View style={styles.progressHeader}>
                <Text style={styles.label}>Course progress</Text>
                <Text style={styles.progressText}>{progress}%</Text>
            </View>

            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress}%` },
                    ]}
                />
            </View>

            <Text style={styles.viewCourse}>
                View Course Details →
            </Text>
        </Pressable>
    );
};

export default CourseCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    pressed: {
        opacity: 0.75,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    icon: {
        width: 52,
        height: 52,
        borderRadius: 14,
        backgroundColor: "#E8F5E9",
        alignItems: "center",
        justifyContent: "center",
    },
    iconText: {
        color: "#16803D",
        fontSize: 22,
        fontWeight: "700",
    },
    details: {
        flex: 1,
    },
    title: {
        color: "#111827",
        fontSize: 16,
        fontWeight: "700",
    },
    description: {
        color: "#6B7280",
        fontSize: 13,
        marginTop: 5,
        lineHeight: 19,
    },
    divider: {
        height: 1,
        backgroundColor: "#E5E7EB",
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },
    label: {
        color: "#6B7280",
        fontSize: 13,
    },
    status: {
        color: "#16803D",
        backgroundColor: "#E8F5E9",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        fontSize: 12,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    progressText: {
        color: "#111827",
        fontSize: 13,
        fontWeight: "600",
    },
    progressTrack: {
        height: 7,
        backgroundColor: "#E5E7EB",
        borderRadius: 10,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#16A34A",
        borderRadius: 10,
    },
    viewCourse: {
        color: "#16803D",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 16,
        textAlign: "right",
    },
});