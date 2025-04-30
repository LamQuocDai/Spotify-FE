import React from 'react';

const ContextMenu = ({ x, y, onAdd, onDelete, onClose }) => {
  return (
    <div
      className="absolute bg-[#242424] rounded-md shadow-lg border border-gray-700 z-50"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra ngoài
    >
      <button
        className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
        onClick={() => {
          onAdd();
          onClose();
        }}
      >
        Thêm
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-white hover:bg-white/10"
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        Xóa
      </button>
    </div>
  );
};

export default ContextMenu;