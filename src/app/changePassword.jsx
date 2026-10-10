import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { usePassword } from '../hooks/usePassword';

const ChangePassword = () => {
    const { changePassword, clearError, setError, error } = usePassword();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const router = useRouter();

    const handleChangePassword = async () => {
        clearError()
        if (oldPassword === newPassword) {
            setError("Please Type different Password");
            return;
        }

        const data = await changePassword(oldPassword, newPassword);

        if (data.success) {
            Alert.alert("Password Updated Successfully!!!");

            setTimeout(() => {
                router.back();
            }, 2000);

        }
    }

    return (
        <View style={{ flex: 1, gap: 12, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 21 }}>ChangePassword</Text>


            <TextInput
                placeholder='Old Password'
                style={{ borderWidth: 1, borderBottomColor: "black" }}
                value={oldPassword}
                onChangeText={(value) => {
                    setOldPassword(value);
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

            {error && (<Text style={{ color: "red" }}>{error}</Text>)}
            <Button mode='outlined' onPress={handleChangePassword}>
                Update
            </Button>
        </View>
    )
}

export default ChangePassword