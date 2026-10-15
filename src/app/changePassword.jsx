import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { TextInput } from "react-native-paper";
import COLORS from "../constants/color";
import { usePassword } from "../hooks/usePassword";
import styles from "../styles/changePassword.stlye";

const STRENGTH_COLORS = [
    COLORS.border,
    COLORS.error,
    COLORS.warning,
    COLORS.info,
    COLORS.success,
];
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

const ChangePassword = () => {
    const { changePassword, clearError, setError, error } = usePassword();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const rules = [
        { label: "8+ characters", ok: newPassword.length >= 8 },
        { label: "A number", ok: /\d/.test(newPassword) },
        { label: "An uppercase letter", ok: /[A-Z]/.test(newPassword) },
        { label: "A symbol", ok: /[^A-Za-z0-9]/.test(newPassword) },
    ];
    const score = rules.filter((r) => r.ok).length;

    const handleChange = (setter) => (value) => {
        setter(value);
        clearError();
    };

    const handleChangePassword = async () => {
        clearError();

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }
        if (oldPassword === newPassword) {
            setError("New password must be different from the old one.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);
            const data = await changePassword(oldPassword, newPassword);

            if (data?.success) {
                Alert.alert(
                    "Password Updated",
                    "Your password has been changed successfully.",
                    [{ text: "OK", onPress: () => router.back() }]
                );
            }
        } catch (err) {
            setError(err.message || "Unable to update password.");
        } finally {
            setLoading(false);
        }
    };

    const inputProps = {
        mode: "flat",
        style: styles.input,
        underlineColor: COLORS.border,
        activeUnderlineColor: COLORS.primary,
        textColor: COLORS.text,
        placeholderTextColor: COLORS.placeholder,
        theme: { colors: { onSurfaceVariant: COLORS.textSecondary } },
        autoCapitalize: "none",
    };

    const eyeIcon = (visible, toggle) => (
        <TextInput.Icon
            icon={visible ? "eye-off-outline" : "eye-outline"}
            color={COLORS.textSecondary}
            onPress={toggle}
        />
    );

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <MotiView
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 500 }}
                    style={styles.header}
                >
                    <View style={styles.badgeWrap}>
                        <MotiView
                            from={{ opacity: 0.5, scale: 0.8 }}
                            animate={{ opacity: 0, scale: 1.7 }}
                            transition={{
                                type: "timing",
                                duration: 1800,
                                loop: true,
                            }}
                            style={styles.badgeRing}
                        />
                        <View style={styles.iconBadge}>
                            <MaterialCommunityIcons
                                name="shield-lock-outline"
                                size={36}
                                color={COLORS.primary}
                            />
                        </View>
                    </View>
                    <Text style={styles.title}>Change password</Text>
                    <Text style={styles.subtitle}>
                        Keep your account safe with a strong password.
                    </Text>
                </MotiView>

                {/* Inputs */}
                <MotiView
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 500, delay: 150 }}
                    style={styles.form}
                >
                    <TextInput
                        {...inputProps}
                        label="Old password"
                        value={oldPassword}
                        onChangeText={handleChange(setOldPassword)}
                        secureTextEntry={!showOld}
                        right={eyeIcon(showOld, () => setShowOld(!showOld))}
                    />

                    <TextInput
                        {...inputProps}
                        label="New password"
                        value={newPassword}
                        onChangeText={handleChange(setNewPassword)}
                        secureTextEntry={!showNew}
                        right={eyeIcon(showNew, () => setShowNew(!showNew))}
                    />

                    {/* Strength meter */}
                    {newPassword.length > 0 && (
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.strengthWrap}
                        >
                            <View style={styles.strengthBars}>
                                {[1, 2, 3, 4].map((i) => (
                                    <View
                                        key={i}
                                        style={[
                                            styles.strengthBar,
                                            {
                                                backgroundColor:
                                                    i <= score
                                                        ? STRENGTH_COLORS[score]
                                                        : COLORS.border,
                                            },
                                        ]}
                                    />
                                ))}
                            </View>
                            <Text
                                style={[
                                    styles.strengthLabel,
                                    { color: STRENGTH_COLORS[score] },
                                ]}
                            >
                                {STRENGTH_LABELS[score]}
                            </Text>
                        </MotiView>
                    )}

                    <TextInput
                        {...inputProps}
                        label="Confirm new password"
                        value={confirmPassword}
                        onChangeText={handleChange(setConfirmPassword)}
                        secureTextEntry={!showNew}
                        right={eyeIcon(showNew, () => setShowNew(!showNew))}
                    />
                </MotiView>

                {/* Requirements */}
                <MotiView
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 500, delay: 300 }}
                    style={styles.rules}
                >
                    {rules.map((rule) => (
                        <View key={rule.label} style={styles.ruleItem}>
                            <MaterialCommunityIcons
                                name={
                                    rule.ok
                                        ? "check-circle"
                                        : "circle-outline"
                                }
                                size={16}
                                color={
                                    rule.ok ? COLORS.success : COLORS.textMuted
                                }
                            />
                            <Text
                                style={[
                                    styles.ruleText,
                                    rule.ok && { color: COLORS.text },
                                ]}
                            >
                                {rule.label}
                            </Text>
                        </View>
                    ))}
                </MotiView>

                {/* Error */}
                {error ? (
                    <View style={styles.errorRow}>
                        <MaterialCommunityIcons
                            name="alert-circle-outline"
                            size={18}
                            color={COLORS.error}
                        />
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Buttons */}
                <MotiView
                    from={{ opacity: 0, translateY: 16 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: "timing", duration: 500, delay: 450 }}
                >
                    <Pressable
                        onPress={handleChangePassword}
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
                                <ActivityIndicator
                                    color={COLORS.textOnPrimary}
                                />
                            ) : (
                                <Text style={styles.submitLabel}>
                                    Update Password
                                </Text>
                            )}
                        </LinearGradient>
                    </Pressable>

                    <Pressable
                        onPress={() => router.back()}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelLabel}>Cancel</Text>
                    </Pressable>
                </MotiView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ChangePassword;