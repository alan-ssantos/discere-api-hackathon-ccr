const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const { agora } = require('../config');

module.exports = (channelName, expireTime = 0, roleType = 'publisher', uid = 0) => {
  let role = RtcRole.PUBLISHER;
  if (roleType !== 'publisher') role = RtcRole.SUBSCRIBER;

  const privilegeExpireTime = (expireTime / 1000) + 3600;

  const token = RtcTokenBuilder
    .buildTokenWithUid(
      agora.appId,
      agora.appCertificate,
      channelName,
      uid,
      role,
      privilegeExpireTime,
    );

  return token;
};
