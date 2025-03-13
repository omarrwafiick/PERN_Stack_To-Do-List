import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export const showSuccess = (message) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });

export const showError = (message) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

export const handleDismiss = () => toast.dismiss();
