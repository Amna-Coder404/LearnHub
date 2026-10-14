
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import { formatCNIC } from "../utils/cnic";
import { useAuth } from "./useAuth";

const EMPTY_FORM = {
    cnic: "",
    tehsil: "",
    address: "",
    contactno: "",
    bio: "",
};

export const useEditProfile = ({
    visible,
    profile,
    onUpdated,
    onClose,
}) => {
    const [form, setForm] = useState(EMPTY_FORM);
    const [imageFile, setImageFile] = useState(null);
    const [saving, setSaving] = useState(false);

    const { updateProfile } = useAuth();

    const user =
        profile?.user ||
        profile?.data?.user ||
        profile?.data ||
        profile ||
        {};

    const currentImage =
        user?.profileImage ||
        user?.profileimage ||
        user?.image ||
        user?.imageUrl ||
        null;

    useEffect(() => {
        if (!visible) return;



        const currentUser =
            profile?.user ||
            profile?.data?.user ||
            profile?.data ||
            profile ||
            {};

        setForm({
            cnic: formatCNIC(currentUser.cnic || ""),
            tehsil: currentUser.tehsil || "",
            address: currentUser.address || "",
            contactno: currentUser.contactno || "",
            bio: currentUser.bio || "",
        });

        setImageFile(null);
    }, [visible, profile]);

    const handleChange = (field, value) => {
        let updatedValue = value;

        if (field === "cnic") {
            updatedValue = formatCNIC(value);
        }

        if (field === "contactno") {
            updatedValue = value.replace(/\D/g, "").slice(0, 11);
        }



        setForm((previous) => ({
            ...previous,
            [field]: updatedValue,
        }));
    };

    const pickProfileImage = async () => {
        try {

            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            console.log("📷 Photo permission:", permission.granted);

            if (!permission.granted) {
                Alert.alert(
                    "Permission Required",
                    "Allow photo library access to choose a profile picture."
                );
                return;
            }



            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });



            if (!result.canceled && result.assets?.[0]) {
                const selectedImage = result.assets[0];


                setImageFile(selectedImage);
            } else {
                console.log("ℹ️ Image selection cancelled");
            }
        } catch (error) {

            Alert.alert(
                "Error",
                "Could not open the photo library."
            );
        }
    };


    const handleSubmit = async () => {
        if (form.cnic && !isValidCNIC(form.cnic)) {
            Alert.alert("Invalid CNIC", "Enter a valid 13-digit CNIC.");
            return;
        }

        if (form.contactno && form.contactno.length !== 11) {
            Alert.alert(
                "Invalid Contact Number",
                "Enter an 11-digit contact number."
            );
            return;
        }

        try {
            setSaving(true);

            const payload = {
                ...form,
                cnic: cleanCNIC(form.cnic),
            };

            console.log("📝 Profile payload:", payload);
            console.log("🖼️ New image selected:", !!imageFile?.uri);

            // Image is optional on the frontend.
            const response = await updateProfile(payload, imageFile);

            console.log("✅ Update response:", response);

            onUpdated?.(response);
            onClose();

            Alert.alert(
                "Success",
                response?.message || "Profile updated successfully."
            );
        } catch (error) {
            console.log("❌ Update failed:", error);

            Alert.alert(
                "Update Failed",
                error.message || "Could not update your profile."
            );
        } finally {
            setSaving(false);
        }
    };


    return {
        form,
        imageFile,
        currentImage,
        saving,
        handleChange,
        pickProfileImage,
        handleSubmit,
    };
};
