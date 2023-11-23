export interface Person {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthDate: string; 
  }
  
  export interface ModalConfig {
    message: string;
    subMessage?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }
  
  