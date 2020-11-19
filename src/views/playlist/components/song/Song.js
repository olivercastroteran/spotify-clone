import './Song.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as LikeIcon } from '../../../../assets/icons/like.svg';
import { db } from '../../../../config/fbConfig';
import {
  addToFavorites,
  removeFromFavorites,
  setCurrentSong,
} from '../../../../store/actions/musicActions';

const Song = ({ title, artist, songIndex, index, src, duration, id }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.music.playlists);
  const playlistIndex = useSelector(
    (state) => state.music.current.playlistIndex
  );
  const song = useSelector(
    (state) => state.music.playlists[playlistIndex].songs[index]
  );

  const selectSong = () => {
    dispatch(setCurrentSong(index));
  };

  const handleFavorites = () => {
    const songData = {
      id,
      title,
      artist,
      src,
      duration,
    };
    if (!song.isFavorite) {
      const songToUpdateIndex = playlists[playlistIndex].songs.findIndex(
        (song) => song.id === id
      );
      const playlistToUpdated = { ...playlists[playlistIndex] };

      playlistToUpdated.songs[songToUpdateIndex] = {
        ...songData,
        isFavorite: true,
      };

      db.collection('playlists')
        .doc(playlistToUpdated.id)
        .set({ ...playlistToUpdated })
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });

      dispatch(addToFavorites(songData));
    } else if (song.isFavorite) {
      const songToUpdateIndex = playlists[playlistIndex].songs.findIndex(
        (song) => song.id === id
      );
      const playlistToUpdated = { ...playlists[playlistIndex] };

      playlistToUpdated.songs[songToUpdateIndex] = {
        ...songData,
        isFavorite: false,
      };

      db.collection('playlists')
        .doc(playlistToUpdated.id)
        .set({ ...playlistToUpdated })
        .then(function () {
          console.log('Document successfully written!');
        })
        .catch(function (error) {
          console.error('Error writing document: ', error);
        });
      dispatch(removeFromFavorites(songData));
    }
  };

  return (
    <div className={index === songIndex ? 'song selected' : 'song'}>
      <LikeIcon
        onClick={handleFavorites}
        className={song.isFavorite ? 'song__favorite' : ''}
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
