import { useEffect, useState } from 'react';
import './Song.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as LikeIcon } from '../../../../assets/icons/like.svg';
import {
  addToFavorites,
  removeFromFavorites,
  setCurrentSong,
} from '../../../../store/actions/musicActions';

const Song = ({ title, artist, songIndex, index, src, duration, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.music.favorites);

  const selectSong = () => {
    dispatch(setCurrentSong(index));
  };

  const handleAddToFavorites = () => {
    const song = {
      id,
      title,
      artist,
      src,
      duration,
    };
    if (!isFavorite) {
      dispatch(addToFavorites(song));
    } else if (isFavorite) {
      dispatch(removeFromFavorites(id));
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    favorites.forEach((favorite) => {
      if (favorite.id === id) {
        setIsFavorite(true);
      }
    });
  }, [favorites, id]);

  return (
    <div className={index === songIndex ? 'song selected' : 'song'}>
      <LikeIcon
        onClick={handleAddToFavorites}
        className={isFavorite ? 'song__favorite' : ''}
      />
      <p className="song__title" onClick={selectSong}>
        {title}
      </p>
      <p className="song__artist" onClick={selectSong}>
        {artist}
      </p>
    </div>
  );
};

export default Song;
