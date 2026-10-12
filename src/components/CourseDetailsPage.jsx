import { useState } from "react";
import {
    Image,
    Linking,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { formatDate, formatPrice } from "../lib/utils";
import styles from "../styles/SingleCourse.style";

import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import COLORS from "../constants/color";

const DetailRow = ({ label, value }) => {
    if (value == null || value === "" || typeof value === "object") return null;

    return (
        <View style={styles.detailRow}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{String(value)}</Text>
        </View>
    );
};

const CourseDetailsPage = ({ course, id }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Everything is read here, after the safety check.
    const details = course?.course || course?.data || course;

    if (!details) {
        return (
            <View style={styles.center}>
                <Text>No course details found.</Text>
            </View>
        );
    }

    const enrollment = course?.enrollment;
    const lessons = course?.lessons || [];
    const progress = Math.min(100, Math.max(0, Number(enrollment?.progress) || 0));
    const trainer = details.trainer;
    const [showTrainer, setShowTrainer] = useState(false);
    const title =
        details.title || details.name || details.courseName || "Course Details";

    const description =
        details.description ||
        details.shortDescription ||
        "No description available.";

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <MotiView
                from={{ opacity: 0, translateY: 25, }}
                animate={{ opacity: 1, translateY: 0, }}
                transition={{ type: "timing", duration: 400, }}
            >
                {/* Main card */}
                <View style={styles.card}>
                    {details.imageUrl ? (
                        <Image
                            source={{ uri: details.imageUrl }}
                            style={styles.courseImage}
                            resizeMode="cover"
                        />
                    ) : null}

                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.tagRow}>
                        {details.category ? (
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>
                                    {details.category?.name || details.category}
                                </Text>
                            </View>
                        ) : null}

                        {details.price != null ? (
                            <Text style={styles.price}>
                                {formatPrice(details.price)}
                            </Text>
                        ) : null}
                    </View>

                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 4}
                    >
                        {description}
                    </Text>

                    {description.length > 150 && (
                        <Pressable
                            onPress={() => setShowFullDescription((prev) => !prev)}
                        >
                            <Text style={styles.seeMore}>
                                {showFullDescription ? "See less" : "See more"}
                            </Text>
                        </Pressable>
                    )}
                </View>
            </MotiView>
            {/* Trainer */}
            {trainer ? (
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: "timing", duration: 400, delay: 100,
                    }}
                >
                    <View style={styles.card}>
                        <Pressable
                            style={styles.trainerHeader}
                            onPress={() => setShowTrainer((prev) => !prev)}
                        >
                            <View style={styles.trainerAvatar}>
                                <Text style={styles.trainerAvatarText}>
                                    {(trainer.fullname || "T").charAt(0).toUpperCase()}
                                </Text>
                            </View>

                            <View style={styles.trainerInfo}>
                                <Text style={styles.trainerLabel}>Your Trainer</Text>
                                <Text style={styles.trainerName}>{trainer.fullname}</Text>
                            </View>

                            <View style={styles.toggleCircle}>
                                <Ionicons
                                    name={showTrainer ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color={COLORS.primary}
                                />
                            </View>
                        </Pressable>

                        {showTrainer && (
                            <View style={styles.trainerBody}>
                                {trainer.username ? (
                                    <View style={styles.trainerItem}>
                                        <Text style={styles.trainerItemLabel}>Username</Text>
                                        <Text style={styles.trainerItemValue}>
                                            @{trainer.username}
                                        </Text>
                                    </View>
                                ) : null}

                                {trainer.email ? (
                                    <Pressable
                                        style={styles.trainerItem}
                                        onPress={() => Linking.openURL(`mailto:${trainer.email}`)}
                                    >

                                        <Text style={styles.trainerItemLabel}>Email</Text>
                                        <Text style={styles.trainerEmail}>{trainer.email}</Text>
                                    </Pressable>
                                ) : null}
                            </View>
                        )}
                    </View>
                </MotiView>
            ) : null}

            {/* Enrollment */}
            {enrollment ? (
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{
                        type: "timing",
                        duration: 400,
                        delay: 200,
                    }}
                >
                    <View style={styles.card}>
                        <View style={styles.enrollHeader}>
                            <Text style={styles.enrollTitle}>My Progress</Text>

                            <View style={styles.tag}>
                                <Text style={styles.tagText}>{enrollment.status}</Text>
                            </View>
                        </View>

                        <View style={styles.progressRow}>
                            <Text style={styles.progressLabel}>Course completed</Text>
                            <Text style={styles.progressPercent}>{progress}%</Text>
                        </View>

                        <View style={styles.progressTrack}>
                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                        </View>

                        <View style={styles.statRow}>
                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Paid</Text>
                                <Text style={styles.statValue}>
                                    {formatPrice(enrollment.amountPaid)}
                                </Text>
                            </View>

                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Enrolled</Text>
                                <Text style={styles.statValue}>
                                    {formatDate(enrollment.enrolledAt)}
                                </Text>
                            </View>

                            <View style={styles.statBox}>
                                <Text style={styles.statLabel}>Lessons</Text>
                                <Text style={styles.statValue}>{lessons.length}</Text>
                            </View>
                        </View>
                    </View>
                </MotiView>
            ) : null}

            {/* Lessons */}
            <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    type: "timing",
                    duration: 400,
                    delay: 300,
                }}
            >
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Lessons ({lessons.length})</Text>

                    {lessons.length === 0 ? (
                        <Text style={styles.description}>No lessons yet.</Text>
                    ) : (
                        lessons.map((lesson, index) => (
                            <View key={lesson._id} style={styles.lessonRow}>
                                <View style={styles.lessonNumber}>
                                    <Text style={styles.lessonNumberText}>
                                        {index + 1}
                                    </Text>
                                </View>

                                <View style={styles.lessonInfo}>
                                    <Text style={styles.lessonTitle}>
                                        {lesson.title}
                                    </Text>
                                    <Text style={styles.lessonMeta}>
                                        {lesson.isPublished ? "Published" : "Draft"}
                                    </Text>
                                </View>

                                {lesson.videoUrl ? (
                                    <Pressable
                                        style={styles.watchButton}
                                        onPress={() => Linking.openURL(lesson.videoUrl)}
                                    >
                                        <Ionicons name="play" size={16} color={COLORS.textOnPrimary} />
                                        <Text style={styles.watchButtonText}>Watch</Text>
                                    </Pressable>
                                ) : null}
                            </View>
                        ))
                    )}
                </View>
            </MotiView>
        </ScrollView>
    );
};

export default CourseDetailsPage;