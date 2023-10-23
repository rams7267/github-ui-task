import axios from "axios";

export const getUserProfile = async () => {
    const res = await axios('https://api.github.com/users/supreetsingh247');
    return res.data;
};

export const getUserRepos = async () => {
    const res = await axios('https://api.github.com/users/supreetsingh247/repos');
    return res.data;
};