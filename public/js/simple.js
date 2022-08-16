!function (e) {
  var t = {};
  function o(r) {
    if (t[r]) return t[r].exports;
    var l = t[r] = {i: r, l: false, exports: {}};
    return e[r].call(l.exports, l, l.exports, o), l.l = true, l.exports;
  }
  o.m = e, o.c = t, o.d = function (e, t, r) {
    o.o(e, t) || Object.defineProperty(e, t, {enumerable: true, get: r});
  }, o.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: true});
  }, o.t = function (e, t) {
    if (1 & t && (e = o(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (o.r(r), Object.defineProperty(r, "default", {enumerable: true, value: e}), 2 & t && "string" != typeof e) for (var l in e) o.d(r, l, function (t) {
      return e[t];
    }.bind(null, l));
    return r;
  }, o.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };
    return o.d(t, "a", t), t;
  }, o.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, o.p = "", o(o.s = 11);
}([function (e, t) {
  e.exports = window.wp.element;
}, function (e, t) {
  e.exports = window.wp.i18n;
}, function (e, t) {
  e.exports = window.wp.components;
}, function (e, t) {
  e.exports = window.wp.blockEditor;
}, function (e, t, o) {
  (function (e, o) {
    var r;
    (function () {
      "use strict";
      function l(e, t) {
        this.mode = _.MODE_8BIT_BYTE, this.data = e, this.parsedData = [];
        for (var o = 0, r = this.data.length; o < r; o++) {
          var l = [], a = this.data.charCodeAt(o);
          t ? l[0] = a : a > 65536 ? (l[0] = 240 | (1835008 & a) >>> 18, l[1] = 128 | (258048 & a) >>> 12, l[2] = 128 | (4032 & a) >>> 6, l[3] = 128 | 63 & a) : a > 2048 ? (l[0] = 224 | (61440 & a) >>> 12, l[1] = 128 | (4032 & a) >>> 6, l[2] = 128 | 63 & a) : a > 128 ? (l[0] = 192 | (1984 & a) >>> 6, l[1] = 128 | 63 & a) : l[0] = a, this.parsedData.push(l);
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData), this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
      }
      function a(e, t) {
        this.typeNumber = e, this.errorCorrectLevel = t, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];
      }
      function n(e, t) {
        if (e.length == d) throw new Error(e.length + "/" + t);
        for (var o = 0; o < e.length && 0 == e[o];) o++;
        this.num = new Array(e.length - o + t);
        for (var r = 0; r < e.length - o; r++) this.num[r] = e[r + o];
      }
      function i(e, t) {
        this.totalCount = e, this.dataCount = t;
      }
      function c() {
        this.buffer = [], this.length = 0;
      }
      function s() {
        var e = false, t = navigator.userAgent;
        if (/android/i.test(t)) {
          e = true;
          var o = t.toString().match(/android ([0-9]\.[0-9])/i);
          o && o[1] && (e = parseFloat(o[1]));
        }
        return e;
      }
      var d, h, u = "object" == typeof e && e && e.Object === Object && e, g = "object" == typeof self && self && self.Object === Object && self, p = u || g || Function("return this")(), b = (t && !t.nodeType && t && "object" == typeof o && o && o.nodeType, p.QRCode);
      l.prototype = {getLength: function (e) {
        return this.parsedData.length;
      }, write: function (e) {
        for (var t = 0, o = this.parsedData.length; t < o; t++) e.put(this.parsedData[t], 8);
      }}, a.prototype = {addData: function (e, t) {
        var o = new l(e, t);
        this.dataList.push(o), this.dataCache = null;
      }, isDark: function (e, t) {
        if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
        return this.modules[e][t][0];
      }, getEye: function (e, t) {
        if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t) throw new Error(e + "," + t);
        var o = this.modules[e][t];
        if (o[1]) {
          var r = "P" + o[1] + "_" + o[2];
          return "A" == o[2] && (r = "A" + o[1]), {isDark: o[0], type: r};
        }
        return null;
      }, getModuleCount: function () {
        return this.moduleCount;
      }, make: function () {
        this.makeImpl(false, this.getBestMaskPattern());
      }, makeImpl: function (e, t) {
        this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
        for (var o = 0; o < this.moduleCount; o++) {
          this.modules[o] = new Array(this.moduleCount);
          for (var r = 0; r < this.moduleCount; r++) this.modules[o][r] = [];
        }
        this.setupPositionProbePattern(0, 0, "TL"), this.setupPositionProbePattern(this.moduleCount - 7, 0, "BL"), this.setupPositionProbePattern(0, this.moduleCount - 7, "TR"), this.setupPositionAdjustPattern("A"), this.setupTimingPattern(), this.setupTypeInfo(e, t), this.typeNumber >= 7 && this.setupTypeNumber(e), null == this.dataCache && (this.dataCache = a.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, t);
      }, setupPositionProbePattern: function (e, t, o) {
        for (var r = -1; r <= 7; r++) if (!(e + r <= -1 || this.moduleCount <= e + r)) for (var l = -1; l <= 7; l++) t + l <= -1 || this.moduleCount <= t + l || (0 <= r && r <= 6 && (0 == l || 6 == l) || 0 <= l && l <= 6 && (0 == r || 6 == r) || 2 <= r && r <= 4 && 2 <= l && l <= 4 ? (this.modules[e + r][t + l][0] = true, this.modules[e + r][t + l][2] = o, this.modules[e + r][t + l][1] = 0 == r || 0 == l || 6 == r || 6 == l ? "O" : "I") : this.modules[e + r][t + l][0] = false);
      }, getBestMaskPattern: function () {
        for (var e = 0, t = 0, o = 0; o < 8; o++) {
          this.makeImpl(true, o);
          var r = C.getLostPoint(this);
          (0 == o || e > r) && (e = r, t = o);
        }
        return t;
      }, createMovieClip: function (e, t, o) {
        var r = e.createEmptyMovieClip(t, o);
        this.make();
        for (var l = 0; l < this.modules.length; l++) for (var a = 1 * l, n = 0; n < this.modules[l].length; n++) {
          var i = 1 * n;
          this.modules[l][n][0] && (r.beginFill(0, 100), r.moveTo(i, a), r.lineTo(i + 1, a), r.lineTo(i + 1, a + 1), r.lineTo(i, a + 1), r.endFill());
        }
        return r;
      }, setupTimingPattern: function () {
        for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[e][6][0] && (this.modules[e][6][0] = e % 2 == 0);
        for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[6][t][0] && (this.modules[6][t][0] = t % 2 == 0);
      }, setupPositionAdjustPattern: function (e) {
        for (var t = C.getPatternPosition(this.typeNumber), o = 0; o < t.length; o++) for (var r = 0; r < t.length; r++) {
          var l = t[o], a = t[r];
          if (null == this.modules[l][a][0]) for (var n = -2; n <= 2; n++) for (var i = -2; i <= 2; i++) -2 == n || 2 == n || -2 == i || 2 == i || 0 == n && 0 == i ? (this.modules[l + n][a + i][0] = true, this.modules[l + n][a + i][2] = e, this.modules[l + n][a + i][1] = -2 == n || -2 == i || 2 == n || 2 == i ? "O" : "I") : this.modules[l + n][a + i][0] = false;
        }
      }, setupTypeNumber: function (e) {
        for (var t = C.getBCHTypeNumber(this.typeNumber), o = 0; o < 18; o++) {
          var r = !e && 1 == (t >> o & 1);
          this.modules[Math.floor(o / 3)][o % 3 + this.moduleCount - 8 - 3][0] = r;
        }
        for (o = 0; o < 18; o++) r = !e && 1 == (t >> o & 1), this.modules[o % 3 + this.moduleCount - 8 - 3][Math.floor(o / 3)][0] = r;
      }, setupTypeInfo: function (e, t) {
        for (var o = this.errorCorrectLevel << 3 | t, r = C.getBCHTypeInfo(o), l = 0; l < 15; l++) {
          var a = !e && 1 == (r >> l & 1);
          l < 6 ? this.modules[l][8][0] = a : l < 8 ? this.modules[l + 1][8][0] = a : this.modules[this.moduleCount - 15 + l][8][0] = a;
        }
        for (l = 0; l < 15; l++) a = !e && 1 == (r >> l & 1), l < 8 ? this.modules[8][this.moduleCount - l - 1][0] = a : l < 9 ? this.modules[8][15 - l - 1 + 1][0] = a : this.modules[8][15 - l - 1][0] = a;
        this.modules[this.moduleCount - 8][8][0] = !e;
      }, mapData: function (e, t) {
        for (var o = -1, r = this.moduleCount - 1, l = 7, a = 0, n = this.moduleCount - 1; n > 0; n -= 2) for (6 == n && n--;;) {
          for (var i = 0; i < 2; i++) if (null == this.modules[r][n - i][0]) {
            var c = false;
            a < e.length && (c = 1 == (e[a] >>> l & 1)), C.getMask(t, r, n - i) && (c = !c), this.modules[r][n - i][0] = c, -1 == --l && (a++, l = 7);
          }
          if ((r += o) < 0 || this.moduleCount <= r) {
            r -= o, o = -o;
            break;
          }
        }
      }}, a.PAD0 = 236, a.PAD1 = 17, a.createData = function (e, t, o) {
        for (var r = i.getRSBlocks(e, t), l = new c, n = 0; n < o.length; n++) {
          var s = o[n];
          l.put(s.mode, 4), l.put(s.getLength(), C.getLengthInBits(s.mode, e)), s.write(l);
        }
        var d = 0;
        for (n = 0; n < r.length; n++) d += r[n].dataCount;
        if (l.getLengthInBits() > 8 * d) throw new Error("code length overflow. (" + l.getLengthInBits() + ">" + 8 * d + ")");
        for (l.getLengthInBits() + 4 <= 8 * d && l.put(0, 4); l.getLengthInBits() % 8 != 0;) l.putBit(false);
        for (; !(l.getLengthInBits() >= 8 * d || (l.put(a.PAD0, 8), l.getLengthInBits() >= 8 * d));) l.put(a.PAD1, 8);
        return a.createBytes(l, r);
      }, a.createBytes = function (e, t) {
        for (var o = 0, r = 0, l = 0, a = new Array(t.length), i = new Array(t.length), c = 0; c < t.length; c++) {
          var s = t[c].dataCount, d = t[c].totalCount - s;
          r = Math.max(r, s), l = Math.max(l, d), a[c] = new Array(s);
          for (var h = 0; h < a[c].length; h++) a[c][h] = 255 & e.buffer[h + o];
          o += s;
          var u = C.getErrorCorrectPolynomial(d), g = new n(a[c], u.getLength() - 1).mod(u);
          for (i[c] = new Array(u.getLength() - 1), h = 0; h < i[c].length; h++) {
            var p = h + g.getLength() - i[c].length;
            i[c][h] = p >= 0 ? g.get(p) : 0;
          }
        }
        var b = 0;
        for (h = 0; h < t.length; h++) b += t[h].totalCount;
        var _ = new Array(b), m = 0;
        for (h = 0; h < r; h++) for (c = 0; c < t.length; c++) h < a[c].length && (_[m++] = a[c][h]);
        for (h = 0; h < l; h++) for (c = 0; c < t.length; c++) h < i[c].length && (_[m++] = i[c][h]);
        return _;
      };
      for (var _ = {MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8}, m = {L: 1, M: 0, Q: 3, H: 2}, f = {PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7}, C = {PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function (e) {
        for (var t = e << 10; C.getBCHDigit(t) - C.getBCHDigit(C.G15) >= 0;) t ^= C.G15 << C.getBCHDigit(t) - C.getBCHDigit(C.G15);
        return (e << 10 | t) ^ C.G15_MASK;
      }, getBCHTypeNumber: function (e) {
        for (var t = e << 12; C.getBCHDigit(t) - C.getBCHDigit(C.G18) >= 0;) t ^= C.G18 << C.getBCHDigit(t) - C.getBCHDigit(C.G18);
        return e << 12 | t;
      }, getBCHDigit: function (e) {
        for (var t = 0; 0 != e;) t++, e >>>= 1;
        return t;
      }, getPatternPosition: function (e) {
        return C.PATTERN_POSITION_TABLE[e - 1];
      }, getMask: function (e, t, o) {
        switch (e) {
          case f.PATTERN000:
            return (t + o) % 2 == 0;
          case f.PATTERN001:
            return t % 2 == 0;
          case f.PATTERN010:
            return o % 3 == 0;
          case f.PATTERN011:
            return (t + o) % 3 == 0;
          case f.PATTERN100:
            return (Math.floor(t / 2) + Math.floor(o / 3)) % 2 == 0;
          case f.PATTERN101:
            return t * o % 2 + t * o % 3 == 0;
          case f.PATTERN110:
            return (t * o % 2 + t * o % 3) % 2 == 0;
          case f.PATTERN111:
            return (t * o % 3 + (t + o) % 2) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + e);
        }
      }, getErrorCorrectPolynomial: function (e) {
        for (var t = new n([1], 0), o = 0; o < e; o++) t = t.multiply(new n([1, v.gexp(o)], 0));
        return t;
      }, getLengthInBits: function (e, t) {
        if (1 <= t && t < 10) switch (e) {
          case _.MODE_NUMBER:
            return 10;
          case _.MODE_ALPHA_NUM:
            return 9;
          case _.MODE_8BIT_BYTE:
          case _.MODE_KANJI:
            return 8;
          default:
            throw new Error("mode:" + e);
        } else if (t < 27) switch (e) {
          case _.MODE_NUMBER:
            return 12;
          case _.MODE_ALPHA_NUM:
            return 11;
          case _.MODE_8BIT_BYTE:
            return 16;
          case _.MODE_KANJI:
            return 10;
          default:
            throw new Error("mode:" + e);
        } else {
          if (!(t < 41)) throw new Error("type:" + t);
          switch (e) {
            case _.MODE_NUMBER:
              return 14;
            case _.MODE_ALPHA_NUM:
              return 13;
            case _.MODE_8BIT_BYTE:
              return 16;
            case _.MODE_KANJI:
              return 12;
            default:
              throw new Error("mode:" + e);
          }
        }
      }, getLostPoint: function (e) {
        for (var t = e.getModuleCount(), o = 0, r = 0; r < t; r++) for (var l = 0; l < t; l++) {
          for (var a = 0, n = e.isDark(r, l), i = -1; i <= 1; i++) if (!(r + i < 0 || t <= r + i)) for (var c = -1; c <= 1; c++) l + c < 0 || t <= l + c || 0 == i && 0 == c || n == e.isDark(r + i, l + c) && a++;
          a > 5 && (o += 3 + a - 5);
        }
        for (r = 0; r < t - 1; r++) for (l = 0; l < t - 1; l++) {
          var s = 0;
          e.isDark(r, l) && s++, e.isDark(r + 1, l) && s++, e.isDark(r, l + 1) && s++, e.isDark(r + 1, l + 1) && s++, 0 != s && 4 != s || (o += 3);
        }
        for (r = 0; r < t; r++) for (l = 0; l < t - 6; l++) e.isDark(r, l) && !e.isDark(r, l + 1) && e.isDark(r, l + 2) && e.isDark(r, l + 3) && e.isDark(r, l + 4) && !e.isDark(r, l + 5) && e.isDark(r, l + 6) && (o += 40);
        for (l = 0; l < t; l++) for (r = 0; r < t - 6; r++) e.isDark(r, l) && !e.isDark(r + 1, l) && e.isDark(r + 2, l) && e.isDark(r + 3, l) && e.isDark(r + 4, l) && !e.isDark(r + 5, l) && e.isDark(r + 6, l) && (o += 40);
        var d = 0;
        for (l = 0; l < t; l++) for (r = 0; r < t; r++) e.isDark(r, l) && d++;
        return o + Math.abs(100 * d / t / t - 50) / 5 * 10;
      }}, v = {glog: function (e) {
        if (e < 1) throw new Error("glog(" + e + ")");
        return v.LOG_TABLE[e];
      }, gexp: function (e) {
        for (; e < 0;) e += 255;
        for (; e >= 256;) e -= 255;
        return v.EXP_TABLE[e];
      }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256)}, q = 0; q < 8; q++) v.EXP_TABLE[q] = 1 << q;
      for (q = 8; q < 256; q++) v.EXP_TABLE[q] = v.EXP_TABLE[q - 4] ^ v.EXP_TABLE[q - 5] ^ v.EXP_TABLE[q - 6] ^ v.EXP_TABLE[q - 8];
      for (q = 0; q < 255; q++) v.LOG_TABLE[v.EXP_TABLE[q]] = q;
      n.prototype = {get: function (e) {
        return this.num[e];
      }, getLength: function () {
        return this.num.length;
      }, multiply: function (e) {
        for (var t = new Array(this.getLength() + e.getLength() - 1), o = 0; o < this.getLength(); o++) for (var r = 0; r < e.getLength(); r++) t[o + r] ^= v.gexp(v.glog(this.get(o)) + v.glog(e.get(r)));
        return new n(t, 0);
      }, mod: function (e) {
        if (this.getLength() - e.getLength() < 0) return this;
        for (var t = v.glog(this.get(0)) - v.glog(e.get(0)), o = new Array(this.getLength()), r = 0; r < this.getLength(); r++) o[r] = this.get(r);
        for (r = 0; r < e.getLength(); r++) o[r] ^= v.gexp(v.glog(e.get(r)) + t);
        return new n(o, 0).mod(e);
      }}, i.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12, 7, 37, 13], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], i.getRSBlocks = function (e, t) {
        var o = i.getRsBlockTable(e, t);
        if (o == d) throw new Error("bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t);
        for (var r = o.length / 3, l = [], a = 0; a < r; a++) for (var n = o[3 * a + 0], c = o[3 * a + 1], s = o[3 * a + 2], h = 0; h < n; h++) l.push(new i(c, s));
        return l;
      }, i.getRsBlockTable = function (e, t) {
        switch (t) {
          case m.L:
            return i.RS_BLOCK_TABLE[4 * (e - 1) + 0];
          case m.M:
            return i.RS_BLOCK_TABLE[4 * (e - 1) + 1];
          case m.Q:
            return i.RS_BLOCK_TABLE[4 * (e - 1) + 2];
          case m.H:
            return i.RS_BLOCK_TABLE[4 * (e - 1) + 3];
          default:
            return d;
        }
      }, c.prototype = {get: function (e) {
        var t = Math.floor(e / 8);
        return 1 == (this.buffer[t] >>> 7 - e % 8 & 1);
      }, put: function (e, t) {
        for (var o = 0; o < t; o++) this.putBit(1 == (e >>> t - o - 1 & 1));
      }, getLengthInBits: function () {
        return this.length;
      }, putBit: function (e) {
        var t = Math.floor(this.length / 8);
        this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++;
      }};
      var y = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]], O = function () {
        var e = function (e, t) {
          this._el = e, this._htOption = t;
        };
        return e.prototype.draw = function (e) {
          function t(e, t) {
            var o = document.createElementNS("http://www.w3.org/2000/svg", e);
            for (var r in t) t.hasOwnProperty(r) && o.setAttribute(r, t[r]);
            return o;
          }
          var o = this._htOption, r = this._el, l = e.getModuleCount();
          Math.floor(o.width / l), Math.floor(o.height / l), this.clear();
          var a = t("svg", {viewBox: "0 0 " + String(l) + " " + String(l), width: "100%", height: "100%", fill: o.colorLight});
          a.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), r.appendChild(a), a.appendChild(t("rect", {fill: o.colorLight, width: "100%", height: "100%"})), a.appendChild(t("rect", {fill: o.colorDark, width: "1", height: "1", id: "template"}));
          for (var n = 0; n < l; n++) for (var i = 0; i < l; i++) if (e.isDark(n, i)) {
            var c = t("use", {x: String(i), y: String(n)});
            c.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), a.appendChild(c);
          }
        }, e.prototype.clear = function () {
          for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild);
        }, e;
      }(), E = "svg" === document.documentElement.tagName.toLowerCase() ? O : "undefined" != typeof CanvasRenderingContext2D ? function () {
        function e() {
          try {
            var e = this._elCanvas.toDataURL("image/png");
            this._elImage.src = e, this.dataURL = e, this._elImage.style.display = "inline", this._elCanvas.style.display = "none";
          } catch (e) {
            console.error(e);
          }
          this._htOption.onRenderingEnd && (this.dataURL || console.error("Can not get base64 data, please check: 1. published the page and image to the server 2. The image request support CORS"), this._htOption.onRenderingEnd(this._htOption, this.dataURL));
        }
        function t(e, t) {
          var o = this;
          if (o._fFail = t, o._fSuccess = e, null === o._bSupportDataURI) {
            var r = document.createElement("img"), l = function () {
              o._bSupportDataURI = false, o._fFail && o._fFail.call(o);
            };
            return r.onabort = l, r.onerror = l, r.onload = function () {
              o._bSupportDataURI = true, o._fSuccess && o._fSuccess.call(o);
            }, void (r.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
          }
          true === o._bSupportDataURI && o._fSuccess ? o._fSuccess.call(o) : false === o._bSupportDataURI && o._fFail && o._fFail.call(o);
        }
        if (p._android && p._android <= 2.1) {
          var o = 1 / window.devicePixelRatio, r = CanvasRenderingContext2D.prototype.drawImage;
          CanvasRenderingContext2D.prototype.drawImage = function (e, t, l, a, n, i, c, s, d) {
            if ("nodeName" in e && /img/i.test(e.nodeName)) for (var h = arguments.length - 1; h >= 1; h--) arguments[h] = arguments[h] * o; else void 0 === s && (arguments[1] *= o, arguments[2] *= o, arguments[3] *= o, arguments[4] *= o);
            r.apply(this, arguments);
          };
        }
        var l = function (e, t) {
          this._bIsPainted = false, this._android = s(), this._htOption = t, this._elCanvas = document.createElement("canvas"), e.appendChild(this._elCanvas), this._el = e, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = false, this._elImage = document.createElement("img"), this._elImage.alt = "Scan me!", this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null, this.dataURL = null;
        };
        return l.prototype.draw = function (e) {
          function t() {
            l.lineWidth = 0, l.fillStyle = a.quietZoneColor, l.fillRect(0, 0, s._elCanvas.width, a.quietZone), l.fillRect(0, a.quietZone, a.quietZone, s._elCanvas.height - 2 * a.quietZone), l.fillRect(s._elCanvas.width - a.quietZone, a.quietZone, a.quietZone, s._elCanvas.height - 2 * a.quietZone), l.fillRect(0, s._elCanvas.height - a.quietZone, s._elCanvas.width, a.quietZone);
          }
          function o(e) {
            a.onRenderingStart && a.onRenderingStart(a);
            for (var o = 0; o < n; o++) for (var r = 0; r < n; r++) {
              var s = r * i + a.quietZone, d = o * c + a.quietZone, h = e.isDark(o, r), u = e.getEye(o, r);
              if (u) {
                h = u.isDark;
                var g = u.type, p = a[g] || a[g.substring(0, 2)] || a.colorDark;
                l.lineWidth = 0, l.strokeStyle = h ? p : a.colorLight, l.fillStyle = h ? p : a.colorLight, l.fillRect(s, a.titleHeight + d, i, c);
              } else {
                l.lineWidth = 0, l.strokeStyle = h ? a.colorDark : a.colorLight, l.fillStyle = h ? a.colorDark : a.colorLight;
                var b = a.dotScale;
                if (6 == o) {
                  b = 1;
                  var _ = a.timing_H || a.timing || a.colorDark;
                  l.fillStyle = h ? _ : a.colorLight, l.strokeStyle = l.fillStyle, l.fillRect(s + i * (1 - b) / 2, a.titleHeight + d + c * (1 - b) / 2, i * b, c * b);
                } else if (6 == r) {
                  b = 1;
                  var m = a.timing_V || a.timing || a.colorDark;
                  l.fillStyle = h ? m : a.colorLight, l.strokeStyle = l.fillStyle, l.fillRect(s + i * (1 - b) / 2, a.titleHeight + d + c * (1 - b) / 2, i * b, c * b);
                } else a.backgroundImage ? (a.autoColor ? (l.strokeStyle = h ? "rgba(0, 0, 0, .6)" : "rgba(255, 255, 255, .7)", l.fillStyle = h ? "rgba(0, 0, 0, .6)" : "rgba(255, 255, 255, .7)") : (l.strokeStyle = h ? a.colorDark : "rgba(0,0,0,0)", l.fillStyle = h ? a.colorDark : "rgba(0,0,0,0)", l.strokeStyle = l.fillStyle), l.fillRect(s + i * (1 - b) / 2, a.titleHeight + d + c * (1 - b) / 2, i * b, c * b)) : (l.strokeStyle = l.fillStyle, l.fillRect(s + i * (1 - b) / 2, a.titleHeight + d + c * (1 - b) / 2, i * b, c * b));
              }
              1 == a.dotScale || u || (l.strokeStyle = a.colorLight);
            }
            if (a.title && (l.fillStyle = a.titleBackgroundColor, l.fillRect(0, 0, this._elCanvas.width, a.titleHeight + a.quietZone), l.font = a.titleFont, l.fillStyle = a.titleColor, l.textAlign = "center", l.fillText(a.title, this._elCanvas.width / 2, +a.quietZone + a.titleTop)), a.subTitle && (l.font = a.subTitleFont, l.fillStyle = a.subTitleColor, l.fillText(a.subTitle, this._elCanvas.width / 2, +a.quietZone + a.subTitleTop)), a.logo) {
              var f = new Image, C = this;
              f.onload = function () {
                !function (e) {
                  var o = Math.round(a.width / 3.5), r = Math.round(a.height / 3.5);
                  o !== r && (o = r), a.logoWidth && (o = Math.round(a.logoWidth)), a.logoHeight && (r = Math.round(a.logoHeight));
                  var n, i, c = (a.width + 2 * a.quietZone - o) / 2, s = (a.height + a.titleHeight + 2 * a.quietZone - r) / 2;
                  a.logoBackgroundTransparent || (l.fillStyle = a.logoBackgroundColor, l.fillRect(c, s, o, r)), void 0 === e.naturalWidth ? (n = e.width, i = e.height) : (n = e.naturalWidth, i = e.naturalHeight);
                  var d = Math.min(o / n, r / i), h = n * d, u = i * d;
                  l.drawImage(e, c + (o - h) / 2, s + (r - u) / 2, h, u), a.quietZone > 0 && a.quietZoneColor && t(), C._bIsPainted = true, C.makeImage();
                }(f);
              }, f.onerror = function (e) {
                console.error(e);
              }, f.src = a.logo;
            } else this._bIsPainted = true, this.makeImage();
          }
          var r = this._elImage, l = this._oContext, a = this._htOption;
          a.title || a.subTitle || (a.height -= a.titleHeight, a.titleHeight = 0);
          var n = e.getModuleCount(), i = Math.round(a.width / n), c = Math.round((a.height - a.titleHeight) / n);
          a.width = i * n, a.height = c * n + a.titleHeight, a.quietZone = Math.round(a.quietZone), this._elCanvas.width = a.width + 2 * a.quietZone, this._elCanvas.height = a.height + 2 * a.quietZone, r.style.display = "none", this.clear(), l.lineWidth = 0, l.fillStyle = a.colorLight, l.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height);
          var s = this;
          if (a.backgroundImage) {
            var d = new Image;
            d.onload = function () {
              l.globalAlpha = 1, l.globalAlpha = a.backgroundImageAlpha, l.drawImage(d, 0, a.titleHeight, a.width + 2 * a.quietZone, a.height + 2 * a.quietZone - a.titleHeight), l.globalAlpha = 1, o.call(s, e);
            }, d.src = a.backgroundImage;
          } else o.call(s, e);
        }, l.prototype.makeImage = function () {
          this._bIsPainted && t.call(this, e);
        }, l.prototype.isPainted = function () {
          return this._bIsPainted;
        }, l.prototype.clear = function () {
          this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = false;
        }, l.prototype.remove = function () {
          this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = false, this._el.innerHTML = "";
        }, l.prototype.round = function (e) {
          return e ? Math.floor(1e3 * e) / 1e3 : e;
        }, l;
      }() : function () {
        var e = function (e, t) {
          this._el = e, this._htOption = t;
        };
        return e.prototype.draw = function (e) {
          var t = this._htOption, o = this._el, r = e.getModuleCount(), l = Math.round(t.width / r), a = Math.round((t.height - t.titleHeight) / r);
          this._htOption.width = l * r, this._htOption.height = a * r + t.titleHeight, this._htOption.quietZone = Math.round(this._htOption.quietZone);
          var n = [], i = "", c = Math.round(l * t.dotScale), s = Math.round(a * t.dotScale);
          c < 4 && (c = 4, s = 4);
          var d = t.colorDark, h = t.colorLight;
          if (t.backgroundImage) {
            t.autoColor ? (t.colorDark = "rgba(0, 0, 0, .6);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#99000000', EndColorStr='#99000000');", t.colorLight = "rgba(255, 255, 255, .7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#B2FFFFFF', EndColorStr='#B2FFFFFF');") : t.colorLight = "transparent";
            var u = '<div style="display:inline-block; z-index:-10;position:absolute;"><img src="' + t.backgroundImage + '" widht="' + (t.width + 2 * t.quietZone) + '" height="' + (t.height + 2 * t.quietZone) + '" style="opacity:' + t.backgroundImageAlpha + ";filter:alpha(opacity=" + 100 * t.backgroundImageAlpha + '); "/></div>';
            n.push(u);
          }
          if (t.quietZone && (i = "display:inline-block; width:" + (t.width + 2 * t.quietZone) + "px; height:" + (t.width + 2 * t.quietZone) + "px;background:" + t.quietZoneColor + "; text-align:center;"), n.push('<div style="font-size:0;' + i + '">'), n.push('<table  style="font-size:0;border:0;border-collapse:collapse; margin-top:' + t.quietZone + 'px;" border="0" cellspacing="0" cellspadding="0" align="center" valign="middle">'), n.push('<tr height="' + t.titleHeight + '" align="center"><td style="border:0;border-collapse:collapse;margin:0;padding:0" colspan="' + r + '">'), t.title) {
            var g = t.titleColor, p = t.titleFont;
            n.push('<div style="width:100%;margin-top:' + t.titleTop + "px;color:" + g + ";font:" + p + ";background:" + t.titleBackgroundColor + '">' + t.title + "</div>");
          }
          t.subTitle && n.push('<div style="width:100%;margin-top:' + (t.subTitleTop - t.titleTop) + "px;color:" + t.subTitleColor + "; font:" + t.subTitleFont + '">' + t.subTitle + "</div>"), n.push("</td></tr>");
          for (var b = 0; b < r; b++) {
            n.push('<tr style="border:0; padding:0; margin:0;" height="7">');
            for (var _ = 0; _ < r; _++) {
              var m = e.isDark(b, _), f = e.getEye(b, _);
              if (f) {
                m = f.isDark;
                var C = f.type, v = t[C] || t[C.substring(0, 2)] || d;
                n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + l + "px;height:" + a + 'px;"><span style="width:' + l + "px;height:" + a + "px;background-color:" + (m ? v : h) + ';display:inline-block"></span></td>');
              } else {
                var q = t.colorDark;
                6 == b ? (q = t.timing_H || t.timing || d, n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + l + "px;height:" + a + "px;background-color:" + (m ? q : h) + ';"></td>')) : 6 == _ ? (q = t.timing_V || t.timing || d, n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + l + "px;height:" + a + "px;background-color:" + (m ? q : h) + ';"></td>')) : n.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + l + "px;height:" + a + 'px;"><div style="display:inline-block;width:' + c + "px;height:" + s + "px;background-color:" + (m ? q : t.colorLight) + ';"></div></td>');
              }
            }
            n.push("</tr>");
          }
          if (n.push("</table>"), n.push("</div>"), t.logo) {
            (new Image).src = t.logo;
            var y = t.width / 3.5, O = t.height / 3.5;
            y != O && (y = O), t.logoWidth && (y = t.logoWidth), t.logoHeight && (O = t.logoHeight);
            var E = "position:relative; z-index:1;display:table-cell;top:-" + ((t.height - t.titleHeight) / 2 + O / 2 + t.quietZone) + "px;text-align:center; width:" + y + "px; height:" + O + "px;line-height:" + y + "px; vertical-align: middle;";
            t.logoBackgroundTransparent || (E += "background:" + t.logoBackgroundColor), n.push('<div style="' + E + '"><img  src="' + t.logo + '"  style="max-width: ' + y + "px; max-height: " + O + 'px;" /> <div style=" display: none; width:1px;margin-left: -1px;"></div></div>');
          }
          t.onRenderingStart && t.onRenderingStart(t), o.innerHTML = n.join("");
          var j = o.childNodes[0], T = (t.width - j.offsetWidth) / 2, k = (t.height - j.offsetHeight) / 2;
          T > 0 && k > 0 && (j.style.margin = k + "px " + T + "px"), this._htOption.onRenderingEnd && this._htOption.onRenderingEnd(this._htOption, null);
        }, e.prototype.clear = function () {
          this._el.innerHTML = "";
        }, e;
      }();
      (h = function (e, t) {
        if (this._htOption = {width: 256, height: 256, typeNumber: 4, colorDark: "#000000", colorLight: "#ffffff", correctLevel: m.H, dotScale: 1, quietZone: 0, quietZoneColor: "transparent", title: "", titleFont: "bold 16px Arial", titleColor: "#000000", titleBackgroundColor: "#ffffff", titleHeight: 0, titleTop: 30, subTitle: "", subTitleFont: "14px Arial", subTitleColor: "#4F4F4F", subTitleTop: 60, logo: d, logoWidth: d, logoHeight: d, logoBackgroundColor: "#ffffff", logoBackgroundTransparent: false, PO: d, PI: d, PO_TL: d, PI_TL: d, PO_TR: d, PI_TR: d, PO_BL: d, PI_BL: d, AO: d, AI: d, timing: d, timing_H: d, timing_V: d, backgroundImage: d, backgroundImageAlpha: 1, autoColor: false, onRenderingStart: d, onRenderingEnd: d, version: 0, tooltip: false, binary: false}, "string" == typeof t && (t = {text: t}), t) for (var o in t) this._htOption[o] = t[o];
        (this._htOption.version < 0 || this._htOption.version > 40) && (console.warn("QR Code version '" + this._htOption.version + "' is invalidate, reset to 0"), this._htOption.version = 0), (this._htOption.dotScale < 0 || this._htOption.dotScale > 1) && (console.warn(this._htOption.dotScale + " , is invalidate, dotScale must greater than 0, less than or equal to 1, now reset to 1. "), this._htOption.dotScale = 1), (this._htOption.backgroundImageAlpha < 0 || this._htOption.backgroundImageAlpha > 1) && (console.warn(this._htOption.backgroundImageAlpha + " , is invalidate, backgroundImageAlpha must between 0 and 1, now reset to 1. "), this._htOption.backgroundImageAlpha = 1), this._htOption.height = this._htOption.height + this._htOption.titleHeight, "string" == typeof e && (e = document.getElementById(e)), this._htOption.useSVG && (E = O), this._android = s(), this._el = e, this._oQRCode = null, this._oDrawing = new E(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text);
      }).prototype.makeCode = function (e) {
        this._oQRCode = new a(function (e, t) {
          for (var o = t.correctLevel, r = 1, l = function (e) {
            var t = encodeURI(e).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");
            return t.length + (t.length != e.length ? 3 : 0);
          }(e), a = 0, n = y.length; a <= n; a++) {
            var i = 0;
            switch (o) {
              case m.L:
                i = y[a][0];
                break;
              case m.M:
                i = y[a][1];
                break;
              case m.Q:
                i = y[a][2];
                break;
              case m.H:
                i = y[a][3];
            }
            if (l <= i) break;
            r++;
          }
          if (r > y.length) throw new Error("Too long data");
          return 0 != t.version && (r <= t.version ? (r = t.version, t.runVersion = r) : (console.warn("QR Code version " + t.version + " too small, run version use " + r), t.runVersion = r)), r;
        }(e, this._htOption), this._htOption.correctLevel), this._oQRCode.addData(e, this._htOption.binary), this._oQRCode.make(), this._htOption.tooltip && (this._el.title = e), this._oDrawing.draw(this._oQRCode);
      }, h.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage();
      }, h.prototype.clear = function () {
        this._oDrawing.remove();
      }, h.prototype.resize = function (e, t) {
        this._htOption.width = e, this._htOption.height = t, this._oDrawing.draw(this._oQRCode);
      }, h.prototype.noConflict = function () {
        return p.QRCode === this && (p.QRCode = b), h;
      }, h.CorrectLevel = m, void 0 === (r = function () {
        return h;
      }.apply(t, [])) || (o.exports = r);
    }.call(this));
  }.call(this, o(9), o(10)(e)));
}, function (e) {
  e.exports = JSON.parse('{"name":"htqrcode/qrcode","category":"common","attributes":{"title":{"type":"string","default":""},"html_tag":{"type":"string","default":""},"category":{"type":"string","default":"text"},"alignment":{"type":"string","default":""},"qrDemoStyle":{"type":"string","default":""},"text":{"type":"string","default":""},"url":{"type":"string","default":""},"mobile":{"type":"string","default":""},"message":{"type":"string","default":""},"email":{"type":"string","default":""},"skype":{"type":"string","default":""},"latitude":{"type":"string","default":""},"longitude":{"type":"string","default":""},"query":{"type":"string","default":""},"ssid":{"type":"string","default":""},"password":{"type":"string","default":""},"networdType":{"type":"string","default":""},"name":{"type":"string","default":""},"company":{"type":"string","default":""},"contactTitle":{"type":"string","default":""},"phone":{"type":"string","default":""},"address":{"type":"string","default":""},"note":{"type":"string","default":""},"encoding":{"type":"string","default":""},"qrCodeLogo":{"type":"object","default":{}},"qrCodeBackground":{"type":"object","default":{}},"qrCodeImage":{"type":"object","default":{}},"qrCodeEventTitle":{"type":"string","default":""},"qrCodeEventStartDate":{"type":"string","default":""},"qrCodeEventEndDate":{"type":"string","default":""},"qrCodeEventLocation":{"type":"string","default":""},"qrCodeEventDescription":{"type":"string","default":""},"qrcode":{"type":"string","default":"QR Code Empty"},"size":{"type":"string","default":300},"dot_scale":{"type":"string","default":"1"},"qr_level":{"type":"string","default":"L"},"logo":{"type":"string","default":""},"logo_width":{"type":"string","default":80},"logo_height":{"type":"string","default":80},"logo_bg_color":{"type":"string","default":""},"qr_bg_image":{"type":"string","default":""},"logo_bg_transparent":{"type":"string","default":"true"},"qr_bg_opacity":{"type":"string","default":"0.5"},"qr_bg_autocolor":{"type":"string","default":"false"},"colordark":{"type":"string","default":"#000000"},"colorlight":{"type":"string","default":"#ffffff"},"po":{"type":"string","default":""},"pi":{"type":"string","default":""},"po_tl":{"type":"string","default":""},"pi_tl":{"type":"string","default":""},"po_tr":{"type":"string","default":""},"pi_tr":{"type":"string","default":""},"po_bl":{"type":"string","default":""},"pi_bl":{"type":"string","default":""},"ai":{"type":"string","default":""},"ao":{"type":"string","default":""},"timing":{"type":"string","default":""},"timing_h":{"type":"string","default":""},"timing_v":{"type":"string","default":""},"quietzone":{"type":"string","default":"0"},"quietzonecolor":{"type":"string","default":"#00CED1"},"print":{"type":"boolean","default":true},"print_btn_txt":{"type":"string","default":"Print QR Code"},"download":{"type":"boolean","default":true},"download_btn_txt":{"type":"string","default":"Download"}}}');
}, function (e, t) {
  e.exports = window.wp.blocks;
}, function (e, t) {
  e.exports = window.wp.compose;
}, function (e, t) {
  e.exports = window.wp.data;
}, function (e, t) {
  var o;
  o = function () {
    return this;
  }();
  try {
    o = o || new Function("return this")();
  } catch (e) {
    "object" == typeof window && (o = window);
  }
  e.exports = o;
}, function (e, t) {
  e.exports = function (e) {
    return e.webpackPolyfill || (e.deprecate = function () {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {enumerable: true, get: function () {
      return e.l;
    }}), Object.defineProperty(e, "id", {enumerable: true, get: function () {
      return e.i;
    }}), e.webpackPolyfill = 1), e;
  };
}, function (e, t, o) {
  "use strict";
  o.r(t), o.d(t, "registerWoolentorBlocks", function () {
    return B;
  });
  var r = {};
  o.r(r), o.d(r, "name", function () {
    return k;
  }), o.d(r, "category", function () {
    return w;
  }), o.d(r, "metadata", function () {
    return T;
  }), o.d(r, "settings", function () {
    return A;
  });
  var l = o(6), a = o(0), n = o(1), i = o(2), c = e => {
    const {attributes: t, setAttributes: o} = e;
    return Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("QR Code Demo", "ht-qrcode")))), Object(a.createElement)("h3", {className: "htqr-titel"}, Object(n.__)("Choose QR Code Category", "ht-qrcode")), Object(a.createElement)(i.SelectControl, {value: t.qrDemoStyle, options: [{label: Object(n.__)("1. Normal", "ht-qrcode"), value: "normal"}, {label: Object(n.__)("2. Color", "ht-qrcode"), value: "color"}, {label: Object(n.__)("3. Dot Scale", "ht-qrcode"), value: "dotScale"}, {label: Object(n.__)("4. Position Color + Alignment Color", "ht-qrcode"), value: "positionColorAlignmentColor"}, {label: Object(n.__)("5. Position Color + Dot Scale", "ht-qrcode"), value: "positionColorDotScale"}, {label: Object(n.__)("6. Timing + Dot Scale", "ht-qrcode"), value: "timingDotScale"}, {label: Object(n.__)("7. Background Image", "ht-qrcode"), value: "backgroundImage"}, {label: Object(n.__)("8. Auto Color + Background Image + Dot Scale", "ht-qrcode"), value: "autoColorBackgroundImageDotScale"}, {label: Object(n.__)("9. AutoColor + background Image Alpha", "ht-qrcode"), value: "autoColorBackgroundImageAlpha"}, {label: Object(n.__)("10. Logo + quietZone Color", "ht-qrcode"), value: "logoquietZoneColor"}, {label: Object(n.__)("11. Logo + Dot Scale", "ht-qrcode"), value: "logoDotScale"}, {label: Object(n.__)("12. Logo + Colorful Style 1", "ht-qrcode"), value: "logoColorfulStyle-1"}, {label: Object(n.__)("13. Logo + Colorful Style 2", "ht-qrcode"), value: "logoColorfulStyle-2"}, {label: Object(n.__)("14. QuietZone + Logo + Background", "ht-qrcode"), value: "quietZoneLogoBackground"}], help: Object(n.__)("If you change the demo category, it will reset all your style settings.", "ht-qrcode"), onChange: e => (o({qrDemoStyle: e}), "normal" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "#ffffff", dot_scale: "1", qrCodeLogo: "", qrCodeBackground: ""}), "color" == e && o({colordark: "#473C8B", colorlight: "#FFFACD", po: "", pi: "", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "1", qrCodeLogo: "", qrCodeBackground: ""}), "dotScale" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "0.4", qrCodeLogo: "", qrCodeBackground: ""}), "positionColorAlignmentColor" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "#269926", pi: "#BF3030", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "#009ACD", ao: "#B03060", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "1", qrCodeLogo: "", qrCodeBackground: ""}), "positionColorDotScale" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "#f55066", po_tl: "#aa5b71", pi_tl: "#b7d28d", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "0.5", qrCodeLogo: "", qrCodeBackground: ""}), "timingDotScale" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "#A67C00", ao: "#A67C00", timing: "#e1622f", timing_h: "", timing_v: "#00C12B", quietzone: 0, quietzonecolor: "", dot_scale: "0.4", qrCodeLogo: "", qrCodeBackground: ""}), "backgroundImage" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "1", qrCodeLogo: "", qrCodeBackground: "", backgroundImageAlpha: "1", autoColor: "false"}), "autoColorBackgroundImageDotScale" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "#f55066", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "0.5", qr_bg_opacity: "1", qrCodeLogo: "", qrCodeBackground: "", backgroundImageAlpha: "1", autoColor: "true"}), "autoColorBackgroundImageAlpha" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "#f55066", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: 0, quietzonecolor: "", dot_scale: "0.5", qrCodeLogo: "", qrCodeBackground: "", backgroundImageAlpha: "0.3", autoColor: "true", binarize: true}), "logoquietZoneColor" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "#f55066", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "", timing_v: "", quietzone: "15", quietzonecolor: "#00CED1", dot_scale: "0.5", qrCodeLogo: "", qrCodeBackground: "", logo_bg_color: "#ffffff", logo_bg_transparent: "false"}), "logoDotScale" == e && o({colordark: "#000000", colorlight: "#ffffff", po: "", pi: "#f55066", po_tl: "", pi_tl: "", po_tr: "", pi_tr: "", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_v: "#00B2EE", dot_scale: "0.5", logo_bg_color: "#ffffff", logo_bg_transparent: "false", qrCodeLogo: "", qrCodeBackground: ""}), "logoColorfulStyle-1" == e && o({colordark: "#27408B", colorlight: "#FFF8DC", po: "#e1622f", pi: "#aa5b71", po_tl: "#b7d28d", pi_tl: "", po_tr: "#aa5b71", pi_tr: "#c17e61", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "#ff6600", timing_v: "#cc0033", quietzone: "0", quietzonecolor: "", dot_scale: "0.5", logo_bg_color: "#FFF8DC", logo_bg_transparent: "false", qrCodeLogo: "", qrCodeBackground: ""}), "logoColorfulStyle-2" == e && o({colordark: "#27408B", colorlight: "#FFF8DC", po: "#e1622f", pi: "#aa5b71", po_tl: "", pi_tl: "#b7d28d", po_tr: "#aa5b71", pi_tr: "#c17e61", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "#ff6600", timing_v: "#cc0033", quietzone: "0", quietzonecolor: "", dot_scale: "0.5", logo_bg_color: "#FFF8DC", logo_bg_transparent: "false", qr_bg_image: "", qr_bg_opacity: "0.3", qr_bg_autocolor: true, qrCodeLogo: "", qrCodeBackground: ""}), "quietZoneLogoBackground" == e && o({colordark: "#27408B", colorlight: "#FFF8DC", po: "#e1622f", pi: "#aa5b71", po_tl: "", pi_tl: "#b7d28d", po_tr: "#aa5b71", pi_tr: "#c17e61", po_bl: "", pi_bl: "", ai: "", ao: "", timing: "", timing_h: "#ff6600", timing_v: "#cc0033", quietzone: "0", quietzonecolor: "", dot_scale: "0.5", logo_bg_color: "#FFF8DC", logo_bg_transparent: "false", qr_bg_image: "", qr_bg_opacity: "0.3", qr_bg_autocolor: true, qrCodeLogo: "", qrCodeBackground: ""}))}), ("logoquietZoneColor" == t.qrDemoStyle || "logoDotScale" == t.qrDemoStyle || "logoColorfulStyle-1" == t.qrDemoStyle || "logoColorfulStyle-2" == t.qrDemoStyle || "quietZoneLogoBackground" == t.qrDemoStyle || "backgroundImage" == t.qrDemoStyle || "autoColorBackgroundImageDotScale" == t.qrDemoStyle || "autoColorBackgroundImageAlpha" == t.qrDemoStyle || "quietZoneLogoBackground" == t.qrDemoStyle) && Object(a.createElement)("div", {className: "alert"}, Object(a.createElement)("strong", null, Object(n.__)("Note:", "ht-qrcode")), Object(n.__)("You must add the background image and logo. Otherwise, they will not show up in the front-end.", "ht-qrcode")));
  }, s = e => {
    const {attributes: t, setAttributes: o} = e;
    return Object(a.createElement)("div", null, Object(a.createElement)("h3", {className: "htqr-titel"}, Object(n.__)("Alignment", "ht-qrcode")), Object(a.createElement)(i.SelectControl, {value: t.alignment, options: [{label: Object(n.__)("Left", "ht-qrcode"), value: "left"}, {label: Object(n.__)("Right", "ht-qrcode"), value: "right"}, {label: Object(n.__)("Center", "ht-qrcode"), value: "center"}], onChange: e => o({alignment: e})}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("QR Code Functionalities", "ht-qrcode")))), Object(a.createElement)("h3", {className: "htqr-titel"}, Object(n.__)("Choose QR Code Category", "ht-qrcode")), Object(a.createElement)(i.SelectControl, {value: t.category, options: [{label: Object(n.__)("Text", "ht-qrcode"), value: "text"}, {label: Object(n.__)("URL", "ht-qrcode"), value: "url"}, {label: Object(n.__)("Current Page URL", "ht-qrcode"), value: "current-page-url"}, {label: Object(n.__)("Send SMS", "ht-qrcode"), value: "sms"}, {label: Object(n.__)("Mobile Number", "ht-qrcode"), value: "ph_number"}, {label: Object(n.__)("Email Address", "ht-qrcode"), value: "email"}, {label: Object(n.__)("Skype Call", "ht-qrcode"), value: "skype"}, {label: Object(n.__)("Google Maps Location", "ht-qrcode"), value: "maps"}, {label: Object(n.__)("Google Talk Client", "ht-qrcode"), value: "g_talk"}, {label: Object(n.__)("WiFi Access", "ht-qrcode"), value: "wifi"}, {label: Object(n.__)("Contact Information", "ht-qrcode"), value: "contact_info"}, {label: Object(n.__)("Event", "ht-qrcode"), value: "event"}], onChange: e => o({category: e})}), "text" === t.category && Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Text Here:", "ht-qrcode"), help: "Type your URL or Text here.", value: t.text, onChange: e => {
      o({text: e});
    }}), "url" === t.category && Object(a.createElement)(i.TextControl, {label: Object(n.__)("URL:", "ht-qrcode"), value: t.url, onChange: e => {
      o({url: e});
    }}), "sms" === t.category && Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.TextControl, {label: Object(n.__)("Mobile Number:", "ht-qrcode"), value: t.mobile, onChange: e => {
      o({mobile: e});
    }}), Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Message:", "ht-qrcode"), value: t.message, onChange: e => {
      o({message: e});
    }})), "ph_number" === t.category && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Mobile Number:", "ht-qrcode"), value: t.mobile, onChange: e => {
      o({mobile: e});
    }}), "email" === t.category && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Email:", "ht-qrcode"), value: t.email, onChange: e => {
      o({email: e});
    }}), "skype" === t.category && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Skype:", "ht-qrcode"), value: t.skype, onChange: e => {
      o({skype: e});
    }}), "maps" === t.category && Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.TextControl, {label: Object(n.__)("Latitude:", "ht-qrcode"), value: t.latitude, onChange: e => {
      o({latitude: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Longitude:", "ht-qrcode"), value: t.longitude, onChange: e => {
      o({longitude: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Query:", "ht-qrcode"), value: t.query, onChange: e => {
      o({query: e});
    }})), "g_talk" === t.category && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Email:", "ht-qrcode"), value: t.email, onChange: e => {
      o({email: e});
    }}), "wifi" === t.category && Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.TextControl, {label: Object(n.__)("SSID:", "ht-qrcode"), value: t.ssid, onChange: e => {
      o({ssid: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Password:", "ht-qrcode"), value: t.password, onChange: e => {
      o({password: e});
    }}), Object(a.createElement)(i.SelectControl, {value: t.networdType, options: [{label: Object(n.__)("WEP", "ht-qrcode"), value: "WEP"}, {label: Object(n.__)("WPA/WPA2", "ht-qrcode"), value: "WPA"}], onChange: e => o({networdType: e})})), "contact_info" === t.category && Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.TextControl, {label: Object(n.__)("Name:", "ht-qrcode"), value: t.name, onChange: e => {
      o({name: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Company:", "ht-qrcode"), value: t.company, onChange: e => {
      o({company: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Title:", "ht-qrcode"), value: t.contactTitle, onChange: e => {
      o({contactTitle: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Mobile Number:", "ht-qrcode"), value: t.mobile, onChange: e => {
      o({mobile: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Phone Number:", "ht-qrcode"), value: t.phone, onChange: e => {
      o({phone: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Email:", "ht-qrcode"), value: t.email, onChange: e => {
      o({email: e});
    }}), Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Address:", "ht-qrcode"), value: t.address, onChange: e => {
      o({address: e});
    }}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("URL:", "ht-qrcode"), value: t.url, onChange: e => {
      o({url: e});
    }}), Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Note:", "ht-qrcode"), value: t.note, onChange: e => {
      o({note: e});
    }}), Object(a.createElement)(i.SelectControl, {label: Object(n.__)("Encoding:", "ht-qrcode"), value: t.encoding, options: [{label: Object(n.__)("vCard", "ht-qrcode"), value: "VCARD"}, {label: Object(n.__)("MECARD", "ht-qrcode"), value: "MECARD"}], onChange: e => o({encoding: e})})), "event" === t.category && Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.TextControl, {label: Object(n.__)("Title:", "ht-qrcode"), value: t.qrCodeEventTitle, onChange: e => {
      o({qrCodeEventTitle: e});
    }}), Object(a.createElement)("h3", {class: "htqr-titel"}, Object(n.__)("Select Start Date:", "ht-qrcode")), Object(a.createElement)(i.DateTimePicker, {currentDate: t.qrCodeEventStartDate, onChange: e => o({qrCodeEventStartDate: e}), is12Hour: true}), Object(a.createElement)("h3", {class: "htqr-titel"}, Object(n.__)("Select End Date:", "ht-qrcode")), Object(a.createElement)(i.DateTimePicker, {currentDate: t.qrCodeEventEndDate, onChange: e => o({qrCodeEventEndDate: e}), is12Hour: true}), Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Location:", "ht-qrcode"), value: t.qrCodeEventLocation, onChange: e => {
      o({qrCodeEventLocation: e});
    }}), Object(a.createElement)(i.TextareaControl, {label: Object(n.__)("Description:", "ht-qrcode"), value: t.qrCodeEventDescription, onChange: e => {
      o({qrCodeEventDescription: e});
    }})), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Print Button Option", "ht-qrcode")))), Object(a.createElement)(i.ToggleControl, {id: "switch-btn-enable", className: "htqr-toggle-control-button", label: Object(n.__)("Print Button Show", "ht-qrcode"), checked: t.print, onChange: () => {
      const e = true !== t.print;
      o({print: e});
    }}), 1 == t.print && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Print Button Text", "ht-qrcode"), value: Object(n.__)(t.print_btn_txt, "ht-qrcode"), onChange: e => {
      o({print_btn_txt: e});
    }}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Download Button Option", "ht-qrcode")))), Object(a.createElement)(i.ToggleControl, {id: "switch-btn-enable", className: "htqr-toggle-control-button", label: Object(n.__)("Download Button Show", "ht-qrcode"), checked: t.download, onChange: () => {
      const e = true !== t.download;
      o({download: e});
    }}), 1 == t.download && Object(a.createElement)(i.TextControl, {label: Object(n.__)("Download Button Text", "ht-qrcode"), value: Object(n.__)(t.download_btn_txt, "ht-qrcode"), onChange: e => {
      o({download_btn_txt: e});
    }}));
  }, d = e => {
    const {label: t, color: o, attributesKey: r, setAttributes: l} = e;
    return Object(a.createElement)("div", {style: {padding: 10}}, Object(a.createElement)("h3", null, t, Object(a.createElement)("span", {style: {width: 30, height: 12, display: "inline-block", marginLeft: 10, verticalAlign: "middle", backgroundColor: o}})), Object(a.createElement)(i.ColorPalette, {colors: [{name: "Block", color: "#000000"}, {name: "Accent Red", color: "#DC3232"}, {name: "Medium Blue", color: "#00A0D2"}, {name: "White", color: "#ffffff"}, {name: "Accent Green", color: "#46B450"}, {name: "Blue violet", color: "#8A2BE2"}], value: o, onChange: e => l({[r]: e})}));
  }, h = e => {
    const {attributes: t, setAttributes: o} = e;
    return Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("QR Code Style", "ht-qrcode")))), Object(a.createElement)(d, {label: Object(n.__)("QR Dot Color:", "ht-qrcode"), color: t.colordark, attributesKey: "colordark", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Background Color:", "ht-qrcode"), color: t.colorlight, attributesKey: "colorlight", setAttributes: o}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Pasotion Pattern Global Style", "ht-qrcode")))), Object(a.createElement)(d, {label: Object(n.__)("Pattern Outer Global Color:", "ht-qrcode"), color: t.po, attributesKey: "po", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Inner Global Color:", "ht-qrcode"), color: t.pi, attributesKey: "pi", setAttributes: o}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Pasotion Pattern Individual Style", "ht-qrcode")))), Object(a.createElement)(d, {label: Object(n.__)("Pattern Outer Top Left Color:", "ht-qrcode"), color: t.po_tl, attributesKey: "po_tl", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Inner Top Left Color:", "ht-qrcode"), color: t.pi_tl, attributesKey: "pi_tl", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Outer Top Right Color:", "ht-qrcode"), color: t.po_tr, attributesKey: "po_tr", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Inner Top Right Color:", "ht-qrcode"), color: t.pi_tr, attributesKey: "pi_tr", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Outer Bottom Color:", "ht-qrcode"), color: t.po_bl, attributesKey: "po_bl", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Pattern Inner Bottom Color:", "ht-qrcode"), color: t.pi_bl, attributesKey: "pi_bl", setAttributes: o}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Aligment Color", "ht-qrcode")))), Object(a.createElement)(d, {label: Object(n.__)("Aligment Outer Color:", "ht-qrcode"), color: t.ao, attributesKey: "ao", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Aligment Inner Color:", "ht-qrcode"), color: t.ai, attributesKey: "ai", setAttributes: o}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Timing Pattern Style", "ht-qrcode")))), Object(a.createElement)(d, {label: Object(n.__)("Timing Global Color:", "ht-qrcode"), color: t.timing, attributesKey: "timing", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Timing Horizontal Color:", "ht-qrcode"), color: t.timing_h, attributesKey: "timing_h", setAttributes: o}), Object(a.createElement)(d, {label: Object(n.__)("Timing Vertical Color:", "ht-qrcode"), color: t.timing_v, attributesKey: "timing_v", setAttributes: o}));
  }, u = o(3), g = o(7), p = o(8);
  class b extends a.Component {
    render() {
      const {setAttributes: e, title: t, ImageData: o, attributesKey: r, uploadImage: l} = this.props, c = ["image", "png"], s = Object(a.createElement)("p", null, Object(n.__)("To edit the QR Code image, you need permission to upload media.", "ht-qrcode")), d = t => {
        const l = {...o};
        l.id = t.id, l.url = t.url, e({[r]: l});
      };
      return Object(a.createElement)(a.Fragment, null, Object(a.createElement)("div", {className: "wp-block-image-selector-qrcode-image-uploader"}, Object(a.createElement)("label", null, t), Object(a.createElement)(u.MediaUploadCheck, {fallback: s}, Object(a.createElement)(u.MediaUpload, {title: t, onSelect: d, allowedTypes: c, value: o.id, render: ({open: e}) => Object(a.createElement)(i.Button, {className: o.id ? "editor-post-featured-image__preview" : "editor-post-featured-image__toggle", onClick: e}, !o.id && Object(n.__)("Set ", "ht-qrcode") + t, !!o.id && !l && Object(a.createElement)(i.Spinner, null), !!o.id && l && Object(a.createElement)("img", {src: l.source_url, alt: t}))})), !!o.id && l && Object(a.createElement)(u.MediaUploadCheck, null, Object(a.createElement)(u.MediaUpload, {title: t, onSelect: d, allowedTypes: c, value: o.id, render: ({open: e}) => Object(a.createElement)(i.Button, {onClick: e, isDefault: true, isLarge: true}, Object(n.__)("Replace image", "ht-qrcode"))})), !!o.id && Object(a.createElement)(u.MediaUploadCheck, null, Object(a.createElement)(i.Button, {onClick: () => {
        const t = {...o};
        t.id = void 0, t.url = void 0, e({[r]: t});
      }, isLink: true, isDestructive: true}, Object(n.__)("Remove image", "ht-qrcode")))));
    }
  }
  var _ = Object(g.compose)(Object(p.withSelect)((e, t) => {
    const {getMedia: o} = e("core"), {ImageData: r} = t;
    return {uploadImage: r.id ? o(r.id) : null};
  }))(b), m = e => {
    const {attributes: t, setAttributes: o} = e;
    return Object(a.createElement)(a.Fragment, null, Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("General Setting", "ht-qrcode")))), Object(a.createElement)(i.TextControl, {label: Object(n.__)("QR Code Size:", "ht-qrcode"), value: t.size, onChange: e => {
      o({size: e});
    }, help: Object(n.__)("Input numbers only (e.g.- 300)", "ht-qrcode")}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("QR Code Dot Scale:", "ht-qrcode"), value: t.dot_scale, onChange: e => {
      o({dot_scale: e});
    }, help: Object(n.__)("Input numbers only (e.g.- 0.1 to 1)", "ht-qrcode")}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("QR Quiet Zone:", "ht-qrcode"), value: t.quietzone, onChange: e => {
      o({quietzone: e});
    }, help: Object(n.__)("Input numbers only (e.g.- 1 to 10)", "ht-qrcode")}), Object(a.createElement)(d, {label: Object(n.__)("QR Quiet Zone Color", "ht-qrcode"), color: t.quietzonecolor, attributesKey: "quietzonecolor", setAttributes: o}), Object(a.createElement)(i.SelectControl, {label: Object(n.__)("QR EC Level", "ht-qrcode"), value: t.qr_level, options: [{label: "Low", value: "L"}, {label: "Medium", value: "M"}, {label: "Quartile", value: "Q"}, {label: "High", value: "H"}], onChange: e => o({qr_level: e})}), Object(a.createElement)(i.Card, {className: "htqr-inspector-card-body"}, Object(a.createElement)(i.CardBody, null, Object(a.createElement)("h3", {className: "htqr-inspector-header"}, Object(n.__)("Image Control", "ht-qrcode")))), Object(a.createElement)(_, {title: Object(n.__)("QR Logo", "ht-qrcode"), ImageData: t.qrCodeLogo, attributesKey: "qrCodeLogo", setAttributes: o}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Logo Width: (Max Size 100px):", "ht-qrcode"), value: t.logo_width, onChange: e => {
      o({logo_width: e});
    }, help: Object(n.__)("Input numbers only (e.g.- 1 to 10)", "ht-qrcode")}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Logo Height: (Max Size 100px):", "ht-qrcode"), value: t.logo_height, onChange: e => o({logo_height: e}), help: Object(n.__)("Input numbers only (e.g.- 1 to 10)", "ht-qrcode")}), Object(a.createElement)(i.SelectControl, {label: Object(n.__)("Background Transparent", "ht-qrcode"), value: t.logo_bg_transparent, options: [{label: "True", value: "true"}, {label: "False", value: "false"}], onChange: e => o({logo_bg_transparent: e})}), Object(a.createElement)(_, {title: Object(n.__)("Background Image", "ht-qrcode"), ImageData: t.qrCodeBackground, attributesKey: "qrCodeBackground", setAttributes: o}), Object(a.createElement)(i.TextControl, {label: Object(n.__)("Background Image Opacity", "ht-qrcode"), value: t.qr_bg_opacity, onChange: e => {
      o({qr_bg_opacity: e});
    }, help: Object(n.__)("Input numbers only (e.g.- 0.1 to 1)", "ht-qrcode")}), Object(a.createElement)(i.SelectControl, {label: Object(n.__)("Background Transparent", "ht-qrcode"), value: t.qr_bg_autocolor, options: [{label: "True", value: "true"}, {label: "False", value: "false"}], onChange: e => o({qr_bg_autocolor: e})}));
  };
  class f extends a.Component {
    constructor(e) {
      super(e), this.state = {activeTab: "general", titleTab: "normal", actionBtnTab: "normal", device: "desktop"};
    }
    render() {
      const {attributes: e, setAttributes: t} = this.props, o = (e, t, o) => {
        this.setState({[t]: o});
      };
      return Object(a.createElement)(u.InspectorControls, null, Object(a.createElement)(i.PanelBody, null, Object(a.createElement)("div", {className: "qrcode-tabs-menu"}, Object(a.createElement)(i.ButtonGroup, {className: "qrcode-tabs-menu-btn-group"}, Object(a.createElement)(i.Button, {className: "general" === this.state.activeTab ? "qrcode-tab-menu-item qrcode-tab-menu-active" : "qrcode-tab-menu-item", icon: "admin-tools", value: "general", isPrimary: "general" === this.state.activeTab, isSecondary: "general" !== this.state.activeTab, onClick: e => o(0, "activeTab", "general")}, Object(n.__)("General", "qrcode")), Object(a.createElement)(i.Button, {className: "styles" === this.state.activeTab ? "qrcode-tab-menu-item qrcode-tab-menu-active" : "qrcode-tab-menu-item", icon: "chart-pie", value: "styles", isPrimary: "styles" === this.state.activeTab, isSecondary: "styles" !== this.state.activeTab, onClick: e => o(0, "activeTab", "styles")}, Object(n.__)("Styles", "qrcode")), Object(a.createElement)(i.Button, {className: "setting" === this.state.activeTab ? "qrcode-tab-menu-item qrcode-tab-menu-active" : "qrcode-tab-menu-item", icon: "admin-generic", value: "setting", isPrimary: "setting" === this.state.activeTab, isSecondary: "setting" !== this.state.activeTab, onClick: e => o(0, "activeTab", "setting")}, Object(n.__)("Setting", "qrcode"))))), Object(a.createElement)("div", {className: "qrcode-tabs-content"}, "general" === this.state.activeTab && Object(a.createElement)(i.PanelBody, {initialOpen: true}, Object(a.createElement)(s, {category: e.category, attributes: e, setAttributes: t})), "styles" === this.state.activeTab && Object(a.createElement)(i.PanelBody, {initialOpen: true}, Object(a.createElement)(c, {attributes: e, setAttributes: t}), Object(a.createElement)(h, {attributes: e, setAttributes: t})), "setting" === this.state.activeTab && Object(a.createElement)(i.PanelBody, null, Object(a.createElement)(m, {attributes: e, setAttributes: t}))));
    }
  }
  var C = f, v = o(4), q = o.n(v), y = o.p + "images/logo.b4bba225.png", O = o.p + "images/background_logo.6f8bd636.png";
  class E extends a.Component {
    constructor(e) {
      super(e), this.qrcode = React.createRef(), this.options = {text: Object(n.__)("HT QR Code Empty", "ht-qrcode"), width: 300, height: 300, dotScale: 1, correctLevel: q.a.CorrectLevel.L, logo: "", logoWidth: 50, logoHeight: 50, logoBackgroundColor: "", logoBackgroundTransparent: true, backgroundImage: "", backgroundImageAlpha: 0.1, autoColor: false, colorDark: "#000000", colorLight: "#FFFFFF", PO: "", PI: "", PO_TL: "", PI_TL: "", PO_TR: "", PI_TR: "", PO_BL: "", PI_BL: "", AI: "", AO: "", timing: "", timing_H: "", timing_V: "", quietZone: 0, quietZoneColor: "#00CED1"}, this.newQRcode;
    }
    componentDidMount() {
      this.newQRcode = new q.a(this.qrcode.current, this.options);
    }
    componentDidUpdate(e) {
      const {attributes: t} = this.props;
      if ("text" == t.category) t.qrcode = t.text; else if ("url" == t.category) t.qrcode = t.url; else if ("current-page-url" == t.category) t.qrcode = window.location.href; else if ("sms" == t.category) t.qrcode = "smsto:" + t.mobile + ":" + t.message; else if ("ph_number" == t.category) t.qrcode = "tel:" + t.mobile; else if ("email" == t.category) t.qrcode = "mailto:" + t.email; else if ("skype" == t.category) t.qrcode = "skype:" + t.skype; else if ("maps" == t.category) t.qrcode = "geo:" + t.latitude + "," + t.longitude + "?q=" + t.query; else if ("g_talk" == t.category) t.qrcode = "gtalk:query?<" + t.email + ">"; else if ("wifi" == t.category) t.qrcode = "WIFI:S:" + t.ssid + ";T:" + t.networdType + ";P:" + t.password + ";;"; else if ("contact_info" == t.category) "VCARD" == t.encoding ? t.qrcode = "BEGIN:VCARD\nVERSION:3.0\nN:" + t.name + "\nORG:" + t.company + "\nTITLE:" + t.title + "\nTEL:" + t.mobile + "\nTEL:" + t.Phone + "\nURL:" + t.url + "\nEMAIL:" + t.email + "\nADR:" + t.address + "\nNOTE:" + t.note + "\nEND:VCARD" : t.qrcode = "MECARD:N:" + t.name + ";ORG:" + t.company + ";TEL:" + t.mobile + ";TEL:" + t.phone + ";URL:" + t.url + ";EMAIL:" + t.email + ";ADR:" + t.address + ";NOTE:" + t.title + ";;"; else if ("event" == t.category) {
        new Date, null == t.qrCodeEventStartDate && (t.qrCodeEventStartDate = ""), new Date, null == t.qrCodeEventEndDate && (t.qrCodeEventEndDate = "");
        const e = t.qrCodeEventStartDate.replace(/-|:/g, ""), o = t.qrCodeEventEndDate.replace(/-|:/g, "");
        t.qrcode = "BEGIN:VEVENT\nSUMMARY:" + t.qrCodeEventTitle + "\nDTSTART:" + e + "Z\nDTEND:" + o + "Z\nLOCATION:" + t.qrCodeEventLocation + "\nDESCRIPTION:" + t.qrCodeEventDescription + "\nEND:VEVENT";
      }
      null != t.qrCodeLogo.url || "logoquietZoneColor" != t.qrDemoStyle && "logoDotScale" != t.qrDemoStyle && "logoColorfulStyle-1" != t.qrDemoStyle && "logoColorfulStyle-2" != t.qrDemoStyle && "quietZoneLogoBackground" != t.qrDemoStyle ? t.logo = t.qrCodeLogo.url : t.qrCodeLogo = {id: void 0, url: htqrcodeGlobal.pluginDirPath + y}, null != t.qrCodeBackground.url || "backgroundImage" != t.qrDemoStyle && "autoColorBackgroundImageDotScale" != t.qrDemoStyle && "autoColorBackgroundImageAlpha" != t.qrDemoStyle && "quietZoneLogoBackground" != t.qrDemoStyle ? (t.qr_bg_image = t.qrCodeBackground.url, t.warning_message = "") : t.qrCodeBackground = {id: void 0, url: htqrcodeGlobal.pluginDirPath + O}, this.options.text = "" !== t.qrcode ? t.qrcode : Object(n.__)("HT QR Code Empty", "ht-qrcode"), this.options.width = parseInt(t.size), this.options.height = parseInt(t.size), this.options.dotScale = t.dot_scale, "L" == t.qr_level ? this.options.correctLevel = q.a.CorrectLevel.L : "Q" == t.qr_level ? this.options.correctLevel = q.a.CorrectLevel.Q : "M" == t.qr_level ? this.options.correctLevel = q.a.CorrectLevel.M : "H" == t.qr_level && (this.options.correctLevel = q.a.CorrectLevel.H), this.options.logo = t.qrCodeLogo.url, this.options.logoWidth = parseInt(t.logo_width), this.options.logoHeight = parseInt(t.logo_height), this.options.logoBackgroundColor = t.logo_bg_color, this.options.logoBackgroundTransparent = t.logo_bg_transparent, this.options.backgroundImage = t.qrCodeBackground.url, this.options.backgroundImageAlpha = t.backgroundImageAlpha, this.options.autoColor = t.qr_bg_autocolor, this.options.colorDark = void 0 !== t.colordark ? t.colordark : "#000000", this.options.colorLight = void 0 !== t.colorlight ? t.colorlight : "#ffffff", this.options.PO = void 0 !== t.po ? t.po : "", this.options.PI = void 0 !== t.pi ? t.pi : "", this.options.PO_TL = void 0 !== t.po_tl ? t.po_tl : "", this.options.PI_TL = void 0 !== t.pi_tl ? t.pi_tl : "", this.options.PO_TR = void 0 !== t.po_tr ? t.po_tr : "", this.options.PI_TR = void 0 !== t.pi_tr ? t.pi_tr : "", this.options.PO_BL = void 0 !== t.po_bl ? t.po_bl : "", this.options.PI_BL = void 0 !== t.pi_bl ? t.pi_bl : "", this.options.AI = void 0 !== t.ai ? t.ai : "", this.options.AO = void 0 !== t.ao ? t.ao : "", this.options.timing = void 0 !== t.timing ? t.timing : "", this.options.timing_H = void 0 !== t.timing_h ? t.timing_h : "", this.options.timing_V = void 0 !== t.timing_v ? t.timing_v : "", this.options.quietZone = void 0 !== t.quietzone ? parseInt(t.quietzone) : "", this.options.quietZoneColor = void 0 !== t.quietzonecolor ? t.quietzonecolor : "", this.newQRcode.clear(), new q.a(this.qrcode.current, this.options);
    }
    render() {
      return Object(a.createElement)("div", {className: this.props.className}, Object(a.createElement)(C, this.props), Object(a.createElement)("div", {className: "ht_qrcode " + this.props.attributes.alignment}, Object(a.createElement)("div", {ref: this.qrcode}), 1 == this.props.attributes.print && Object(a.createElement)("a", {className: "htqr-btn htqr-btn-print"}, this.props.attributes.print_btn_txt), 1 == this.props.attributes.download && Object(a.createElement)("a", {className: "qrcode-download htqr-btn htqr-btn-download"}, this.props.attributes.download_btn_txt)));
    }
  }
  var j = Object(a.createElement)("svg", {"aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "qrcode", class: "svg-inline--fa fa-qrcode fa-w-14", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512"}, Object(a.createElement)("path", {fill: "currentColor", d: "M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"})), T = o(5);
  const {name: k, category: w, attributes: D} = T, A = {title: Object(n.__)("HT QR Code Generator", "ht-qrcode"), description: Object(n.__)("The HT QR Code Generator is for WordPress plugin.", "ht-qrcode"), icon: Object(a.createElement)(i.Icon, {icon: j}), keywords: ["qr code", Object(n.__)("ht qr code generator", "ht-qrcode"), Object(n.__)("qr", "ht-qrcode")], example: {attributes: {qrcode: "HT QR Code Generator"}}, attributes: D, edit: E, save: () => null}, L = e => {
    if (!e) return;
    const {name: t, category: o, settings: r} = e;
    Object(l.registerBlockType)(t, {category: o, ...r});
  }, B = () => {
    [r].forEach(L);
  };
  B();
}]);
