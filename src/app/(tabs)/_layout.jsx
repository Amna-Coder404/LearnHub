import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import COLORS from '../../constants/color'; // adjust to your COLORS path

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,
                tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopColor: COLORS.border,
                    height: 62,
                    paddingBottom: 8,
                    paddingTop: 6,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Courses',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'book' : 'book-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}