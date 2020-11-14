import { useEffect, useState } from 'react';
import './Playlists.scss';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistItem from './Playlist/PlaylistItem';
import Spinner from '../../../../components/UI/spinner/Spinner';
import useFirestore from '../../../../hooks/useFirestore';
import { setPlaylists } from '../../../../store/actions/musicActions';

const Playlists = () => {
  const { docs } = useFirestore('playlists');
  const playlists = useSelector((state) => state.music.playlists);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
    dispatch(setPlaylists(docs));
  }, [docs, dispatch]);

  return (
    <div className="playlists">
      <div className="playlists__container">
        {!isLoading && <Spinner />}
        {playlists?.map((playlist) => {
          return <PlaylistItem key={playlist.id} {...playlist} />;
        })}
      </div>
    </div>
  );
};

export default Playlists;
