const dotenv = require('dotenv');
dotenv.config(); // ✅ Load biến môi trường sớm nhất có thể

const express = require('express');
const cors = require('cors'); // Thêm thư viện cors
const sequelize = require('./config/db');
const User = require('./models/User'); // Import User model
const AppRole = require('./models/AppRole'); // Import AppRole model
const bcrypt = require('bcryptjs'); // Để mã hóa mật khẩu

const app = express();
const PORT = 3000;

// Sử dụng cors và cho phép truy cập từ frontend (localhost:3001)
app.use(cors({
  origin: 'http://localhost:3001', // Cho phép frontend từ localhost:3001
  methods: ['GET', 'POST'], // Cho phép các phương thức GET và POST
  allowedHeaders: ['Content-Type'], // Cho phép header Content-Type
}));

// Middleware để xử lý JSON
app.use(express.json());

// Route cơ bản, kiểm tra server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route đăng ký
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, confirmPassword, email, phone, role, fullName, address } = req.body;

    // Kiểm tra thông tin đăng ký
    if (!username || !password || !email || !phone || !role || !fullName || !address) {
      return res.status(400).send({ message: 'Thông tin đăng ký không đầy đủ!' });
    }

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
    if (password !== confirmPassword) {
      return res.status(400).send({ message: 'Mật khẩu và xác nhận mật khẩu không khớp!' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(400).send({ message: 'Tên người dùng đã tồn tại' });
    }

    // Lấy AppRoleID từ tên vai trò (AppRoleName)
    const appRole = await AppRole.findOne({ where: { AppRoleName: role } });

    if (!appRole) {
      return res.status(400).send({ message: 'Vai trò không hợp lệ!' });
    }

    // Tạo người dùng mới với AppRoleID
    const newUser = await User.create({
      UserName: username,
      Password: hashedPassword,
      Email: email,
      Phone: phone,
      AppRoleID: appRole.AppRoleID, // Lưu AppRoleID vào bảng Users
      FullName: fullName,
      Address: address,
    });

    return res.status(201).send({
      message: 'Đăng ký thành công!',
      user: {
        UserName: newUser.UserName,
        Email: newUser.Email,
        Phone: newUser.Phone,
        FullName: newUser.FullName,
        Address: newUser.Address
      },
    });
  } catch (err) {
    console.error('Lỗi khi đăng ký:', err);
    return res.status(500).send({ message: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
  }
});

// Lắng nghe yêu cầu trên cổng
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
