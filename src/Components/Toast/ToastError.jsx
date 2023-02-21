import React from "react";
import './Toast.css';

const ToastError = (props) => {
  const { text } = props;
  return (
    <div
      class="toast align-items-center fade show erro"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-content">
        <div class="content-body d-flex align-items-center">
          <div class="icon me-4">
            <i class="fi fi-rr-cross-circle d-flex"></i>
          </div>
          <div class="d-flex justify-content-between w-100">
            <div>
              {/* <h5 class="fw-bold mb-1">Error</h5> */}
              <p class="text-muted mb-0">
                {text}
              </p>
            </div>
            <div>
              {/* <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastError;
