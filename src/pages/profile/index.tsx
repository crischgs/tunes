import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import './profile.css';

export default function Profile() {
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '' });
  const [loading, setLoading] = useState(true);

  getUser().then(
    (userData) => {
      setUser(userData);
      setLoading(false);
    },
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="profile">
        <img src={ user.image } alt="profile picture" data-testid="profile-image" />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.description}</p>
        <Link to="/profile/edit">
          <button>edit profile</button>
        </Link>
      </section>
    </main>
  );
}
