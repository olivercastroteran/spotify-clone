const initState = {
  isLoggedIn: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};
