import React, { useState } from 'react';
import '../styles/registerForm.css';
import { registerUser } from '../services/api'; // Import API

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phone: '',
    role: 'Employee',
    fullName: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    try {
      console.log('Sending form data:', formData); 

      const response = await registerUser(formData);

     
      if (response && response.message === 'Đăng ký thành công!') {
        alert('Đăng ký thành công!');
        
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          email: '',
          phone: '',
          role: 'Employee',
          fullName: '',
          address: '',
        });
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đăng ký:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại sau!');
      }
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Tên người dùng:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="phone">Số điện thoại:</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>

        <div>
          <label htmlFor="role">Vai trò:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        <div>
          <label htmlFor="fullName">Họ và tên:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="address">Địa chỉ:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default RegisterForm;
