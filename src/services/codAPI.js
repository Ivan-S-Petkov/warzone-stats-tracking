const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36';
let baseCookie = 'new_SiteId=cod;ACT_SSO_LOCALE=en_US;country=US;';
let baseSsoToken =
  'MTA4Mjc0MjU0Nzg5NDcyNDUwNDg6MTY1NTM4NTE3OTk1NToyN2ZlZTljZWUzMjllNTkxOTAzMTE5MDc5Njk1ZTYzYw';
let baseHeaders = {
  'content-type': 'application/json',
  cookie: baseCookie,
  'user-agent': userAgent,
};
let basePostHeaders = {
  'content-type': 'text/plain',
  cookie: baseCookie,
  'user-agent': userAgent,
};
let baseUrl = 'https://my.callofduty.com';
let apiPath = '/api/papi-client';
let loggedIn = false;

var platforms;
(function (platforms) {
  platforms['All'] = 'all';
  platforms['Activision'] = 'acti';
  platforms['Battlenet'] = 'battle';
  platforms['PSN'] = 'psn';
  platforms['Steam'] = 'steam';
  platforms['Uno'] = 'uno';
  platforms['XBOX'] = 'xbl';
})(platforms || (platforms = {}));
exports.platforms = platforms;

var friendActions;
(function (friendActions) {
  friendActions['Invite'] = 'invite';
  friendActions['Uninvite'] = 'uninvite';
  friendActions['Remove'] = 'remove';
  friendActions['Block'] = 'block';
  friendActions['Unblock'] = 'unblock';
})(friendActions || (friendActions = {}));
exports.friendActions = friendActions;

