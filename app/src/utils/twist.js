import { Twisters } from 'twisters';
import './helper.js';
import a7_0x1fe6c9 from './logger.js';
import a7_0x32ced7 from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x37634b = '', _0x15768c = '', _0x293b2f = new a7_0x32ced7(), _0xcb920d) {
    if (_0xcb920d == undefined) {
      a7_0x1fe6c9.info("Account " + (privateKey.indexOf(_0x15768c) + 0x1) + " - " + _0x37634b);
      _0xcb920d = '-';
    }
    const _0x5e10eb = _0x293b2f.address ?? '-';
    const _0x41cbaa = _0x293b2f.balance ?? '-';
    const _0x5df154 = _0x293b2f.user ?? {};
    const _0x434626 = _0x5df154.point ?? '-';
    this.twisters.put(_0x15768c.id, {
      'text': "\n================== Account " + (privateKey.indexOf(_0x15768c) + 0x1) + " =================\nAddress      : " + _0x5e10eb + "\nBalance      : " + _0x41cbaa + " " + RPC.SYMBOL + "\nPoint        : " + _0x434626 + "\n\nStatus : " + _0x37634b + "\nDelay : " + _0xcb920d + "\n=============================================="
    });
  }
  ["info"](_0x91c027 = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x91c027 + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x388cc7) {
    this.twisters.remove(_0x388cc7);
  }
}
export default new Twist();
