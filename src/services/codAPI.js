import { login, platforms, Warzone } from 'call-of-duty-api';

const ssoToken =
  'MTA4Mjc0MjU0Nzg5NDcyNDUwNDg6MTY1NTM4NTE3OTk1NToyN2ZlZTljZWUzMjllNTkxOTAzMTE5MDc5Njk1ZTYzYw';

function Login() {
  return login(ssoToken);
}

function warzoneData(gamertag, platform) {
  return Warzone.fullData(gamertag, platform);
}

export default { Login, warzoneData };
