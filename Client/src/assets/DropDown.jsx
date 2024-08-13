import React, { useState } from 'react';

function Dropdown() {
  return (
    <div className="absolute mt-2 w-30 rounded-lg shadow-lg bg-white ring-1">
      <div className="py-1" role="menu" aria-orientation="horizontal" aria-labelledby="options-menu">
        <a href="/userlogin" className="block px-4 py-2 text-xl text-blue-950 hover:bg-blue-100" role="menuitem">User</a>
        <a href="/driverlogin" className="block px-4 py-2 text-xl text-blue-950 hover:bg-blue-100" role="menuitem">Rider</a>
      </div>
    </div>
  );
}

export default Dropdown;
