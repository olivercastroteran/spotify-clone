import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as GoBackIcon } from '../../../../assets/icons/go-back.svg';
import { ReactComponent as UserIcon } from '../../../../assets/icons/user.svg';
import { toggleSidebar } from '../../../../store/actions/infoActions';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.info.isSidebarOpen);

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

      <div
        className={`app__menu ${isSidebarOpen && 'close'}`}
        onClick={() => dispatch(toggleSidebar())}
      >
        <div className="bar-1"></div>
        <div className="bar-2"></div>
        <div className="bar-3"></div>
      </div>
    </div>
  );
};

export default Header;
