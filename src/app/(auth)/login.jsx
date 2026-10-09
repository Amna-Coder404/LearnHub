import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';



const Login = () => {

    const { login, error, setError, clearError } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const router = useRouter();


    const submit = async () => {
        clearError();

        if (!username.trim() || !password) {
            showError('Username and password are required.');
            return;
        }

        try {
            setLoading(true);

            await login(username.trim(), password);
            router.push({
                pathname: "/(auth)/otp",
                params: {
                    username: username.trim(),
                },
            });

        } finally {
            setLoading(false);

        }
    }

    return (
        <View style={{ flex: 1, padding: 20, gap: 5 }}>
            <TextInput
                placeholder='Enter Email'
                style={{ borderWidth: 1, borderBottomColor: "black" }}
                value={username}
                onChangeText={(value) => { serUsername(value); clearError(); }}
            />


            <TextInput
                placeholder='Enter Password'
                style={{ borderWidth: 1, borderBottomColor: "black" }}
                value={password}
                onChangeText={(value) => {
                    setPassword(value);
                    clearError();
                }}
            />
            {error && <Text>{error}</Text>}
            <Button onPress={submit}>{loading ? "loading..." : "Submit"}</Button>
        </View>
    )
}

export default Login