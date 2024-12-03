import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RecommendTab from "./RecommendTab";
import FriendsTab from "./FriendsTab";
import FollowingTab from "./FollowingTab";
import ExploreTab from "./ExploreTab";

export default function HomeScreen() {
    const [activeTab, setActiveTab] = useState("Recommend");

    const renderTab = () => {
        switch (activeTab) {
            case "Friends":
                return <FriendsTab />;
            case "Explore":
                return <ExploreTab />;
            case "Following":
                return <FollowingTab />;
            default:
                return <RecommendTab />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.tabHeader}>
                {["Friends", "Explore", "Recommend", "Following"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabButton,
                            activeTab === tab && styles.activeTabButton,
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.tabContent}>{renderTab()}</View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "transparent",
  },
  tabHeader: {
      flexDirection: "row",
      justifyContent: "space-around",
      paddingVertical: 10,
      backgroundColor: "black", // Nền đen
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
  },
  tabButton: {
      paddingHorizontal: 15,
      paddingVertical: 8,
  },
  activeTabButton: {
      borderBottomWidth: 2,
      borderBottomColor: "white", // Đường gạch chân màu trắng
  },
  tabText: {
      color: "white", // Chữ màu trắng
  },
  activeTabText: {
      color: "white", // Chữ màu trắng
      fontWeight: "bold",
  },
  tabContent: {
      flex: 1,
      marginTop: 50,
  },
});