import './User.scss';
import { UserIcon } from '../../assets/icons/';
import { useSelector } from 'react-redux';
import { Header } from '../home/components';

const User = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="user">
      <Header />
      <h1>
        User: <span>{user.email}</span>
      </h1>
      <div className="user__logo">
        <UserIcon />
      </div>
      <p>
        Contact:{' '}
        <a href="https://oliverct.com/" target="_blank" rel="noreferrer">
          oliverct.com
        </a>
      </p>
    </div>
  );
};

export default User;
