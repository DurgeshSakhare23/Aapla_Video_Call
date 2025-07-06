import {User} from "../models/usermodel.js";
import {Meeting} from "../models/meetingmodel.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Username and password are required"});
    }
    try {
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        if( await bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString("hex");
            user.token = token;
            await user.save();
            res.status(200).json({message: "Login successful", token: token});
        }

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
const register = async (req, res) => {
    const {name, username, password} = req.body;

    try {
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(
            {
                name: name,
                username: username,  
                password: hashedPassword
            }
        );
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

const getHistory = async (req, res) => {
    const {token} = req.body;

    try {
        const user = await User.findOne({token: token});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const meetings = await Meeting.find({ user_id: user._id });
        res.json(meetings);

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


const addToHistory = async (req, res) => {
    const {token, meetingCode} = req.body;

    try {
        const user = await User.findOne({token: token});
        const meeting =  new Meeting({
            user_id: user._id,
            meetingCode: meetingCode
        })

        await meeting.save();
        res.status(201).json({message: "Meeting added to history"});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export {login, register, getHistory, addToHistory};