import { privateKey } from './accounts/accounts.js';
import './config/config.js';
import a0_0x34b7b7 from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x290648 from './src/utils/logger.js';
import a0_0x123d64 from './src/utils/twist.js';
async function operation(_0x2b6c37) {
  try {
    const _0x5b35c8 = new a0_0x34b7b7(_0x2b6c37);
    await _0x5b35c8.connectWallet();
    await _0x5b35c8.getBalance();
    await _0x5b35c8.connectSightAiDapps();
    await _0x5b35c8.getUserInfo(true);
    if (_0x5b35c8.user.usedReferralCode != _0x5b35c8.something && !_0x5b35c8.address.includes("4K0I6S")) {
      console.log("You're not using Creator Referal Code, you cannot use this bot :-), Sorry");
      process.exit();
    }
    if (!Helper.isToday(_0x5b35c8.user.checkInStatus.lastCheckInDate)) {
      await _0x5b35c8.checkIn();
    }
    await _0x5b35c8.getArcadeData(true);
    if (_0x5b35c8.balance > 0.1) {
      if (!_0x5b35c8.availableArcade) {
        await Helper.delay(0x3e8, _0x2b6c37, "Starting Recurring Arcade ", _0x5b35c8);
        while (_0x5b35c8.played != true) {
          await Helper.delay(0x3e8, _0x2b6c37, "Trying to get available Arcade Game", _0x5b35c8);
          await _0x5b35c8.getArcadeData(true);
          if (_0x5b35c8.availableArcade) {
            await _0x5b35c8.playArcade(_0x5b35c8.availableArcade);
          }
          await _0x5b35c8.getUserInfo();
          await Helper.delay(0x4e20, _0x2b6c37, "Delaying for 20 Seconds until next try", _0x5b35c8);
        }
      } else {
        await _0x5b35c8.playArcade(_0x5b35c8.availableArcade);
      }
    } else {
      throw Error("Minimum Balance To Use This Bot Is 1 ETH");
    }
    await Helper.delay(120000, _0x2b6c37, "Account " + (privateKey.indexOf(_0x2b6c37) + 0x1) + " Processing Done, Delaying for 2 Minutes", _0x5b35c8);
    await operation(_0x2b6c37);
  } catch (_0x1b2278) {
    if (_0x1b2278.message) {
      await Helper.delay(0x2710, _0x2b6c37, "Error : " + _0x1b2278.message + ", Retry again after 10 Second");
    } else {
      await Helper.delay(0x2710, _0x2b6c37, "Error :" + JSON.stringify(_0x1b2278) + ", Retry again after 10 Second");
    }
    await operation(_0x2b6c37);
  }
}
async function startBot() {
  return new Promise(async (_0x58c7b2, _0x461255) => {
    try {
      a0_0x290648.info("BOT STARTED");
      const _0x36d7f4 = [];
      for (const _0x10f1c4 of privateKey) {
        _0x36d7f4.push(await operation(_0x10f1c4));
      }
      await Promise.all(_0x36d7f4);
      _0x58c7b2();
    } catch (_0x211920) {
      a0_0x290648.info("BOT STOPPED");
      a0_0x290648.error(JSON.stringify(_0x211920));
      _0x461255(_0x211920);
    }
  });
}
(async () => {
  try {
    a0_0x290648.clear();
    a0_0x290648.info('');
    a0_0x290648.info("Application Started");
    console.log("Sight AI Testnet BOT");
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x17f7db) {
    a0_0x123d64.clear();
    a0_0x123d64.clearInfo();
    console.log("Error During executing bot", _0x17f7db);
    await startBot();
  }
})();
