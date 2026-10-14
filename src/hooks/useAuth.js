
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    getCurrentUser,
    loginAuth,
    logoutUser,
    updateProfileService,
    verifyOtp,
} from "../services/authServices";

export const useAuth = () => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const clearError = () => setError("");

    // Login
    const login = async (username, password) => {
        try {
            await loginAuth(username, password);
            setUsername(username);
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    };

    // Verify OTP
    const verifyotp = async (username, otp) => {
        try {
            await verifyOtp(username, otp);
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    };

    // Logout
    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log("Logout Error", error);
        } finally {
            setUsername("");
            router.replace("/(auth)/login");
        }
    };

    // Get current user
    const getMeInfo = async () => {
        clearError();

        try {
            return await getCurrentUser();
        } catch (err) {
            setError(err.message || "Failed to fetch user.");
            throw err;
        }
    };

    // Update profile
    const updateProfile = async (profileData, imageFile) => {
        clearError();

        try {
            return await updateProfileService(profileData, imageFile);
        } catch (err) {
            setError(err.message || "Failed to update profile.");
            throw err;
        }
    };

    return {
        login,
        verifyotp,
        logout,
        error,
        clearError,
        setError,
        getMeInfo,
        updateProfile,
    };
};
