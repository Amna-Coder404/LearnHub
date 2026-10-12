import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { usePassword } from "../hooks/usePassword";

import COLORS from "../constants/color";
import styles from "../styles/otp.style";

const ForgotPassword = () => {
    const { forgotPasswordLogin, resetPasswordService, error, clearError } = usePassword();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [localError, setLocalError] = useState("");

    const router = useRouter();

    const resetMessages = () => {
        clearError();
        setLocalError("");
    };

    const handleNext = async () => {
        resetMessages();

        if (!email.trim()) {
            setLocalError("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);
            const success = await forgotPasswordLogin(email.trim());

            if (success) {
                setOtpSent(true);
                setSuccessMessage("Password reset OTP sent to your email.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        resetMessages();

        if (otp.length < 6) {
            setLocalError("Please enter the 6-digit OTP.");
            return;
        }
        if (newPassword.length < 8) {
            setLocalError("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const data = await resetPasswordService(
                email.trim(),
                otp,
                newPassword,
                confirmPassword
            );

            if (data?.success) {
                Alert.alert(
                    "Password Reset Successful",
                    "Please log in with your new password.",
                    [{ text: "Login", onPress: () => router.replace("/(auth)/login") }]
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const inputProps = {
        mode: "outlined",
        style: styles.input,
        outlineStyle: styles.inputOutline,
        outlineColor: COLORS.border,
        activeOutlineColor: COLORS.primary,
        textColor: COLORS.text,
    };

    const renderIcon = (name) => (
        <TextInput.Icon
            icon={({ size, color }) => (
                <MaterialCommunityIcons name={name} size={size} color={color} />
            )}
        />
    );

    return (
        <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === "ios" ? "padding" : "height"}  >
            <ScrollView contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <MaterialCommunityIcons
                            name={otpSent ? "shield-key-outline" : "lock-reset"}
                            size={38}
                            color={COLORS.textOnPrimary}
                        />
                    </View>

                    <Text style={styles.title}>
                        {otpSent ? "Reset password" : "Forgot password?"}
                    </Text>
                    <Text style={styles.subtitle}>
                        {otpSent
                            ? "Enter the code we emailed you and choose a new password."
                            : "Enter your email and we'll send you a code to reset your password."}
                    </Text>

                    <View style={styles.form}>
                        {!otpSent ? (
                            <>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    {...inputProps}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChangeText={(v) => {
                                        setEmail(v);
                                        resetMessages();
                                    }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    left={renderIcon("email-outline")}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.emailText}>
                                    Code sent to{" "}
                                    <Text style={styles.emailHighlight}>{email.trim()}</Text>
                                </Text>

                                {successMessage ? (
                                    <Text style={styles.success}>✓ {successMessage}</Text>
                                ) : null}

                                <Text style={styles.label}>OTP code</Text>
                                <TextInput
                                    {...inputProps}
                                    style={[styles.input, styles.otpInput]}
                                    placeholder="000000"
                                    value={otp}
                                    maxLength={6}
                                    keyboardType="number-pad"
                                    onChangeText={(v) => {
                                        setOtp(v.replace(/[^0-9]/g, ""));
                                        resetMessages();
                                    }}
                                />

                                <Text style={styles.label}>New password</Text>
                                <TextInput
                                    {...inputProps}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChangeText={(v) => {
                                        setNewPassword(v);
                                        resetMessages();
                                    }}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    left={renderIcon("lock-outline")}
                                    right={
                                        <TextInput.Icon
                                            icon={showPassword ? "eye-off-outline" : "eye-outline"}
                                            onPress={() => setShowPassword(!showPassword)}
                                        />
                                    }
                                />

                                <Text style={styles.label}>Confirm password</Text>
                                <TextInput
                                    {...inputProps}
                                    placeholder="Re-enter new password"
                                    value={confirmPassword}
                                    onChangeText={(v) => {
                                        setConfirmPassword(v);
                                        resetMessages();
                                    }}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    left={renderIcon("lock-outline")}
                                />
                            </>
                        )}

                        {(localError || error) ? (
                            <Text style={styles.error}>{localError || error}</Text>
                        ) : null}

                        <Button
                            mode="contained"
                            onPress={otpSent ? handleResetPassword : handleNext}
                            loading={loading}
                            disabled={loading}
                            buttonColor={COLORS.primary}
                            style={styles.submitButton}
                            contentStyle={styles.submitContent}
                            labelStyle={styles.submitLabel}
                        >
                            {otpSent ? "Reset Password" : "Send OTP"}
                        </Button>

                        <Button
                            mode="text"
                            textColor={COLORS.primary}
                            style={styles.linkButton}
                            onPress={() => {
                                if (otpSent) {
                                    setOtpSent(false);
                                    setSuccessMessage("");
                                    resetMessages();
                                } else {
                                    router.back();
                                }
                            }}
                        >
                            {otpSent ? "Use a different email" : "Back to login"}
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;