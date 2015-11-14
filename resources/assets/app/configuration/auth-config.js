let authConfig = {
  baseUrl: 'http://lr.local',
  // The API specifies that new users register at the POST /users enpoint
  signupUrl: 'api/user',
  // Logins happen at the POST /sessions/create endpoint
  loginUrl: 'api/session',
  // The API serves its tokens with a key of id_token which differs from
  // aurelia-auth's standard
  tokenName: 'id_token',
  // Once logged in, we want to redirect the user to the welcome view
  loginRedirect: '/'
};

export default authConfig;
