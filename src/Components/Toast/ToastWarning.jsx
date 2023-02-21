import React from "react";
import './Toast.css';

const ToastWarning = () => {
  return (
    <div
      class="toast align-items-center fade show warning"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-content">
        <div class="content-body d-flex align-items-center">
          <div class="icon me-4">
            <i class="fi fi-rr-exclamation d-flex"></i>
          </div>
          <div class="d-flex justify-content-between w-100">
            <div>
              <h5 class="fw-bold mb-1">Warning</h5>
              <p class="text-muted mb-0">
                Hello, world! This is a toast message.
              </p>
            </div>
            <div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastWarning;
