
import { MotiView } from "moti";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from "react-native";
import {
    Avatar,
    Button,
    HelperText,
    IconButton,
    Modal,
    Portal,
    Text,
    TextInput,
} from "react-native-paper";

import COLORS from "../constants/color";
import { useEditProfile } from "../hooks/useEditProfile";
import styles from "../styles/EditProfileModal.style";
import { cleanCNIC } from "../utils/cnic";

const FIELDS = [
    {
        key: "cnic",
        label: "CNIC",
        placeholder: "12345-1234567-1",
        icon: "card-account-details-outline",
        keyboardType: "number-pad",
        maxLength: 15,
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
    {
        key: "contactno",
        label: "Contact Number",
        placeholder: "03XXXXXXXXX",
        icon: "phone-outline",
        keyboardType: "phone-pad",
        maxLength: 11,
    },
    {
        key: "bio",
        label: "Bio",
        placeholder: "Tell us a little about yourself",
        icon: "account-outline",
        multiline: true,
        maxLength: 150,
    },
];

const EditProfileModal = ({
    visible,
    onClose,
    profile,
    onUpdated,
}) => {
    const {
        form,
        imageFile,
        currentImage,
        saving,
        handleChange,
        pickProfileImage,
        handleSubmit,
    } = useEditProfile({
        visible,
        profile,
        onUpdated,
        onClose,
    });

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
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <MotiView
                        style={{ flex: 1 }}
                        from={{ opacity: 0, translateY: 16, scale: 0.98 }}
                        animate={{ opacity: 1, translateY: 0, scale: 1 }}
                        transition={{ type: "timing", duration: 220 }}
                    >
                        {/* Fixed header */}
                        <View style={styles.header}>
                            <View style={styles.headerText}>
                                <Text variant="titleLarge" style={styles.title}>
                                    Edit Profile
                                </Text>

                                <Text variant="bodyMedium"
                                    style={styles.subtitle}
                                >
                                    Update your personal information
                                </Text>
                            </View>

                            <IconButton
                                icon="close"
                                size={22}
                                onPress={onClose}
                                disabled={saving}
                                accessibilityLabel="Close edit profile"
                            />
                        </View>

                        {/* Scrollable form and buttons */}
                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.form}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.imageSection}>
                                {imageUri ? (
                                    <Image
                                        source={{ uri: imageUri }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Avatar.Icon
                                        size={86}
                                        icon="account"
                                        color={COLORS.textOnPrimary}
                                        style={styles.avatar}
                                    />
                                )}

                                <Button
                                    mode="outlined"
                                    icon="camera"
                                    onPress={pickProfileImage}
                                    disabled={saving}
                                    style={styles.imageButton}
                                >
                                    {imageFile ? "Change Photo" : "Choose Profile Picture"}
                                </Button>

                                <Text
                                    variant="bodySmall"
                                    style={styles.imageHint}
                                >
                                    Choose a square photo for your profile.
                                </Text>
                            </View>

                            {FIELDS.map((field) => (
                                <View key={field.key} style={styles.field}>
                                    <Text
                                        variant="labelLarge"
                                        style={styles.label}
                                    >
                                        {field.label}
                                    </Text>

                                    <TextInput
                                        mode="outlined"
                                        value={form[field.key]}
                                        onChangeText={(value) =>
                                            handleChange(field.key, value)
                                        }
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        left={
                                            <TextInput.Icon icon={field.icon} />
                                        }
                                        keyboardType={field.keyboardType || "default"}
                                        multiline={field.multiline || false}
                                        numberOfLines={field.multiline ? 3 : 1}
                                        maxLength={field.maxLength}
                                        editable={!saving}
                                        style={styles.input}
                                        outlineStyle={styles.inputOutline}
                                        contentStyle={
                                            field.multiline
                                                ? styles.multilineContent
                                                : undefined
                                        }
                                    />

                                    {field.key === "cnic" && (
                                        <HelperText type="info" visible>
                                            {cleanCNIC(form.cnic).length}/13 digits
                                        </HelperText>
                                    )}

                                    {field.key === "bio" && (
                                        <HelperText type="info" visible>
                                            {form.bio.length}/150 characters
                                        </HelperText>
                                    )}
                                </View>
                            ))}

                            <Button
                                mode="contained"
                                icon="check"
                                onPress={handleSubmit}
                                disabled={saving}
                                style={styles.saveButton}
                                contentStyle={styles.buttonContent}
                            >
                                {saving ? (
                                    <ActivityIndicator
                                        color={COLORS.textOnPrimary}
                                    />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>

                            <Button
                                mode="text"
                                onPress={onClose}
                                disabled={saving}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </Button>
                        </ScrollView>
                    </MotiView>
                </KeyboardAvoidingView>
            </Modal>
        </Portal>
    );

};

export default EditProfileModal;
