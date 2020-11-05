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
