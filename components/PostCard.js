import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import { UserService } from "../services/api";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react-native";

const PostCard = ({ item, showUser = true }) => {
    const [user, setUser] = useState(null);
    const [isVideo, setIsVideo] = useState(false);

    useEffect(() => {
        // Check if the URL is a video based on file extension
        const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
        setIsVideo(videoExtensions.some(ext => item.url.toLowerCase().endsWith(ext)));

        const fetchUser = async () => {
            try {
                const userData = await UserService.getUserById(item.userId);
                setUser(userData.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [item.userId, item.url]);

    return (
        <View style={styles.postContainer}>
            {isVideo ? (
                <Video
                    source={{ uri: item.url }}
                    style={styles.postMedia}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isLooping
                    useNativeControls
                />
            ) : (
                <Image
                    source={{ uri: item.url }}
                    style={styles.postMedia}
                    resizeMode="cover"
                />
            )}
            
            <View style={styles.postContent}>
                {showUser && user && (
                    <View style={styles.userInfo}>
                        <Image 
                            source={{ uri: user.avatar }} 
                            style={styles.avatar} 
                        />
                        <Text style={styles.username}>{user.name}</Text>
                    </View>
                )}
                
                <Text style={styles.description}>{item.description}</Text>
                
                <View style={styles.interactionContainer}>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Heart color="white" size={24} />
                        <Text style={styles.interactionText}>1.2K</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <MessageCircle color="white" size={24} />
                        <Text style={styles.interactionText}>256</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Bookmark color="white" size={24} />
                        <Text style={styles.interactionText}>88</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                        <Share2 color="white" size={24} />
                        <Text style={styles.interactionText}>44</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        marginBottom: 15,
        backgroundColor: 'black',
    },
    postMedia: {
        width: '100%',
        height: 600,
        position: 'relative',
    },
    postContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    username: {
        color: 'white',
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        marginBottom: 10,
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

export default PostCard;