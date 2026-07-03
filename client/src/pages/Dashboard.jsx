import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      navigate('/login');
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={{color:'white'}}>Task Manager</h2>
        <div>
          <span style={{color:'white', marginRight:'20px'}}>Hi, {user?.name}</span>
          <button onClick={() => navigate('/create')} style={styles.addBtn}>+ Add Task</button>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>
      </div>
      <div style={styles.content}>
        <h3>My Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet. Click "Add Task" to create one!</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeader}>
                <th style={styles.th}>Title</th>
                <th style={styles.th}>Priority</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Due Date</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task._id} style={styles.tr}>
                  <td style={styles.td}>{task.title}</td>
                  <td style={styles.td}>
                    <span style={{...styles.badge, backgroundColor: task.priority === 'high' ? '#ff4444' : task.priority === 'medium' ? '#ff9800' : '#4CAF50'}}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={styles.td}>{task.status}</td>
                  <td style={styles.td}>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                  <td style={styles.td}>
                    <button onClick={() => navigate(`/edit/${task._id}`)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(task._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', backgroundColor:'#f0f2f5' },
  navbar: { backgroundColor:'#2196F3', padding:'15px 30px', display:'flex', justifyContent:'space-between', alignItems:'center' },
  content: { padding:'30px' },
  addBtn: { padding:'8px 16px', backgroundColor:'white', color:'#2196F3', border:'none', borderRadius:'5px', cursor:'pointer', marginRight:'10px' },
  logoutBtn: { padding:'8px 16px', backgroundColor:'#ff4444', color:'white', border:'none', borderRadius:'5px', cursor:'pointer' },
  table: { width:'100%', borderCollapse:'collapse', backgroundColor:'white', borderRadius:'10px', overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' },
  tableHeader: { backgroundColor:'#2196F3' },
  th: { padding:'15px', color:'white', textAlign:'left' },
  tr: { borderBottom:'1px solid #eee' },
  td: { padding:'15px' },
  badge: { padding:'4px 8px', borderRadius:'12px', color:'white', fontSize:'12px' },
  editBtn: { padding:'5px 10px', backgroundColor:'#ff9800', color:'white', border:'none', borderRadius:'3px', cursor:'pointer', marginRight:'5px' },
  deleteBtn: { padding:'5px 10px', backgroundColor:'#ff4444', color:'white', border:'none', borderRadius:'3px', cursor:'pointer' }
};

export default Dashboard;