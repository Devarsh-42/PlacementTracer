import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper, 
  Container,
  Checkbox,
  Divider,
  Fade,
  Chip,
  Tooltip,
  Zoom
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SortIcon from '@mui/icons-material/Sort';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../Components/style.css';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Update stats
    const completed = tasks.filter(task => task.isCompleted).length;
    setStats({
      total: tasks.length,
      completed: completed,
      active: tasks.length - completed
    });
  }, [tasks]);

  // Add a new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    
    const newTaskItem = { 
      id: Date.now(), 
      text: newTask, 
      isCompleted: false, 
      createdAt: new Date() 
    };
    
    setTasks([...tasks, newTaskItem]);
    setNewTask("");
  };

  // Handle Enter key press to add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToCounter = () => {
    navigate('/counter');
  };

  // Toggle task completion
  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // Delete task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Clear all completed tasks
  const clearCompleted = () => {
    const activeTasks = tasks.filter(task => !task.isCompleted);
    setTasks(activeTasks);
  };

  // Filter tasks based on current filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.isCompleted;
    if (filter === "completed") return task.isCompleted;
    return true; // "all" filter
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 3,
            background: 'linear-gradient(to right bottom, #ffffff, #f9fafc)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '150px', 
            height: '150px', 
            background: 'radial-gradient(circle, rgba(63,81,181,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0 
          }} />
          
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                mb: 4, 
                textAlign: 'center',
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              <CheckCircleOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Task Manager
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 3 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                InputProps={{
                  sx: { borderRadius: 2, bgcolor: 'white' }
                }}
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddTask}
                startIcon={<AddTaskIcon />}
                disableElevation
                sx={{ 
                  px: 3,
                  borderRadius: 2,
                  boxShadow: '0 4px 14px 0 rgba(63,81,181,0.4)'
                }}
              >
                Add
              </Button>
            </Box>
            
            {/* Task statistics */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              mb: 3, 
              p: 2, 
              bgcolor: 'rgba(63,81,181,0.05)', 
              borderRadius: 2 
            }}>
              <Chip 
                label={`All: ${stats.total}`} 
                color={filter === 'all' ? 'primary' : 'default'} 
                onClick={() => setFilter('all')}
                sx={{ fontWeight: 500 }}
              />
              <Chip 
                label={`Active: ${stats.active}`} 
                color={filter === 'active' ? 'primary' : 'default'} 
                onClick={() => setFilter('active')}
                sx={{ fontWeight: 500 }}
              />
              <Chip 
                label={`Completed: ${stats.completed}`} 
                color={filter === 'completed' ? 'primary' : 'default'} 
                onClick={() => setFilter('completed')}
                sx={{ fontWeight: 500 }}
              />
            </Box>
            
            {filteredTasks.length > 0 ? (
              <Paper variant="outlined" sx={{ borderRadius: 2, maxHeight: '400px', overflow: 'auto' }}>
                <List sx={{ p: 0 }}>
                  {filteredTasks.map((task, index) => (
                    <Fade in={true} key={task.id} timeout={300} style={{ transitionDelay: `${index * 50}ms` }}>
                      <Box>
                        <ListItem
                          secondaryAction={
                            <Tooltip title="Delete task" placement="left" TransitionComponent={Zoom}>
                              <IconButton 
                                edge="end" 
                                onClick={() => handleDeleteTask(task.id)}
                                color="error"
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          }
                          disablePadding
                          sx={{ 
                            pl: 2, 
                            pr: 1, 
                            py: 1,
                            bgcolor: index % 2 === 0 ? 'rgba(0,0,0,0.01)' : 'transparent',
                            ':hover': { bgcolor: 'rgba(63,81,181,0.08)' } 
                          }}
                        >
                          <Checkbox
                            checked={task.isCompleted}
                            onChange={() => handleToggleTask(task.id)}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                            color="primary"
                          />
                          <ListItemText
                            primary={task.text}
                            primaryTypographyProps={{
                              sx: {
                                textDecoration: task.isCompleted ? 'line-through' : 'none',
                                color: task.isCompleted ? 'text.disabled' : 'text.primary',
                                fontWeight: task.isCompleted ? 400 : 500,
                                transition: 'all 0.3s'
                              }
                            }}
                          />
                        </ListItem>
                        {index < filteredTasks.length - 1 && <Divider component="li" />}
                      </Box>
                    </Fade>
                  ))}
                </List>
              </Paper>
            ) : (
              <Box sx={{ 
                py: 4, 
                textAlign: 'center', 
                color: 'text.secondary',
                bgcolor: 'rgba(0,0,0,0.02)',
                borderRadius: 2,
                border: '1px dashed rgba(0,0,0,0.1)'
              }}>
                <Typography variant="body1">
                  {filter === 'all' 
                    ? "Your task list is empty! Add a new task to get started." 
                    : filter === 'active' 
                      ? "No active tasks remaining." 
                      : "No completed tasks yet."}
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={navigateToHome}
                sx={{ borderRadius: 2 }}
              >
                Dashboard
              </Button>
              
              <Box>
                {stats.completed > 0 && (
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={clearCompleted}
                    sx={{ mr: 2, borderRadius: 2 }}
                  >
                    Clear Completed
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={navigateToCounter}
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 4px 14px 0 rgba(63,81,181,0.3)'
                  }}
                >
                  Counter App
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Todo;