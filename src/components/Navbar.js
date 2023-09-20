import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
            <a class="navbar-brand" href="#">Vigilant Core</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/fbi">FBI</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/interpol">Interpol</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
