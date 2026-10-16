import { ActivityIndicator, View } from 'react-native'
import COLORS from '../constants/color'

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.background }}>
            <ActivityIndicator size={"large"} color={COLORS.gradientEnd} />
        </View>
    )
}

export default Loader