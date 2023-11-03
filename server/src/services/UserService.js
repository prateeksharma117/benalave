import { getUserIdFromToken } from "../config/jwtProvider.js";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error("User already exists");
        }
        password = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password });

        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId).populate("address");
        if (!user) {
            throw new Error("User not found with id");
        }
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found with email");
        }
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const getUserProfileByToken = async (token) => {
    try {
        const userId = getUserIdFromToken(token);
        const user = await findUserById(userId)
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (e) {
        throw new Error(e.message);
    }
};
