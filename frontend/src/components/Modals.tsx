import React from 'react';

interface AlertModalProps {
  title: string;
  message: string;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-[#F0F3FA] rounded-lg shadow-xl p-6 w-full max-w-md border border-[#B1C9EF]">
      <h3 className="text-xl font-semibold text-[#395886] mb-2">{title}</h3>
      <p className="text-[#395886] mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-[#84AAEC] text-white py-2 rounded-lg font-semibold hover:bg-[#628FCB] transition"
      >
        OK
      </button>
    </div>
  </div>
);

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-[#F0F3FA] rounded-lg shadow-xl p-6 w-full max-w-md border border-[#B1C9EF]">
      <h3 className="text-xl font-semibold text-[#395886] mb-2">{title}</h3>
      <p className="text-[#395886] mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-[#B1C9EF] text-[#395886] py-2 rounded-lg font-semibold hover:bg-[#D5DEEF] transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

