import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/auth.style";

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

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    {/* Animated Logo */}
                    <MotiView
                        from={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            damping: 12,
                            delay: 100,
                        }}
                        style={styles.logo}
                    >
                        <Text style={styles.logoText}>L</Text>
                    </MotiView>

                    {/* Animated Heading */}
                    <MotiView
                        from={{
                            opacity: 0,
                            translateY: 20,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }}
                        transition={{
                            type: "timing",
                            duration: 500,
                            delay: 200,
                        }}
                    >
                        <Text style={styles.title}>Welcome back</Text>

                        <Text style={styles.subtitle}>
                            Sign in to continue learning with LearnHub.
                        </Text>
                    </MotiView>

                    {/* Animated Login Form */}
                    <MotiView
                        from={{
                            opacity: 0,
                            translateY: 30,
                        }}
                        animate={{
                            opacity: 1,
                            translateY: 0,
                        }}
                        transition={{
                            type: "timing",
                            duration: 600,
                            delay: 350,
                        }}
                        style={styles.form}
                    >
                        <Text style={styles.label}>Username</Text>

                        <TextInput
                            mode="outlined"
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={(value) => {
                                setUsername(value);
                                clearError();
                                setShowError("");
                            }}
                            autoCapitalize="none"
                            style={styles.input}
                            outlineStyle={styles.inputOutline}
                            activeOutlineColor="#2563EB"
                            left={
                                <TextInput.Icon
                                    icon={({ size, color }) => (
                                        <MaterialCommunityIcons
                                            name="account-outline"
                                            size={size}
                                            color={color}
                                        />
                                    )}
                                />
                            }
                        />

                        <Text style={styles.label}>Password</Text>

                        <TextInput
                            mode="outlined"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value);
                                clearError();
                                setShowError("");
                            }}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            style={styles.input}
                            outlineStyle={styles.inputOutline}
                            activeOutlineColor="#2563EB"
                            left={
                                <TextInput.Icon
                                    icon={({ size, color }) => (
                                        <MaterialCommunityIcons
                                            name="lock-outline"
                                            size={size}
                                            color={color}
                                        />
                                    )}
                                />
                            }
                            right={
                                <TextInput.Icon
                                    icon={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    onPress={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            }
                        />

                        <Button
                            mode="text"
                            onPress={() => router.push("/forgotPassword")}
                            textColor="#2563EB"
                            style={styles.forgotButton}
                            contentStyle={styles.forgotContent}
                        >
                            Forgot password?
                        </Button>

                        {(showError || error) ? (
                            <MotiView
                                from={{
                                    opacity: 0, translateY: -8,
                                }}
                                animate={{
                                    opacity: 1,
                                    translateY: 0,
                                }}
                                transition={{
                                    type: "timing",
                                    duration: 250,
                                }}
                            >
                                <Text style={styles.error}>
                                    {showError || error}
                                </Text>
                            </MotiView>
                        ) : null}

                        <Button
                            mode="contained"
                            onPress={submit}
                            loading={loading}
                            disabled={loading}
                            buttonColor="#2563EB"
                            style={styles.submitButton}
                            contentStyle={styles.submitContent}
                            labelStyle={styles.submitLabel}
                        >
                            Sign In
                        </Button>

                        <Text style={styles.footer}>
                            LearnHub · Learn. Grow. Succeed.
                        </Text>
                    </MotiView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;