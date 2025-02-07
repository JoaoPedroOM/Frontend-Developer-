export class TodoList {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      this.taskList = document.getElementById('task-list');
      this.render();
    }
    
    save() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    
    addTask(text) {
      const task = {
        id: Date.now(),
        text,
        completed: false
      };
      
      this.tasks.unshift(task);
      this.save();
      this.renderTask(task);
    }
    
    deleteTask(id) {
      const taskElement = this.taskList.querySelector(`[data-id="${id}"]`);
      if (taskElement) {
        taskElement.classList.add('removing');
        setTimeout(() => {
          this.tasks = this.tasks.filter(task => task.id !== id);
          this.save();
          taskElement.remove();
        }, 300);
      }
    }
    
    toggleTask(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.completed = !task.completed;
        this.save();
        
        const taskElement = this.taskList.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
          taskElement.classList.toggle('completed');
        }
      }
    }
    
    updateTaskText(id, newText) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.text = newText;
        this.save();
      }
    }
    
    renderTask(task) {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.dataset.id = task.id;
      
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <input type="text" class="task-text" value="${task.text}">
        <button class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      `;
      
      const checkbox = li.querySelector('input[type="checkbox"]');
      const textInput = li.querySelector('.task-text');
      const deleteBtn = li.querySelector('.delete-btn');
      
      checkbox.addEventListener('change', () => this.toggleTask(task.id));
      
      textInput.addEventListener('blur', () => {
        this.updateTaskText(task.id, textInput.value.trim());
      });
      
      textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          textInput.blur();
        }
      });
      
      deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
      
      this.taskList.prepend(li);
    }
    
    render() {
      this.taskList.innerHTML = '';
      this.tasks.forEach(task => this.renderTask(task));
    }
  }