// Forget password

import { API_URL } from "../api/api";
import { authStorage } from "../storage/authStorage";

export const forgotPassword = async (email) => {

    const res = await fetch(`${API_URL}/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const text = await res.text();


    let data;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Server returned HTML (status ${res.status})`);
    }

    if (!res.ok) throw new Error(data.message || "Failed to send OTP");
    return data;
};


// Reset Password
export const resetPassword = async (email, otp, newPassword, confirmPassword) => {

    const res = await fetch(`${API_URL}/auth/resetPassword`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            otp,
            newPassword,
            confirmPassword
        }),
    });

    const text = await res.text();


    let data;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Server returned HTML (status ${res.status})`);
    }

    if (!res.ok) throw new Error(data.message || "Failed to reset password");
    return data;
};


// Change Password (Already Login requived)
export const changePasswordService = async (oldPassword, newPassword) => {
    const token = await authStorage.getToken();


    const res = await fetch(`${API_URL}/auth/updatePassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
            oldPassword,
            newPassword
        }),
    });


    const text = await res.text();


    let data;
    try {
        data = JSON.parse(text);
    } catch {
        throw new Error(`Server returned HTML (status ${res.status})`);
    }

    if (!res.ok) throw new Error(data.message || "Failed to reset password");
    return data;
}