import { User } from "../Models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.use(cookieParser());


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: 'User with this email does not exist' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      jwt.sign({ email: user.email }, 'shhh', {}, (err, token) => {
        if (err) {
          console.error('JWT Error:', err);
          return res.status(500).json({ message: 'Error creating token', error: err.message });
        }
  
        res.cookie('token', token).status(200).json({ message: 'Login successful', token });
      });
  
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Failed to login user', error: error.message });
    }
}



export const logout = (req, res) => {
    res.send("logout");
}

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hash,
        });

        await newUser.save();

        jwt.sign({ email }, 'shhh', {}, (err, token) => {
            if (err) {
                return res.status(500).json({ message: 'Error creating token' });
            }

            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
            }).status(201).json({ message: 'User registered successfully', token });
        });

    } catch (error) {
        res.status(500).json({ message: 'Failed to register user', error: error.message });
    }
};



