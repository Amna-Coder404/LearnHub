import { ScrollView, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

import COLORS from "../constants/color";

export default function CourseFilterBar({
    categories,
    category,
    onCategoryChange,
}) {
    if (categories.length <= 2) return null; // 1 hi category ho to filter ki zaroorat nahi

    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
        >
            {categories.map((cat) => {
                const active = category === cat;

                return (
                    <Chip
                        key={cat}
                        selected={active}
                        showSelectedCheck={false}
                        onPress={() => onCategoryChange(cat)}
                        style={[styles.chip, active && styles.chipActive]}
                        textStyle={[styles.text, active && styles.textActive]}
                        rippleColor={COLORS.primaryLight}
                    >
                        {cat}
                    </Chip>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        paddingVertical: 14,
        paddingRight: 8,
    },
    chip: {
        marginRight: 8,
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
    },
    chipActive: {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primary,
    },
    text: {
        color: COLORS.textSecondary,
        fontWeight: "600",
    },
    textActive: {
        color: COLORS.textOnPrimary,
    },
});