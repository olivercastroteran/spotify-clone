import './PlaylistItem.scss';
import { ReactComponent as AlbumIcon } from '../../../../../assets/icons/album.svg';
import { Link } from 'react-router-dom';

const PlaylistItem = ({ title, songs, id }) => {
  return (
    <Link to={`/playlist/${id}`} className="playlistItem">
      <div className="playlistItem-left">
        <AlbumIcon />
      </div>
      <div className="playlistItem-right">
        <h3>{title}</h3>
        <p>{songs.length} songs</p>
      </div>
    </Link>
  );
};

export default PlaylistItem;
