import { useEffect, useState } from 'react';
import './Sidebar.scss';
import { HomeIcon, FavoriteIcon, UserIcon } from '../../assets/icons';
import { SpotifyIcon, ProIcon } from '../../assets/images';
import { Link, NavLink } from 'react-router-dom';
import Playlist from '../music/playlist/Playlist';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../UI/spinner/Spinner';
import useFirestore from '../../hooks/useFirestore';
import { setPlaylists } from '../../store/actions/musicActions';
import { openInfo } from '../../store/actions/infoActions';

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { docs } = useFirestore('playlists');
  const playlists = useSelector((state) => state.music.playlists);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPlaylists(docs));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [docs, dispatch]);

  return (
    <div className="sidebar">
      <Link to="/">
        <h1 className="sidebar__title">
          <SpotifyIcon />
          <span>
            Spotify<small>clone</small>
          </span>
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

      <div className="sidebar__playlists">
        <h4>PLAYLISTS</h4>
        {isLoading && <Spinner />}
        {playlists?.map((playlist) => (
          <Playlist key={playlist.id} title={playlist.title} />
        ))}
      </div>

      <div className="sidebar__info">
        <ProIcon />
        <button
          className="sidebar__info--btn"
          onClick={() => dispatch(openInfo())}
        >
          APP INFO
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
