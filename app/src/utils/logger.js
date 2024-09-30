import { createLogger, format, transports } from 'winston';
import a6_0x338c71 from 'fs';
const {
  combine,
  timestamp,
  printf,
  colorize
} = format;
const customFormat = printf(({
  level: _0x3208f8,
  message: _0x26afe9,
  timestamp: _0x228dbd
}) => {
  return _0x228dbd + " [" + _0x3208f8 + "]: " + _0x26afe9;
});
class Logger {
  constructor() {
    this.logger = createLogger({
      'level': "debug",
      'format': combine(timestamp({
        'format': "YYYY-MM-DD HH:mm:ss"
      }), colorize(), customFormat),
      'transports': [new transports.File({
        'filename': "log/app.log"
      })],
      'exceptionHandlers': [new transports.File({
        'filename': "log/app.log"
      })],
      'rejectionHandlers': [new transports.File({
        'filename': 'log/app.log'
      })]
    });
  }
  ["info"](_0x117b8c) {
    this.logger.info(_0x117b8c);
  }
  ["warn"](_0x4a1a79) {
    this.logger.warn(_0x4a1a79);
  }
  ["error"](_0x150d6c) {
    this.logger.error(_0x150d6c);
  }
  ["debug"](_0xa4f2d1) {
    this.logger.debug(_0xa4f2d1);
  }
  ["setLevel"](_0x4ef439) {
    this.logger.level = _0x4ef439;
  }
  ['clear']() {
    a6_0x338c71.truncate('log/app.log', 0x0, _0x5317e4 => {
      if (_0x5317e4) {
        this.logger.error("Failed to clear the log file: " + _0x5317e4.message);
      } else {
        this.logger.info("Log file cleared");
      }
    });
  }
}
export default new Logger();