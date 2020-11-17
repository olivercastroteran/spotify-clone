export const setPlaylists = (playlists) => {
  return {
    type: 'SET_PLAYLISTS',
    payload: playlists,
  };
};

export const setCurrentPlaylist = (playlistIndex) => {
  return {
    type: 'SET_CURRENT_PLAYLIST',
    payload: playlistIndex,
  };
};

export const setCurrentSong = (songIndex) => {
  return {
    type: 'SET_CURRENT_SONG',
    payload: songIndex,
  };
};

export const playNextSong = (index) => {
  return {
    type: 'PLAY_NEXT_SONG',
    payload: index,
  };
};
