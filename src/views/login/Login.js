import { useState } from 'react';
import './Login.scss';
import { ReactComponent as SpotifyIcon } from '../../assets/images/spotify.svg';
import { auth } from '../../config/fbConfig';
import { useSelector, useDispatch } from 'react-redux';
import {
  loginAction,
  setLoading,
  setUser,
} from '../../store/actions/authActions';
import Spinner from '../../components/UI/spinner/Spinner';

const Login = () => {
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const checkError = () => {
    let isValid;

    if (email !== 'test@test.com' && password !== 'Test123') {
      setIsError(true);
      setMessage(
        `Please enter 'test@test.com' for Email and 'Test123' for Password`
      );
      isValid = false;
      return isValid;
    } else if (email !== 'test@test.com') {
      setIsError(true);
      setMessage(`Please enter 'test@test.com' for Email`);
      isValid = false;
      return isValid;
    } else if (password !== 'Test123') {
      setIsError(true);
      setMessage(`Please enter 'Test123' for Password`);
      isValid = false;
      return isValid;
    }

    setIsError(false);
    isValid = true;
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const isValid = checkError();

    isValid &&
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {
            //console.log(auth);
            const user = {
              email: auth.user.email,
              uid: auth.user.uid,
            };
            dispatch(setLoading(false));
            dispatch(loginAction(isValid));
            dispatch(setUser(user));
          }
        })
        .catch((err) => alert(err.message));
  };

  const handleDemoLogin = () => {
    dispatch(setLoading(true));
    auth
      .signInWithEmailAndPassword('test@test.com', 'Test123')
      .then((auth) => {
        if (auth) {
          //console.log(auth);
          const user = {
            email: auth.user.email,
            uid: auth.user.uid,
          };
          dispatch(setLoading(false));
          dispatch(loginAction(true));
          dispatch(setUser(user));
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <SpotifyIcon />
        <span>
          Spotify<small>clone</small>
        </span>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            value={email}
            placeholder="test@test.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login__field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Test123"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login__btn">Login</button>
        <button
          className="login__btn demo"
          type="button"
          onClick={handleDemoLogin}
        >
          Demo Login
        </button>

        {isError && <p className="login__error-msg">{message}</p>}
      </form>

      {loading && <Spinner />}
    </div>
  );
};

export default Login;
