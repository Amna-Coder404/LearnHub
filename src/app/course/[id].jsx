import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import CourseAssignmentsPage from "../../components/CourseAssignmentsPage";
import CourseDetailsPage from "../../components/CourseDetailsPage";
import Loader from "../../components/Loader";
import COLORS from "../../constants/color";
import { useCourses } from "../../hooks/useCourses";
import styles from "../../styles/SingleCourse.style";


const TABS = ["Details", "Assignments"];

const SingleCourse = () => {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const pagerRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);

    const { course, loading, error, fetchSingleCourse } = useCourses();

    useEffect(() => {
        if (typeof id !== "string") return;
        fetchSingleCourse(id);
    }, [id]);

    const handleSwipeEnd = (e) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setActiveTab(index);
    };

    const goToTab = (index) => {
        pagerRef.current?.scrollTo({ x: index * width, animated: true });
        setActiveTab(index);
    };

    const router = useRouter();

    if (loading && !course) return <Loader />;

    if (error && !course) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!course) {
        return (
            <View style={styles.center}>
                <Text>No course details found.</Text>

            </View>
        );
    }

    return (
        <View style={styles.container}>

            {/* Top header with back button */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
                </TouchableOpacity>

                <Text style={styles.headerTitle} numberOfLines={1}>
                    {course?.course?.name || course?.name || "Course"}
                </Text>

                {/* Empty space so the title stays centered */}
                <View style={styles.headerSpace} />
            </View>


            <View style={styles.tabBar}>
                {TABS.map((tab, index) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === index && styles.tabActive]}
                        onPress={() => goToTab(index)}
                    >
                        <Text
                            style={[styles.tabText,
                            activeTab === index && styles.tabTextActive,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Swipeable pages */}
            <ScrollView
                ref={pagerRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleSwipeEnd}
                style={styles.pager}
            >
                <View style={{ width }}>
                    <CourseDetailsPage course={course} id={id} />
                </View>

                <View style={{ width }}>
                    <CourseAssignmentsPage courseId={id} />
                </View>
            </ScrollView>
        </View>
    );
};

export default SingleCourse;