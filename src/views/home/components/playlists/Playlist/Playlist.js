import './Playlist.scss';
import { ReactComponent as AlbumIcon } from '../../../../../assets/icons/album.svg';

const PlaylistItem = ({ title, songs }) => {
  return (
    <div className="playlistItem">
      <div className="playlistItem-left">
        <AlbumIcon />
      </div>
      <div className="playlistItem-right">
        <h3>{title}</h3>
        <p>{songs.length} songs</p>
      </div>
    </div>
  );
};

export default PlaylistItem;
