var colorCrafter;
(() => {
  'use strict';
  var r = {
      543: (r, e, t) => {
        Object.defineProperty(e, '__esModule', { value: !0 });
        var n = t(208),
          o = t(742),
          u = t(157),
          a = t(385),
          i = t(581);
        function l(r, e, t) {
          return t((0, a.getColor)(r), e).hex;
        }
        r.exports = {
          hexToHsl: u.hexToHsl,
          hexToRgb: u.hexToRgb,
          hslToHex: u.hslToHex,
          hslToRgb: u.hslToRgb,
          rgbToHex: u.rgbToHex,
          rgbToHsl: u.rgbToHsl,
          lighten: function (r, e) {
            return l(r, e, i.getLighterColor);
          },
          darken: function (r, e) {
            return l(r, e, i.getDarkerColor);
          },
          saturate: function (r, e) {
            return l(r, e, i.getMoreSaturatedColor);
          },
          desaturate: function (r, e) {
            return l(r, e, i.getLessSaturatedColor);
          },
          shift: function (r, e) {
            return (0, i.shiftHue)((0, a.getColor)(r), e).hex;
          },
          isWhite: function (r) {
            return (0, a.getColor)(r).hex === n.WHITE_HEX_COLOR;
          },
          isBlack: function (r) {
            return (0, a.getColor)(r).hex === n.BLACK_HEX_COLOR;
          },
          contrast: function (r, e) {
            return (
              void 0 === e && (e = 'AA_LARGE_TEXT'),
              (0, o.getContrastingColor)(
                (0, a.getColor)(r),
                o.ConformanceLevel[e]
              ).hex
            );
          },
        };
      },
      272: (r, e, t) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.DEFAULT_COLOR = void 0);
        var n = t(208),
          o = t(846),
          u = t(266);
        e.DEFAULT_COLOR = {
          hex: n.DEFAULT_HEX_COLOR,
          rgb: u.DEFAULT_RGB_COLOR,
          hsl: o.DEFAULT_HSL_COLOR,
        };
      },
      208: (r, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.DEFAULT_HEX_COLOR =
            e.BLACK_HEX_COLOR =
            e.WHITE_HEX_COLOR =
              void 0),
          (e.isHexColor = function (r) {
            return new RegExp(/#[a-f0-9]{6}/).test(r);
          }),
          (e.asHexColor = function (r) {
            var t, n;
            return (r = r.toLowerCase().replace('#', '').substring(0, 6))
              .length < 3 ||
              1 !==
                (null !==
                  (n =
                    null === (t = r.match(/[a-f0-9]+/g)) || void 0 === t
                      ? void 0
                      : t.length) && void 0 !== n
                  ? n
                  : 0)
              ? e.DEFAULT_HEX_COLOR
              : (r.length < 6 &&
                  (r = r
                    .substring(0, 3)
                    .split('')
                    .map(function (r) {
                      return ''.concat(r).concat(r);
                    })
                    .join('')),
                '#'.concat(r));
          }),
          (e.WHITE_HEX_COLOR = '#FFFFFF'),
          (e.BLACK_HEX_COLOR = '#000000'),
          (e.DEFAULT_HEX_COLOR = '#000000');
      },
      846: (r, e) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.DEFAULT_HSL_COLOR = void 0),
          (e.isHslColor = function (r) {
            if ('object' != typeof r || null === r) return !1;
            if (!('h' in r && 's' in r && 'l' in r)) return !1;
            var e = r;
            return !(
              e.h < 0 ||
              e.h > 360 ||
              e.s < 0 ||
              e.s > 100 ||
              e.l < 0 ||
              e.l > 100 ||
              Object.values(e)
                .map(function (r) {
                  return Math.round(r) === r;
                })
                .includes(!1)
            );
          }),
          (e.asHslColor = function (r, t, n) {
            return (
              t <= 1 && n <= 1 && ((t *= 100), (n *= 100)),
              (r = Math.round(r)),
              (t = Math.round(t)),
              (n = Math.round(n)),
              r < 0 || r > 360 || t < 0 || t > 100 || n < 0 || n > 100
                ? e.DEFAULT_HSL_COLOR
                : { h: r, s: t, l: n }
            );
          }),
          (e.DEFAULT_HSL_COLOR = { h: 0, s: 0, l: 0 });
      },
      266: (r, e) => {
        function t(r) {
          return r >= 0 && r <= 255 && Math.round(r) === r;
        }
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.DEFAULT_RGB_COLOR = void 0),
          (e.isRgbColor = function (r) {
            if ('object' != typeof r || null === r) return !1;
            var e = r;
            return (
              'r' in e &&
              'g' in e &&
              'b' in e &&
              !Object.values(e).map(t).includes(!1)
            );
          }),
          (e.asRgbColor = function (r, n, o) {
            return (
              r <= 1 &&
                n <= 1 &&
                o <= 1 &&
                ((r *= 255), (n *= 255), (o *= 255)),
              [(r = Math.round(r)), (n = Math.round(n)), (o = Math.round(o))]
                .map(t)
                .includes(!1)
                ? e.DEFAULT_RGB_COLOR
                : { r, g: n, b: o }
            );
          }),
          (e.DEFAULT_RGB_COLOR = { r: 0, g: 0, b: 0 });
      },
      385: (r, e, t) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.isBlack = e.isWhite = void 0),
          (e.getColor = function (r) {
            var e = l(r);
            if (e.hex) {
              var t = e.hex;
              return {
                hex: t,
                rgb: (0, n.hexToRgb)(t),
                hsl: (0, n.hexToHsl)(t),
              };
            }
            if (e.rgb) {
              var o = e.rgb,
                u = o.r,
                a = o.g,
                s = o.b;
              return {
                hex: (0, n.rgbToHex)(u, a, s),
                rgb: e.rgb,
                hsl: (0, n.rgbToHsl)(u, a, s),
              };
            }
            if (e.hsl) {
              var h = e.hsl,
                c = h.h,
                f = h.s,
                g = h.l;
              return {
                hex: (0, n.hslToHex)(c, f, g),
                rgb: (0, n.hslToRgb)(c, f, g),
                hsl: e.hsl,
              };
            }
            return i.DEFAULT_COLOR;
          }),
          (e.getContrastRatio = function (r, e) {
            var t = s(r),
              n = s(e);
            return t > n ? (t + 0.05) / (n + 0.05) : (n + 0.05) / (t + 0.05);
          });
        var n = t(157),
          o = t(208),
          u = t(846),
          a = t(266),
          i = t(272);
        function l(r) {
          if ((0, o.isHexColor)(r)) return { hex: r, rgb: null, hsl: null };
          if ((0, a.isRgbColor)(r)) return { hex: null, rgb: r, hsl: null };
          if ((0, u.isHslColor)(r)) return { hex: null, rgb: null, hsl: r };
          if ('string' == typeof r) return l((0, o.asHexColor)(r));
          if ('object' == typeof r) {
            if ('h' in r && 's' in r && 'l' in r)
              return l((0, u.asHslColor)(r.h, r.s, r.l));
            if ('r' in r && 'g' in r && 'b' in r)
              return l((0, a.asRgbColor)(r.r, r.g, r.b));
          }
          return i.DEFAULT_COLOR;
        }
        function s(r) {
          var e = r.rgb,
            t = [e.r, e.g, e.b].map(function (r) {
              return (r /= 255) <= 0.03928
                ? r / 12.92
                : Math.pow((r + 0.055) / 1.055, 2.4);
            });
          return 0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2];
        }
        (e.isWhite = function (r) {
          return r.hex === o.WHITE_HEX_COLOR;
        }),
          (e.isBlack = function (r) {
            return r.hex === o.BLACK_HEX_COLOR;
          });
      },
      742: (r, e, t) => {
        var n;
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.ConformanceLevel = void 0),
          (e.getContrastingColor = function (r, e) {
            return l(r, 1, e);
          });
        var o,
          u = t(385),
          a = t(581);
        !(function (r) {
          (r[(r.AA_SMALL_TEXT = 0)] = 'AA_SMALL_TEXT'),
            (r[(r.AA_LARGE_TEXT = 1)] = 'AA_LARGE_TEXT'),
            (r[(r.AAA_SMALL_TEXT = 2)] = 'AAA_SMALL_TEXT'),
            (r[(r.AAA_LARGE_TEXT = 3)] = 'AAA_LARGE_TEXT');
        })(o || (e.ConformanceLevel = o = {}));
        var i =
          (((n = {})[o.AA_SMALL_TEXT] = 4.5),
          (n[o.AA_LARGE_TEXT] = 3),
          (n[o.AAA_SMALL_TEXT] = 7),
          (n[o.AAA_LARGE_TEXT] = 4.5),
          n);
        function l(r, e, t) {
          var n = (0, a.getLighterColor)(r, e);
          if (s(r, n, t)) return n;
          var o = (0, a.getDarkerColor)(r, e);
          if (s(r, o, t)) return o;
          if (100 === n.hsl.l && 0 === o.hsl.l)
            return (0, u.getContrastRatio)(r, n) > (0, u.getContrastRatio)(r, o)
              ? n
              : o;
          for (var i = 1; i < Math.min(100 - r.hsl.s, r.hsl.s) / 2; i++)
            for (
              var h = 0,
                c = [
                  (0, a.getMoreSaturatedColor)(n, i),
                  (0, a.getMoreSaturatedColor)(o, i),
                  (0, a.getLessSaturatedColor)(n, i),
                  (0, a.getLessSaturatedColor)(o, i),
                ];
              h < c.length;
              h++
            ) {
              var f = c[h];
              if (s(r, f, t)) return f;
            }
          return l(r, e + 1, t);
        }
        function s(r, e, t) {
          var n = i[t];
          return (0, u.getContrastRatio)(r, e) >= n;
        }
      },
      157: (r, e, t) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.hexToHsl = function (r) {
            var e = a(r);
            return s(e.r, e.g, e.b);
          }),
          (e.hexToRgb = a),
          (e.hslToHex = function (r, e, t) {
            var n = i(r, e, t);
            return l(n.r, n.g, n.b);
          }),
          (e.hslToRgb = i),
          (e.rgbToHex = l),
          (e.rgbToHsl = s);
        var n = t(208),
          o = t(846),
          u = t(266);
        function a(r) {
          var e = (0, n.asHexColor)(r).substring(1).match(/.{2}/g);
          if (3 !== (null == e ? void 0 : e.length)) return u.DEFAULT_RGB_COLOR;
          var t = e.map(function (r) {
            return parseInt('0x'.concat(r), 16);
          });
          return { r: t[0], g: t[1], b: t[2] };
        }
        function i(r, e, t) {
          var n,
            u,
            a,
            i,
            l,
            s,
            h = (0, o.asHslColor)(r, e, t),
            c = h.h,
            f = h.s,
            g = h.l;
          (f /= 100), (g /= 100);
          var _ = (1 - Math.abs(2 * g - 1)) * f,
            C = _ * (1 - Math.abs(((c / 60) % 2) - 1)),
            L = g - _ / 2,
            b = [0, 0, 0],
            T = b[0],
            v = b[1],
            A = b[2];
          return (
            0 <= c && c < 60
              ? ((T = (n = [_, C, 0])[0]), (v = n[1]), (A = n[2]))
              : 60 <= c && c < 120
              ? ((T = (u = [C, _, 0])[0]), (v = u[1]), (A = u[2]))
              : 120 <= c && c < 180
              ? ((T = (a = [0, _, C])[0]), (v = a[1]), (A = a[2]))
              : 180 <= c && c < 240
              ? ((T = (i = [0, C, _])[0]), (v = i[1]), (A = i[2]))
              : 240 <= c && c < 300
              ? ((T = C),
                (v = 0),
                (A = _),
                (T = (l = [C, 0, _])[0]),
                (v = l[1]),
                (A = l[2]))
              : 300 <= c &&
                c < 360 &&
                ((T = (s = [_, 0, C])[0]), (v = s[1]), (A = s[2])),
            {
              r: (T = Math.round(255 * (T + L))),
              g: (v = Math.round(255 * (v + L))),
              b: (A = Math.round(255 * (A + L))),
            }
          );
        }
        function l(r, e, t) {
          var n = (0, u.asRgbColor)(r, e, t);
          return (
            '#' +
            [n.r, n.g, n.b]
              .map(function (r) {
                return r.toString(16);
              })
              .map(function (r) {
                return (1 === r.length ? '0' : '') + r;
              })
              .join('')
          );
        }
        function s(r, e, t) {
          var n = (0, u.asRgbColor)(r, e, t),
            o = n.r,
            a = n.g,
            i = n.b;
          (o /= 255), (a /= 255), (i /= 255);
          var l,
            s = Math.min(o, a, i),
            h = Math.max(o, a, i),
            c = h - s;
          (l =
            0 == c
              ? 0
              : h == o
              ? ((a - i) / c) % 6
              : h == a
              ? (i - o) / c + 2
              : (o - a) / c + 4),
            (l = Math.round(60 * l)) < 0 && (l += 360);
          var f = (h + s) / 2,
            g = 0 == c ? 0 : c / (1 - Math.abs(2 * f - 1));
          return {
            h: l,
            s: (g = Math.round(100 * g)),
            l: (f = Math.round(100 * f)),
          };
        }
      },
      581: (r, e, t) => {
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getLessSaturatedColor =
            e.getMoreSaturatedColor =
            e.getDarkerColor =
            e.getLighterColor =
              void 0),
          (e.shiftHue = function (r, e) {
            return o(r, Math.abs(e), e > 0 ? 'increase' : 'decrease', 'h');
          });
        var n = t(385);
        function o(r, e, t, o) {
          if ('number' == typeof e) return u(r, e, t, o);
          if (
            ((function (r) {
              if (
                [r.amount, r.percent, r.contrastRatio].filter(function (r) {
                  return r;
                }).length > 1
              )
                throw 'Only one of amount, percent, or contrastRatio can be set.';
              if (!(r.amount || r.percent || r.contrastRatio))
                throw 'At least one of amount, percent, or contrastRatio must be set.';
              if (r.amount < 0 || r.amount > 100)
                throw 'Amount must be a number between [0, 100].';
              if (r.percent < 0 || r.percent > 1)
                throw 'Percent must be a decimal between [0, 1].';
            })(e),
            e.amount)
          )
            return u(r, e.amount, t, o);
          if (e.percent) return u(r, r.hsl[o] * e.percent, t, o);
          if (e.contrastRatio)
            for (var a = 1, i = void 0; ; ) {
              var l = u(r, a, t, o);
              if (
                l.hex === (null == i ? void 0 : i.hex) ||
                (0, n.getContrastRatio)(r, l) >= e.contrastRatio
              )
                return l;
              (i = l), a++;
            }
          throw 'Something went wrong when trying to manipulate HSL!';
        }
        function u(r, e, t, o) {
          return (0, n.getColor)(
            Object.fromEntries(
              ['h', 's', 'l'].map(function (n) {
                return n !== o
                  ? [n, r.hsl[n]]
                  : [
                      n,
                      's' === o || 'l' === o
                        ? 'increase' === t
                          ? Math.min(r.hsl[o] + e, 100)
                          : Math.max(r.hsl[o] - e, 0)
                        : (r.hsl[o] + e * ('decrease' === t ? -1 : 1) + 360) %
                          360,
                    ];
              })
            )
          );
        }
        (e.getLighterColor = function (r, e) {
          return o(r, e, 'increase', 'l');
        }),
          (e.getDarkerColor = function (r, e) {
            return o(r, e, 'decrease', 'l');
          }),
          (e.getMoreSaturatedColor = function (r, e) {
            return o(r, e, 'increase', 's');
          }),
          (e.getLessSaturatedColor = function (r, e) {
            return o(r, e, 'decrease', 's');
          });
      },
    },
    e = {},
    t = (function t(n) {
      var o = e[n];
      if (void 0 !== o) return o.exports;
      var u = (e[n] = { exports: {} });
      return r[n](u, u.exports, t), u.exports;
    })(543);
  colorCrafter = t;
})();
