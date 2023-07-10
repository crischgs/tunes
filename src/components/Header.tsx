import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default function Header() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  getUser().then((user) => { setUserName(user.name); setLoading(false); });

  if (loading) {
    return (<Loading />);
  }

  return (
    <header data-testid="header-component">
      <div className="menu">
        <NavLink
          to="/search"
          data-testid="link-to-search"
        >
          search
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
        >
          favorites
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
        >
          profile
        </NavLink>
      </div>
      <h2>
        tunes.
      </h2>
      <div className="userName">
        <p data-testid="header-user-name">
          { 'hello, ' }
          { userName }
        </p>
      </div>
    </header>
  );
}
