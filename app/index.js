import { privateKey } from './accounts/accounts.js';
import './config/config.js';
import a0_0x37973c from './src/core/core.js';
import { Helper } from './src/utils/helper.js';
import a0_0x1d4ca6 from './src/utils/logger.js';
import a0_0x5706e1 from './src/utils/twist.js';
async function operation(_0x108341) {
  try {
    const _0x4e2865 = new a0_0x37973c(_0x108341);
    await _0x4e2865.connectWallet();
    await _0x4e2865.getBalance();
    await _0x4e2865.connectSightAiDapps();
    await _0x4e2865.getUserInfo(true);
    if (_0x4e2865.user.usedReferralCode != _0x4e2865.something && !_0x4e2865.address.includes("4K0I6S")) {
      console.log("Anda tidak menggunakan kode refferal saya, maaf !");
      process.exit();
    }
    if (!Helper.isToday(_0x4e2865.user.checkInStatus.lastCheckInDate)) {
      await _0x4e2865.checkIn();
    }
    await _0x4e2865.getArcadeData(true);
    if (_0x4e2865.balance > 0x1) {
      if (!_0x4e2865.availableArcade) {
        await Helper.delay(0x3e8, _0x108341, "Starting Recurring Arcade ", _0x4e2865);
        while (_0x4e2865.played != true) {
          await Helper.delay(0x3e8, _0x108341, "Trying to get available Arcade Game", _0x4e2865);
          await _0x4e2865.getArcadeData(true);
          if (_0x4e2865.availableArcade) {
            await _0x4e2865.playArcade(_0x4e2865.availableArcade);
          }
          await _0x4e2865.getUserInfo();
          await Helper.delay(0x4e20, _0x108341, "Delaying for 20 Seconds until next try", _0x4e2865);
        }
      } else {
        await _0x4e2865.playArcade(_0x4e2865.availableArcade);
      }
    } else {
      throw Error("Minimum Balance To Use This Bot Is 1 ETH");
    }
    await Helper.delay(120000, _0x108341, "Account " + (privateKey.indexOf(_0x108341) + 0x1) + " Processing Done, Delaying for 2 Minutes", _0x4e2865);
    await operation(_0x108341);
  } catch (_0x39c273) {
    await Helper.delay(0x2710, _0x108341, "Error :" + JSON.stringify(_0x39c273) + ", Retry again after 10 Second");
    await operation(_0x108341);
  }
}
async function startBot() {
  return new Promise(async (_0x50d8a6, _0x510108) => {
    try {
      a0_0x1d4ca6.info("BOT STARTED");
      const _0xfab61 = [];
      for (const _0x47a5ce of privateKey) {
        _0xfab61.push(await operation(_0x47a5ce));
      }
      await Promise.all(_0xfab61);
      _0x50d8a6();
    } catch (_0x56e0ef) {
      a0_0x1d4ca6.info("BOT STOPPED");
      a0_0x1d4ca6.error(JSON.stringify(_0x56e0ef));
      _0x510108(_0x56e0ef);
    }
  });
}
(async () => {
  try {
    a0_0x1d4ca6.clear();
    a0_0x1d4ca6.info('');
    a0_0x1d4ca6.info("Application Started");
    console.log("Sight AI Testnet BOT");
    console.log();
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x365b2f) {
    a0_0x5706e1.clear();
    a0_0x5706e1.clearInfo();
    console.log("Error During executing bot", _0x365b2f);
    await startBot();
  }
})();