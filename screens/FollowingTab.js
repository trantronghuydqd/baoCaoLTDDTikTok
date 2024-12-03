import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PostService, FollowService } from "../services/api";
import PostCard from "../components/PostCard";

export default function FollowingTab() {
    const [followedPosts, setFollowedPosts] = useState([]);

    useEffect(() => {
        const fetchFollowedPosts = async () => {
            try {
                const following = await FollowService.getFollowing("1");
                const followedIds = following.data.map((f) => f.followedId);

                const postsPromises = followedIds.map((id) =>
                    PostService.getPostsByUser(id)
                );

                const allPosts = await Promise.all(postsPromises);
                const combinedPosts = allPosts.flatMap((p) => p.data);

                setFollowedPosts(combinedPosts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFollowedPosts();
    }, []);

    return (
        <FlatList
            data={followedPosts}
            renderItem={({ item }) => <PostCard item={item} />}
            keyExtractor={(item) => item.id}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'black' 
    },
});