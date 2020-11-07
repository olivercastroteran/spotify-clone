import { useState } from 'react';
import './Player.scss';
import { ReactComponent as AlbumIcon } from '../../assets/images/album.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowIcon.svg';
import { ReactComponent as RandomIcon } from '../../assets/icons/random.svg';
import { ReactComponent as LoopIcon } from '../../assets/icons/loop.svg';
import sound1 from '../../assets/music/bienvenido-phil_collins.mp3';
import sound2 from '../../assets/music/no_me_preocupo-oliver.mp3';
import sound3 from '../../assets/music/por_siempre_tu_amistad-mijares.mp3';

const song1 = new Audio(sound1);
const song2 = new Audio(sound2);
const song3 = new Audio(sound3);

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist] = useState([song1, song2, song3]);
  const [songIndex, setSongIndex] = useState(0);

  const playSong = () => {
    setIsPlaying(true);
    playlist[songIndex].play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    playlist[songIndex].pause();
  };

  const prevSong = () => {
    pauseSong();
    setSongIndex((prevSongIndex) => {
      if (prevSongIndex <= 0) {
        return (prevSongIndex = playlist.length - 1);
      }
      return prevSongIndex - 1;
    });
  };

  const nextSong = () => {
    pauseSong();
    setSongIndex(songIndex + 1);

    if (songIndex >= playlist.length - 1) {
      setSongIndex(0);
    }
  };

  return (
    <div className="player">
      <div className="player__album">
        <div className="player__album--img">
          <AlbumIcon />
        </div>
        <div className="player__album--data">
          <p className="player__album--title">Title</p>
          <p className="player__album--artist">Artist {songIndex}</p>
        </div>
      </div>

      <div className="player__progress">
        <p>2:30</p>
        <div className="player__progress--container">
          <div className="player__progress--bar"></div>
        </div>
        <p>3:20</p>
      </div>

      <div className="player__controls">
        <RandomIcon />
        <ArrowIcon className="previous" onClick={prevSong} />
        {isPlaying ? (
          <PauseIcon className="play-pause-btn" onClick={pauseSong} />
        ) : (
          <PlayIcon
            className="play-pause-btn"
            onClick={() => playSong(songIndex)}
          />
        )}
        <ArrowIcon onClick={nextSong} />
        <LoopIcon />
      </div>
    </div>
  );
};

export default Player;
