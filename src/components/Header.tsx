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
          Buscar
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritos
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </NavLink>
      </div>
      <h2>
        Trybetunes
      </h2>
      <div className="userName">
        <p data-testid="header-user-name">
          { 'Olá, ' }
          { userName }
          !
        </p>
      </div>
    </header>
  );
}
