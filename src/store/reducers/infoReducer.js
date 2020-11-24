const initState = {
  isOpen: false,
  isSidebarOpen: false,
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
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};
