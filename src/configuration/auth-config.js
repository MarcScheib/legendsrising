let authConfig = {
  baseUrl: 'http://lr.local/api',
  signupUrl: 'user',
  loginUrl: 'auth/signin',
  tokenName: 'token',
  loginRoute: 'auth/signin',
  loginRedirect: '#/contents',
  logoutRedirect: '#/auth/signin'
};

export default authConfig;
