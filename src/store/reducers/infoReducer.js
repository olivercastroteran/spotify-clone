const initState = {
  isOpen: false,
};

export const infoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'OPEN_INFO':
      return {
        ...state,
        isOpen: true,
      };
    case 'CLOSE_INFO':
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};
