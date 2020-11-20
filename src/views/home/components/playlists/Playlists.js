import './Playlists.scss';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistItem from './Playlist/PlaylistItem';
import { setCurrentPlaylist } from '../../../../store/actions/musicActions';

const Playlists = () => {
  const playlists = useSelector((state) => state.music.playlists);
  const dispatch = useDispatch();

  const changePlaylist = (index) => {
    dispatch(setCurrentPlaylist(index));
  };

  return (
    <div className="playlists">
      <div className="playlists__container">
        {playlists?.map((playlist, index) => {
          return (
            <PlaylistItem
              key={playlist.id}
              {...playlist}
              changePlaylist={changePlaylist}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Playlists;
