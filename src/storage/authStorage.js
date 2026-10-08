import AsyncStorage from "@react-native-async-storage/async-storage";


const TOKEN_KEY = 'learnhub_token';

export const authStorage = {
    async setToken() {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    },

    async getToken() {
        await AsyncStorage.getItem(TOKEN_KEY);
    },

    async removeToken() {
        await AsyncStorage.removeItem(TOKEN_KEY);
    }
}