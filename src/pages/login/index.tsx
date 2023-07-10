import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  function hdlLogin(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin({
      name: e.target.value,
    });
  }

  async function hdlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLogin({ name: '' });
    setLoading(true);
    await createUser(login);
    setLoading(false);
    navigate('/search');
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section className="section">
        <h2 className="logo">
          Trybetunes
        </h2>
        <form onSubmit={ hdlSubmit } className="login">
          <input
            required
            placeholder="Como você se chama?"
            data-testid="login-name-input"
            value={ login.name }
            onChange={ hdlLogin }
          />
          <button
            disabled={ login.name.length < 3 }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
}
