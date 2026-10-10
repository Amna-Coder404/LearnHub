import { API_URL } from "../api/api";

import { authStorage } from "../storage/authStorage";

export const getEnrolledCourses = () => {
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


export const getSingleCourse = () => {

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
