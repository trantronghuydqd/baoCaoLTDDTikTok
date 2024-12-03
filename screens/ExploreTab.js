import React, { useState, useEffect } from "react";
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PostService, UserService } from "../services/api";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react-native";

const PostCard = ({ item, showUser = true }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await UserService.getUserById(item.userId);
                setUser(userData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [item.userId]);

    return (
        <View style={styles.postContainer}>
            <Image
                source={{ uri: item.url }}
                style={styles.postImage}
                resizeMode="cover"
            />
            
            <Text style={styles.description}>{item.description}</Text>

            {showUser && user && (
                <View style={styles.userInfoContainer}>
                    <Image 
                        source={{ uri: user.avatar }} 
                        style={styles.avatar} 
                    />
                    <View>
                        <Text style={styles.username}>{user.name}</Text>
                        <View style={styles.likesContainer}>
                            <Heart color="white" size={16} />
                            <Text style={styles.likesText}>1.2K</Text>
                        </View>
                    </View>
                </View>
            )}
            
            
            
            
        </View>
    );
};

export default function ExploreTab() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostService.getPosts().then((response) => setPosts(response.data));
    }, []);

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => <PostCard item={item} />}
            keyExtractor={(item) => item.id}
            style={styles.container}
            numColumns={2}
        />
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'black' 
    },
    postContainer: {
        flex: 1,
        margin: 5,
        backgroundColor: 'black',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesText: {
        color: 'white',
        marginLeft: 5,
        fontSize: 12,
    },
    description: {
        color: 'white',
        marginTop: 5,
        fontSize: 12,
    },
    interactionContainer: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'center',
    },
    interactionItem: {
        alignItems: 'center',
        marginBottom: 15,
    },
    interactionText: {
        color: 'white',
        marginTop: 5,
    },
});