import { useState } from 'react';
import './Song.scss';
import { ReactComponent as LikeIcon } from '../../../assets/icons/like.svg';

const Song = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={selected ? 'song selected' : 'song'}
      onClick={() => setSelected(!selected)}
    >
      <LikeIcon />
      <p className="song__title">Bienvenido</p>
      <p className="song__artist">Phil Collins</p>
    </div>
  );
};

export default Song;
