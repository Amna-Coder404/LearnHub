import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import {
    Button,
    HelperText,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

import COLORS from "../constants/color";
import { useEditProfile } from "../hooks/useEditProfile";
import styles from "../styles/EditProfileModal.style";
import { cleanCNIC } from "../utils/cnic";

const SECTIONS = [
    {
        title: "IDENTITY",
        fields: [
            {
                key: "cnic",
                label: "CNIC",
                placeholder: "12345-1234567-1",
                icon: "card-account-details-outline",
                keyboardType: "number-pad",
                maxLength: 15,
            },
        ],
    },
    {
        title: "CONTACT",
        fields: [
            {
                key: "contactno",
                label: "Contact Number",
                placeholder: "03XXXXXXXXX",
                icon: "phone-outline",
                keyboardType: "phone-pad",
                maxLength: 11,
            },
            {
                key: "tehsil",
                label: "Tehsil",
                placeholder: "Enter your tehsil",
                icon: "map-marker-outline",
                maxLength: 50,
            },
            {
                key: "address",
                label: "Address",
                placeholder: "Enter your address",
                icon: "home-outline",
                multiline: true,
                maxLength: 200,
            },
        ],
    },
    {
        title: "ABOUT YOU",
        fields: [
            {
                key: "bio",
                label: "Bio",
                placeholder: "Tell us a little about yourself",
                icon: "account-outline",
                multiline: true,
                maxLength: 150,
            },
        ],
    },
];

const EditProfileModal = ({ visible, onClose, profile, onUpdated }) => {
    const {
        form,
        imageFile,
        currentImage,
        saving,
        handleChange,
        pickProfileImage,
        handleSubmit,
    } = useEditProfile({ visible, profile, onUpdated, onClose });

    const imageUri = imageFile?.uri || currentImage;

    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={saving ? undefined : onClose}
                dismissable={!saving}
                contentContainerStyle={styles.modal}
            >
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    {/* Header */}
                    <LinearGradient
                        colors={["rgba(139,92,246,0.35)", "rgba(34,211,238,0.10)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.header}
                    >
                        <View style={styles.headerText}>
                            <Text style={styles.title}>Edit Profile</Text>
                            <Text style={styles.subtitle}>
                                Keep your information up to date
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={onClose}
                            disabled={saving}
                            style={styles.closeBtn}
                            accessibilityLabel="Close edit profile"
                        >
                            <Ionicons name="close" size={20} color={COLORS.text} />
                        </TouchableOpacity>
                    </LinearGradient>

                    {/* Form */}
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={styles.form}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Avatar */}
                        <View style={styles.avatarSection}>
                            <TouchableOpacity
                                onPress={pickProfileImage}
                                disabled={saving}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={[COLORS.gradientStart, COLORS.gradientEnd]}
                                    style={styles.avatarRing}
                                >
                                    <View style={styles.avatarInner}>
                                        {imageUri ? (
                                            <Image
                                                source={{ uri: imageUri }}
                                                style={styles.avatarImage}
                                            />
                                        ) : (
                                            <Ionicons
                                                name="person"
                                                size={44}
                                                color={COLORS.textMuted}
                                            />
                                        )}
                                    </View>
                                </LinearGradient>

                                <View style={styles.cameraBadge}>
                                    <Ionicons
                                        name="camera"
                                        size={14}
                                        color={COLORS.textOnPrimary}
                                    />
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.avatarHint}>
                                {imageFile ? "Photo selected" : "Tap to change your photo"}
                            </Text>
                        </View>

                        {SECTIONS.map((section) => (
                            <View key={section.title} style={styles.section}>
                                <Text style={styles.sectionTitle}>{section.title}</Text>

                                {section.fields.map((field) => (
                                    <View key={field.key} style={styles.field}>
                                        <TextInput
                                            mode="outlined"
                                            value={form[field.key]}
                                            onChangeText={(value) => handleChange(field.key, value)}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            left={
                                                <TextInput.Icon
                                                    icon={field.icon}
                                                    color={COLORS.textMuted}
                                                />
                                            }
                                            keyboardType={field.keyboardType || "default"}
                                            multiline={field.multiline || false}
                                            numberOfLines={field.multiline ? 3 : 1}
                                            maxLength={field.maxLength}
                                            editable={!saving}
                                            textColor={COLORS.text}
                                            placeholderTextColor={COLORS.placeholder}
                                            outlineColor={COLORS.border}
                                            activeOutlineColor={COLORS.focusBorder}
                                            style={[
                                                styles.input,
                                                field.multiline && styles.inputMultiline,
                                            ]}
                                            outlineStyle={styles.inputOutline}
                                            theme={{
                                                colors: {
                                                    onSurfaceVariant: COLORS.textMuted,
                                                    background: COLORS.inputBackground,
                                                },
                                            }}
                                        />

                                        {field.key === "cnic" && (
                                            <HelperText type="info" visible style={styles.helper}>
                                                {cleanCNIC(form.cnic).length}/13 digits
                                            </HelperText>
                                        )}

                                        {field.key === "bio" && (
                                            <HelperText type="info" visible style={styles.helper}>
                                                {form.bio.length}/150 characters
                                            </HelperText>
                                        )}
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>

                    {/* Fixed footer */}
                    <View style={styles.footer}>
                        <Button
                            mode="text"
                            onPress={onClose}
                            disabled={saving}
                            textColor={COLORS.textSecondary}
                            style={styles.cancelBtn}
                        >
                            Cancel
                        </Button>

                        <Button
                            mode="contained"
                            icon="check"
                            onPress={handleSubmit}
                            loading={saving}
                            disabled={saving}
                            buttonColor={COLORS.primaryDark}
                            textColor={COLORS.textOnPrimary}
                            style={styles.saveBtn}
                            contentStyle={styles.saveContent}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </Portal>
    );
};



export default EditProfileModal;