import { Twisters } from 'twisters';
import './helper.js';
import a7_0x4d2969 from './logger.js';
import a7_0x5b8d0d from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x53b6f3 = '', _0xf072d = '', _0x2a13cc = new a7_0x5b8d0d(), _0x119b74) {
    if (_0x119b74 == undefined) {
      a7_0x4d2969.info("Account " + (privateKey.indexOf(_0xf072d) + 0x1) + " - " + _0x53b6f3);
      _0x119b74 = '-';
    }
    const _0x413260 = _0x2a13cc.address ?? '-';
    const _0x225bc5 = _0x2a13cc.balance ?? '-';
    const _0x2c2220 = _0x2a13cc.user ?? {};
    const _0x366e31 = _0x2c2220.point ?? '-';
    this.twisters.put(_0xf072d.id, {
      'text': "\n================== Account " + (privateKey.indexOf(_0xf072d) + 0x1) + " =================\nAddress      : " + _0x413260 + "\nBalance      : " + _0x225bc5 + " " + RPC.SYMBOL + "\nPoint        : " + _0x366e31 + "\n\nStatus : " + _0x53b6f3 + "\nDelay : " + _0x119b74 + "\n=============================================="
    });
  }
  ['info'](_0x31f5ef = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x31f5ef + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x243311) {
    this.twisters.remove(_0x243311);
  }
}
export default new Twist();