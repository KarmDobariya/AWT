import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (data.success) {
        data.role === 'admin'
          ? navigate('/admin')
          : navigate('/user');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Backend not reachable');
    }
  };

  return (
  <div className="login-container">
    <h2>Welcome Back</h2>

    <input
      type="text"
      placeholder="Username"
      onChange={e => setUsername(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={e => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>Login</button>
  </div>
  );
}

export default Login;