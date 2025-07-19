import React, { useState } from 'react';
import './styles/login.css';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  // 👉 Separate login function
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      return { ok: response.ok, data };
    } catch (err) {
      return { ok: false, data: { message: 'Server error' } };
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(username, password);

    if (result.ok) {
      setStatus('✅ Login successful!');
      localStorage.setItem('token', result.data.token || 'dummy-token');
      onLoginSuccess();
    } else {
      setStatus(`❌ ${result.data.message}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default Login;






