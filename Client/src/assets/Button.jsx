import React from 'react'

const Button = ({ children, onClick }) => {
  return (
    <button 
      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" 
      onClick={onClick}
    >
      {children}
    </button>
  );
};


export default Button