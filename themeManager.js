export class ThemeManager {
    constructor() {
      this.isDark = localStorage.getItem('darkMode') === 'true';
      this.init();
    }
    
    init() {
      if (this.isDark) {
        document.body.classList.add('dark-mode');
        this.updateIcon();
      }
    }
    
    toggleTheme() {
      this.isDark = !this.isDark;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', this.isDark);
      this.updateIcon();
    }
    
    updateIcon() {
      const icon = document.querySelector('#theme-toggle i');
      icon.className = this.isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
  }