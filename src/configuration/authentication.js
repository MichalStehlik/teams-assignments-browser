export const config = {
  clientId: "23fff384-385d-4886-b9ae-9d34250d564a",
  authority: 'https://login.microsoftonline.com/e7bf04a2-63c8-4a47-a0bd-28d0aa88f6ec',
  redirectUri: window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/login-callback",
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  scopes: [
    'User.Read',
    'EduRoster.Read',
    'Files.ReadWrite.All',
    "EduAssignments.Read"
  ]
};