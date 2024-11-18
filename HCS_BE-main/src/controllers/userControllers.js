// src/controllers/userController.js
import UserModel from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const existingUser = await UserModel.findByFields({ id });
//     if (!existingUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const updatedUser = await UserModel.update(id, req.body);
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user', error });
//   }
// };

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await UserModel.findByFields({ id });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await UserModel.update({ id }, req.body);
    res.json(updatedUser);
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.delete(id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
