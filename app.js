import { TodoList } from './todoList.js';
import { ThemeManager } from './themeManager.js';

document.addEventListener('DOMContentLoaded', () => {
  const todoList = new TodoList();
  const themeManager = new ThemeManager();
  
  const addTaskBtn = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const themeToggle = document.getElementById('theme-toggle');
  
  addTaskBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text) {
      todoList.addTask(text);
      taskInput.value = '';
    }
  });
  
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const text = taskInput.value.trim();
      if (text) {
        todoList.addTask(text);
        taskInput.value = '';
      }
    }
  });
  
  themeToggle.addEventListener('click', () => {
    themeManager.toggleTheme();
  });
});