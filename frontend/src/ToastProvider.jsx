import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ToastProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    transition={Slide}
    draggable
    theme="colored"
    pauseOnHover
  />
);

export default ToastProvider;
