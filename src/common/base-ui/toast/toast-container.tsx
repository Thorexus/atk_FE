import { css, cx } from '@emotion/css';
import { ToastContainer } from 'react-toastify';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      className={cx(css`
        .Toastify__toast {
          padding: 0 !important;
        }
        .Toastify__toast-body {
          padding: 0 !important;
          margin: 0 !important;
        }
        .Toastify__toast-body > div {
          height: 100%;
        }
        .Toastify__close-button {
          position: absolute;
          right: 8px;
          margin-top: 8px;
        }
      `)}
      position="top-right"
      autoClose={3000}
      closeOnClick
      draggable
      pauseOnHover={false}
      hideProgressBar
    />
  );
};

export default CustomToastContainer;
