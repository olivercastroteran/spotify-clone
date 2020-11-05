export const loginAction = (isValid) => {
  return {
    type: 'LOGIN_USER',
    payload: isValid,
  };
};
