import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { UserService } from "../services/api";

export default function EditProfileScreen({ route, navigation }) {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);
    const [avatar, setAvatar] = useState(user.avatar);

    const handleSave = () => {
        // Giữ nguyên các trường còn lại như username, password, followers, following
        const updatedUser = {
            ...user,  // Spread toàn bộ user ban đầu
            name,     // Cập nhật các trường được thay đổi
            bio, 
            avatar
        };

        UserService.updateProfile(user.id, updatedUser).then(() =>
            navigation.goBack()
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Tên"
            />
            <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="Tiểu sử"
                multiline
            />
            <TextInput
                style={styles.input}
                value={avatar}
                onChangeText={setAvatar}
                placeholder="URL Avatar"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Lưu Thay Đổi</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    saveText: {
        color: "white",
        fontWeight: "bold",
    },
});