const sendRequest = async (url) => {
  try {
    if (!loggedIn) throw new Error('Not Logged In.');
    let requestUrl = `${baseUrl}${apiPath}${url}`;
    const res = await fetch(requestUrl, {
      headers: baseHeaders,
    });
    let response = await res.json();
    return response;
  } catch (exception) {
    throw exception;
  }
};
const sendPostRequest = async (url, data) => {
  try {
    if (!loggedIn) throw new Error('Not Logged In.');
    let requestUrl = `${baseUrl}${apiPath}${url}`;
    const res = await fetch(requestUrl, {
      method: 'POST',
      headers: basePostHeaders,
      body: data,
    });
    let response = await res.json();
    return response;
  } catch (exception) {
    throw exception;
  }
};
const cleanClientName = (gamertag) => {
  return encodeURIComponent(gamertag);
};
const login = (ssoToken) => {
  if (!ssoToken || ssoToken.trim().length <= 0) {
    return false;
  }
  let fakeXSRF = '68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041';
  baseHeaders['X-XSRF-TOKEN'] = fakeXSRF;
  baseHeaders['X-CSRF-TOKEN'] = fakeXSRF;
  baseHeaders['Atvi-Auth'] = ssoToken;
  baseHeaders['ACT_SSO_COOKIE'] = ssoToken;
  baseHeaders['atkn'] = ssoToken;
  baseHeaders[
    'cookie'
  ] = `${baseCookie}ACT_SSO_COOKIE=${ssoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
  baseSsoToken = ssoToken;
  basePostHeaders['X-XSRF-TOKEN'] = fakeXSRF;
  basePostHeaders['X-CSRF-TOKEN'] = fakeXSRF;
  basePostHeaders['Atvi-Auth'] = ssoToken;
  basePostHeaders['ACT_SSO_COOKIE'] = ssoToken;
  basePostHeaders['atkn'] = ssoToken;
  basePostHeaders[
    'cookie'
  ] = `${baseCookie}ACT_SSO_COOKIE=${ssoToken};XSRF-TOKEN=${fakeXSRF};API_CSRF_TOKEN=${fakeXSRF};ACT_SSO_EVENT="LOGIN_SUCCESS:1644346543228";ACT_SSO_COOKIE_EXPIRY=1645556143194;comid=cod;ssoDevId=63025d09c69f47dfa2b8d5520b5b73e4;tfa_enrollment_seen=true;gtm.custom.bot.flag=human;`;
  loggedIn = true;
  console.log('COD Login');
  return loggedIn;
};
exports.login = login;

class WZ {
  constructor() {
    this.fullData = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/stats/cod/v1/title/mw/platform/${platform}/${lookupType}/${gamertag}/profile/type/wz`
      );
    };
    this.combatHistory = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/wz/start/0/end/0/details`
      );
    };
    this.combatHistoryWithDate = async (
      gamertag,
      startTime,
      endTime,
      platform
    ) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/wz/start/${startTime}/end/${endTime}/details`
      );
    };
    this.breakdown = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/wz/start/0/end/0`
      );
    };
    this.breakdownWithDate = async (gamertag, startTime, endTime, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/wz/start/${startTime}/end/${endTime}`
      );
    };
    this.matchInfo = async (matchId, platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/fullMatch/wz/${matchId}/en`
      );
    };
  }
}
class MW {
  constructor() {
    this.fullData = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/stats/cod/v1/title/mw/platform/${platform}/${lookupType}/${gamertag}/profile/type/mp`
      );
    };
    this.combatHistory = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0/details`
      );
    };
    this.combatHistoryWithDate = async (
      gamertag,
      startTime,
      endTime,
      platform
    ) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}/details`
      );
    };
    this.breakdown = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0`
      );
    };
    this.breakdownWithDate = async (gamertag, startTime, endTime, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}`
      );
    };
    this.seasonloot = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/loot/title/mw/platform/${platform}/${lookupType}/${gamertag}/status/en`
      );
    };
    this.mapList = async (platform) => {
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/ce/v1/title/mw/platform/${platform}/gameType/mp/communityMapData/availability`
      );
    };
    this.matchInfo = async (matchId, platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for MW. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/mw/platform/${platform}/fullMatch/mp/${matchId}/en`
      );
    };
  }
}
class CW {
  constructor() {
    this.fullData = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/stats/cod/v1/title/cw/platform/${platform}/${lookupType}/${gamertag}/profile/type/mp`
      );
    };
    this.combatHistory = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/cw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0/details`
      );
    };
    this.combatHistoryWithDate = async (
      gamertag,
      startTime,
      endTime,
      platform
    ) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/cw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}/details`
      );
    };
    this.breakdown = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/cw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0`
      );
    };
    this.breakdownWithDate = async (gamertag, startTime, endTime, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/cw/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}`
      );
    };
    this.seasonloot = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/loot/title/cw/platform/${platform}/${lookupType}/${gamertag}/status/en`
      );
    };
    this.mapList = async (platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/ce/v1/title/cw/platform/${platform}/gameType/mp/communityMapData/availability`
      );
    };
    this.matchInfo = async (matchId, platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for CW. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/cw/platform/${platform}/fullMatch/mp/${matchId}/en`
      );
    };
  }
}
class VG {
  constructor() {
    this.fullData = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/stats/cod/v1/title/vg/platform/${platform}/${lookupType}/${gamertag}/profile/type/mp`
      );
    };
    this.combatHistory = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/vg/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0/details`
      );
    };
    this.combatHistoryWithDate = async (
      gamertag,
      startTime,
      endTime,
      platform
    ) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/vg/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}/details`
      );
    };
    this.breakdown = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/vg/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/0/end/0`
      );
    };
    this.breakdownWithDate = async (gamertag, startTime, endTime, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/vg/platform/${platform}/${lookupType}/${gamertag}/matches/mp/start/${startTime}/end/${endTime}`
      );
    };
    this.seasonloot = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/loot/title/vg/platform/${platform}/${lookupType}/${gamertag}/status/en`
      );
    };
    this.mapList = async (platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/ce/v1/title/vg/platform/${platform}/gameType/mp/communityMapData/availability`
      );
    };
    this.matchInfo = async (matchId, platform) => {
      if (platform === platforms.Steam)
        throw new Error("Steam Doesn't exist for VG. Try `battle` instead.");
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/title/vg/platform/${platform}/fullMatch/mp/${matchId}/en`
      );
    };
  }
}
class SHOP {
  constructor() {
    this.purchasableItems = async (gameId) => {
      return await sendRequest(
        `/inventory/v1/title/${gameId}/platform/psn/purchasable/public/en`
      );
    };
    this.bundleInformation = async (title, bundleId) => {
      return await sendRequest(
        `/inventory/v1/title/${title}/bundle/${bundleId}/en`
      );
    };
    this.battlePassLoot = async (season, platform) => {
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/loot/title/mw/platform/${platform}/list/loot_season_${season}/en`
      );
    };
  }
}
class USER {
  constructor() {
    this.friendFeed = async (gamertag, platform) => {
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/userfeed/v1/friendFeed/platform/${platform}/gamer/${gamertag}/friendFeedEvents/en`
      );
    };
    this.eventFeed = async () => {
      return await sendRequest(
        `/userfeed/v1/friendFeed/rendered/en/${baseSsoToken}`
      );
    };
    this.loggedInIdentities = async () => {
      return await sendRequest(`/crm/cod/v2/identities/${baseSsoToken}`);
    };
    this.codPoints = async (gamertag, platform) => {
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/inventory/v1/title/mw/platform/${platform}/gamer/${gamertag}/currency`
      );
    };
    this.connectedAccounts = async (gamertag, platform) => {
      let lookupType = 'gamer';
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno) lookupType = 'id';
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/accounts/platform/${platform}/${lookupType}/${gamertag}`
      );
    };
    this.settings = async (gamertag, platform) => {
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/preferences/v1/platform/${platform}/gamer/${gamertag}/list`
      );
    };
    this.friendAction = async (gamertag, platform, action) => {
      var type = platform === platforms.Uno ? 'id' : 'gamer';
      if (
        platform === platforms.Battlenet ||
        platform === platforms.Activision ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      var url = `/codfriends/v1/${action}/${platform}/${type}/${gamertag}`;
      return await sendPostRequest(url, '{}');
    };
  }
}
class ALT {
  constructor() {
    this.search = async (gamertag, platform) => {
      if (
        platform === platforms.Battlenet ||
        platform === platforms.All ||
        platform === platforms.Uno
      )
        gamertag = cleanClientName(gamertag);
      if (platform === platforms.Uno || platform === platforms.Activision)
        platform = platforms.Uno;
      return await sendRequest(
        `/crm/cod/v2/platform/${platform}/username/${gamertag}/search`
      );
    };
  }
}
const Warzone = new WZ();
exports.Warzone = Warzone;
const ModernWarfare = new MW();
exports.ModernWarfare = ModernWarfare;
const ColdWar = new CW();
exports.ColdWar = ColdWar;
const Vanguard = new VG();
exports.Vanguard = Vanguard;
const Store = new SHOP();
exports.Store = Store;
const Me = new USER();
exports.Me = Me;
const Misc = new ALT();
exports.Misc = Misc;
//# sourceMappingURL=index.js.map
