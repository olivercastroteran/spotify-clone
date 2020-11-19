export const loginAction = (isValid) => {
  return {
    type: 'LOGIN_USER',
    payload: isValid,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: 'SET_LOADING',
    payload: isLoading,
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};
