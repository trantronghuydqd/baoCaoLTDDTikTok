import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { PostService } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadScreen({ navigation }) {
    const [mediaUrl, setMediaUrl] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                setUserId(storedUserId);
            } catch (error) {
                console.error("Error fetching userId", error);
            }
        };

        fetchUserId();
    }, []);

    const handleUpload = () => {
        if (userId) {
            const newPost = {
                userId: userId, 
                type: mediaUrl.includes("video") ? "video" : "image",
                url: mediaUrl,
                description,
            };

            PostService.createPost(newPost).then(() => {
                navigation.goBack();
            });
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <TextInput
                style={styles.input}
                value={mediaUrl}
                onChangeText={setMediaUrl}
                placeholder="Nhập URL hình ảnh/video"
            />
            <TextInput
                style={styles.multilineInput}
                value={description}
                onChangeText={setDescription}
                placeholder="Mô tả"
                multiline
            />
            <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleUpload}
            >
                <Text style={styles.uploadText}>Đăng</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
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
    multilineInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        height: 100,
    },
    uploadButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    uploadText: {
        color: "white",
        fontWeight: "bold",
    },
});