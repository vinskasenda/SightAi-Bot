import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import a2_0xa00f5b from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SIGHTAI } from './dapps/sight_ai.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0x5f4ef5) {
    super("https://sightai.io", 'sightai.io', "https://sightai.io", "4K0I6S");
    this.acc = _0x5f4ef5;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    this.stateTree = "%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22" + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + "%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D";
  }
  async ["connectWallet"]() {
    try {
      const _0x28a00e = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x30ab9c = Helper.determineType(_0x28a00e);
      a2_0xa00f5b.info("Account Type : " + _0x30ab9c);
      if (_0x30ab9c == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x28a00e, this.provider);
      } else {
        if (_0x30ab9c == "Private Key") {
          this.wallet = new ethers.Wallet(_0x28a00e.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x2824dd) {
      throw _0x2824dd;
    }
  }
  async ["getBalance"](_0x56bbc8 = false) {
    try {
      if (!_0x56bbc8) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x240bc8 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x240bc8;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x4d769c) {
      throw _0x4d769c;
    }
  }
  async ['getUserInfo'](_0xea554b = false) {
    try {
      if (_0xea554b) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0xcb8e68 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [this.address], {
        'Referer': 'https://sightai.io/dashboard?referral-code=' + this.something,
        'Next-Action': "5dd1862a3d5d9a970c36c027f2d82f7280223906",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0xcb8e68.status == 0xc8) {
        this.user = this.decodeData(_0xcb8e68.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0xea554b) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x465dc1) {
      throw _0x465dc1;
    }
  }
  async ["checkIn"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x3f34e7 = await this.fetch("/dashboard?referral-code=" + this.something, 'POST', undefined, [], {
        'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "e5afaaaeff44c664f214a016c10409c8e930d77a",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x3f34e7.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x3f34e7.message);
      }
    } catch (_0x2d578d) {
      throw _0x2d578d;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x5b135c = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    a2_0xa00f5b.info("Message to sign: " + _0x5b135c);
    const _0x33faa6 = await this.wallet.signMessage(_0x5b135c);
    a2_0xa00f5b.info("Signed Message: " + _0x33faa6);
    const _0x4c778a = await this.fetch("/dashboard?referral-code=" + this.something, 'POST', undefined, [_0x33faa6, _0x5b135c, this.something], {
      'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
      'Next-Action': "3b934a35aaaa2acd0f7846cda4c3b1031a840b89",
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x4c778a.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x33faa6;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ["getArcadeData"](_0x1ae4a5 = false) {
    try {
      if (_0x1ae4a5) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0x5e2547 = await this.fetch("/fomo", "POST", undefined, [0x0, "$undefined", 0x1, 0x6], {
        'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x5e2547.status == 0xc8) {
        const _0x4d6cdb = this.decodeData(_0x5e2547.message);
        this.arcade = [];
        if (_0x4d6cdb.pools) {
          this.arcade.push(..._0x4d6cdb.pools);
        }
        this.availableArcade = this.arcade.find(_0x4aa99a => _0x4aa99a.state == 0x1 || _0x4aa99a.state == 0x2 || _0x4aa99a.winner == '0x0000000000000000000000000000000000000000');
        if (_0x1ae4a5) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x16d00e) {
      throw _0x16d00e;
    }
  }
  async ["playArcade"](_0x5b2c4b) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x5b2c4b.id + "...", this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x342539 = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x2c9878 = Config.RAWDATA;
      const _0xab2b26 = await this.provider.getTransactionCount(this.wallet.address, "latest");
      const _0x32f873 = await this.provider.getFeeData();
      const _0x4846a3 = await this.estimateGasWithRetry(_0x5b2c4b.address, _0x342539, _0x2c9878, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x2ed2bc = {
        'from': this.address,
        'to': _0x5b2c4b.address,
        'value': _0x342539,
        'gasLimit': _0x4846a3,
        'gasPrice': _0x32f873.gasPrice,
        'nonce': _0xab2b26,
        'data': _0x2c9878
      };
      a2_0xa00f5b.info("Preparing to send transaction for Arcade Game ID " + _0x5b2c4b.id);
      await this.executeTx(_0x2ed2bc);
      this.played = true;
    } catch (_0x121e99) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x121e99.message + "...", this);
      this.played = false;
    }
  }
  async ['estimateGasWithRetry'](_0x3c1a09, _0x262da1, _0x5db9cb, _0x30c4ea = 0x3, _0x2e0dca = 0xbb8) {
    for (let _0x40f877 = 0x0; _0x40f877 < _0x30c4ea; _0x40f877++) {
      try {
        const _0x5ccf0b = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x3c1a09,
          'value': _0x262da1,
          'data': _0x5db9cb
        });
        return _0x5ccf0b;
      } catch (_0x27de98) {
        await Helper.delay(_0x2e0dca, this.acc, _0x27de98.shortMessage + "... Attempt " + (_0x40f877 + 0x1) + " of " + _0x30c4ea, this);
        if (_0x40f877 === _0x30c4ea - 0x1) {
          throw Error("Failed to estimate gas after " + _0x30c4ea + " attempts.");
        }
      }
    }
  }
  ['decodeData'](_0x147545) {
    const _0x2012b8 = _0x147545.split("\n").filter(Boolean);
    let _0x183f19 = null;
    _0x2012b8.forEach(_0x36c08b => {
      if (_0x36c08b.startsWith('1:')) {
        const _0x24a5bb = _0x36c08b.substring(0x2).trim();
        try {
          _0x183f19 = JSON.parse(_0x24a5bb);
        } catch (_0x235a6e) {
          _0x183f19 = {};
        }
      }
    });
    let _0x14fb57 = JSON.stringify(_0x183f19).replace(new RegExp(this.something, 'g'), '?????');
    if (_0x14fb57.length > 0xc8) {
      _0x14fb57 = _0x14fb57.substring(0x0, 0xc8) + "...";
    }
    a2_0xa00f5b.info("JSON Data : " + _0x14fb57);
    return _0x183f19;
  }
  async ["executeTx"](_0x405644) {
    a2_0xa00f5b.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x405644)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0x9194e2 = await this.wallet.sendTransaction(_0x405644);
    const _0x12125a = await _0x9194e2.wait();
    a2_0xa00f5b.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x12125a));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x12125a.hash, this);
    await this.getBalance(true);
  }
}
