import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { usePassword } from '../hooks/usePassword';

const ForgotPassoword = () => {
    const { forgotPasswordLogin, resetPasswordService, error, clearError } = usePassword();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");


    const router = useRouter();

    const handleNext = async () => {
        if (!email) {
            console.log("Email Required!");
            return
        }
        setLoading(true);
        try {
            const success = await forgotPasswordLogin(email.trim());

            if (success) {
                setOtpSent(true);
                setSuccessMessage(
                    'Password reset OTP sent to your email.'
                );
            }
        } finally {
            setLoading(false);
        }

    }
    // Reset Password
    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            console.log("!");
            return
        }
        setLoading(true);

        try {
            const data = await resetPasswordService(email.trim(), otp, newPassword, confirmPassword);

            if (data.success) {
                Alert.alert(
                    'Password Reset Successful',
                    'Password reset successful. Please login again.'
                );

                setTimeout(() => {
                    router.replace('/(auth)/login');
                }, 2000);


            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {!otpSent ? (
                <>
                    <TextInput
                        placeholder='Enter email'
                        style={{ borderWidth: 1, borderBottomColor: "black" }}
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            clearError();
                        }}
                    />
                    <Button mode='contained' style={{ width: 300 }} onPress={handleNext}>
                        {loading ? "loading..." : "Sent OTP"}
                    </Button>
                    {error && (<Text>{error}</Text>)}</>
            ) : (
                <>
                    <Text style={{ fontSize: 16, color: "black" }}>
                        OTP sent to: {email}
                    </Text>
                    {successMessage ? (
                        <Text
                            style={{
                                color: 'green',
                                backgroundColor: '#E8F5E9',
                                padding: 12,
                                borderRadius: 8,
                            }}
                        >
                            ✓ {successMessage}
                        </Text>
                    ) : null}

                    <TextInput
                        placeholder='OTP'
                        style={{ borderWidth: 1, borderBottomColor: "black" }}
                        value={otp}
                        maxLength={6}
                        onChangeText={(value) => {
                            setOtp(value);
                            clearError();
                        }}
                    />

                    <TextInput
                        placeholder='New Password'
                        style={{ borderWidth: 1, borderBottomColor: "black" }}
                        value={newPassword}
                        onChangeText={(value) => {
                            setNewPassword(value);
                            clearError();
                        }}
                    />


                    <TextInput
                        placeholder='Confirm Password'
                        style={{ borderWidth: 1, borderBottomColor: "black" }}
                        value={confirmPassword}
                        onChangeText={(value) => {
                            setConfirmPassword(value);
                            clearError();
                        }}
                    />

                    <Button mode='contained' style={{ width: 300 }} onPress={handleResetPassword}>
                        Next
                    </Button>
                    {error && (<Text>{error}</Text>)}</>
            )}

        </View>
    )
}

export default ForgotPassoword