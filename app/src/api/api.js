import { Helper } from '../utils/helper.js';
import a1_0x271c71 from '../utils/logger.js';
export class API {
  constructor(_0x503b63, _0x40ea96, _0xb9939b, _0x3de054) {
    this.url = _0x503b63;
    this.host = _0x40ea96;
    this.origin = _0xb9939b;
    this.ua = Helper.randomUserAgent();
    this.something = _0x3de054;
  }
  ["generateHeaders"](_0x12534c) {
    const _0x65177c = {
      'Accept': "text/x-component",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "text/x-component",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': "same-site",
      'Sec-Fetch-Mode': "cors",
      'Host': this.host,
      'Origin': this.origin,
      'Pragma': 'no-cache'
    };
    if (_0x12534c) {
      _0x65177c.Authorization = "Bearer " + _0x12534c;
    }
    return _0x65177c;
  }
  async ["fetch"](_0x77eec5, _0xb9c424, _0xa6ed4f, _0x592e73 = {}, _0x19dff8 = {}) {
    try {
      const _0x8c2123 = '' + this.url + _0x77eec5;
      const _0x11e511 = {
        ..._0x19dff8,
        ...this.generateHeaders(_0xa6ed4f)
      };
      const _0x5653fa = {
        'headers': _0x11e511,
        'method': _0xb9c424
      };
      a1_0x271c71.info(_0xb9c424 + " : " + _0x8c2123.replace(new RegExp(this.something, 'g'), '?????') + " " + (this.proxy ? this.proxy : ''));
      for (let _0x35e4c8 in _0x11e511) {
        if (_0x11e511[_0x35e4c8].includes(this.something)) {
          _0x11e511[_0x35e4c8] = _0x11e511[_0x35e4c8].replace(new RegExp(this.something, 'g'), "????");
        }
      }
      a1_0x271c71.info("Request Header : " + JSON.stringify(_0x11e511));
      if (_0xb9c424 !== 'GET') {
        _0x5653fa.body = '' + JSON.stringify(_0x592e73);
        const _0x4153a6 = _0x5653fa.body.replace(new RegExp(this.something, 'g'), "?????");
        a1_0x271c71.info("Request Body : " + _0x4153a6);
      }
      const _0x30f5a0 = await fetch(_0x8c2123, _0x5653fa);
      if (!this.sessionCookie) {
        this.sessionCookie = _0x30f5a0.headers.getSetCookie()[0x0];
      }
      a1_0x271c71.info("Response : " + _0x30f5a0.status + " " + _0x30f5a0.statusText);
      if (_0x30f5a0.ok || _0x30f5a0.status == 0x190 || _0x30f5a0.status == 0x193) {
        const _0x2de62f = _0x30f5a0.headers.get('content-type');
        let _0x424261;
        if (_0x2de62f && _0x2de62f.includes("application/json")) {
          _0x424261 = await _0x30f5a0.json();
          _0x424261.status = _0x30f5a0.status;
        } else {
          _0x424261 = {
            'status': _0x30f5a0.status,
            'message': await _0x30f5a0.text()
          };
        }
        if (_0x30f5a0.ok) {
          _0x424261.status = 0xc8;
        }
        let _0x25954f = JSON.stringify(_0x424261).replace(new RegExp(this.something, 'g'), '?????');
        if (_0x25954f.length > 0xc8) {
          _0x25954f = _0x25954f.substring(0x0, 0xc8) + "...";
        }
        a1_0x271c71.info("Response Data : " + _0x25954f);
        return _0x424261;
      } else {
        throw new Error(_0x30f5a0.status + " - " + _0x30f5a0.statusText);
      }
    } catch (_0x1bb6e8) {
      a1_0x271c71.error("Error : " + _0x1bb6e8.message);
      throw _0x1bb6e8;
    }
  }
}