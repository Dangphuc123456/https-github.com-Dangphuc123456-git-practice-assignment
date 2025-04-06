const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AppRole = require('../models/AppRole');

// Hàm để đăng ký người dùng
const registerUser = async (userData) => {
  const { username, password, email, phone, role, fullName, address } = userData;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      throw new Error('Tên người dùng đã tồn tại!');
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Lấy AppRoleID dựa trên role
    const appRole = await AppRole.findOne({ where: { AppRoleName: role } });
    if (!appRole) {
      throw new Error('Vai trò không hợp lệ!');
    }

    // Tạo người dùng mới
    const newUser = await User.create({
      UserName: username,
      Password: hashedPassword,
      Email: email,
      Phone: phone,
      AppRoleID: appRole.AppRoleID,
      CreateAt: new Date(),
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
};
