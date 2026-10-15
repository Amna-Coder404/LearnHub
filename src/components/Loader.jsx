import { ActivityIndicator, View } from 'react-native'
import COLORS from "../constants/color"


const Loader = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} />
        </View>
    )
}

export default Loader