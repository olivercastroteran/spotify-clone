import { useEffect, useState } from 'react';
import './Playlists.scss';
import PlaylistItem from './Playlist/Playlist';
import Spinner from '../../../../components/UI/spinner/Spinner';
import useFirestore from '../../../../hooks/useFirestore';

const Playlists = () => {
  const { playlists } = useFirestore('playlists');
  console.log(playlists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
  }, [playlists]);

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
