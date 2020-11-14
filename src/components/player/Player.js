import { useState, useEffect, useCallback, useRef } from 'react';
import './Player.scss';
import { ReactComponent as AlbumIcon } from '../../assets/images/album.svg';
import {
  PlayIcon,
  PauseIcon,
  ArrowIcon,
  RandomIcon,
  LoopIcon,
} from '../../assets/icons';

const Player = ({ currentPlaylist }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [songIndex, setSongIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [isRandom, setIsRandom] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:00');
  const [progressPercent, setProgressPercent] = useState(0);
  const progressRef = useRef();

  useEffect(() => {
    const newPLaylist = currentPlaylist?.songs.map(
      (song) => new Audio(song.src)
    );
    setPlaylist(newPLaylist);

    let currentAudio =
      playlist && playlist?.find((audio) => false === audio.paused);

    if (currentAudio) {
      currentAudio.pause();
    }
    // eslint-disable-next-line
  }, [currentPlaylist]);

  const playSong = useCallback(() => {
    setIsPlaying(true);

    let playPromise = playlist ? playlist[songIndex]?.play() : null;

    if (playPromise !== undefined) {
      playlist &&
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
    playlist && playlist[songIndex]?.pause();
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
    playlist &&
      playlist[songIndex]?.addEventListener('timeupdate', updateProgress);
    if (isLooping) {
      playlist && playlist[songIndex]?.addEventListener('ended', nextSong);
    } else if (!isLooping) {
      playlist &&
        playlist[songIndex]?.addEventListener('ended', () => {
          setIsPlaying(false);
          playlist[songIndex].currentTime = 0;
          setCurrentTime('0:00');
        });
    }
    return () => {
      playlist &&
        playlist[songIndex]?.removeEventListener('timeupdate', updateProgress);
      playlist && playlist[songIndex]?.removeEventListener('ended', nextSong);
      playlist &&
        playlist[songIndex]?.removeEventListener('ended', () => {
          setIsPlaying(false);
          playlist[songIndex].currentTime = 0;
          setCurrentTime('0:00');
        });
    };
  }, [playlist, isLooping, songIndex, nextSong, updateProgress, pauseSong]);

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
          <p className="player__album--title">
            {currentPlaylist ? currentPlaylist.songs[songIndex].title : 'Title'}
          </p>
          <p className="player__album--artist">
            {currentPlaylist
              ? currentPlaylist.songs[songIndex].artist
              : 'Artist'}
          </p>
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
