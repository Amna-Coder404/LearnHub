import * as FileSystem from "expo-file-system/legacy";
import { API_URL } from "../api/api";
import { authStorage } from "../storage/authStorage";



export const getEnrolledCourses = async () => {
    const token = await authStorage.getToken();

    if (!token) {
        throw new Error("Please log in first.");
    }


    const res = await fetch(`${API_URL}/student/my-courses`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Cookie: `jwt-token=${token}`,
        },
    })
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch enrolled courses.");
    }

    return data
}


// Get Single Course
export const getSingleCourse = async (courseId) => {

    const token = await authStorage.getToken();

    if (!token) {
        throw new Error("Please log in first.");
    }


    const res = await fetch(`${API_URL}/student/my-courses/${courseId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Cookie: `jwt-token=${token}`,
        },
    })

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch enrolled courses.");
    }

    return data
}


// Get AssignMent with coures
export const getAssignmentByIdService = async (courseId) => {
    const token = await authStorage.getToken();

    if (!token) {
        throw new Error("Please log in first.");
    }


    const res = await fetch(`${API_URL}/student/course/${courseId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Cookie: `jwt-token=${token}`,
        },
    })

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch assignment of the  course.");
    }

    return data
}





// Submit Assignment

export const submitAssignmentService = async (
    assignmentId,
    assignmentFile
) => {
    try {
        const token = await authStorage.getToken();

        if (!token) {
            throw new Error("Please log in first.");
        }

        if (!assignmentId) {
            throw new Error("Assignment ID is missing.");
        }

        if (!assignmentFile?.uri) {
            throw new Error("Please select your assignment PDF.");
        }

        // Normalize the API URL to prevent malformed paths.
        const baseUrl = API_URL
            .replace(/\s/g, "")
            .replace(/\/+$/, "");

        const requestUrl =
            `${baseUrl}/student/${assignmentId}/submit`;

        // Confirm the local PDF exists before uploading.
        const fileInfo = await FileSystem.getInfoAsync(
            assignmentFile.uri
        );

        if (!fileInfo.exists || !fileInfo.size) {
            throw new Error(
                "PDF is missing or empty. Please select it again."
            );
        }

        const response = await FileSystem.uploadAsync(
            requestUrl,
            assignmentFile.uri,
            {
                httpMethod: "POST",
                uploadType:
                    FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: "answer",
                mimeType: "application/pdf",
                parameters: {},
                headers: {
                    Accept: "application/json",
                    Cookie: `jwt-token=${token}`,
                },
            }
        );

        let data;

        try {
            data = JSON.parse(response.body || "{}");
        } catch {
            data = {
                message:
                    response.body || "Unexpected server response.",
            };
        }

        if (response.status < 200 || response.status >= 300) {
            throw new Error(
                data.message ||
                `Assignment submission failed (${response.status}).`
            );
        }

        return data;
    } catch (error) {
        throw new Error(
            error.message || "Unable to submit the assignment."
        );
    }
};




// Show result assignment

export const resultAssginment = async (assginmentId) => {
    const token = await authStorage.getToken();

    if (!token) {
        throw new Error("Please log in first.");
    }


    const res = await fetch(`${API_URL} /student/${assginmentId}/result`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Cookie: `jwt-token=${token}`,
        },
    })

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch assignment of the  course.");
    }

    return data
}