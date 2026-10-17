
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import COLORS from '../../constants/color';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textMuted,

                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },

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
                        <View style={{ alignItems: 'center' }}>
                            {focused && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -7,
                                        width: 5,
                                        height: 5,
                                        borderRadius: 3,
                                        backgroundColor: COLORS.primary,
                                    }}
                                />
                            )}

                            <Ionicons
                                name={focused ? 'book' : 'book-outline'}
                                size={size}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={{ alignItems: 'center' }}>
                            {focused && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -7,
                                        width: 5,
                                        height: 5,
                                        borderRadius: 3,
                                        backgroundColor: COLORS.primary,
                                    }}
                                />
                            )}

                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={size}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}
