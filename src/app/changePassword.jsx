import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import COLORS from "../constants/color";
import { usePassword } from "../hooks/usePassword";
import styles from "../styles/changePassword.stlye";


const ChangePassword = () => {
    const { changePassword, clearError, setError, error } = usePassword();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

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
        mode: "outlined",
        style: styles.input,
        outlineStyle: styles.inputOutline,
        outlineColor: COLORS.border,
        activeOutlineColor: COLORS.primary,
        textColor: COLORS.text,
        autoCapitalize: "none",
    };

    const lockIcon = (
        <TextInput.Icon
            icon={({ size, color }) => (
                <MaterialCommunityIcons name="lock-outline" size={size} color={color} />
            )}
        />
    );

    const eyeIcon = (visible, toggle) => (
        <TextInput.Icon
            icon={visible ? "eye-off-outline" : "eye-outline"}
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
            >
                <View style={styles.header}>
                    <View style={styles.iconBadge}>
                        <MaterialCommunityIcons
                            name="shield-lock-outline"
                            size={28}
                            color={COLORS.primary}
                        />
                    </View>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Change password</Text>
                        <Text style={styles.subtitle}>
                            Keep your account safe with a strong password.
                        </Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Old password</Text>
                    <TextInput
                        {...inputProps}
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChangeText={handleChange(setOldPassword)}
                        secureTextEntry={!showOld}
                        left={lockIcon}
                        right={eyeIcon(showOld, () => setShowOld(!showOld))}
                    />

                    <Text style={styles.label}>New password</Text>
                    <TextInput
                        {...inputProps}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChangeText={handleChange(setNewPassword)}
                        secureTextEntry={!showNew}
                        left={lockIcon}
                        right={eyeIcon(showNew, () => setShowNew(!showNew))}
                    />

                    <Text style={styles.label}>Confirm new password</Text>
                    <TextInput
                        {...inputProps}
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChangeText={handleChange(setConfirmPassword)}
                        secureTextEntry={!showNew}
                        left={lockIcon}
                    />

                    <View style={styles.hintBox}>
                        <MaterialCommunityIcons
                            name="information-outline"
                            size={18}
                            color={COLORS.info}
                        />
                        <Text style={styles.hintText}>
                            Use at least 8 characters. Mix letters, numbers and symbols
                            for a stronger password.
                        </Text>
                    </View>

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <Button
                        mode="contained"
                        onPress={handleChangePassword}
                        loading={loading}
                        disabled={loading}
                        buttonColor={COLORS.primary}
                        style={styles.submitButton}
                        contentStyle={styles.submitContent}
                        labelStyle={styles.submitLabel}
                    >
                        Update Password
                    </Button>

                    <Button
                        mode="text"
                        textColor={COLORS.textSecondary}
                        style={styles.cancelButton}
                        onPress={() => router.back()}
                    >
                        Cancel
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ChangePassword;