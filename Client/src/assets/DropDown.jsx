import React, { useState } from 'react';
import { Link } from 'react-router-dom'

function Dropdown() {
  return (
    <div className="absolute mt-2 w-30 rounded-lg shadow-lg bg-white ring-1">
      <div className="py-1" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
        <Link to="/userlogin" className="block px-4 py-2 text-xl text-blue-950 hover:bg-blue-100" role="menuitem">User</Link>
        <Link to="/driverlogin" className="block px-4 py-2 text-xl text-blue-950 hover:bg-blue-100" role="menuitem">Rider</Link>
      </div>
    </div>
  );
}

export default Dropdown;
