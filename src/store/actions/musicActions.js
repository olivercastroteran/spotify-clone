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

export const addToFavorites = (song) => {
  return {
    type: 'ADD_TO_FAVORITES',
    payload: song,
  };
};

export const removeFromFavorites = (song) => {
  return {
    type: 'REMOVE_FROM_FAVORITES',
    payload: song,
  };
};
