// src/controllers/userController.js
import NotificationModel from '../models/notificationModel.js';

export const getNotificationById = async (req, res) => {
  const { id, pageSize } = req.body;
  try {
    const notifications = await NotificationModel.findById(id, pageSize);
    if (!notifications) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Notification', error });
  }
};
