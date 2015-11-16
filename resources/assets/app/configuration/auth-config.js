let authConfig = {
  baseUrl: 'http://lr.local/api',
  signupUrl: 'user',
  loginUrl: 'auth/signin',
  // The API serves its tokens with a key of id_token which differs from
  // aurelia-auth's standard
  tokenName: 'id_token',
  // Once logged in, we want to redirect the user to the welcome view
  loginRedirect: '/'
};

export default authConfig;
