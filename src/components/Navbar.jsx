import { NavLink } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Create User', to: '/create' },
];

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/">
        Synlabs Users
      </NavLink>

      <nav className="navbar__links" aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
            to={item.to}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
