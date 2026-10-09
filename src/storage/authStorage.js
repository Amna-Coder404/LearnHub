import AsyncStorage from "@react-native-async-storage/async-storage";


const TOKEN_KEY = 'learnhub_token';

export const authStorage = {
    setToken: (token) => AsyncStorage.setItem(TOKEN_KEY, token),

    getToken: () => AsyncStorage.getItem(TOKEN_KEY),

    removeToken: () => AsyncStorage.removeItem(TOKEN_KEY),

}