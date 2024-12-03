import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { PostService } from "../services/api";
import PostCard from "../components/PostCard";

export default function RecommendTab() {
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
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
});