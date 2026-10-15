import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOutUp,
    ZoomIn,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import COLORS from "../../constants/color";
import { formatDate, formatPrice } from "../../lib/utils";


import styles from "../../styles/CoureseDetail.style";



const CourseDetailsPage = ({ course }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showTrainer, setShowTrainer] = useState(false);

    const enrollment = course?.enrollment;
    const progress = Math.min(100, Math.max(0, Number(enrollment?.progress) || 0));

    // Animated values
    const fill = useSharedValue(0);
    const chevron = useSharedValue(0);
    const [imageFailed, setImageFailed] = useState(false);
    useEffect(() => {
        fill.value = withTiming(progress, { duration: 900 });
    }, [progress]);

    useEffect(() => {
        chevron.value = withTiming(showTrainer ? 180 : 0, { duration: 250 });
    }, [showTrainer]);

    const fillStyle = useAnimatedStyle(() => ({ width: `${fill.value}%` }));
    const chevronStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${chevron.value}deg` }],
    }));

    const details = course?.course || course?.data || course;

    if (!details) {
        return (
            <View style={styles.center}>
                <Text style={styles.muted}>No course details found.</Text>
            </View>
        );
    }

    const lessons = course?.lessons || [];
    const trainer = details.trainer;
    const title = details.title || details.name || details.courseName || "Course Details";
    const description =
        details.description || details.shortDescription || "No description available.";
    const category = details.category?.name || details.category;

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.page}>
            {/* Hero */}
            <Animated.View entering={FadeIn.duration(500)}>
                {details.imageUrl && !imageFailed ? (
                    <Image
                        source={{ uri: details.imageUrl }}
                        style={styles.hero}
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <LinearGradient
                        colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.hero, styles.heroFallback]}
                    >
                        <Animated.View entering={ZoomIn.delay(200).springify()}>
                            <Ionicons name="school-outline" size={80} color={COLORS.textOnPrimary} />
                        </Animated.View>
                    </LinearGradient>
                )}
                <LinearGradient
                    colors={["transparent", COLORS.background]}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
            <View style={styles.section}>
                {/* Title + category */}
                <Animated.View entering={FadeInDown.delay(100).springify().damping(16)}>
                    {category ? (
                        <Text style={styles.category}>{String(category).toUpperCase()}</Text>
                    ) : null}
                    <Text style={styles.title}>{title}</Text>

                    <Text
                        style={styles.description}
                        numberOfLines={showFullDescription ? undefined : 4}
                    >
                        {description}
                    </Text>

                    {description.length > 150 && (
                        <Pressable onPress={() => setShowFullDescription((p) => !p)}>
                            <Text style={styles.link}>
                                {showFullDescription ? "See less" : "See more"}
                            </Text>
                        </Pressable>
                    )}
                </Animated.View>

                {/* Trainer */}
                {trainer ? (
                    <Animated.View
                        entering={FadeInDown.delay(200).springify().damping(16)}
                        style={styles.block}
                    >
                        <Pressable
                            style={styles.trainerRow}
                            onPress={() => setShowTrainer((p) => !p)}
                        >
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {(trainer.fullname || "T").charAt(0).toUpperCase()}
                                </Text>
                            </View>

                            <View style={styles.flex}>
                                <Text style={styles.muted}>Your trainer</Text>
                                <Text style={styles.trainerName}>{trainer.fullname}</Text>
                            </View>

                            <Animated.View style={chevronStyle}>
                                <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
                            </Animated.View>
                        </Pressable>

                        {showTrainer && (
                            <Animated.View
                                entering={FadeInDown.duration(250)}
                                exiting={FadeOutUp.duration(150)}
                                style={styles.trainerBody}
                            >
                                {trainer.username ? (
                                    <Text style={styles.trainerLine}>@{trainer.username}</Text>
                                ) : null}
                                {trainer.email ? (
                                    <Pressable
                                        onPress={() => Linking.openURL(`mailto:${trainer.email}`)}
                                    >
                                        <Text style={[styles.trainerLine, styles.link]}>
                                            {trainer.email}
                                        </Text>
                                    </Pressable>
                                ) : null}
                            </Animated.View>
                        )}
                    </Animated.View>
                ) : null}

                {/* Progress */}
                {enrollment ? (
                    <Animated.View
                        entering={FadeInDown.delay(300).springify().damping(16)}
                        style={styles.block}
                    >
                        <View style={styles.progressHeader}>
                            <Text style={styles.heading}>My progress</Text>
                            <Text style={styles.status}>{enrollment.status}</Text>
                        </View>

                        <View style={styles.track}>
                            <Animated.View style={[styles.fill, fillStyle]}>
                                <LinearGradient
                                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={StyleSheet.absoluteFill}
                                />
                            </Animated.View>
                        </View>
                        <Text style={styles.percent}>{progress}% completed</Text>

                        <View style={styles.stats}>
                            {[
                                ["Paid", formatPrice(enrollment.amountPaid)],
                                ["Enrolled", formatDate(enrollment.enrolledAt)],
                                ["Lessons", lessons.length],
                            ].map(([label, value], i) => (
                                <View key={label} style={[styles.stat, i > 0 && styles.statDivider]}>
                                    <Text style={styles.muted}>{label}</Text>
                                    <Text style={styles.statValue}>{value}</Text>
                                </View>
                            ))}
                        </View>
                    </Animated.View>
                ) : null}
            </View>
        </ScrollView>
    );
};

export default CourseDetailsPage;

