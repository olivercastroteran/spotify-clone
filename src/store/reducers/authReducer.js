const initState = {
  isLoggedIn: false,
  loading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'LOGIN_USER':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
