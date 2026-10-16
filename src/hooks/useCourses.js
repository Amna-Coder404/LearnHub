import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useRef, useState } from "react";

import {
    getAssignmentByIdService,
    getEnrolledCourses,
    getSingleCourse,
    submitAssignmentService,
} from "../services/courseServices";

const COURSES_CACHE_KEY = "learnhub_enrolled_courses";

export const useCourses = () => {
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState(null);
    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [courseLoading, setCourseLoading] = useState(false);
    const [assignmentsLoading, setAssignmentsLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [assignmentsError, setAssignmentsError] = useState("");

    const coursesLoaded = useRef(false);
    const coursesRequest = useRef(null);

    const clearError = useCallback(() => {
        setError("");
    }, []);

    // Fetch enrolled courses and use cached data when available.
    const fetchAllCourses = useCallback(async ({ forceRefresh = false } = {}) => {
        // Reuse an active request instead of sending duplicate API calls.
        if (coursesRequest.current) {
            return coursesRequest.current;
        }

        const request = (async () => {
            let hasCachedCourses = coursesLoaded.current;

            setError("");

            try {
                if (!coursesLoaded.current) {
                    try {
                        const cached = await AsyncStorage.getItem(COURSES_CACHE_KEY);

                        if (cached !== null) {
                            const parsed = JSON.parse(cached);

                            if (Array.isArray(parsed)) {
                                setCourses(parsed);
                                coursesLoaded.current = true;
                                hasCachedCourses = true;
                            }
                        }
                    } catch (cacheError) {
                        console.log("COURSES CACHE READ ERROR:", cacheError);
                    }
                }

                // Show full-screen loading only when no data is available.
                if (!hasCachedCourses) {
                    setLoading(true);
                }

                const data = await getEnrolledCourses();
                const enrolledCourses = Array.isArray(data?.enrollments)
                    ? data.enrollments
                    : [];

                setCourses(enrolledCourses);
                coursesLoaded.current = true;

                // Save the latest successful response for the next visit.
                try {
                    await AsyncStorage.setItem(
                        COURSES_CACHE_KEY,
                        JSON.stringify(enrolledCourses)
                    );
                } catch (cacheError) {
                    console.log("COURSES CACHE SAVE ERROR:", cacheError);
                }

                return enrolledCourses;
            } catch (err) {
                setError(err.message || "Failed to fetch courses.");

                // Keep cached/current courses visible if the request fails.
                if (!hasCachedCourses) {
                    throw err;
                }

                return courses;
            } finally {
                setLoading(false);
            }
        })();

        coursesRequest.current = request;

        try {
            return await request;
        } finally {
            coursesRequest.current = null;
        }
    }, [courses]);

    // Fetch a single course.
    const fetchSingleCourse = useCallback(async (courseId) => {
        if (!courseId) {
            setError("Course ID is missing.");
            return;
        }

        setError("");
        setCourseLoading(true);

        try {
            const data = await getSingleCourse(courseId);
            setCourse(data);
            return data;
        } catch (err) {
            setError(err.message || "Failed to fetch course details.");
            throw err;
        } finally {
            setCourseLoading(false);
        }
    }, []);

    // Fetch assignments without clearing the existing list on refresh.
    const getAssignmentById = useCallback(async (courseId) => {
        if (!courseId) {
            setAssignmentsError("Course ID is missing.");
            return;
        }

        setAssignmentsLoading(true);
        setAssignmentsError("");

        try {
            const data = await getAssignmentByIdService(courseId);

            const list =
                data?.assignments ??
                data?.course?.assignments ??
                data?.data?.assignments ??
                [];

            setAssignments(Array.isArray(list) ? list : []);
            return data;
        } catch (err) {
            setAssignmentsError(
                err.message || "Failed to fetch assignments."
            );
            throw err;
        } finally {
            setAssignmentsLoading(false);
        }
    }, []);

    // Submit an assignment, then refresh its list.
    const submitCourseAssignment = useCallback(
        async (assignmentId, assignmentFile, courseId) => {
            setSubmitting(true);
            setAssignmentsError("");

            try {
                const data = await submitAssignmentService(
                    assignmentId,
                    assignmentFile
                );

                await getAssignmentById(courseId);
                return data;
            } catch (err) {
                setAssignmentsError(
                    err.message || "Failed to submit assignment."
                );
                throw err;
            } finally {
                setSubmitting(false);
            }
        },
        [getAssignmentById]
    );

    return {
        courses,
        course,
        assignments,

        loading,
        courseLoading,
        assignmentsLoading,
        submitting,

        error,
        assignmentsError,
        clearError,

        fetchAllCourses,
        fetchSingleCourse,
        getAssignmentById,
        submitCourseAssignment,
    };
};