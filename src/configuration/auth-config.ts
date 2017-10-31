const authConfig = {
  endpoint: 'dev',
  configureEndpoints: ['dev'],
  signupUrl: 'user',
  loginUrl: 'auth/signin',
  profileUrl: 'auth/user',
  loginRoute: '#/auth/signin',
  loginRedirect: '#/content',
  logoutRedirect: '#/auth/signin'
};

export default authConfig;
