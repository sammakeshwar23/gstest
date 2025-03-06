import mongoose, { Document, Schema } from 'mongoose';

// Define user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
});

// Create User model
const User = mongoose.model<IUser>('User', userSchema);

// Define interface to type-check User data
interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
}

export default User;
