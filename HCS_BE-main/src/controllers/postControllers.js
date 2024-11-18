
import PostModel from '../models/postModel.js';

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPost = await PostModel.update(id, req.body);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostModel.delete(id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};
