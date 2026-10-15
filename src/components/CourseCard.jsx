import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import COLORS from "../constants/color";
import styles from "../styles/CourseCard.style";

const getStatusColors = (status) => {
    const s = String(status).toLowerCase();

    if (s.includes("complete")) {
        return { bg: COLORS.successBackground, color: COLORS.success };
    }
    if (s.includes("progress") || s.includes("active")) {
        return { bg: COLORS.infoBackground, color: COLORS.info };
    }
    if (s.includes("pending")) {
        return { bg: COLORS.warningBackground, color: COLORS.warning };
    }
    return { bg: COLORS.primaryLight, color: COLORS.primary };
};

const CourseCard = ({ enrollment, index = 0 }) => {
    const router = useRouter();
    const [pressed, setPressed] = useState(false);

    const course = enrollment?.course || {};

    const title =
        course.title || course.name || course.courseName || "Untitled Course";

    const description =
        course.description ||
        course.shortDescription ||
        "Explore your course and learning materials.";

    const status = enrollment?.status || "Enrolled";
    const statusColors = getStatusColors(status);

    const lessonsCount = Array.isArray(course.lessons)
        ? course.lessons.length
        : null;

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
        // Entrance animation (stagger by index)
        <MotiView
            from={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 450, delay: index * 90 }}
        >
            {/* Press animation */}
            <MotiView
                animate={{ scale: pressed ? 0.97 : 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
                <Pressable
                    onPress={openCourse}
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                    style={styles.card}
                >
                    {/* Left accent strip */}
                    <View style={styles.accent} />

                    <View style={styles.content}>
                        <View style={styles.topRow}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                                {title}
                            </Text>

                            <View style={[styles.badge, { backgroundColor: statusColors.bg },]}  >
                                <Text
                                    style={[
                                        styles.badgeText,
                                        { color: statusColors.color },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {status}
                                </Text>
                            </View>
                        </View>


                        <Text style={styles.description} numberOfLines={2}>
                            {description}
                        </Text>

                        <View style={styles.footer}>
                            {lessonsCount !== null ? (
                                <View style={styles.meta}>
                                    <Ionicons
                                        name="book-outline"
                                        size={16}
                                        color={COLORS.textSecondary}
                                    />
                                    <Text style={styles.metaText}>
                                        {lessonsCount} lessons
                                    </Text>
                                </View>
                            ) : (
                                <Text style={styles.viewCourse}>
                                    View Course
                                </Text>
                            )}

                            {/* Arrow slides on press */}
                            <MotiView
                                animate={{ translateX: pressed ? 4 : 0 }}
                                transition={{ type: "spring", damping: 12 }}
                                style={styles.arrowCircle}
                            >
                                <Ionicons
                                    name="arrow-forward"
                                    size={16}
                                    color={COLORS.textOnPrimary}
                                />
                            </MotiView>
                        </View>
                    </View>
                </Pressable>
            </MotiView>
        </MotiView>
    );
};

export default CourseCard;