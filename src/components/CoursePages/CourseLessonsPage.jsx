
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import COLORS from "../../constants/color";
import styles from "../../styles/CourseLessons.style";

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
            <View style={styles.headingRow}>
                <View>
                    <Text style={styles.heading}>Course Lessons</Text>
                    <Text style={styles.subtitle}>
                        Continue learning at your own pace.
                    </Text>
                </View>

                <View style={styles.countBadge}>
                    <Text style={styles.countText}>
                        {lessons.length}
                    </Text>
                </View>
            </View>

            {lessons.length === 0 ? (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIcon}>
                        <Ionicons
                            name="book-outline"
                            size={32}
                            color={COLORS.primary}
                        />
                    </View>

                    <Text style={styles.emptyTitle}>
                        No lessons available
                    </Text>

                    <Text style={styles.emptyDescription}>
                        Lessons for this course will appear here when
                        they are available.
                    </Text>
                </View>
            ) : (
                lessons.map((lesson, index) => {
                    const published = lesson.isPublished;

                    return (
                        <MotiView
                            key={lesson._id || index}
                            from={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{
                                type: "timing",
                                duration: 250,
                                delay: Math.min(index * 50, 250),
                            }}
                            style={styles.lessonRow}
                        >
                            <View style={styles.lessonIcon}>
                                <Ionicons
                                    name={
                                        lesson.videoUrl
                                            ? "play"
                                            : "document-text-outline"
                                    }
                                    size={21}
                                    color={COLORS.primary}
                                />
                            </View>

                            <View style={styles.lessonInfo}>
                                <Text style={styles.lessonNumber}>
                                    LESSON {index + 1}
                                </Text>

                                <Text style={styles.lessonTitle}>
                                    {lesson.title || `Lesson ${index + 1}`}
                                </Text>

                                <View style={styles.statusRow}>
                                    <View
                                        style={[
                                            styles.statusDot,
                                            published
                                                ? styles.publishedDot
                                                : styles.draftDot,
                                        ]}
                                    />

                                    <Text style={styles.lessonStatus}>
                                        {published
                                            ? "Published"
                                            : "Not published"}
                                    </Text>
                                </View>
                            </View>

                            {lesson.videoUrl && published ? (
                                <Pressable
                                    style={styles.watchButton}
                                    onPress={() =>
                                        Linking.openURL(lesson.videoUrl)
                                    }
                                    accessibilityRole="button"
                                    accessibilityLabel={`Watch ${lesson.title || `lesson ${index + 1}`}`}
                                >
                                    <Ionicons
                                        name="play"
                                        size={15}
                                        color={COLORS.textOnPrimary}
                                    />
                                </Pressable>
                            ) : (
                                <View style={styles.lockIcon}>
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={17}
                                        color={COLORS.textMuted}
                                    />
                                </View>
                            )}
                        </MotiView>
                    );
                })
            )}
        </ScrollView>
    );
};

export default CourseLessonsPage;
