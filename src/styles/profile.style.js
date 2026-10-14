import { StyleSheet } from 'react-native'
import COLORS from '../constants/color'

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.surface },

    hero: {
        backgroundColor: COLORS.primary,
        height: 170,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
    },
    heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroTitle: { fontSize: 22, fontWeight: '700', color: COLORS.textOnPrimary },
    editIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.18)',
    },

    identity: { alignItems: 'center', marginTop: -60, paddingHorizontal: 24 },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: COLORS.surface,
        backgroundColor: COLORS.surfaceSecondary,
    },
    avatarFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primaryDark },
    avatarText: { fontSize: 40, fontWeight: '700', color: COLORS.textOnPrimary },
    name: { fontSize: 24, fontWeight: '800', color: COLORS.text, marginTop: 12 },
    username: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 10,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: COLORS.primaryLight,
    },

    bio: { fontSize: 14, lineHeight: 21, color: COLORS.textSecondary, textAlign: 'center', marginTop: 10 },

    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        color: COLORS.textMuted,
        marginTop: 28,
        marginBottom: 6,
        paddingHorizontal: 24,
    },

    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 24 },
    rowIcon: { width: 32 },
    rowText: { flex: 1, marginLeft: 6 },
    rowLabel: { fontSize: 12, color: COLORS.textMuted },
    rowValue: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.text,
        marginTop: 2
    },
    divider: { height: StyleSheet.hairlineWidth, backgroundColor: COLORS.border, marginLeft: 62, marginRight: 24 },

    error: {
        color: COLORS.error,
        backgroundColor: COLORS.errorBackground,
        padding: 10,
        borderRadius: 10,
        margin: 24,
    },
})

export default styles