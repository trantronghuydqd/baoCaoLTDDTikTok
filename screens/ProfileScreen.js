import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { UserService, PostService } from "../services/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Lấy userId từ AsyncStorage
                const userId = await AsyncStorage.getItem('userId');

                if (userId) {
                    const userResponse = await UserService.getUserById(userId);
                    setUser(userResponse.data);

                    const postsResponse = await PostService.getPostsByUser(userId);
                    setPosts(postsResponse.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserProfile();

        // Đăng ký listener để cập nhật khi quay lại từ màn hình edit
        const unsubscribe = navigation.addListener('focus', fetchUserProfile);

        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            {user && (
                <View>
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.bio}>{user.bio}</Text>

                    <View style={styles.statsContainer}>
                        <Text>Followers: {user.followers}</Text>
                        <Text>Following: {user.following}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() =>
                            navigation.navigate("EditProfile", { user })
                        }
                    >
                        <Text>Sửa Hồ Sơ</Text>
                    </TouchableOpacity>

                    <View style={styles.postsContainer}>
                        {posts.map((post) => (
                            <Image
                                key={post.id}
                                source={{ uri: post.url }}
                                style={styles.postImage}
                            />
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
    },
    name: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    bio: {
        textAlign: "center",
        marginTop: 10,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 15,
    },
    editButton: {
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 15,
    },
    postsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 20,
    },
    postImage: {
        width: "30%",
        height: 120,
        marginBottom: 10,
    },
});
