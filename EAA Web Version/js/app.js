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
        iconSpan.textContent = this.getIcon(type);
        const msgSpan = document.createElement('span');
        msgSpan.textContent = message;
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

            const modalHeader = document.createElement('div');
            modalHeader.className = 'modal-header';

            const modalTitle = document.createElement('h3');
            modalTitle.className = 'modal-title';
            modalTitle.textContent = title;

            const modalClose = document.createElement('button');
            modalClose.className = 'modal-close';
            modalClose.textContent = '×';
            modalClose.onclick = function() { this.closest('.modal-overlay').remove(); };

            modalHeader.appendChild(modalTitle);
            modalHeader.appendChild(modalClose);

            const modalBody = document.createElement('div');
            modalBody.className = 'modal-body';

            const modalMessage = document.createElement('p');
            modalMessage.style.marginBottom = 'var(--spacing-md)';
            modalMessage.textContent = message;

            const inputElement = document.createElement('input');
            inputElement.type = 'number';
            inputElement.step = 'any';
            inputElement.className = 'form-input';
            inputElement.id = 'promptInput';
            inputElement.value = defaultValue;
            inputElement.autofocus = true;

            modalBody.appendChild(modalMessage);
            modalBody.appendChild(inputElement);

            const modalFooter = document.createElement('div');
            modalFooter.className = 'modal-footer';

            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.id = 'promptCancel';
            cancelBtn.textContent = 'Cancel';

            const confirmBtn = document.createElement('button');
            confirmBtn.className = 'btn btn-primary';
            confirmBtn.id = 'promptConfirm';
            confirmBtn.textContent = 'Confirm';

            modalFooter.appendChild(cancelBtn);
            modalFooter.appendChild(confirmBtn);

            modal.appendChild(modalHeader);
            modal.appendChild(modalBody);
            modal.appendChild(modalFooter);

            overlay.appendChild(modal);

            document.body.appendChild(overlay);

            const input = overlay.querySelector('#promptInput');
            input.focus();
            input.select();

            const cleanup = (value) => {
                overlay.remove();
                resolve(value);
            };

            overlay.querySelector('#promptConfirm').onclick = () => {
                const value = parseFloat(input.value);
                cleanup(isNaN(value) ? null : value);
            };

            overlay.querySelector('#promptCancel').onclick = () => cleanup(null);

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
