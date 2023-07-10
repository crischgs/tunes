import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../types';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import './profileEdit.css';

export default function ProfileEdit() {
  const firstState = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserType>(firstState);
  const [btnDisable, setBtnDisable] = useState(true);
  const { description, email, image, name: loginName } = userInfo;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      const getUserInfo = await getUser();
      setUserInfo(getUserInfo);
      setLoading(false);
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const emailValidator = /^\w+@\w+\.[com]+$/;
    if (
      description
      && image
      && loginName
      && emailValidator.test(email)
    ) setBtnDisable(false);
    else setBtnDisable(true);
  }, [description, email, image, loginName]);

  const hdlChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const hdlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateUser(userInfo);
    setLoading(false);
    navigate('/profile');
  };

  if (loading) return <Loading />;

  return (
    <main>
      <section>
        <form onSubmit={ hdlSubmit } className="edit">
          <img
            src={ image }
            alt="profile picture"
            width="100px"
          />
          <label>
            avatar
            <input
              type="text"
              name="image"
              placeholder="enter a url"
              value={ image }
              onChange={ hdlChange }
              data-testid="edit-input-image"
            />
          </label>
          <label>
            name
            <input
              type="text"
              name="name"
              placeholder="your name"
              value={ loginName }
              onChange={ hdlChange }
              data-testid="edit-input-name"
            />
          </label>
          <label>
            email
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              value={ email }
              onChange={ hdlChange }
              data-testid="edit-input-email"
            />
          </label>
          <label>
            about
            <textarea
              name="description"
              id="user-description"
              placeholder="talk about yourself"
              value={ description }
              onChange={ hdlChange }
              data-testid="edit-input-description"
            />
          </label>
          <p>
            all fields are mandatory
          </p>
          <button
            disabled={ btnDisable }
            data-testid="edit-button-save"
          >
            save
          </button>
        </form>
      </section>
    </main>
  );
}
