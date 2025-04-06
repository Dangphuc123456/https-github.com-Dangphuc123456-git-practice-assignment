// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Trang Chủ</Link>
        </li>
        <li>
          <Link to="/register">Đăng Ký</Link>
        </li>
        <li>
          <Link to="/login">Đăng Nhập</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
