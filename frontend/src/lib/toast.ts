type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  message: string;
  type: ToastType;
  duration?: number;
}

class ToastManager {
  private container: HTMLDivElement | null = null;

  private getContainer(): HTMLDivElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private show(options: ToastOptions): void {
    const { message, type, duration = 3000 } = options;
    const container = this.getContainer();

    const toast = document.createElement('div');
    toast.style.cssText = `
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      max-width: 20rem;
      word-wrap: break-word;
    `;

    // Set colors based on type
    if (type === 'success') {
      toast.style.backgroundColor = 'oklch(95% 0.02 145)';
      toast.style.color = 'oklch(35% 0.12 145)';
      toast.style.border = '1px solid oklch(85% 0.05 145)';
    } else if (type === 'error') {
      toast.style.backgroundColor = 'oklch(95% 0.02 15)';
      toast.style.color = 'oklch(45% 0.12 15)';
      toast.style.border = '1px solid oklch(85% 0.05 15)';
    } else {
      toast.style.backgroundColor = 'oklch(95% 0.02 240)';
      toast.style.color = 'oklch(35% 0.12 240)';
      toast.style.border = '1px solid oklch(85% 0.05 240)';
    }

    toast.textContent = message;

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    if (!document.getElementById('toast-animations')) {
      style.id = 'toast-animations';
      document.head.appendChild(style);
    }

    container.appendChild(toast);

    // Auto remove after duration
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => {
        if (toast.parentNode) {
          container.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration?: number): void {
    this.show({ message, type: 'error', duration });
  }

  info(message: string, duration?: number): void {
    this.show({ message, type: 'info', duration });
  }
}

export const toast = new ToastManager();
