import './PlaylistInfo.scss';
import { getDuration } from './getDuration';

const PlaylistInfo = ({ title, songs }) => {
  return (
    <div className="playlist-info">
      <h1>{title}</h1>
      <p>
        {songs && songs.length} songs: {getDuration(songs)}
      </p>
    </div>
  );
};

export default PlaylistInfo;
