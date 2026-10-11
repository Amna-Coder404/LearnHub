import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import AssignmentCard from "./AssignmentCard";

const AssignmentList = ({ assignments, loading, error, onSubmit, }) => {


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#7C3AED" />
                <Text style={styles.message}>Loading assignments...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!assignments.length) {
        return (
            <View style={styles.center}>
                <Text style={styles.message}>
                    No assignments available for this course.
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            data={assignments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <AssignmentCard assignment={item} onSubmit={onSubmit} />
            )}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default AssignmentList;

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    message: {
        color: "#6B7280",
        fontSize: 14,
        textAlign: "center",
        marginTop: 8,
    },
    error: {
        color: "#DC2626",
        fontSize: 14,
        textAlign: "center",
    },
});