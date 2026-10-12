
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Pressable, Text, View } from "react-native";

import COLORS from "../constants/color";
import styles from "../styles/CourseCard.style";

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

    const status = enrollment?.status || "Unknown";

    // Use the actual course ID, not the enrollment ID.
    const courseId =
        typeof enrollment?.course === "object"
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
        <MotiView
            from={{
                opacity: 0,
                translateY: 25,
                scale: 0.97,
            }}
            animate={{
                opacity: 1,
                translateY: 0,
                scale: 1,
            }}
            transition={{
                type: "timing",
                duration: 400,
            }}
        >
            <Pressable
                onPress={openCourse}
                style={({ pressed }) => [
                    styles.card,
                    pressed && styles.pressed,
                ]}
            >
                <View style={styles.header}>
                    <View style={styles.icon}>
                        <Text style={styles.iconText}>
                            {title.charAt(0).toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.details}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title} numberOfLines={2}>
                                {title}
                            </Text>

                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {status}
                                </Text>
                            </View>
                        </View>

                        <Text
                            style={styles.description}
                            numberOfLines={2}
                        >
                            {description}
                        </Text>
                    </View>
                </View>

                <View style={styles.progressBox}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.label}>
                            Course progress
                        </Text>

                        <Text style={styles.progressText}>
                            {progress}%
                        </Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progress}%` },
                            ]}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.viewCourse}>
                        View Course Details
                    </Text>

                    <View style={styles.arrowCircle}>
                        <Ionicons
                            name="arrow-forward"
                            size={16}
                            color={COLORS.primary}
                        />
                    </View>
                </View>
            </Pressable>
        </MotiView>
    );
};

export default CourseCard;
