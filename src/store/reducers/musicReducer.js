const initState = {
  playlists: [],
};

export const musicReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.payload,
      };
    default:
      return state;
  }
};
