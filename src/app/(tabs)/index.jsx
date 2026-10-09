import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {
    const { logout } = useAuth();

    return (
        <View style={{ flex: 1, }}>
            <Text>Home</Text>
            <Button mode='contained' onPress={logout}>
                Logout
            </Button>
        </View>
    )
}

export default Home