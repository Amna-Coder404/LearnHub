import { useRouter } from "expo-router";
import { useState } from "react";
import { getCurrentUser, loginAuth, logoutUser, verifyOtp } from "../services/authServices";



export const useAuth = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const clearError = () => setError(null);


    // Login (role by defualt service ma add ho gay ga--->Student ka)
    const login = async (username, password) => {
        try {
            await loginAuth(username, password);
            setUsername(username);
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    };

    // verify opt
    const verifyotp = async (username, otp) => {
        try {
            await verifyOtp(username, otp);
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        }
    }

    // logout 
    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log("Logout Error ", error);
        } finally {
            setUsername("");
            router.replace("/(auth)/login");
        }

    }


    // Get me
    const getMeInfo = async () => {
        clearError();
        try {
            return await getCurrentUser();
        } catch (err) {
            setError(err.message || 'Failed to fetch user.');
            throw err;
        }
    }


    return {
        login,
        verifyotp,
        logout,
        error,
        clearError,
        setError,
        getMeInfo
    }

}