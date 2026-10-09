import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';

const Otp = () => {

    const { verifyotp, error, clearError } = useAuth();

    const { username } = useLocalSearchParams();
    const [otp, setOtp] = useState("");

    const router = useRouter();


    const submit = async () => {

        try {

            await verifyotp(username, otp);
            //OTP screen → Tabs
            router.replace("/(tabs)");
        } catch (error) {
            console.log("LOGIN ERROR", error);
        }
    }
    return (
        <View>
            <Text>Otp Screen</Text>

            <TextInput
                placeholder="Enter OTP"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
                style={{ borderWidth: 1, borderColor: "black", padding: 10, }}
            />
            {error && (
                <Text style={{ color: "red" }}>{error}</Text>
            )}

            <Button onPress={submit}>Submit</Button>
        </View>
    )
}

export default Otp