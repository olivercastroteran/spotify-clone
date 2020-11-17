import { useEffect, useState } from 'react';
import './Playlists.scss';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistItem from './Playlist/PlaylistItem';
import Spinner from '../../../../components/UI/spinner/Spinner';
import useFirestore from '../../../../hooks/useFirestore';
import {
  setCurrentPlaylist,
  setPlaylists,
} from '../../../../store/actions/musicActions';

const Playlists = () => {
  const { docs } = useFirestore('playlists');
  const playlists = useSelector((state) => state.music.playlists);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
    dispatch(setPlaylists(docs));
  }, [docs, dispatch]);

  const changePlaylist = (index) => {
    dispatch(setCurrentPlaylist(index));
  };

  return (
    <div className="playlists">
      <div className="playlists__container">
        {!isLoading && <Spinner />}
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
