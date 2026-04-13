/**
 * ERPL Testing Analysis App - Main Application Script
 * Handles navigation, shared utilities, and global state
 */

// Toast notification system
class ToastManager {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const iconSpan = document.createElement('span');
        iconSpan.innerHTML = this.getIcon(type); // Safe since getIcon returns hardcoded strings

        const msgSpan = document.createElement('span');
        msgSpan.textContent = message; // Prevents XSS from user-controlled message

        toast.appendChild(iconSpan);
        toast.appendChild(msgSpan);

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    success(message) { this.show(message, 'success'); }
    error(message) { this.show(message, 'error'); }
    warning(message) { this.show(message, 'warning'); }
    info(message) { this.show(message, 'info'); }
}

// Modal manager
class ModalManager {
    static open(modalId) {
        const overlay = document.getElementById(modalId);
        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    static close(modalId) {
        const overlay = document.getElementById(modalId);
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    static closeAll() {
        document.querySelectorAll('.modal-overlay').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
}

// Prompt dialog helper
class PromptDialog {
    static async show(title, message, defaultValue = '') {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay active';

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.width = '400px';

            // Header
            const header = document.createElement('div');
            header.className = 'modal-header';

            const titleEl = document.createElement('h3');
            titleEl.className = 'modal-title';
            titleEl.textContent = title;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'modal-close';
            closeBtn.textContent = '×';

            header.appendChild(titleEl);
            header.appendChild(closeBtn);

            // Body
            const body = document.createElement('div');
            body.className = 'modal-body';

            const msgEl = document.createElement('p');
            msgEl.style.marginBottom = 'var(--spacing-md)';
            msgEl.textContent = message;

            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.className = 'form-input';
            input.id = 'promptInput';
            if (defaultValue !== '') input.value = defaultValue;

            body.appendChild(msgEl);
            body.appendChild(input);

            // Footer
            const footer = document.createElement('div');
            footer.className = 'modal-footer';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.id = 'promptCancel';
            cancelBtn.textContent = 'Cancel';

            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn btn-primary';
            confirmBtn.id = 'promptConfirm';
            confirmBtn.textContent = 'Confirm';

            footer.appendChild(cancelBtn);
            footer.appendChild(confirmBtn);

            // Assemble
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            overlay.appendChild(modal);

            document.body.appendChild(overlay);

            input.focus();
            input.select();

            const cleanup = (value) => {
                overlay.remove();
                resolve(value);
            };

            closeBtn.onclick = () => cleanup(null);

            confirmBtn.onclick = () => {
                const value = parseFloat(input.value);
                cleanup(isNaN(value) ? null : value);
            };

            cancelBtn.onclick = () => cleanup(null);

            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    const value = parseFloat(input.value);
                    cleanup(isNaN(value) ? null : value);
                } else if (e.key === 'Escape') {
                    cleanup(null);
                }
            };
        });
    }
}

// Initialize global toast manager
window.toast = new ToastManager();
window.ModalManager = ModalManager;
window.PromptDialog = PromptDialog;

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        ModalManager.closeAll();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ModalManager.closeAll();
    }
});

console.log('ERPL Testing Analysis App initialized');
