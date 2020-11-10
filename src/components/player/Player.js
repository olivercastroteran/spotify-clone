import { useState, useEffect, useCallback, useRef } from 'react';
import './Player.scss';
import { ReactComponent as AlbumIcon } from '../../assets/images/album.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play.svg';
import { ReactComponent as PauseIcon } from '../../assets/icons/pause.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowIcon.svg';
import { ReactComponent as RandomIcon } from '../../assets/icons/random.svg';
import { ReactComponent as LoopIcon } from '../../assets/icons/loop.svg';

import sound1 from '../../assets/music/bienvenido-phil_collins.mp3';
import sound2 from '../../assets/music/el_dorado-mijares.mp3';
import sound3 from '../../assets/music/no_me_preocupo-oliver.mp3';
import sound4 from '../../assets/music/por_siempre_tu_amistad-mijares.mp3';

const song1 = new Audio(sound1);
const song2 = new Audio(sound2);
const song3 = new Audio(sound3);
const song4 = new Audio(sound4);

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist] = useState([song1, song2, song3, song4]);
  const [songIndex, setSongIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isRandom, setIsRandom] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:00');
  const [progressPercent, setProgressPercent] = useState(0);
  const progressRef = useRef();

  const playSong = useCallback(() => {
    setIsPlaying(true);

    let playPromise = playlist[songIndex].play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log('autoplay');
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log('playback prevented');
          setIsPlaying(false);
        });
    }
  }, [playlist, songIndex]);

  const pauseSong = useCallback(() => {
    setIsPlaying(false);
    playlist[songIndex].pause();
  }, [playlist, songIndex]);

  const prevSong = () => {
    pauseSong();

    setSongIndex((prevSongIndex) => {
      if (prevSongIndex <= 0 && !isRandom) {
        return (prevSongIndex = playlist.length - 1);
      } else if (prevSongIndex <= 0 && isRandom) {
        return (prevSongIndex = Math.floor(Math.random() * playlist.length));
      }
      return prevSongIndex - 1;
    });
  };

  const nextSong = useCallback(() => {
    pauseSong();

    setSongIndex((prevSongIndex) => {
      if (prevSongIndex >= playlist.length - 1 && !isRandom) {
        return (prevSongIndex = 0);
      } else if (prevSongIndex >= playlist.length - 1 && isRandom) {
        return (prevSongIndex = Math.floor(Math.random() * playlist.length));
      } else if (isRandom) {
        return (prevSongIndex = Math.floor(Math.random() * playlist.length));
      }
      return prevSongIndex + 1;
    });

    playlist[songIndex].currentTime = 0;
    setCurrentTime('0:00');
  }, [pauseSong, isRandom, playlist, songIndex]);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);

    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
  };

  const updateProgress = useCallback((e) => {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    setCurrentTime(formatTime(currentTime));
    setDuration(formatTime(duration));
    setProgressPercent(percent);
  }, []);

  function setProgress(e) {
    console.log('click');
    const width = progressRef.current.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = playlist[songIndex].duration;

    playlist[songIndex].currentTime = (clickX / width) * duration;
    setCurrentTime((clickX / width) * duration);
  }

  useEffect(() => {
    playSong();
  }, [songIndex, playSong]);

  useEffect(() => {
    playlist[songIndex].addEventListener('timeupdate', updateProgress);
    if (isLooping) {
      playlist[songIndex].addEventListener('ended', nextSong);
    } else if (!isLooping) {
      playlist[songIndex].addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }
    return () => {
      playlist[songIndex].removeEventListener('timeupdate', updateProgress);
      playlist[songIndex].removeEventListener('ended', nextSong);
      playlist[songIndex].removeEventListener('ended', () => {
        setIsPlaying(false);
      });
    };
  }, [playlist, isLooping, songIndex, nextSong, updateProgress]);

  useEffect(() => {
    setIsPlaying(false);
  }, []);

  const style = {
    borderRadius: '20px',
    backgroundColor: '#1db954',
    width: `${progressPercent}%`,
    height: '7px',
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
        <p>{currentTime}</p>
        <div
          ref={progressRef}
          className="player__progress--container"
          onClick={setProgress}
        >
          <div className="player__progress--bar" style={style}></div>
        </div>
        <p>{duration}</p>
      </div>

      <div className="player__controls">
        <RandomIcon
          className={isRandom ? 'random' : ''}
          onClick={() => {
            !isRandom && nextSong();
            setIsRandom(!isRandom);
          }}
        />
        {isRandom && <div className="dotr"></div>}

        <ArrowIcon className="previous" onClick={prevSong} />

        {isPlaying ? (
          <PauseIcon className="play-pause-btn" onClick={pauseSong} />
        ) : (
          <PlayIcon className="play-pause-btn" onClick={playSong} />
        )}

        <ArrowIcon onClick={nextSong} />

        <LoopIcon
          className={isLooping ? 'loop' : ''}
          onClick={() => setIsLooping(!isLooping)}
        />
        {isLooping && <div className="dotl"></div>}
      </div>
    </div>
  );
};

export default Player;
