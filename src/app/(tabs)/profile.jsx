import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Loader from '../../components/Loader';
import { useAuth } from '../../hooks/useAuth';


const Profile = () => {
    const { logout, error, getMeInfo } = useAuth();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const router = useRouter();

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const data = await getMeInfo();

        setUser(data);
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <View style={{ flex: 1, }}>
            <Text>Profile</Text>
            <Button mode='contained' onPress={logout}>
                Logout
            </Button>
            <Text>{user?.fullname || "NOT FOUNd"}</Text>


            <Button mode='outlined' onPress={() => router.push("/changePassword")}>
                Change Password
            </Button>

            {error && (<Text>{error}</Text>)}
        </View>
    )
}

export default Profile