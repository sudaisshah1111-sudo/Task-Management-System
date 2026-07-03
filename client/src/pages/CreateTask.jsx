import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../services/api';

function CreateTask() {
  const [form, setForm] = useState({ title:'', description:'', priority:'medium', status:'todo', dueDate:'' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(form);
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" placeholder="Task Title" value={form.title} onChange={(e) => setForm({...form, title:e.target.value})} required />
          <textarea style={styles.input} placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description:e.target.value})} rows={3} />
          <select style={styles.input} value={form.priority} onChange={(e) => setForm({...form, priority:e.target.value})}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <select style={styles.input} value={form.status} onChange={(e) => setForm({...form, status:e.target.value})}>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input style={styles.input} type="date" value={form.dueDate} onChange={(e) => setForm({...form, dueDate:e.target.value})} />
          <button style={styles.button} type="submit">Create Task</button>
          <button style={styles.cancelBtn} type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', backgroundColor:'#f0f2f5' },
  card: { backgroundColor:'white', padding:'40px', borderRadius:'10px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)', width:'400px' },
  title: { textAlign:'center', marginBottom:'20px', color:'#333' },
  input: { width:'100%', padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
  button: { width:'100%', padding:'10px', backgroundColor:'#4CAF50', color:'white', border:'none', borderRadius:'5px', fontSize:'16px', cursor:'pointer', marginBottom:'10px' },
  cancelBtn: { width:'100%', padding:'10px', backgroundColor:'#999', color:'white', border:'none', borderRadius:'5px', fontSize:'16px', cursor:'pointer' }
};

export default CreateTask;