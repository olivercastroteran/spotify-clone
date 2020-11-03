import './Sidebar.scss';
import { ReactComponent as SpotifyIcon } from '../../assets/images/spotify.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as FavoriteIcon } from '../../assets/icons/favorite.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="sidebar__title">
          <SpotifyIcon />
          <span>Spotify</span>
        </h1>
      </Link>

      <nav className="sidebar__links">
        <NavLink exact to="/" className="sidebar__links--item">
          <HomeIcon />
          <span>Home</span>
        </NavLink>

        <NavLink to="/favorites" className="sidebar__links--item">
          <FavoriteIcon />
          <span>Favorites</span>
        </NavLink>

        <NavLink to="/user" className="sidebar__links--item">
          <UserIcon />
          <span>User</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
