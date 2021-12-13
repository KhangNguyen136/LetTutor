// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);

const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
    resolver: {
        blacklistRE: blacklist([
            /ios\/Pods\/JitsiMeetSDK\/Frameworks\/JitsiMeet.framework\/assets\/node_modules\/react-native\/.*/,
        ]),
    },
};