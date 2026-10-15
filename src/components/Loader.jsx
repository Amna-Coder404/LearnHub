import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import COLORS from "../constants/color";

const Loader = () => {
    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../assets/animations/loader.json")}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },
    animation: {
        width: 180,
        height: 180,
    },
});