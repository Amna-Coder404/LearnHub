import {
    FlatList,
    StyleSheet,
    Text,
    View
} from "react-native";
import AssignmentCard from "./AssignmentCard";

const AssignmentList = ({ assignments, loading, error, onSubmit, onView
}) => {
    if (loading) {
        return
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!assignments?.length) {
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
            keyExtractor={(item, index) => item._id || String(index)
            }
            renderItem={({ item }) => (
                <AssignmentCard
                    assignment={item}
                    onSubmit={onSubmit}
                    onView={onView}
                />
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
        paddingVertical: 20,
    },
    message: {
        marginTop: 8,
        color: "#6B7280",
        fontSize: 14,
        textAlign: "center",
    },
    error: {
        color: "#DC2626",
        fontSize: 14,
        textAlign: "center",
    },
});