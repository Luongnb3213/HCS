import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import UserModel from '../models/userModel.js';

export const sendMail = async (req, res) => {
  const { email } = req.body;
  if (!email) return;


  const verificationToken = jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
  const verificationLink = `http://localhost:5000/email/verify-email?token=${verificationToken}`;

  
  const user = await UserModel.update(
    { email: email },
    { emailToken: verificationToken }
  );
  console.log(user);

  // Thiết lập transporter sử dụng Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Hoặc dịch vụ email khác
    auth: {
      user: 'shopao3213@gmail.com',
      pass: 'snjhjzhpaovmzldc',
    },
  });

  const mailOptions = {
    from: 'shopao3213@gmail.com',
    to: email,
    subject: 'Xác nhận Email',
    text: `Vui lòng nhấp vào liên kết này để xác nhận email của bạn: ${verificationLink}`,
  };

  try {
    // await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email xác nhận đã được gửi!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi gửi email!' });
  }
};

export const verifyEmail = (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Token không hợp lệ.');
  }

  // Giải mã token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(400).send('Token không hợp lệ hoặc đã hết hạn.');
    }

    const user = users.find((u) => u.email === decoded.email);

    if (!user) {
      return res.status(404).send('Người dùng không tồn tại.');
    }

    if (user.isVerified) {
      return res.status(400).send('Email đã được xác nhận.');
    }

    // Cập nhật trạng thái xác nhận email
    user.isVerified = true;

    res.status(200).send('Xác nhận email thành công!');
  });
};
