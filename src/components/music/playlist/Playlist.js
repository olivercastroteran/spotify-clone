import './Playlist.scss';

const Playlist = ({ title }) => {
  return (
    <div className="playlist">
      <p>{title}</p>
    </div>
  );
};

export default Playlist;
