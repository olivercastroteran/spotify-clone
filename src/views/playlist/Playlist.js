import { useEffect } from 'react';
import './Playlist.scss';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Header } from '../home/components';
import Song from './components/song/Song';
import PlaylistInfo from './components/PlaylistInfo/PlaylistInfo';

const Playlist = () => {
  const history = useHistory();
  const playlistIndex = useSelector(
    (state) => state.music.current.playlistIndex
  );
  const songIndex = useSelector((state) => state.music.current.songIndex);
  const currentPlaylist = useSelector(
    (state) => state.music.playlists[playlistIndex]
  );

  useEffect(() => {
    window.addEventListener('DOMContentLoaded', () => {
      history.push('/');
    });
    return () => {
      window.removeEventListener('DOMContentLoaded', () => {
        history.push('/');
      });
    };
  }, [history]);

  return (
    <div className="playlist-container">
      <Header />
      <PlaylistInfo {...currentPlaylist} />
      <div className="playlist-container__table">
        <div className="playlist-container__title">
          <p>Title</p>
          <p>Artist</p>
        </div>
        <div className="playlist-container__songs">
          {currentPlaylist &&
            currentPlaylist.songs.map((song, index) => {
              const id = Math.floor(Math.random() * 10000000);
              return (
                <Song
                  key={id}
                  {...song}
                  index={index}
                  songIndex={songIndex}
                  id={id}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
