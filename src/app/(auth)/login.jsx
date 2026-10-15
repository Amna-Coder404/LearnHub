import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-paper";
import COLORS from "../../constants/color";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/login.style";

const Login = () => {
    const { login, error, clearError } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const submit = async () => {
        clearError();
        setShowError("");

        if (!username.trim() || !password) {
            setShowError("Username and password are required.");
            return;
        }

        try {
            setLoading(true);

            await login(username.trim(), password);

            router.push({
                pathname: "/(auth)/otp",
                params: { username: username.trim() },
            });
        } catch (err) {
            setShowError(err.message || "Unable to log in.");
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
                    {/* Logo with pulse ring */}
                    <View style={styles.logoWrap}>
                        <MotiView
                            from={{ opacity: 0.5, scale: 0.8 }}
                            animate={{ opacity: 0, scale: 1.8 }}
                            transition={{
                                type: "timing",
                                duration: 2000,
                                loop: true,
                            }}
                            style={styles.logoRing}
                        />
                        <MotiView
                            from={{ opacity: 0, scale: 0.4, rotate: "-20deg" }}
                            animate={{ opacity: 1, scale: 1, rotate: "0deg" }}
                            transition={{
                                type: "spring",
                                damping: 12,
                                delay: 100,
                            }}
                        >
                            <LinearGradient
                                colors={[
                                    COLORS.gradientStart,
                                    COLORS.gradientEnd,
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.logo}
                            >
                                <MaterialCommunityIcons
                                    name="book-open-page-variant-outline"
                                    size={40}
                                    color={COLORS.textOnPrimary}
                                />
                            </LinearGradient>
                        </MotiView>
                    </View>

                    {/* Heading */}
                    <MotiView
                        from={{ opacity: 0, translateY: 16 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: "timing",
                            duration: 500,
                            delay: 250,
                        }}
                    >
                        <Text style={styles.title}>Welcome back</Text>
                        <Text style={styles.subtitle}>
                            Sign in to continue learning with LearnHub.
                        </Text>
                    </MotiView>

                    {/* Form */}
                    <MotiView
                        from={{ opacity: 0, translateY: 24 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{
                            type: "timing",
                            duration: 600,
                            delay: 400,
                        }}
                        style={styles.form}
                    >
                        <TextInput
                            {...inputProps}
                            label="Username"
                            value={username}
                            onChangeText={(value) => {
                                setUsername(value);
                                clearError();
                                setShowError("");
                            }}
                            left={leftIcon("account-outline")}
                        />

                        <TextInput
                            {...inputProps}
                            label="Password"
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value);
                                clearError();
                                setShowError("");
                            }}
                            secureTextEntry={!showPassword}
                            left={leftIcon("lock-outline")}
                            right={
                                <TextInput.Icon
                                    icon={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    color={COLORS.textSecondary}
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            }
                        />

                        <Pressable
                            onPress={() => router.push("/forgotPassword")}
                            style={styles.forgotButton}
                        >
                            <Text style={styles.forgotLabel}>
                                Forgot password?
                            </Text>
                        </Pressable>

                        {showError || error ? (
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
                                <Text style={styles.errorText}>
                                    {showError || error}
                                </Text>
                            </MotiView>
                        ) : null}

                        <Pressable
                            onPress={submit}
                            disabled={loading}
                            style={({ pressed }) => [
                                styles.submitWrap,
                                pressed && { opacity: 0.85 },
                            ]}
                        >
                            <LinearGradient
                                colors={[
                                    COLORS.gradientStart,
                                    COLORS.gradientEnd,
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.submit}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        color={COLORS.textOnPrimary}
                                    />
                                ) : (
                                    <Text style={styles.submitLabel}>
                                        Sign In
                                    </Text>
                                )}
                            </LinearGradient>
                        </Pressable>
                    </MotiView>

                    <Text style={styles.footer}>
                        LearnHub · Learn. Grow. Succeed.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;