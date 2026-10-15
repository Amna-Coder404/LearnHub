import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    TextInput as RNTextInput,
    ScrollView,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { usePassword } from "../hooks/usePassword";

import COLORS from "../constants/color";
import styles from "../styles/forgotPassword.style";

const OTP_LENGTH = 6;

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
    const [otpFocused, setOtpFocused] = useState(false);

    const otpRef = useRef(null);
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

        if (otp.length < OTP_LENGTH) {
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
        theme: { colors: { onSurfaceVariant: COLORS.textSecondary } },
        autoCapitalize: "none",
    };

    const leftIcon = (name) => (
        <TextInput.Icon
            icon={({ size, color }) => (
                <MaterialCommunityIcons name={name} size={size} color={color} />
            )}
            color={COLORS.textSecondary}
        />
    );

    const eyeIcon = (
        <TextInput.Icon
            icon={showPassword ? "eye-off-outline" : "eye-outline"}
            color={COLORS.textSecondary}
            onPress={() => setShowPassword(!showPassword)}
        />
    );

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    {/* Step indicator */}
                    <View style={styles.steps}>
                        <View style={[styles.step, styles.stepActive]} />
                        <View style={[styles.step, otpSent && styles.stepActive]} />
                    </View>

                    {/* Icon with pulse ring */}
                    <View style={styles.logoWrap}>
                        <MotiView
                            from={{ opacity: 0.5, scale: 0.8 }}
                            animate={{ opacity: 0, scale: 1.8 }}
                            transition={{ type: "timing", duration: 2000, loop: true }}
                            style={styles.logoRing}
                        />
                        <LinearGradient
                            colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.logo}
                        >
                            <MaterialCommunityIcons
                                name={otpSent ? "shield-key-outline" : "lock-reset"}
                                size={40}
                                color={COLORS.textOnPrimary}
                            />
                        </LinearGradient>
                    </View>

                    <Text style={styles.title}>
                        {otpSent ? "Reset password" : "Forgot password?"}
                    </Text>
                    <Text style={styles.subtitle}>
                        {otpSent
                            ? "Enter the code we emailed you and choose a new password."
                            : "Enter your email and we'll send you a code to reset your password."}
                    </Text>

                    {/* Form (re-animates on each step) */}
                    <MotiView
                        key={otpSent ? "step-2" : "step-1"}
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 450 }}
                        style={styles.form}
                    >
                        {!otpSent ? (
                            <TextInput
                                {...inputProps}
                                label="Email"
                                value={email}
                                onChangeText={(v) => {
                                    setEmail(v);
                                    resetMessages();
                                }}
                                keyboardType="email-address"
                                autoComplete="email"
                                left={leftIcon("email-outline")}
                            />
                        ) : (
                            <>
                                <Text style={styles.emailText}>
                                    Code sent to{" "}
                                    <Text style={styles.emailHighlight}>{email.trim()}</Text>
                                </Text>

                                {successMessage ? (
                                    <View style={styles.successRow}>
                                        <MaterialCommunityIcons
                                            name="check-circle-outline"
                                            size={18}
                                            color={COLORS.success}
                                        />
                                        <Text style={styles.successText}>{successMessage}</Text>
                                    </View>
                                ) : null}

                                {/* OTP boxes */}
                                <Pressable
                                    onPress={() => otpRef.current?.focus()}
                                    style={styles.otpRow}
                                >
                                    {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                                        const isActive =
                                            otpFocused && i === Math.min(otp.length, OTP_LENGTH - 1);
                                        return (
                                            <View
                                                key={i}
                                                style={[
                                                    styles.otpBox,
                                                    otp[i] && styles.otpBoxFilled,
                                                    isActive && styles.otpBoxActive,
                                                ]}
                                            >
                                                <Text style={styles.otpDigit}>{otp[i] || ""}</Text>
                                            </View>
                                        );
                                    })}
                                </Pressable>
                                <RNTextInput
                                    ref={otpRef}
                                    value={otp}
                                    maxLength={OTP_LENGTH}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    autoComplete="sms-otp"
                                    autoFocus
                                    onFocus={() => setOtpFocused(true)}
                                    onBlur={() => setOtpFocused(false)}
                                    onChangeText={(v) => {
                                        setOtp(v.replace(/[^0-9]/g, ""));
                                        resetMessages();
                                    }}
                                    style={styles.hiddenInput}
                                />

                                <TextInput
                                    {...inputProps}
                                    label="New password"
                                    value={newPassword}
                                    onChangeText={(v) => {
                                        setNewPassword(v);
                                        resetMessages();
                                    }}
                                    secureTextEntry={!showPassword}
                                    left={leftIcon("lock-outline")}
                                    right={eyeIcon}
                                />

                                <TextInput
                                    {...inputProps}
                                    label="Confirm password"
                                    value={confirmPassword}
                                    onChangeText={(v) => {
                                        setConfirmPassword(v);
                                        resetMessages();
                                    }}
                                    secureTextEntry={!showPassword}
                                    left={leftIcon("lock-outline")}
                                />
                            </>
                        )}

                        {localError || error ? (
                            <MotiView
                                from={{ opacity: 0, translateY: -8 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{ type: "timing", duration: 250 }}
                                style={styles.errorRow}
                            >
                                <MaterialCommunityIcons
                                    name="alert-circle-outline"
                                    size={18}
                                    color={COLORS.error}
                                />
                                <Text style={styles.errorText}>{localError || error}</Text>
                            </MotiView>
                        ) : null}

                        <Pressable
                            onPress={otpSent ? handleResetPassword : handleNext}
                            disabled={loading}
                            style={({ pressed }) => [
                                styles.submitWrap,
                                pressed && { opacity: 0.85 },
                            ]}
                        >
                            <LinearGradient
                                colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submit}
                            >
                                {loading ? (
                                    <ActivityIndicator color={COLORS.textOnPrimary} />
                                ) : (
                                    <Text style={styles.submitLabel}>
                                        {otpSent ? "Reset Password" : "Send OTP"}
                                    </Text>
                                )}
                            </LinearGradient>
                        </Pressable>

                        <Pressable
                            style={styles.linkButton}
                            onPress={() => {
                                if (otpSent) {
                                    setOtpSent(false);
                                    setSuccessMessage("");
                                    setOtp("");
                                    resetMessages();
                                } else {
                                    router.back();
                                }
                            }}
                        >
                            <Text style={styles.linkLabel}>
                                {otpSent ? "Use a different email" : "Back to login"}
                            </Text>
                        </Pressable>
                    </MotiView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPassword;