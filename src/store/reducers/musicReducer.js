const initState = {
  playlists: [],
  current: {
    playlistIndex: 0,
    songIndex: 0,
  },
  controls: {
    isRandom: false,
    isLooping: true,
  },
};

export const musicReducer = (state = initState, action) => {
  const { playlists } = state;
  const { playlistIndex, songIndex } = state.current;
  const { isRandom } = state.controls;

  switch (action.type) {
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.payload,
      };
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        current: {
          ...state.current,
          playlistIndex: action.payload,
        },
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        current: {
          ...state.current,
          songIndex: action.payload,
        },
      };
    case 'TOGGLE_RANDOM':
      return {
        ...state,
        controls: {
          ...state.controls,
          isRandom: !state.controls.isRandom,
        },
      };
    case 'TOGGLE_LOOP':
      return {
        ...state,
        controls: {
          ...state.controls,
          isLooping: !state.controls.isLooping,
        },
      };
    case 'PLAY_PREV_SONG':
      if (songIndex <= 0 && !isRandom) {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: playlists[playlistIndex].songs.length - 1,
          },
        };
      } else if (songIndex <= 0 && isRandom) {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: Math.floor(
              Math.random() * playlists[playlistIndex].songs.length
            ),
          },
        };
      } else {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: state.current.songIndex - 1,
          },
        };
      }
    case 'PLAY_NEXT_SONG':
      if (songIndex >= playlists[playlistIndex].songs.length - 1 && !isRandom) {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: 0,
          },
        };
      } else if (
        songIndex >= playlists[playlistIndex].songs.length - 1 &&
        isRandom
      ) {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: Math.floor(
              Math.random() * playlists[playlistIndex].songs.length
            ),
          },
        };
      } else if (isRandom) {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: Math.floor(
              Math.random() * playlists[playlistIndex].songs.length
            ),
          },
        };
      } else {
        return {
          ...state,
          current: {
            ...state.current,
            songIndex: state.current.songIndex + 1,
          },
        };
      }
    default:
      return state;
  }
};
