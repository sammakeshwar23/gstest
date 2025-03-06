import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';  // Import the User model

// Registration function
export const register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password, firstName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user and save to database
  const newUser = new User({
    email,
    password: hashedPassword,
    firstName,
  });

  try {
    await newUser.save();  // Save user to the database
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login function
export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { email: user.email, firstName: user.firstName },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  return res.json({ token });
};
