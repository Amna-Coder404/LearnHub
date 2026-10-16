import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";


const useInternet = () => {
    const [isConnected, setIsConnected] = useState(true);
    const [isInternetReachable, setIsInternetReachable] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable);
        });

        return unsubscribe;
    }, []);

    const isOnline = isConnected === true && isInternetReachable !== false;

    return {
        isConnected,
        isInternetReachable,
        isOnline,
    };
}

export default useInternet;