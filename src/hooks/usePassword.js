import { useRouter } from "expo-router";
import { useState } from "react";
import { changePasswordService, forgotPassword, resetPassword } from "../services/passwordServices";



export const usePassword = () => {

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();
    const clearError = () => setError(null);


    const forgotPasswordLogin = async (email) => {
        try {
            await forgotPassword(email);
            return true;
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    };

    // verify opt
    const resetPasswordService = async (email, otp, newPassword, confirmPassword) => {
        clearError();
        try {
            const data = await resetPassword(email, otp, newPassword, confirmPassword);
            return data;
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    }

    // Change Password
    const changePassword = async (oldPassword, newPassword) => {
        clearError();
        try {
            const data = await changePasswordService(oldPassword, newPassword);
            return data;
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    }

    return {
        error,
        clearError,
        setError,
        forgotPasswordLogin,
        resetPasswordService,
        changePassword
    }

}