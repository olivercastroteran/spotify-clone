import './FavSong.scss';

const FavSong = ({ title, artist }) => {
  return (
    <div className="fav-song">
      <p className="fav-song__title">{title}</p>
      <p className="fav-song__artist">{artist}</p>
    </div>
  );
};

export default FavSong;
