import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    pauseOnFocusLoss={false}
    pauseOnHover
    draggable
  />
);

export default ToastProvider;
