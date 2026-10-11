import { useCallback, useEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

import CourseCard from "../../components/CourseCard";
import Loader from "../../components/Loader";
import { useCourses } from "../../hooks/useCourses";

const Home = () => {
    const { courses, loading, error, fetchAllCourses, } = useCourses();

    const loadCourses = useCallback(async () => {
        try {
            await fetchAllCourses();
        } catch {
            console.log("pata nahi")
        }
    }, []);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    if (loading && courses.length === 0) {
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>My Courses</Text>
            <Text style={styles.subtitle}>
                Continue your learning journey
            </Text>

            {error ? (
                <Text style={styles.error}>{error}</Text>
            ) : null}

            <FlatList
                data={courses}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <CourseCard enrollment={item} />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={loadCourses}
                ListEmptyComponent={
                    !loading ? (
                        <Text style={styles.empty}>
                            No enrolled courses found.
                        </Text>
                    ) : null
                }
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: 24,
    },
    heading: {
        color: "#111827",
        fontSize: 25,
        fontWeight: "700",
        paddingHorizontal: 20,
    },
    subtitle: {
        color: "#6B7280",
        fontSize: 14,
        marginTop: 6,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        flexGrow: 1,
    },
    error: {
        color: "#DC2626",
        fontSize: 14,
        marginHorizontal: 20,
        marginBottom: 12,
    },
    empty: {
        color: "#6B7280",
        textAlign: "center",
        marginTop: 40,
        fontSize: 15,
    },
});