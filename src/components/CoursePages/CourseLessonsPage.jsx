import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
    ZoomIn,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import COLORS from "../../constants/color";
import styles from "../../styles/CourseLessons.style";

const PlayButton = ({ onPress, label }) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => (scale.value = withSpring(0.85))}
            onPressOut={() => (scale.value = withSpring(1))}
            accessibilityRole="button"
            accessibilityLabel={label}
        >
            <Animated.View style={[styles.play, animatedStyle]}>
                <Ionicons name="play" size={16} color={COLORS.textOnPrimary} />
            </Animated.View>
        </Pressable>
    );
};

const CourseLessonsPage = ({ course }) => {
    const lessons =
        course?.lessons ||
        course?.course?.lessons ||
        course?.data?.lessons ||
        [];

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
        >
            <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
                <View>
                    <Text style={styles.heading}>Course Lessons</Text>
                    <Text style={styles.muted}>Continue learning at your own pace.</Text>
                </View>
                <Text style={styles.count}>{lessons.length} lessons</Text>
            </Animated.View>

            {lessons.length === 0 ? (
                <View style={styles.empty}>
                    <Animated.View entering={ZoomIn.springify()}>
                        <Ionicons name="book-outline" size={56} color={COLORS.primary} />
                    </Animated.View>
                    <Animated.Text entering={FadeInDown.delay(200)} style={styles.emptyTitle}>
                        No lessons available
                    </Animated.Text>
                    <Animated.Text entering={FadeInDown.delay(300)} style={styles.muted}>
                        Lessons will appear here when they are available.
                    </Animated.Text>
                </View>
            ) : (
                lessons.map((lesson, index) => {
                    const published = lesson.isPublished;
                    const title = lesson.title || `Lesson ${index + 1}`;

                    return (
                        <Animated.View
                            key={lesson._id || index}
                            entering={FadeInDown.delay(Math.min(index * 60, 300)).springify().damping(16)}
                            style={styles.row}
                        >
                            <View style={styles.number}>
                                <Text style={styles.numberText}>{index + 1}</Text>
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.title} numberOfLines={2}>
                                    {title}
                                </Text>
                                <Text
                                    style={[
                                        styles.status,
                                        { color: published ? COLORS.success : COLORS.warning },
                                    ]}
                                >
                                    {published ? "Published" : "Not published"}
                                </Text>
                            </View>

                            {lesson.videoUrl && published ? (
                                <PlayButton
                                    label={`Watch ${title}`}
                                    onPress={() => Linking.openURL(lesson.videoUrl)}
                                />
                            ) : (
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={COLORS.textMuted}
                                />
                            )}
                        </Animated.View>
                    );
                })
            )}
        </ScrollView>
    );
};

export default CourseLessonsPage;

