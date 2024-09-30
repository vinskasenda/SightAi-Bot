import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a2_0xa4077b from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SIGHTAI } from './dapps/sight_ai.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0xac352b) {
    super("https://sightai.io", "sightai.io", "https://sightai.io", "4K0I6S");
    this.acc = _0xac352b;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    this.stateTree = "%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22" + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + '%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D';
  }
  async ["connectWallet"]() {
    try {
      const _0x4e0224 = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x56c977 = Helper.determineType(_0x4e0224);
      a2_0xa4077b.info("Account Type : " + _0x56c977);
      if (_0x56c977 == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x4e0224, this.provider);
      } else {
        if (_0x56c977 == "Private Key") {
          this.wallet = new ethers.Wallet(_0x4e0224.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0xb9bb1b) {
      throw _0xb9bb1b;
    }
  }
  async ["getBalance"](_0x5bab79 = false) {
    try {
      if (!_0x5bab79) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x49495a = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x49495a;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x3a487e) {
      throw _0x3a487e;
    }
  }
  async ["getUserInfo"](_0x361cc5 = false) {
    try {
      if (_0x361cc5) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0x578e94 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [this.address], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': '5dd1862a3d5d9a970c36c027f2d82f7280223906',
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x578e94.status == 0xc8) {
        this.user = this.decodeData(_0x578e94.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0x361cc5) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x35f472) {
      throw _0x35f472;
    }
  }
  async ['checkIn']() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x319834 = await this.fetch('/dashboard?referral-code=' + this.something, "POST", undefined, [], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "e5afaaaeff44c664f214a016c10409c8e930d77a",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x319834.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x319834.message);
      }
    } catch (_0x129e3a) {
      throw _0x129e3a;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x27bd93 = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    a2_0xa4077b.info("Message to sign: " + _0x27bd93);
    const _0x1b37e2 = await this.wallet.signMessage(_0x27bd93);
    a2_0xa4077b.info("Signed Message: " + _0x1b37e2);
    const _0x2cf470 = await this.fetch("/dashboard?referral-code=" + this.something, 'POST', undefined, [_0x1b37e2, _0x27bd93, this.something], {
      'Referer': 'https://sightai.io/dashboard?referral-code=' + this.something,
      'Next-Action': '3b934a35aaaa2acd0f7846cda4c3b1031a840b89',
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x2cf470.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x1b37e2;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ["getArcadeData"](_0x5abe22 = false) {
    try {
      if (_0x5abe22) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0x55977c = await this.fetch("/fomo", "POST", undefined, [0x0, "$undefined", 0x1, 0x6], {
        'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x55977c.status == 0xc8) {
        const _0x2f1bf9 = this.decodeData(_0x55977c.message);
        this.arcade = [];
        if (_0x2f1bf9.pools) {
          this.arcade.push(..._0x2f1bf9.pools);
        }
        this.availableArcade = this.arcade.find(_0x5a8168 => _0x5a8168.state == 0x1 || _0x5a8168.state == 0x2 || _0x5a8168.winner == "0x0000000000000000000000000000000000000000");
        if (_0x5abe22) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x1b3567) {
      throw _0x1b3567;
    }
  }
  async ['playArcade'](_0x5860aa) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x5860aa.id + "...", this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x4f6adf = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x16a9d0 = Config.RAWDATA;
      const _0x401964 = await this.provider.getTransactionCount(this.wallet.address, 'latest');
      const _0xc5885f = await this.provider.getFeeData();
      const _0x5e6450 = await this.estimateGasWithRetry(_0x5860aa.address, _0x4f6adf, _0x16a9d0, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x59bd36 = {
        'from': this.address,
        'to': _0x5860aa.address,
        'value': _0x4f6adf,
        'gasLimit': _0x5e6450,
        'gasPrice': _0xc5885f.gasPrice,
        'nonce': _0x401964,
        'data': _0x16a9d0
      };
      a2_0xa4077b.info("Preparing to send transaction for Arcade Game ID " + _0x5860aa.id);
      await this.executeTx(_0x59bd36);
      this.played = true;
    } catch (_0x102dc2) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x102dc2.message + "...", this);
      this.played = false;
    }
  }
  async ["estimateGasWithRetry"](_0x2f3244, _0x5bae0f, _0x47d7d4, _0x2f9408 = 0x3, _0x400923 = 0xbb8) {
    for (let _0x3195a6 = 0x0; _0x3195a6 < _0x2f9408; _0x3195a6++) {
      try {
        const _0x25559b = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x2f3244,
          'value': _0x5bae0f,
          'data': _0x47d7d4
        });
        return _0x25559b;
      } catch (_0x2e6be8) {
        await Helper.delay(_0x400923, this.acc, _0x2e6be8.shortMessage + "... Attempt " + (_0x3195a6 + 0x1) + " of " + _0x2f9408, this);
        if (_0x3195a6 === _0x2f9408 - 0x1) {
          throw Error("Failed to estimate gas after " + _0x2f9408 + " attempts.");
        }
      }
    }
  }
  ["decodeData"](_0xb33f25) {
    const _0x4d50d1 = _0xb33f25.split("\n").filter(Boolean);
    let _0x5d2536 = null;
    _0x4d50d1.forEach(_0x4cf007 => {
      if (_0x4cf007.startsWith('1:')) {
        const _0x1140a7 = _0x4cf007.substring(0x2).trim();
        try {
          _0x5d2536 = JSON.parse(_0x1140a7);
        } catch (_0x59910b) {
          _0x5d2536 = {};
        }
      }
    });
    let _0x338abd = JSON.stringify(_0x5d2536).replace(new RegExp(this.something, 'g'), "?????");
    if (_0x338abd.length > 0xc8) {
      _0x338abd = _0x338abd.substring(0x0, 0xc8) + "...";
    }
    a2_0xa4077b.info("JSON Data : " + _0x338abd);
    return _0x5d2536;
  }
  async ['executeTx'](_0x1892a3) {
    a2_0xa4077b.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x1892a3)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0x285046 = await this.wallet.sendTransaction(_0x1892a3);
    const _0x52964b = await _0x285046.wait();
    a2_0xa4077b.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x52964b));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + "tx/" + _0x52964b.hash, this);
    await this.getBalance(true);
  }
}