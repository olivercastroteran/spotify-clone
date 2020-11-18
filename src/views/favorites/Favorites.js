import './Favorites.scss';
import Header from '../home/components/header/Header';
import { useSelector } from 'react-redux';
import { getDuration } from '../playlist/components/PlaylistInfo/getDuration';
import FavSong from './favSong/FavSong';

const Favorites = () => {
  const favorites = useSelector((state) => state.music.favorites);

  return (
    <div className="favorites">
      <Header />

      <div className="favorites__info">
        <h2 className="favorites__title">Favorites Songs</h2>
        <p>
          {favorites && favorites.length} songs: {getDuration(favorites)}
        </p>
      </div>

      <div className="favorites__table">
        <div className="favorites__table--title">
          <p>Title</p>
          <p>Artist</p>
        </div>

        <div className="favorites__playlist--songs">
          {favorites &&
            favorites.map((song) => <FavSong key={song.id} {...song} />)}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
