import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Button } from "react-native-paper";
import COLORS from "../../constants/color";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/verifyOtp.style";

const OTP_LENGTH = 6;

const Otp = () => {
    const { verifyotp, error, clearError } = useAuth();
    const { username } = useLocalSearchParams();

    const [otp, setOtp] = useState("");
    const [focused, setFocused] = useState(true);
    const [loading, setLoading] = useState(false);
    const [localError, setLocalError] = useState("");

    const inputRef = useRef(null);
    const router = useRouter();

    const hasError = Boolean(localError || error);

    const handleChange = (value) => {
        setOtp(value.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH));
        clearError();
        setLocalError("");
    };

    const submit = async () => {
        clearError();
        setLocalError("");

        if (otp.length < OTP_LENGTH) {
            setLocalError("Please enter the 6-digit OTP.");
            return;
        }

        try {
            setLoading(true);
            await verifyotp(username, otp);
            router.replace("/(tabs)");
        } catch (err) {
            setLocalError(err.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Verify your identity</Text>
                    <Text style={styles.subtitle}>
                        Enter the 6-digit code sent for{" "}
                        <Text style={styles.username}>{username}</Text>.
                    </Text>

                    {/* Six boxes, tap anywhere to focus the hidden input */}
                    <Pressable
                        style={styles.otpRow}
                        onPress={() => inputRef.current?.focus()}
                    >
                        {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                            const isActive =
                                focused && i === Math.min(otp.length, OTP_LENGTH - 1);

                            return (
                                <View
                                    key={i}
                                    style={[
                                        styles.otpBox,
                                        isActive && styles.otpBoxActive,
                                        hasError && styles.otpBoxError,
                                    ]}
                                >
                                    <Text style={styles.otpDigit}>{otp[i] ?? ""}</Text>
                                </View>
                            );
                        })}

                        <TextInput
                            ref={inputRef}
                            value={otp}
                            onChangeText={handleChange}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            keyboardType="number-pad"
                            maxLength={OTP_LENGTH}
                            autoFocus
                            textContentType="oneTimeCode"
                            autoComplete="sms-otp"
                            caretHidden
                            style={styles.hiddenInput}
                        />
                    </Pressable>

                    {hasError ? (
                        <Text style={styles.error}>{localError || error}</Text>
                    ) : null}

                    <Button
                        mode="contained"
                        onPress={submit}
                        loading={loading}
                        disabled={loading}
                        buttonColor={COLORS.accent}
                        style={styles.submitButton}
                        contentStyle={styles.submitContent}
                        labelStyle={styles.submitLabel}
                    >
                        Verify
                    </Button>

                    <Button
                        mode="text"
                        textColor={COLORS.textSecondary}
                        style={styles.linkButton}
                        onPress={() => router.back()}
                    >
                        Back to login
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Otp;