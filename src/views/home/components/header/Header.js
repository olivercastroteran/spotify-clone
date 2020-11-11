import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import { ReactComponent as GoBackIcon } from '../../../../assets/icons/go-back.svg';
import { ReactComponent as UserIcon } from '../../../../assets/icons/user.svg';

const Header = () => {
  const history = useHistory();

  return (
    <div className="header">
      <div className="header__go-back" onClick={() => history.goBack()}>
        <GoBackIcon />
      </div>

      <div className="header__search">
        <input type="text" />
        <button className="header__search--btn">Search</button>
      </div>

      <Link to="/user" className="header__user">
        <UserIcon />
        <span>Oliver CT</span>
      </Link>
    </div>
  );
};

export default Header;
