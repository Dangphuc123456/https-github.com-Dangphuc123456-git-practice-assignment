const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AppRole = require('../models/AppRole'); // Import model AppRole

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword, email, phone, role, fullName, address } = req.body;

    if (!username || !password || !email || !phone || !role || !fullName) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu và xác nhận mật khẩu không khớp!' });
    }

    if (password.length > 30) {
      return res.status(400).json({ message: 'Mật khẩu quá dài (tối đa 30 ký tự).' });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ message: 'Số điện thoại không hợp lệ (phải 10 ký tự).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Tên người dùng đã tồn tại.' }); 
    }

    const appRole = await AppRole.findOne({ where: { AppRoleName: role } });

    if (!appRole) {
      return res.status(400).json({ message: 'Vai trò không hợp lệ!' });
    }

    const newUser = await User.create({
      UserName: username,
      Password: hashedPassword,
      Email: email,
      Phone: phone,
      AppRoleID: appRole.AppRoleID,
      FullName: fullName,
      Address: address,
    });

    console.log('Người dùng đã được tạo thành công:', newUser);

    return res.status(201).json({
      message: '',
      user: {
        UserID: newUser.UserID,
        UserName: newUser.UserName,
        Email: newUser.Email,
        Phone: newUser.Phone,
      },
    });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err);
    return res.status(500).json({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
  }
});


module.exports = router;
