import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
} from "react-native";
import { UserService } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const users = await UserService.getUsers();
            const user = users.data.find(
                (u) => u.username === username && u.password === password
            );

            if (user) {
                // Lưu user ID vào AsyncStorage
                await AsyncStorage.setItem("userId", user.id);

                navigation.replace("MainNavigator");
            } else {
                Alert.alert(
                    "Đăng nhập thất bại",
                    "Tên đăng nhập hoặc mật khẩu không đúng"
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Đã có lỗi xảy ra");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                placeholderTextColor="gray"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                placeholderTextColor="gray"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Đăng Nhập</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: "center",
        marginBottom: 50,
    },
    input: {
        backgroundColor: "#1A1A1A",
        color: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#333",
    },
    loginButton: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    loginText: {
        color: "black",
        fontWeight: "bold",
    },
    forgotPassword: {
        color: "white",
        textAlign: "center",
        marginTop: 15,
    },
});
