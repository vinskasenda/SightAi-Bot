import 'fs';
import 'path';
import a5_0xf7f0ad from 'bip39';
import 'querystring';
import a5_0x5015f0 from './twist.js';
import a5_0x52e677 from 'moment-timezone';
import { ethers } from 'ethers';
export class Helper {
  static ["delay"] = (_0x390b60, _0x2e46c7, _0x2b9890, _0x4db8a7) => {
    return new Promise(_0x422ea6 => {
      let _0x1f181a = _0x390b60;
      if (_0x2e46c7 != undefined) {
        a5_0x5015f0.log(_0x2b9890, _0x2e46c7, _0x4db8a7, "Delaying for " + this.msToTime(_0x390b60));
      } else {
        a5_0x5015f0.info("Delaying for " + this.msToTime(_0x390b60));
      }
      const _0x4901b3 = setInterval(() => {
        _0x1f181a -= 0x3e8;
        if (_0x2e46c7 != undefined) {
          a5_0x5015f0.log(_0x2b9890, _0x2e46c7, _0x4db8a7, "Delaying for " + this.msToTime(_0x1f181a));
        } else {
          a5_0x5015f0.info("Delaying for " + this.msToTime(_0x1f181a));
        }
        if (_0x1f181a <= 0x0) {
          clearInterval(_0x4901b3);
          _0x422ea6();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x4901b3);
        await a5_0x5015f0.clearInfo();
        if (_0x2e46c7) {
          a5_0x5015f0.log(_0x2b9890, _0x2e46c7, _0x4db8a7);
        }
        _0x422ea6();
      }, _0x390b60);
    });
  };
  static ["randomUserAgent"]() {
    const _0x296aa8 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x296aa8[Math.floor(Math.random() * _0x296aa8.length)];
  }
  static ['readTime'](_0x52a10d) {
    const _0x43527a = a5_0x52e677.unix(_0x52a10d);
    return _0x43527a.format("YYYY-MM-DD HH:mm:ss");
  }
  static ['getCurrentTimestamp']() {
    const _0x5d79a8 = a5_0x52e677().tz('Asia/Singapore').unix();
    return _0x5d79a8.toString();
  }
  static ["random"](_0x364bdf, _0x1a2094) {
    const _0x3244b7 = Math.floor(Math.random() * (_0x1a2094 - _0x364bdf + 0x1)) + _0x364bdf;
    return _0x3244b7;
  }
  static ['msToTime'](_0x42ccf7) {
    const _0x166110 = Math.floor(_0x42ccf7 / 3600000);
    const _0x2a77af = _0x42ccf7 % 3600000;
    const _0x2ab607 = Math.floor(_0x2a77af / 60000);
    const _0x109f3a = _0x2a77af % 60000;
    const _0x2c4672 = Math.round(_0x109f3a / 0x3e8);
    return _0x166110 + " Hours " + _0x2ab607 + " Minutes " + _0x2c4672 + " Seconds";
  }
  static ["generateRandomString"](_0x185db3) {
    let _0x4c043a = '';
    const _0x48e16d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x4e4b46 = 0x0; _0x4e4b46 < _0x185db3; _0x4e4b46++) {
      _0x4c043a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x48e16d));
    }
    return _0x4c043a;
  }
  static ["serializeBigInt"] = _0x5702c9 => {
    return JSON.parse(JSON.stringify(_0x5702c9, (_0x3e3862, _0x258ddb) => typeof _0x258ddb === "bigint" ? _0x258ddb.toString() : _0x258ddb));
  };
  static ["isMnemonic"](_0x25592a) {
    return a5_0xf7f0ad.validateMnemonic(_0x25592a);
  }
  static ['isPrivateKey'](_0x535cc6) {
    return /^[a-fA-F0-9]{64}$/.test(_0x535cc6);
  }
  static ["determineType"](_0x28b0bc) {
    if (this.isMnemonic(_0x28b0bc)) {
      return "Secret Phrase";
    } else {
      return this.isPrivateKey(_0x28b0bc) ? "Private Key" : "Unknown";
    }
  }
  static ["generateNonce"]() {
    return ethers.hexlify(ethers.randomBytes(0x10));
  }
  static ["isToday"](_0x1ea6df) {
    const _0x352ac4 = new Date(_0x1ea6df);
    const _0xbf81d8 = new Date();
    _0xbf81d8.setHours(0x0, 0x0, 0x0, 0x0);
    const _0x5676b9 = new Date(_0x352ac4);
    _0x5676b9.setHours(0x0, 0x0, 0x0, 0x0);
    return !!(_0x5676b9.getTime() === _0xbf81d8.getTime());
  }
  static ["showSkelLogo"]() {
    console.log("");
  }
}