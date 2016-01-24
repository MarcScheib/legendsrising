let authConfig = {
  baseUrl: '/',
  signupUrl: 'user',
  loginUrl: 'auth/signin',
  profileUrl: 'auth/user',
  tokenName: 'token',
  loginRoute: '#/auth/signin',
  loginRedirect: '#/contents',
  logoutRedirect: '#/auth/signin'
};

export default authConfig;
