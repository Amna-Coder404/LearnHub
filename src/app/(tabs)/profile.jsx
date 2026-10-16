import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { MotiView } from 'moti'
import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EditProfileModal from '../../components/EditProfileModel'
import Loader from '../../components/Loader'
import COLORS from '../../constants/color'; // adjust path
import { useAuth } from '../../hooks/useAuth'
import styles from '../../styles/profile.style'

import OfflineScreen from "../../components/Offline/OfflineScreen"
import useInternet from "../../hooks/useInternet"


const Row = ({ icon, label, value, index, onPress, danger, chevron }) => {
    const Wrapper = onPress ? Pressable : View

    return (
        <MotiView
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 350, delay: 300 + index * 70 }}
        >
            <Wrapper onPress={onPress} style={styles.row}>
                <Ionicons
                    name={icon}
                    size={22}
                    color={danger ? COLORS.error : COLORS.primary}
                    style={styles.rowIcon}
                />
                <View style={styles.rowText}>
                    <Text style={[styles.rowLabel, danger && { color: COLORS.error, fontSize: 16, fontWeight: '600' }]}>
                        {label}
                    </Text>
                    {value !== undefined && (
                        <Text style={styles.rowValue}>{value || 'Not added yet'}</Text>
                    )}
                </View>
                {chevron && <Ionicons name="chevron-forward" size={20} color={COLORS.textMuted} />}
            </Wrapper>
            <View style={styles.divider} />
        </MotiView>
    )
}

const Profile = () => {
    const { logout, error, getMeInfo } = useAuth();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [editVisible, setEditVisible] = useState(false);
    const { isOnline } = useInternet();
    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const data = await getMeInfo();
        setUser(data);
        setLoading(false);
    }
    if (!isOnline) {
        return <OfflineScreen />;
    }

    if (loading) return <Loader />

    const initials = (user?.fullname || '?')
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Hero */}
                <View style={[styles.hero, { paddingTop: insets.top + 12 }]}>
                    <View style={styles.heroTop}>
                        <Text style={styles.heroTitle} />
                        <Pressable onPress={() => setEditVisible(true)} hitSlop={10} style={styles.editIcon}>
                            <Ionicons name="create-outline" size={22} color={COLORS.textOnPrimary} />
                        </Pressable>
                    </View>
                </View>

                {/* Avatar + name */}
                <MotiView
                    from={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', delay: 100 }}
                    style={styles.identity}
                >
                    {user?.imageUrl ? (
                        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
                    ) : (
                        <View style={[styles.avatar, styles.avatarFallback]}>
                            <Text style={styles.avatarText}>{initials}</Text>
                        </View>
                    )}

                    <Text style={styles.name}>{user?.fullname || 'NOT FOUND'}</Text>
                    <Text style={styles.username}>
                        @{user?.username} · {user?.role}
                    </Text>
                    {!!user?.bio && <Text style={styles.bio}>{user.bio}</Text>}
                </MotiView>

                {/* Info list */}
                <Text style={styles.sectionLabel}>INFORMATION</Text>
                <Row index={0} icon="mail-outline" label="Email" value={user?.email} />
                <Row index={1} icon="call-outline" label="Contact" value={user?.contactno} />
                <Row index={2} icon="location-outline" label="Address" value={user?.address} />
                <Row index={3} icon="map-outline" label="Tehsil" value={user?.tehsil} />

                {/* Settings list */}
                <Text style={styles.sectionLabel}>ACCOUNT</Text>

                <Row
                    index={4}
                    icon="lock-closed-outline"
                    label="Change Password"
                    chevron
                    onPress={() => router.push('/changePassword')}
                />
                <Row index={5} icon="log-out-outline" label="Logout" danger onPress={logout} />

                {error && <Text style={styles.error}>{error}</Text>}
            </ScrollView>

            <EditProfileModal
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                profile={user}
                onUpdated={(response) => {
                    const updatedUser = response?.user || response?.data?.user || response?.data

                    if (updatedUser) {
                        setUser((previous) => ({ ...previous, ...updatedUser }))
                    }
                }}
            />
        </View>
    )
}

export default Profile
