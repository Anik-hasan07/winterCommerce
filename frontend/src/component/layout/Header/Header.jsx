import  { useEffect, useState } from 'react';
import './Header.css'; // CSS file for styling
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const navbarClass = scrollPosition > 50 ? 'navbar scrolled' : 'navbar';
  return (
    <nav className={navbarClass}>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/">Home</Link></li>
        <li className="nav-item"><Link to="/products">Products</Link></li>
        <li className="nav-item"><Link to="/contact">Contact</Link></li>
        <li className="nav-item"><Link to="/about">About</Link></li>
        <Link to="/search">
        <li className="nav-item">
          <input type="text" placeholder="Search" />
        </li>
        </Link>
        <li className="nav-item"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
