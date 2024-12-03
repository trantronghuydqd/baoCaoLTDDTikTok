import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const UserService = {
    getUsers: () => axios.get(`${BASE_URL}/users`),
    getUserById: (id) => axios.get(`${BASE_URL}/users/${id}`),
    updateProfile: (id, data) => axios.put(`${BASE_URL}/users/${id}`, data),
    login: (username, password) => {
        // Thực hiện logic đăng nhập
        return axios.get(`${BASE_URL}/users?username=${username}&password=${password}`);
    }
};

export const PostService = {
    getPosts: () => axios.get(`${BASE_URL}/posts`),
    getPostsByUser: (userId) => axios.get(`${BASE_URL}/posts?userId=${userId}`),
    createPost: (data) => axios.post(`${BASE_URL}/posts`, data),
};

export const FollowService = {
    getFollowers: (userId) =>
        axios.get(`${BASE_URL}/follows?followedId=${userId}`),
    getFollowing: (userId) =>
        axios.get(`${BASE_URL}/follows?followerId=${userId}`),
    follow: (data) => axios.post(`${BASE_URL}/follows`, data),
    unfollow: (id) => axios.delete(`${BASE_URL}/follows/${id}`),
};