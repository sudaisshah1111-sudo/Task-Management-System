import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser({ name, email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button style={styles.button} type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', backgroundColor:'#f0f2f5' },
  card: { backgroundColor:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'350px' },
  title: { textAlign:'center', marginBottom:'20px', color:'#333' },
  input: { width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
  button: { width:'100%', padding:'10px', backgroundColor:'#2196F3', color:'white', border:'none', borderRadius:'5px', fontSize:'16px', cursor:'pointer' },
  error: { color:'red', textAlign:'center', marginBottom:'10px' }
};

export default Register;