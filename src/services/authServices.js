import { API_URL } from "../api/api";

import { authStorage } from "../storage/authStorage";

// SignIn from web then login here for student portel
export const loginAuth = async (username, password, role) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
            role: 'Student'
        }),


    });


    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Login failed')
    }

    return data;
};


// Verify the opt (this opt  come oour given email)
export const verifyOtp = async (username, otp) => {

    const res = await fetch(`${API_URL}/auth/verifyotp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.trim(),
            otp: otp.trim(),
        }),
    });

    const data = await res.json();


    if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
    }
    const cookie = res.headers.get("set-cookie");
    const token = cookie?.match(/jwt-token=([^;]+)/)?.[1];


    if (!token) {
        throw new Error("JWT token not found in response cookie");
    }

    await authStorage.setToken(token);

    return data;
};

// Logout and remove token
export const logoutUser = async () => {
    const token = await authStorage.getToken();

    try {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },


        });

    } finally {
        // Always remove local token
        await authStorage.removeToken();
    }
};




// GET ME
export const getCurrentUser = async () => {
    const token = await authStorage.getToken();

    if (!token) {
        throw new Error('Please log in first.');
    }


    const res = await fetch(`${API_URL}/auth/Getme`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Cookie: `jwt-token=${token}`,
        },

    });


    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch user.');
    }
    return data.user;
};