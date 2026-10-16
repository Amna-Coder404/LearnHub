import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";

import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import OfflineScreen from "../../components/Offline/OfflineScreen";
import COLORS from "../../constants/color";

import { useAuth } from "../../hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";
import useInternet from "../../hooks/useInternet";

import { getGreeting } from "../../lib/greeting";
import styles from "../../styles/home.style";

const Home = () => {
    const { isOnline } = useInternet();
    const { courses, loading, error, fetchAllCourses } = useCourses();
    const { getMeInfo } = useAuth();

    const [user, setUser] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const greeting = getGreeting();

    // Initial course load.
    const loadCourses = useCallback(async () => {
        try {
            await fetchAllCourses();
        } catch (err) {
            console.log("Failed to load courses:", err);
        }
    }, [fetchAllCourses]);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    // Load user information independently of the course list.
    useEffect(() => {
        let active = true;

        const loadUser = async () => {
            try {
                const data = await getMeInfo();

                if (active) {
                    setUser(data);
                }
            } catch (err) {
                console.log("Failed to load user:", err);
            }
        };

        loadUser();

        return () => {
            active = false;
        };
    }, [getMeInfo]);

    // Pull-to-refresh has its own indicator.
    const handleRefresh = useCallback(async () => {
        if (!isOnline || refreshing) return;

        setRefreshing(true);

        try {
            await fetchAllCourses();
        } catch (err) {
            console.log("Failed to refresh courses:", err);
        } finally {
            setRefreshing(false);
        }
    }, [fetchAllCourses, isOnline, refreshing]);

    // Show the offline screen when there is no connection.
    if (!isOnline) {
        return <OfflineScreen />;
    }

    // Full-screen loading only before the first course data arrives.
    if (loading && courses.length === 0) {
        return <Loader />;
    }

    const Header = (
        <View>
            <MotiView
                from={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "spring", damping: 15 }}
            >
                <LinearGradient
                    colors={[
                        "rgba(139,92,246,0.35)",
                        "rgba(34,211,238,0.12)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.hero}
                >
                    <View style={styles.heroTop}>
                        <View style={styles.heroIcon}>
                            <Ionicons
                                name="school"
                                size={22}
                                color={COLORS.textOnPrimary}
                            />
                        </View>

                        <View style={styles.countChip}>
                            <Ionicons
                                name="library-outline"
                                size={14}
                                color={COLORS.info}
                            />
                            <Text style={styles.countText}>
                                {courses.length}{" "}
                                {courses.length === 1 ? "course" : "courses"}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.greeting}>{greeting} 👋</Text>

                    <Text style={styles.heading}>
                        {user?.fullname || "there"}
                    </Text>

                    <Text style={styles.subtitle}>
                        Continue your learning journey
                    </Text>
                </LinearGradient>
            </MotiView>

            {error ? (
                <MotiView
                    from={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    style={styles.errorBox}
                >
                    <Ionicons
                        name="alert-circle"
                        size={18}
                        color={COLORS.error}
                    />
                    <Text style={styles.errorText}>{error}</Text>
                </MotiView>
            ) : null}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <CourseCard enrollment={item} index={index} />
                )}
                ListHeaderComponent={Header}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={COLORS.primary}
                        colors={[COLORS.primary]}
                        progressBackgroundColor={COLORS.surface}
                    />
                }
                ListEmptyComponent={
                    !loading ? (
                        <MotiView
                            from={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", damping: 14 }}
                            style={styles.emptyBox}
                        >
                            <View style={styles.emptyIcon}>
                                <Ionicons
                                    name="book-outline"
                                    size={36}
                                    color={COLORS.primary}
                                />
                            </View>

                            <Text style={styles.emptyTitle}>
                                No courses yet
                            </Text>

                            <Text style={styles.emptyText}>
                                Enrolled courses will show up here.
                                Pull down to refresh.
                            </Text>
                        </MotiView>
                    ) : null
                }
            />
        </View>
    );
};

export default Home;