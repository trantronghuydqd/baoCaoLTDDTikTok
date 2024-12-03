import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PostService, FollowService } from "../services/api";
import PostCard from "../components/PostCard";

export default function FriendsTab() {
    const [friendPosts, setFriendPosts] = useState([]);

    useEffect(() => {
        const fetchFriendPosts = async () => {
            try {
                // Lấy danh sách người dùng mà user 1 đang follow
                const following = await FollowService.getFollowing("1");
                const followingIds = following.data.map((f) => f.followedId);

                // Lấy danh sách người follow user 1
                const followers = await FollowService.getFollowers("1");
                const followerIds = followers.data.map((f) => f.followerId);

                // Tìm giao của 2 danh sách (mutual follow)
                const mutualFriendIds = followingIds.filter(id => 
                    followerIds.includes(id)
                );

                // Lấy bài đăng của những người bạn bè này
                const postsPromises = mutualFriendIds.map((id) =>
                    PostService.getPostsByUser(id)
                );

                const allPosts = await Promise.all(postsPromises);
                const combinedPosts = allPosts.flatMap((p) => p.data);

                setFriendPosts(combinedPosts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriendPosts();
    }, []);

    return (
        <FlatList
            data={friendPosts}
            renderItem={({ item }) => <PostCard item={item} />}
            keyExtractor={(item) => item.id}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        />
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: 'black' 
    }
});