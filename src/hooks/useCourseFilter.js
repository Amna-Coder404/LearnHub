import { useMemo, useState } from "react";

// Enrollment ho ya direct course, dono se category nikal leta hai
const getCategory = (item) =>
    item?.course?.category || item?.courseId?.category || item?.category || null;

export const useCourseFilter = (items = []) => {
    const [category, setCategory] = useState("All");

    const categories = useMemo(
        () => ["All", ...new Set(items.map(getCategory).filter(Boolean))],
        [items]
    );

    const filtered = useMemo(
        () =>
            category === "All"
                ? items
                : items.filter((item) => getCategory(item) === category),
        [items, category]
    );

    return { filtered, categories, category, setCategory };
};