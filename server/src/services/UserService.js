import { getUserIdFromToken } from "../config/jwtProvider.js";
import Product from "../models/ProductModel.js";
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
        const user = await User.findById(userId)
            .populate("recentProduct")
            .populate("address")
            .exec();
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
        const user = await findUserById(userId);
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

export const recentProducts = async (reqData) => {
    try {
        const { userId, productId } = reqData;
        const user = await User.findById(userId);

        if (!user) {
            return { message: "User not found" };
        }
        const product = await Product.findById(productId);

        if (!product) {
            return { message: "Product not found" };
        }

        const recentProductIndex = user.recentProduct.indexOf(product._id);

        if (recentProductIndex === -1) {
            // If the product is not in the list, add it to the top
            user.recentProduct.unshift(product._id);
        } else {
            // If the product is already in the list, move it to the top
            user.recentProduct.splice(recentProductIndex, 1); // Remove the product from its current position
            user.recentProduct.unshift(product._id); // Add it to the top
        }

        await user.save();
        return { message: "Product added to recently viewed list" };
    } catch (e) {
        throw new Error(e.message);
    }
};
