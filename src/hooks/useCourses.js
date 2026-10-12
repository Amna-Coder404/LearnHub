import { useState } from "react";
import { getAssignmentByIdService, getEnrolledCourses, getSingleCourse, submitAssignmentService } from "../services/courseServices";

export const useCourses = () => {
    // For all enrolled Coureses
    const [courses, setCourses] = useState([]);

    // For single course
    const [course, setCourse] = useState(null);

    const [assignments, setAssignments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [assignmentsLoading, setAssignmentsLoading] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [assignmentsError, setAssignmentsError] = useState("");


    const clearError = () => setError("");

    const fetchAllCourses = async () => {
        setLoading(true);
        clearError();

        try {
            const data = await getEnrolledCourses();

            // The API returns the enrollments inside this property.
            const enrolledCourses = data?.enrollments || [];
            setCourses(enrolledCourses);

            return enrolledCourses;
        } catch (err) {
            setError(err.message || "Failed to fetch courses.");
            setCourses([]);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    // Get Single Coures
    const fetchSingleCourse = async (courseId) => {
        if (!courseId) {
            setError("Course ID is missing.");
            return;
        }
        setLoading(true);
        clearError();

        try {
            const data = await getSingleCourse(courseId);

            setCourse(data);
            return data;
        } catch (err) {
            setError(err.message || "Failed to fetch course details.");
        } finally {
            setLoading(false);
        }

    }

    // Get Assignment by Coures
    const getAssignmentById = async (courseId) => {
        if (!courseId) {
            setError("Course ID is missing.");
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
            setAssignmentsError(err.message || "Failed to fetch assignments.");
            setAssignments([]);
            throw err;
        } finally {
            setAssignmentsLoading(false);
        }

    }

    // Submit Assginment
    const submitCourseAssignment = async (
        assignmentId,
        assignmentFile,
        courseId
    ) => {
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
    };

    // 

    return {
        courses,
        course,
        assignments,

        loading,
        assignmentsLoading,

        assignmentsError,
        error,
        clearError,


        fetchAllCourses,
        fetchSingleCourse,
        getAssignmentById,


        submitCourseAssignment,
        submitting


    };
};