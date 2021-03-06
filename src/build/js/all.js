! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.BScroll = t() }(this, function() { "use strict";

    function f() { return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date }

    function l(e) { for (var t = arguments.length, i = Array(1 < t ? t - 1 : 0), s = 1; s < t; s++) i[s - 1] = arguments[s]; for (var n = 0; n < i.length; n++) { var a = i[n]; for (var r in a) e[r] = a[r] } return e }

    function o(e) { return null == e }

    function e(e) { return !1 !== D && ("standard" === D ? "transitionEnd" === e ? "transitionend" : e : D + e.charAt(0).toUpperCase() + e.substr(1)) }

    function i(e, t, i, s) { e.addEventListener(t, i, { passive: !1, capture: !!s }) }

    function d(e, t, i, s) { e.removeEventListener(t, i, { passive: !1, capture: !!s }) }

    function h(e) { for (var t = 0, i = 0; e;) t -= e.offsetLeft, i -= e.offsetTop, e = e.offsetParent; return { left: t, top: i } }

    function g(e) { if (e instanceof window.SVGElement) { var t = e.getBoundingClientRect(); return { top: t.top, left: t.left, width: t.width, height: t.height } } return { top: e.offsetTop, left: e.offsetLeft, width: e.offsetWidth, height: e.offsetHeight } }

    function u(e, t) { for (var i in t)
            if (t[i].test(e[i])) return !0;
        return !1 }

    function a(e, t) { e.removeChild(t) }

    function m(e, t, i, s, n, a) { var r = e - t,
            o = Math.abs(r) / i,
            l = a.deceleration,
            d = a.itemHeight,
            h = a.swipeBounceTime,
            c = a.wheel,
            p = a.swipeTime,
            u = c ? 4 : 15,
            f = e + o / l * (r < 0 ? -1 : 1); return c && d && (f = Math.round(f / d) * d), f < s ? (f = n ? Math.max(s - n / 4, s - n / u * o) : s, p = h) : 0 < f && (f = n ? Math.min(n / 4, n / u * o) : 0, p = h), { destination: Math.round(f), duration: p } }

    function t() {}

    function s(e) { console.error("[BScroll warn]: " + e) }

    function c(e) { var t = document.createElement("div"),
            i = document.createElement("div"); return t.style.cssText = "position:absolute;z-index:9999;pointerEvents:none", i.style.cssText = "box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;", i.className = "bscroll-indicator", t.className = "horizontal" === e ? (t.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", i.style.height = "100%", "bscroll-horizontal-scrollbar") : (t.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", i.style.width = "100%", "bscroll-vertical-scrollbar"), t.style.cssText += ";overflow:hidden", t.appendChild(i), t }

    function p(e, t) { this.wrapper = t.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = e, this.direction = t.direction, t.fade ? (this.visible = 0, this.wrapperStyle.opacity = "0") : this.visible = 1, this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.x = 0, this.y = 0, t.interactive && this._addDOMEvents() }

    function n(e, t) { this.wrapper = "string" == typeof e ? document.querySelector(e) : e, this.wrapper || s("Can not resolve the wrapper DOM."), this.scroller = this.wrapper.children[0], this.scroller || s("The wrapper need at least one child element to be scroller."), this.scrollerStyle = this.scroller.style, this._init(e, t) } var r, v, y, b, w, x, T, E, S, C = function(e, t) { if (Array.isArray(e)) return e; if (Symbol.iterator in Object(e)) return function(e, t) { var i = [],
                    s = !0,
                    n = !1,
                    a = void 0; try { for (var r, o = e[Symbol.iterator](); !(s = (r = o.next()).done) && (i.push(r.value), !t || i.length !== t); s = !0); } catch (e) { n = !0, a = e } finally { try {!s && o.return && o.return() } finally { if (n) throw a } } return i }(e, t); throw new TypeError("Invalid attempt to destructure non-iterable instance") },
        M = "undefined" != typeof window,
        P = M && navigator.userAgent.toLowerCase(),
        k = P && /wechatdevtools/.test(P),
        z = P && 0 < P.indexOf("android"),
        R = M && document.createElement("div").style,
        D = function() { if (!M) return !1; var e = { webkit: "webkitTransform", Moz: "MozTransform", O: "OTransform", ms: "msTransform", standard: "transform" }; for (var t in e)
                if (void 0 !== R[e[t]]) return t;
            return !1 }(),
        L = e("transform"),
        O = M && e("perspective") in R,
        $ = M && ("ontouchstart" in window || k),
        I = !1 !== L,
        X = M && e("transition") in R,
        Y = { transform: L, transitionTimingFunction: e("transitionTimingFunction"), transitionDuration: e("transitionDuration"), transitionProperty: e("transitionProperty"), transitionDelay: e("transitionDelay"), transformOrigin: e("transformOrigin"), transitionEnd: e("transitionEnd") },
        H = { touchstart: 1, touchmove: 1, touchend: 1, mousedown: 2, mousemove: 2, mouseup: 2 },
        A = { startX: 0, startY: 0, scrollX: !1, scrollY: !0, freeScroll: !1, directionLockThreshold: 5, eventPassthrough: "", click: !1, tap: !1, bounce: !0, bounceTime: 800, momentum: !0, momentumLimitTime: 300, momentumLimitDistance: 15, swipeTime: 2500, swipeBounceTime: 500, deceleration: .001, flickLimitTime: 200, flickLimitDistance: 100, resizePolling: 60, probeType: 0, preventDefault: !0, preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, HWCompositing: !0, useTransition: !0, useTransform: !0, bindToWrapper: !1, disableMouse: $, disableTouch: !$, observeDOM: !0, autoBlur: !0, wheel: !1, snap: !1, scrollbar: !1, pullDownRefresh: !1, pullUpLoad: !1, mouseWheel: !1, stopPropagation: !1 },
        N = { swipe: { style: "cubic-bezier(0.23, 1, 0.32, 1)", fn: function(e) { return 1 + --e * e * e * e * e } }, swipeBounce: { style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", fn: function(e) { return e * (2 - e) } }, bounce: { style: "cubic-bezier(0.165, 0.84, 0.44, 1)", fn: function(e) { return 1 - --e * e * e * e } } },
        _ = M ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(e) { return window.setTimeout(e, (e.interval || 100 / 60) / 2) } : t,
        j = M ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function(e) { window.clearTimeout(e) } : t; return p.prototype.handleEvent = function(e) { switch (e.type) {
            case "touchstart":
            case "mousedown":
                this._start(e); break;
            case "touchmove":
            case "mousemove":
                this._move(e); break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this._end(e) } }, p.prototype.refresh = function() { this.transitionTime(), this._calculate(), this.updatePosition() }, p.prototype.fade = function(e, t) { var i = this; if (!t || this.visible) { var s = e ? 250 : 500;
            e = e ? "1" : "0", this.wrapperStyle[Y.transitionDuration] = s + "ms", clearTimeout(this.fadeTimeout), this.fadeTimeout = setTimeout(function() { i.wrapperStyle.opacity = e, i.visible = +e }, 0) } }, p.prototype.updatePosition = function() { if ("vertical" === this.direction) { var e = Math.round(this.sizeRatioY * this.scroller.y); if (e < 0) { this.transitionTime(500); var t = Math.max(this.indicatorHeight + 3 * e, 8);
                this.indicatorStyle.height = t + "px", e = 0 } else if (e > this.maxPosY) { this.transitionTime(500); var i = Math.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8);
                this.indicatorStyle.height = i + "px", e = this.maxPosY + this.indicatorHeight - i } else this.indicatorStyle.height = this.indicatorHeight + "px";
            this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[Y.transform] = "translateY(" + e + "px)" + this.scroller.translateZ : this.indicatorStyle.top = e + "px" } else { var s = Math.round(this.sizeRatioX * this.scroller.x); if (s < 0) { this.transitionTime(500); var n = Math.max(this.indicatorWidth + 3 * s, 8);
                this.indicatorStyle.width = n + "px", s = 0 } else if (s > this.maxPosX) { this.transitionTime(500); var a = Math.max(this.indicatorWidth - 3 * (s - this.maxPosX), 8);
                this.indicatorStyle.width = a + "px", s = this.maxPosX + this.indicatorWidth - a } else this.indicatorStyle.width = this.indicatorWidth + "px";
            this.x = s, this.scroller.options.useTransform ? this.indicatorStyle[Y.transform] = "translateX(" + s + "px)" + this.scroller.translateZ : this.indicatorStyle.left = s + "px" } }, p.prototype.transitionTime = function() { var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.indicatorStyle[Y.transitionDuration] = e + "ms" }, p.prototype.transitionTimingFunction = function(e) { this.indicatorStyle[Y.transitionTimingFunction] = e }, p.prototype.destroy = function() { this._removeDOMEvents(), this.wrapper.parentNode.removeChild(this.wrapper) }, p.prototype._start = function(e) { var t = e.touches ? e.touches[0] : e;
        e.preventDefault(), e.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = t.pageX, this.lastPointY = t.pageY, this.startTime = f(), this._handleMoveEvents(i), this.scroller.trigger("beforeScrollStart") }, p.prototype._move = function(e) { var t = e.touches ? e.touches[0] : e;
        e.preventDefault(), e.stopPropagation(), this.moved || this.scroller.trigger("scrollStart"), this.moved = !0; var i = t.pageX - this.lastPointX;
        this.lastPointX = t.pageX; var s = t.pageY - this.lastPointY;
        this.lastPointY = t.pageY; var n = this.x + i,
            a = this.y + s;
        this._pos(n, a) }, p.prototype._end = function(e) { if (this.initiated) { this.initiated = !1, e.preventDefault(), e.stopPropagation(), this._handleMoveEvents(d); var t = this.scroller.options.snap; if (t) { var i = t.speed,
                    s = t.easing,
                    n = void 0 === s ? N.bounce : s,
                    a = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                    r = i || Math.max(Math.max(Math.min(Math.abs(this.scroller.x - a.x), 1e3), Math.min(Math.abs(this.scroller.y - a.y), 1e3)), 300);
                this.scroller.x === a.x && this.scroller.y === a.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = a, this.scroller.scrollTo(a.x, a.y, r, n)) }
            this.moved && this.scroller.trigger("scrollEnd", { x: this.scroller.x, y: this.scroller.y }) } }, p.prototype._pos = function(e, t) { e < 0 ? e = 0 : e > this.maxPosX && (e = this.maxPosX), t < 0 ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = Math.round(e / this.sizeRatioX), t = Math.round(t / this.sizeRatioY), this.scroller.scrollTo(e, t), this.scroller.trigger("scroll", { x: this.scroller.x, y: this.scroller.y }) }, p.prototype._calculate = function() { if ("vertical" === this.direction) { var e = this.wrapper.clientHeight;
            this.indicatorHeight = Math.max(Math.round(e * e / (this.scroller.scrollerHeight || e || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px", this.maxPosY = e - this.indicatorHeight, this.sizeRatioY = this.maxPosY / this.scroller.maxScrollY } else { var t = this.wrapper.clientWidth;
            this.indicatorWidth = Math.max(Math.round(t * t / (this.scroller.scrollerWidth || t || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px", this.maxPosX = t - this.indicatorWidth, this.sizeRatioX = this.maxPosX / this.scroller.maxScrollX } }, p.prototype._addDOMEvents = function() { var e = i;
        this._handleDOMEvents(e) }, p.prototype._removeDOMEvents = function() { var e = d;
        this._handleDOMEvents(e), this._handleMoveEvents(e) }, p.prototype._handleMoveEvents = function(e) { this.scroller.options.disableTouch || e(window, "touchmove", this), this.scroller.options.disableMouse || e(window, "mousemove", this) }, p.prototype._handleDOMEvents = function(e) { this.scroller.options.disableTouch || (e(this.indicator, "touchstart", this), e(window, "touchend", this)), this.scroller.options.disableMouse || (e(this.indicator, "mousedown", this), e(window, "mouseup", this)) }, (S = n).prototype._init = function(e, t) { this._handleOptions(t), this._events = {}, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._addDOMEvents(), this._initExtFeatures(), this._watchTransition(), this.options.observeDOM && this._initDOMObserver(), this.options.autoBlur && this._handleAutoBlur(), this.refresh(), this.options.snap || this.scrollTo(this.options.startX, this.options.startY), this.enable() }, S.prototype._handleOptions = function(e) { this.options = l({}, A, e), this.translateZ = this.options.HWCompositing && O ? " translateZ(0)" : "", this.options.useTransition = this.options.useTransition && X, this.options.useTransform = this.options.useTransform && I, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollX = "horizontal" !== this.options.eventPassthrough && this.options.scrollX, this.options.scrollY = "vertical" !== this.options.eventPassthrough && this.options.scrollY, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, !0 === this.options.tap && (this.options.tap = "tap") }, S.prototype._addDOMEvents = function() { var e = i;
        this._handleDOMEvents(e) }, S.prototype._removeDOMEvents = function() { var e = d;
        this._handleDOMEvents(e) }, S.prototype._handleDOMEvents = function(e) { var t = this.options.bindToWrapper ? this.wrapper : window;
        e(window, "orientationchange", this), e(window, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(t, "mousemove", this), e(t, "mousecancel", this), e(t, "mouseup", this)), $ && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(t, "touchmove", this), e(t, "touchcancel", this), e(t, "touchend", this)), e(this.scroller, Y.transitionEnd, this) }, S.prototype._initExtFeatures = function() { this.options.snap && this._initSnap(), this.options.scrollbar && this._initScrollbar(), this.options.pullUpLoad && this._initPullUp(), this.options.pullDownRefresh && this._initPullDown(), this.options.wheel && this._initWheel(), this.options.mouseWheel && this._initMouseWheel() }, S.prototype._watchTransition = function() { if ("function" == typeof Object.defineProperty) { var n = this,
                a = !1;
            Object.defineProperty(this, "isInTransition", { get: function() { return a }, set: function(e) { a = e; for (var t = n.scroller.children.length ? n.scroller.children : [n.scroller], i = a && !n.pulling ? "none" : "auto", s = 0; s < t.length; s++) t[s].style.pointerEvents = i } }) } }, S.prototype._handleAutoBlur = function() { this.on("beforeScrollStart", function() { var e = document.activeElement;!e || "INPUT" !== e.tagName && "TEXTAREA" !== e.tagName || e.blur() }) }, S.prototype._initDOMObserver = function() { var a = this; if ("undefined" != typeof MutationObserver) { var r = void 0,
                e = new MutationObserver(function(e) { if (!a._shouldNotRefresh()) { for (var t = !1, i = !1, s = 0; s < e.length; s++) { var n = e[s]; if ("attributes" !== n.type) { t = !0; break } if (n.target !== a.scroller) { i = !0; break } }
                        t ? a.refresh() : i && (clearTimeout(r), r = setTimeout(function() { a._shouldNotRefresh() || a.refresh() }, 60)) } });
            e.observe(this.scroller, { attributes: !0, childList: !0, subtree: !0 }), this.on("destroy", function() { e.disconnect() }) } else this._checkDOMUpdate() }, S.prototype._shouldNotRefresh = function() { var e = 0 < this.x || this.x < this.maxScrollX || 0 < this.y || this.y < this.maxScrollY; return this.isInTransition || this.stopFromTransition || e }, S.prototype._checkDOMUpdate = function() {
        function i() { var e = this;
            setTimeout(function() {
                (function() { if (!this.destroyed) { var e = (s = g(this.scroller)).width,
                            t = s.height;
                        n === e && a === t || this.refresh(), n = e, a = t, i.call(this) } }).call(e) }, 1e3) } var s = g(this.scroller),
            n = s.width,
            a = s.height;
        i.call(this) }, S.prototype.handleEvent = function(e) { switch (e.type) {
            case "touchstart":
            case "mousedown":
                this._start(e); break;
            case "touchmove":
            case "mousemove":
                this._move(e); break;
            case "touchend":
            case "mouseup":
            case "touchcancel":
            case "mousecancel":
                this._end(e); break;
            case "orientationchange":
            case "resize":
                this._resize(); break;
            case "transitionend":
            case "webkitTransitionEnd":
            case "oTransitionEnd":
            case "MSTransitionEnd":
                this._transitionEnd(e); break;
            case "click":
                this.enabled && !e._constructed && (u(e.target, this.options.preventDefaultException) || (e.preventDefault(), e.stopPropagation())); break;
            case "wheel":
            case "DOMMouseScroll":
            case "mousewheel":
                this._onMouseWheel(e) } }, S.prototype.refresh = function() { var e = g(this.wrapper);
        this.wrapperWidth = e.width, this.wrapperHeight = e.height; var t = g(this.scroller);
        this.scrollerWidth = t.width, this.scrollerHeight = t.height; var i = this.options.wheel;
        this.maxScrollY = i ? (this.items = this.scroller.children, this.options.itemHeight = this.itemHeight = this.items.length ? this.scrollerHeight / this.items.length : 0, void 0 === this.selectedIndex && (this.selectedIndex = i.selectedIndex || 0), this.options.startY = -this.selectedIndex * this.itemHeight, this.maxScrollX = 0, -this.itemHeight * (this.items.length - 1)) : (this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.wrapperHeight - this.scrollerHeight), this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = h(this.wrapper), this.trigger("refresh"), this.resetPosition() }, S.prototype.enable = function() { this.enabled = !0 }, S.prototype.disable = function() { this.enabled = !1 }, (E = n).prototype._start = function(e) { var t = H[e.type]; if ((1 === t || 0 === e.button) && !(!this.enabled || this.destroyed || this.initiated && this.initiated !== t)) { this.initiated = t, this.options.preventDefault && !u(e.target, this.options.preventDefaultException) && e.preventDefault(), this.options.stopPropagation && e.stopPropagation(), this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.movingDirectionX = 0, this.movingDirectionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = f(), this.options.wheel && (this.target = e.target), this.stop(); var i = e.touches ? e.touches[0] : e;
            this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = i.pageX, this.pointY = i.pageY, this.trigger("beforeScrollStart") } }, E.prototype._move = function(e) { if (this.enabled && !this.destroyed && H[e.type] === this.initiated) { this.options.preventDefault && e.preventDefault(), this.options.stopPropagation && e.stopPropagation(); var t = e.touches ? e.touches[0] : e,
                i = t.pageX - this.pointX,
                s = t.pageY - this.pointY;
            this.pointX = t.pageX, this.pointY = t.pageY, this.distX += i, this.distY += s; var n = Math.abs(this.distX),
                a = Math.abs(this.distY),
                r = f(); if (!(r - this.endTime > this.options.momentumLimitTime && a < this.options.momentumLimitDistance && n < this.options.momentumLimitDistance)) { if (this.directionLocked || this.options.freeScroll || (n > a + this.options.directionLockThreshold ? this.directionLocked = "h" : a >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" === this.directionLocked) { if ("vertical" === this.options.eventPassthrough) e.preventDefault();
                    else if ("horizontal" === this.options.eventPassthrough) return void(this.initiated = !1);
                    s = 0 } else if ("v" === this.directionLocked) { if ("horizontal" === this.options.eventPassthrough) e.preventDefault();
                    else if ("vertical" === this.options.eventPassthrough) return void(this.initiated = !1);
                    i = 0 }
                i = this.hasHorizontalScroll ? i : 0, s = this.hasVerticalScroll ? s : 0, this.movingDirectionX = 0 < i ? -1 : i < 0 ? 1 : 0, this.movingDirectionY = 0 < s ? -1 : s < 0 ? 1 : 0; var o = this.x + i,
                    l = this.y + s;
                (0 < o || o < this.maxScrollX) && (o = this.options.bounce ? this.x + i / 3 : 0 < o ? 0 : this.maxScrollX), (0 < l || l < this.maxScrollY) && (l = this.options.bounce ? this.y + s / 3 : 0 < l ? 0 : this.maxScrollY), this.moved || (this.moved = !0, this.trigger("scrollStart")), this._translate(o, l), r - this.startTime > this.options.momentumLimitTime && (this.startTime = r, this.startX = this.x, this.startY = this.y, 1 === this.options.probeType && this.trigger("scroll", { x: this.x, y: this.y })), 1 < this.options.probeType && this.trigger("scroll", { x: this.x, y: this.y }); var d = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft,
                    h = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
                    c = this.pointX - d,
                    p = this.pointY - h;
                (c > document.documentElement.clientWidth - this.options.momentumLimitDistance || c < this.options.momentumLimitDistance || p < this.options.momentumLimitDistance || p > document.documentElement.clientHeight - this.options.momentumLimitDistance) && this._end(e) } } }, E.prototype._end = function(e) { if (this.enabled && !this.destroyed && H[e.type] === this.initiated) { this.initiated = !1, this.options.preventDefault && !u(e.target, this.options.preventDefaultException) && e.preventDefault(), this.options.stopPropagation && e.stopPropagation(), this.trigger("touchEnd", { x: this.x, y: this.y }), this.isInTransition = !1; var t = Math.round(this.x),
                i = Math.round(this.y),
                s = t - this.absStartX,
                n = i - this.absStartY; if (this.directionX = 0 < s ? -1 : s < 0 ? 1 : 0, this.directionY = 0 < n ? -1 : n < 0 ? 1 : 0, !this.options.pullDownRefresh || !this._checkPullDown())
                if (this._checkClick(e)) this.trigger("scrollCancel");
                else if (!this.resetPosition(this.options.bounceTime, N.bounce)) { this.scrollTo(t, i), this.endTime = f(); var a = this.endTime - this.startTime,
                    r = Math.abs(t - this.startX),
                    o = Math.abs(i - this.startY); if (this._events.flick && a < this.options.flickLimitTime && r < this.options.flickLimitDistance && o < this.options.flickLimitDistance) this.trigger("flick");
                else { var l = 0; if (this.options.momentum && a < this.options.momentumLimitTime && (o > this.options.momentumLimitDistance || r > this.options.momentumLimitDistance)) { var d = this.hasHorizontalScroll ? m(this.x, this.startX, a, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options) : { destination: t, duration: 0 },
                            h = this.hasVerticalScroll ? m(this.y, this.startY, a, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options) : { destination: i, duration: 0 };
                        t = d.destination, i = h.destination, l = Math.max(d.duration, h.duration), this.isInTransition = !0 } else this.options.wheel && (i = Math.round(i / this.itemHeight) * this.itemHeight, l = this.options.wheel.adjustTime || 400); var c = N.swipe; if (this.options.snap) { var p = this._nearestSnap(t, i);
                        this.currentPage = p, l = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(t - p.x), 1e3), Math.min(Math.abs(i - p.y), 1e3)), 300), t = p.x, i = p.y, this.directionX = 0, this.directionY = 0, c = this.options.snap.easing || N.bounce } if (t !== this.x || i !== this.y) return (0 < t || t < this.maxScrollX || 0 < i || i < this.maxScrollY) && (c = N.swipeBounce), void this.scrollTo(t, i, l, c);
                    this.options.wheel && (this.selectedIndex = Math.round(Math.abs(this.y / this.itemHeight))), this.trigger("scrollEnd", { x: this.x, y: this.y }) } } } }, E.prototype._checkClick = function(e) { var t, i, s, n = this.stopFromTransition && !this.pulling; if (this.stopFromTransition = !1, this.moved) return !1; if (this.options.wheel) { if (this.target && this.target.className === this.options.wheel.wheelWrapperClass) { var a = Math.abs(Math.round(this.y / this.itemHeight)),
                    r = Math.round((this.pointY + h(this.target).top - this.itemHeight / 2) / this.itemHeight);
                this.target = this.items[a + r] } return this.scrollToElement(this.target, this.options.wheel.adjustTime || 400, !0, !0, N.swipe), !0 } return !n && (this.options.tap && (t = e, i = this.options.tap, (s = document.createEvent("Event")).initEvent(i, !0, !0), s.pageX = t.pageX, s.pageY = t.pageY, t.target.dispatchEvent(s)), this.options.click && !u(e.target, this.options.preventDefaultException) && function(e) {
            function t() {
                (n = document.createEvent("Event")).initEvent(a, r, o), l(n, s) } var i = void 0; "mouseup" === e.type || "mousecancel" === e.type ? i = e : "touchend" !== e.type && "touchcancel" !== e.type || (i = e.changedTouches[0]); var s = {};
            i && (s.screenX = i.screenX || 0, s.screenY = i.screenY || 0, s.clientX = i.clientX || 0, s.clientY = i.clientY || 0); var n = void 0,
                a = "click",
                r = !0,
                o = !0; if ("undefined" != typeof MouseEvent) try { n = new MouseEvent(a, l({ bubbles: r, cancelable: o }, s)) } catch (e) { t() } else t();
            n.forwardedTouchEvent = !0, n._constructed = !0, e.target.dispatchEvent(n) }(e), !0) }, E.prototype._resize = function() { var e = this;
        this.enabled && (z && (this.wrapper.scrollTop = 0), clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() { e.refresh() }, this.options.resizePolling)) }, E.prototype._startProbe = function() { j(this.probeTimer), this.probeTimer = _(function e() { var t = i.getComputedPosition();
            i.trigger("scroll", t), i.isInTransition ? i.probeTimer = _(e) : i.trigger("scrollEnd", t) }); var i = this }, E.prototype._transitionProperty = function() { var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "transform";
        this.scrollerStyle[Y.transitionProperty] = e }, E.prototype._transitionTime = function() { var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0; if (this.scrollerStyle[Y.transitionDuration] = e + "ms", this.options.wheel)
            for (var t = 0; t < this.items.length; t++) this.items[t].style[Y.transitionDuration] = e + "ms"; if (this.indicators)
            for (var i = 0; i < this.indicators.length; i++) this.indicators[i].transitionTime(e) }, E.prototype._transitionTimingFunction = function(e) { if (this.scrollerStyle[Y.transitionTimingFunction] = e, this.options.wheel)
            for (var t = 0; t < this.items.length; t++) this.items[t].style[Y.transitionTimingFunction] = e; if (this.indicators)
            for (var i = 0; i < this.indicators.length; i++) this.indicators[i].transitionTimingFunction(e) }, E.prototype._transitionEnd = function(e) { e.target === this.scroller && this.isInTransition && (this._transitionTime(), this.pulling || this.resetPosition(this.options.bounceTime, N.bounce) || (this.isInTransition = !1, 3 !== this.options.probeType && this.trigger("scrollEnd", { x: this.x, y: this.y }))) }, E.prototype._translate = function(e, t) { if (function(e, t) { if (!e) throw new Error("[BScroll] " + t) }(!o(e) && !o(t), "Oops! translate x or y is null or undefined. please check your code."), this.options.useTransform ? this.scrollerStyle[Y.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = Math.round(e), t = Math.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.options.wheel)
            for (var i = this.options.wheel.rotate, s = void 0 === i ? 25 : i, n = 0; n < this.items.length; n++) { var a = s * (t / this.itemHeight + n);
                this.items[n].style[Y.transform] = "rotateX(" + a + "deg)" }
        if (this.x = e, this.y = t, this.indicators)
            for (var r = 0; r < this.indicators.length; r++) this.indicators[r].updatePosition() }, E.prototype._animate = function(a, r, o, l) { var d = this,
            h = this.x,
            c = this.y,
            p = f(),
            u = p + o;
        this.isAnimating = !0, j(this.animateTimer),
            function e() { var t = f(); if (u <= t) return d.isAnimating = !1, d._translate(a, r), void(d.pulling || d.resetPosition(d.options.bounceTime) || d.trigger("scrollEnd", { x: d.x, y: d.y })); var i = l(t = (t - p) / o),
                    s = (a - h) * i + h,
                    n = (r - c) * i + c;
                d._translate(s, n), d.isAnimating && (d.animateTimer = _(e)), 3 === d.options.probeType && d.trigger("scroll", { x: d.x, y: d.y }) }() }, E.prototype.scrollBy = function(e, t) { var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : N.bounce;
        e = this.x + e, t = this.y + t, this.scrollTo(e, t, i, s) }, E.prototype.scrollTo = function(e, t) { var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0,
            s = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : N.bounce;
        this.isInTransition = this.options.useTransition && 0 < i && (e !== this.x || t !== this.y), !i || this.options.useTransition ? (this._transitionProperty(), this._transitionTimingFunction(s.style), this._transitionTime(i), this._translate(e, t), i && 3 === this.options.probeType && this._startProbe(), this.options.wheel && (0 < t ? this.selectedIndex = 0 : t < this.maxScrollY ? this.selectedIndex = this.items.length - 1 : this.selectedIndex = Math.round(Math.abs(t / this.itemHeight)))) : this._animate(e, t, i, s.fn) }, E.prototype.scrollToElement = function(e, t, i, s, n) { if (e && (e = e.nodeType ? e : this.scroller.querySelector(e), !this.options.wheel || e.className === this.options.wheel.wheelItemClass)) { var a = h(e);
            a.left -= this.wrapperOffset.left, a.top -= this.wrapperOffset.top, !0 === i && (i = Math.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), !0 === s && (s = Math.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), a.left -= i || 0, a.top -= s || 0, a.left = 0 < a.left ? 0 : a.left < this.maxScrollX ? this.maxScrollX : a.left, a.top = 0 < a.top ? 0 : a.top < this.maxScrollY ? this.maxScrollY : a.top, this.options.wheel && (a.top = Math.round(a.top / this.itemHeight) * this.itemHeight), this.scrollTo(a.left, a.top, t, n) } }, E.prototype.resetPosition = function() { var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
            t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : N.bounce,
            i = this.x,
            s = Math.round(i);!this.hasHorizontalScroll || 0 < s ? i = 0 : s < this.maxScrollX && (i = this.maxScrollX); var n = this.y,
            a = Math.round(n); return !this.hasVerticalScroll || 0 < a ? n = 0 : a < this.maxScrollY && (n = this.maxScrollY), (i !== this.x || n !== this.y) && (this.scrollTo(i, n, e, t), !0) }, E.prototype.getComputedPosition = function() { var e = window.getComputedStyle(this.scroller, null),
            t = void 0,
            i = void 0; return i = this.options.useTransform ? (t = +((e = e[Y.transform].split(")")[0].split(", "))[12] || e[4]), +(e[13] || e[5])) : (t = +e.left.replace(/[^-\d.]/g, ""), +e.top.replace(/[^-\d.]/g, "")), { x: t, y: i } }, E.prototype.stop = function() { if (this.options.useTransition && this.isInTransition) { this.isInTransition = !1; var e = this.getComputedPosition();
            this._translate(e.x, e.y), this.options.wheel ? this.target = this.items[Math.round(-e.y / this.itemHeight)] : this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0 } else !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this.trigger("scrollEnd", { x: this.x, y: this.y }), this.stopFromTransition = !0) }, E.prototype.destroy = function() { this.destroyed = !0, this.trigger("destroy"), this._removeDOMEvents(), this._events = {} }, (T = n).prototype.on = function(e, t) { var i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
        this._events[e] || (this._events[e] = []), this._events[e].push([t, i]) }, T.prototype.once = function(e, t) {
        function i() { this.off(e, i), t.apply(s, arguments) } var s = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : this;
        i.fn = t, this.on(e, i) }, T.prototype.off = function(e, t) { var i = this._events[e]; if (i)
            for (var s = i.length; s--;)(i[s][0] === t || i[s][0] && i[s][0].fn === t) && (i[s][0] = void 0) }, T.prototype.trigger = function(e) { var t = this._events[e]; if (t)
            for (var i = t.length, s = [].concat(function(e) { if (Array.isArray(e)) { for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t]; return i } return Array.from(e) }(t)), n = 0; n < i; n++) { var a = s[n],
                    r = C(a, 2),
                    o = r[0],
                    l = r[1];
                o && o.apply(l, [].slice.call(arguments, 1)) } }, (x = n).prototype._initSnap = function() { var f = this;
        this.currentPage = {}; var e, t, i, s, m = this.options.snap; if (m.loop) { var n = this.scroller.children;
            1 < n.length ? (e = n[n.length - 1].cloneNode(!0), (t = this.scroller).firstChild ? (i = e, (s = t.firstChild).parentNode.insertBefore(i, s)) : t.appendChild(e), this.scroller.appendChild(n[1].cloneNode(!0))) : m.loop = !1 } var v = m.el; "string" == typeof v && (v = this.scroller.querySelectorAll(v)), this.on("refresh", function() { if (f.pages = [], f.wrapperWidth && f.wrapperHeight && f.scrollerWidth && f.scrollerHeight) { var e = m.stepX || f.wrapperWidth,
                    t = m.stepY || f.wrapperHeight,
                    i = 0,
                    s = void 0,
                    n = void 0,
                    a = void 0,
                    r = 0,
                    o = void 0,
                    l = 0,
                    d = void 0,
                    h = void 0; if (v)
                    for (o = v.length, d = -1; r < o; r++) h = g(v[r]), (0 === r || h.left <= g(v[r - 1]).left) && (l = 0, d++), f.pages[l] || (f.pages[l] = []), i = Math.max(-h.left, f.maxScrollX), s = Math.max(-h.top, f.maxScrollY), n = i - Math.round(h.width / 2), a = s - Math.round(h.height / 2), f.pages[l][d] = { x: i, y: s, width: h.width, height: h.height, cx: n, cy: a }, i > f.maxScrollX && l++;
                else
                    for (n = Math.round(e / 2), a = Math.round(t / 2); i > -f.scrollerWidth;) { for (f.pages[r] = [], s = o = 0; s > -f.scrollerHeight;) f.pages[r][o] = { x: Math.max(i, f.maxScrollX), y: Math.max(s, f.maxScrollY), width: e, height: t, cx: i - n, cy: s - a }, s -= t, o++;
                        i -= e, r++ }
                f._checkSnapLoop(); var c = m._loopX ? 1 : 0,
                    p = m._loopY ? 1 : 0;
                f._goToPage(f.currentPage.pageX || c, f.currentPage.pageY || p, 0); var u = m.threshold;
                f.snapThresholdY = u % 1 == 0 ? f.snapThresholdX = u : (f.snapThresholdX = Math.round(f.pages[f.currentPage.pageX][f.currentPage.pageY].width * u), Math.round(f.pages[f.currentPage.pageX][f.currentPage.pageY].height * u)) } }), this.on("scrollEnd", function() { m.loop && (m._loopX ? (0 === f.currentPage.pageX && f._goToPage(f.pages.length - 2, f.currentPage.pageY, 0), f.currentPage.pageX === f.pages.length - 1 && f._goToPage(1, f.currentPage.pageY, 0)) : (0 === f.currentPage.pageY && f._goToPage(f.currentPage.pageX, f.pages[0].length - 2, 0), f.currentPage.pageY === f.pages[0].length - 1 && f._goToPage(f.currentPage.pageX, 1, 0))) }), !1 !== m.listenFlick && this.on("flick", function() { var e = m.speed || Math.max(Math.max(Math.min(Math.abs(f.x - f.startX), 1e3), Math.min(Math.abs(f.y - f.startY), 1e3)), 300);
            f._goToPage(f.currentPage.pageX + f.directionX, f.currentPage.pageY + f.directionY, e) }), this.on("destroy", function() { if (m.loop) { var e = f.scroller.children;
                2 < e.length && (a(f.scroller, e[e.length - 1]), a(f.scroller, e[0])) } }) }, x.prototype._checkSnapLoop = function() { var e = this.options.snap;
        e.loop && this.pages && (1 < this.pages.length && (e._loopX = !0), this.pages[0] && 1 < this.pages[0].length && (e._loopY = !0), e._loopX && e._loopY && s("Loop does not support two direction at the same time.")) }, x.prototype._nearestSnap = function(e, t) { if (!this.pages.length) return { x: 0, y: 0, pageX: 0, pageY: 0 }; var i = 0; if (Math.abs(e - this.absStartX) <= this.snapThresholdX && Math.abs(t - this.absStartY) <= this.snapThresholdY) return this.currentPage;
        0 < e ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), 0 < t ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); for (var s = this.pages.length; i < s; i++)
            if (e >= this.pages[i][0].cx) { e = this.pages[i][0].x; break }
        s = this.pages[i].length; for (var n = 0; n < s; n++)
            if (t >= this.pages[0][n].cy) { t = this.pages[0][n].y; break }
        return i === this.currentPage.pageX && ((i += this.directionX) < 0 ? i = 0 : i >= this.pages.length && (i = this.pages.length - 1), e = this.pages[i][0].x), n === this.currentPage.pageY && ((n += this.directionY) < 0 ? n = 0 : n >= this.pages[0].length && (n = this.pages[0].length - 1), t = this.pages[0][n].y), { x: e, y: t, pageX: i, pageY: n } }, x.prototype._goToPage = function(e) { var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
            i = arguments[2],
            s = arguments[3],
            n = this.options.snap; if (n && this.pages && (s = s || n.easing || N.bounce, e >= this.pages.length ? e = this.pages.length - 1 : e < 0 && (e = 0), this.pages[e])) { t >= this.pages[e].length ? t = this.pages[e].length - 1 : t < 0 && (t = 0); var a = this.pages[e][t].x,
                r = this.pages[e][t].y;
            i = void 0 === i ? n.speed || Math.max(Math.max(Math.min(Math.abs(a - this.x), 1e3), Math.min(Math.abs(r - this.y), 1e3)), 300) : i, this.currentPage = { x: a, y: r, pageX: e, pageY: t }, this.scrollTo(a, r, i, s) } }, x.prototype.goToPage = function(e, t, i, s) { var n = this.options.snap; if (n) { if (n.loop) { var a = void 0;
                n._loopX ? (e >= (a = this.pages.length - 2) ? e = a - 1 : e < 0 && (e = 0), e += 1) : (t >= (a = this.pages[0].length - 2) ? t = a - 1 : t < 0 && (t = 0), t += 1) }
            this._goToPage(e, t, i, s) } }, x.prototype.next = function(e, t) { if (this.options.snap) { var i = this.currentPage.pageX,
                s = this.currentPage.pageY;++i >= this.pages.length && this.hasVerticalScroll && (i = 0, s++), this._goToPage(i, s, e, t) } }, x.prototype.prev = function(e, t) { if (this.options.snap) { var i = this.currentPage.pageX,
                s = this.currentPage.pageY;--i < 0 && this.hasVerticalScroll && (i = 0, s--), this._goToPage(i, s, e, t) } }, x.prototype.getCurrentPage = function() { var e = this.options.snap; return e ? e.loop ? e._loopX ? l({}, this.currentPage, { pageX: this.currentPage.pageX - 1 }) : l({}, this.currentPage, { pageY: this.currentPage.pageY - 1 }) : this.currentPage : null }, (w = n).prototype.wheelTo = function() { var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0;
        this.options.wheel && (this.y = -e * this.itemHeight, this.scrollTo(0, this.y)) }, w.prototype.getSelectedIndex = function() { return this.options.wheel && this.selectedIndex }, w.prototype._initWheel = function() { var e = this.options.wheel;
        e.wheelWrapperClass || (e.wheelWrapperClass = "wheel-scroll"), e.wheelItemClass || (e.wheelItemClass = "wheel-item"), void 0 === e.selectedIndex && (e.selectedIndex = 0, s("wheel option selectedIndex is required!")) }, (b = n).prototype._initScrollbar = function() { var t = this,
            e = this.options.scrollbar,
            i = e.fade,
            s = void 0 === i || i,
            n = e.interactive,
            a = void 0 !== n && n;
        this.indicators = []; var r = void 0;
        this.options.scrollX && (r = { el: c("horizontal"), direction: "horizontal", fade: s, interactive: a }, this._insertScrollBar(r.el), this.indicators.push(new p(this, r))), this.options.scrollY && (r = { el: c("vertical"), direction: "vertical", fade: s, interactive: a }, this._insertScrollBar(r.el), this.indicators.push(new p(this, r))), this.on("refresh", function() { for (var e = 0; e < t.indicators.length; e++) t.indicators[e].refresh() }), s && (this.on("scrollEnd", function() { for (var e = 0; e < t.indicators.length; e++) t.indicators[e].fade() }), this.on("scrollCancel", function() { for (var e = 0; e < t.indicators.length; e++) t.indicators[e].fade() }), this.on("scrollStart", function() { for (var e = 0; e < t.indicators.length; e++) t.indicators[e].fade(!0) }), this.on("beforeScrollStart", function() { for (var e = 0; e < t.indicators.length; e++) t.indicators[e].fade(!0, !0) })), this.on("destroy", function() { t._removeScrollBars() }) }, b.prototype._insertScrollBar = function(e) { this.wrapper.appendChild(e) }, b.prototype._removeScrollBars = function() { for (var e = 0; e < this.indicators.length; e++) this.indicators[e].destroy() }, (y = n).prototype._initPullDown = function() { this.options.probeType = 3 }, y.prototype._checkPullDown = function() { var e = this.options.pullDownRefresh,
            t = e.threshold,
            i = void 0 === t ? 90 : t,
            s = e.stop,
            n = void 0 === s ? 40 : s; return !(-1 !== this.directionY || this.y < i) && (this.pulling || (this.pulling = !0, this.trigger("pullingDown")), this.scrollTo(this.x, n, this.options.bounceTime, N.bounce), this.pulling) }, y.prototype.finishPullDown = function() { this.pulling = !1, this.resetPosition(this.options.bounceTime, N.bounce) }, y.prototype.openPullDown = function() { var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullDownRefresh = e, this._initPullDown() }, y.prototype.closePullDown = function() { this.options.pullDownRefresh = !1 }, (v = n).prototype._initPullUp = function() { this.options.probeType = 3, this.pullupWatching = !1, this._watchPullUp() }, v.prototype._watchPullUp = function() { this.pullupWatching || (this.pullupWatching = !0, this.on("scroll", this._checkToEnd)) }, v.prototype._checkToEnd = function(e) { var t = this,
            i = this.options.pullUpLoad.threshold,
            s = void 0 === i ? 0 : i;
        1 === this.movingDirectionY && e.y <= this.maxScrollY + s && (this.once("scrollEnd", function() { t.pullupWatching = !1 }), this.trigger("pullingUp"), this.off("scroll", this._checkToEnd)) }, v.prototype.finishPullUp = function() { var e = this;
        this.pullupWatching ? this.once("scrollEnd", function() { e._watchPullUp() }) : this._watchPullUp() }, v.prototype.openPullUp = function() { var e = !(0 < arguments.length && void 0 !== arguments[0]) || arguments[0];
        this.options.pullUpLoad = e, this._initPullUp() }, v.prototype.closePullUp = function() { this.options.pullUpLoad = !1, this.pullupWatching && (this.pullupWatching = !1, this.off("scroll", this._checkToEnd)) }, (r = n).prototype._initMouseWheel = function() { var e = this;
        this._handleMouseWheelEvent(i), this.on("destroy", function() { clearTimeout(e.mouseWheelTimer), e._handleMouseWheelEvent(d) }), this.firstWheelOpreation = !0 }, r.prototype._handleMouseWheelEvent = function(e) { e(this.wrapper, "wheel", this), e(this.wrapper, "mousewheel", this), e(this.wrapper, "DOMMouseScroll", this) }, r.prototype._onMouseWheel = function(e) { var t = this; if (this.enabled) { e.preventDefault(), this.firstWheelOpreation && this.trigger("scrollStart"), this.firstWheelOpreation = !1, clearTimeout(this.mouseWheelTimer), this.mouseWheelTimer = setTimeout(function() { t.options.snap || t.trigger("scrollEnd", { x: t.x, y: t.y }), t.firstWheelOpreation = !0 }, 400); var i = this.options.mouseWheel,
                s = i.speed,
                n = void 0 === s ? 20 : s,
                a = i.invert,
                r = void 0 !== a && a,
                o = void 0,
                l = void 0; switch (!0) {
                case "deltaX" in e:
                    l = 1 === e.deltaMode ? (o = -e.deltaX * n, -e.deltaY * n) : (o = -e.deltaX, -e.deltaY); break;
                case "wheelDeltaX" in e:
                    o = e.wheelDeltaX / 120 * n, l = e.wheelDeltaY / 120 * n; break;
                case "wheelDelta" in e:
                    o = l = e.wheelDelta / 120 * n; break;
                case "detail" in e:
                    o = l = -e.detail / 3 * n; break;
                default:
                    return } var d = r ? -1 : 1;
            o *= d, l *= d, this.hasVerticalScroll || (o = l, l = 0); var h = void 0,
                c = void 0; if (this.options.snap) return h = this.currentPage.pageX, c = this.currentPage.pageY, 0 < o ? h-- : o < 0 && h++, 0 < l ? c-- : l < 0 && c++, void this._goToPage(h, c);
            h = this.x + Math.round(this.hasHorizontalScroll ? o : 0), c = this.y + Math.round(this.hasVerticalScroll ? l : 0), this.directionX = 0 < o ? -1 : o < 0 ? 1 : 0, this.directionY = 0 < l ? -1 : l < 0 ? 1 : 0, 0 < h ? h = 0 : h < this.maxScrollX && (h = this.maxScrollX), 0 < c ? c = 0 : c < this.maxScrollY && (c = this.maxScrollY), this.scrollTo(h, c), this.trigger("scroll", { x: this.x, y: this.y }) } }, n.Version = "1.9.1", n }),
function(n, e) { var t, i = n.document,
        a = i.documentElement,
        s = i.querySelector('meta[name="viewport"]'),
        r = i.querySelector('meta[name="flexible"]'),
        o = 0,
        l = 0,
        d = e.flexible || (e.flexible = {}); if (r) { var h = r.getAttribute("content"); if (h) { var c = h.match(/initial\-dpr=([\d\.]+)/),
                p = h.match(/maximum\-dpr=([\d\.]+)/);
            c && (o = parseFloat(c[1]), l = parseFloat((1 / o).toFixed(2))), p && (o = parseFloat(p[1]), l = parseFloat((1 / o).toFixed(2))) } } if (!o && !l) { n.navigator.appVersion.match(/android/gi), n.navigator.appVersion.match(/iphone/gi); var u = n.devicePixelRatio;
        l = 1 / (o = 3 <= u && (!o || 3 <= o) ? 3 : 2 <= u && (!o || 2 <= o) ? 2 : 1) } if (a.setAttribute("data-dpr", o), (s = i.createElement("meta")).setAttribute("name", "viewport"), s.setAttribute("content", "width=device-width, initial-scale=" + l + ", maximum-scale=" + l + ", minimum-scale=" + l + ", user-scalable=no"), a.firstElementChild) a.firstElementChild.appendChild(s);
    else { var f = i.createElement("div");
        f.appendChild(s), i.write(f.innerHTML) }

    function m() { var e = a.getBoundingClientRect().width;
        540 < e / o && (e = 540 * o); var t = e / 10;
        a.style.fontSize = t + "px", d.rem = n.rem = t; var i = parseFloat(a.style.fontSize),
            s = parseFloat(window.getComputedStyle(a).getPropertyValue("font-size"));
        console.log("flexible.refreshRem: fontSize && finalFontSize => ", i, s), i !== s && (a.style.fontSize = i * (i / s) + "px", console.log("flexible.refreshRem.fixed: fontSize  => ", a.style.fontSize)) }
    n.addEventListener("resize", function() { clearTimeout(t), t = setTimeout(m, 300) }, !1), n.addEventListener("pageshow", function(e) { e.persisted && (clearTimeout(t), t = setTimeout(m, 300)) }, !1), "complete" === i.readyState ? i.body.style.fontSize = 12 * o + "px" : i.addEventListener("DOMContentLoaded", function(e) { i.body.style.fontSize = 12 * o + "px" }, !1), m(), d.dpr = n.dpr = o, d.refreshRem = m, d.rem2px = function(e) { var t = parseFloat(e) * this.rem; return "string" == typeof e && e.match(/rem$/) && (t += "px"), t }, d.px2rem = function(e) { var t = parseFloat(e) / this.rem; return "string" == typeof e && e.match(/px$/) && (t += "rem"), t } }(window, window.lib || (window.lib = {})),
function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.Swiper = t() }(this, function() { "use strict"; var m = "undefined" == typeof document ? { body: {}, addEventListener: function() {}, removeEventListener: function() {}, activeElement: { blur: function() {}, nodeName: "" }, querySelector: function() { return null }, querySelectorAll: function() { return [] }, getElementById: function() { return null }, createEvent: function() { return { initEvent: function() {} } }, createElement: function() { return { children: [], childNodes: [], style: {}, setAttribute: function() {}, getElementsByTagName: function() { return [] } } }, location: { hash: "" } } : document,
        _ = "undefined" == typeof window ? { document: m, navigator: { userAgent: "" }, location: {}, history: {}, CustomEvent: function() { return this }, addEventListener: function() {}, removeEventListener: function() {}, getComputedStyle: function() { return { getPropertyValue: function() { return "" } } }, Image: function() {}, Date: function() {}, screen: {}, setTimeout: function() {}, clearTimeout: function() {} } : window,
        l = function(e) { for (var t = 0; t < e.length; t += 1) this[t] = e[t]; return this.length = e.length, this };

    function D(e, t) { var i = [],
            s = 0; if (e && !t && e instanceof l) return e; if (e)
            if ("string" == typeof e) { var n, a, r = e.trim(); if (0 <= r.indexOf("<") && 0 <= r.indexOf(">")) { var o = "div"; for (0 === r.indexOf("<li") && (o = "ul"), 0 === r.indexOf("<tr") && (o = "tbody"), 0 !== r.indexOf("<td") && 0 !== r.indexOf("<th") || (o = "tr"), 0 === r.indexOf("<tbody") && (o = "table"), 0 === r.indexOf("<option") && (o = "select"), (a = m.createElement(o)).innerHTML = r, s = 0; s < a.childNodes.length; s += 1) i.push(a.childNodes[s]) } else
                    for (n = t || "#" !== e[0] || e.match(/[ .<>:~]/) ? (t || m).querySelectorAll(e.trim()) : [m.getElementById(e.trim().split("#")[1])], s = 0; s < n.length; s += 1) n[s] && i.push(n[s]) } else if (e.nodeType || e === _ || e === m) i.push(e);
        else if (0 < e.length && e[0].nodeType)
            for (s = 0; s < e.length; s += 1) i.push(e[s]); return new l(i) }

    function a(e) { for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]); return t }
    D.fn = l.prototype, D.Class = l, D.Dom7 = l; var t = { addClass: function(e) { if (void 0 === e) return this; for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]); return this }, removeClass: function(e) { for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]); return this }, hasClass: function(e) { return !!this[0] && this[0].classList.contains(e) }, toggleClass: function(e) { for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]); return this }, attr: function(e, t) { var i = arguments; if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0; for (var s = 0; s < this.length; s += 1)
                if (2 === i.length) this[s].setAttribute(e, t);
                else
                    for (var n in e) this[s][n] = e[n], this[s].setAttribute(n, e[n]);
            return this }, removeAttr: function(e) { for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e); return this }, data: function(e, t) { var i; if (void 0 !== t) { for (var s = 0; s < this.length; s += 1)(i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t; return this } if (i = this[0]) return i.dom7ElementDataStorage && e in i.dom7ElementDataStorage ? i.dom7ElementDataStorage[e] : i.getAttribute("data-" + e) || void 0 }, transform: function(e) { for (var t = 0; t < this.length; t += 1) { var i = this[t].style;
                i.webkitTransform = e, i.transform = e } return this }, transition: function(e) { "string" != typeof e && (e += "ms"); for (var t = 0; t < this.length; t += 1) { var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e } return this }, on: function() { for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i]; var s = t[0],
                a = t[1],
                r = t[2],
                n = t[3];

            function o(e) { var t = e.target; if (t) { var i = e.target.dom7EventData || []; if (i.indexOf(e) < 0 && i.unshift(e), D(t).is(a)) r.apply(t, i);
                    else
                        for (var s = D(t).parents(), n = 0; n < s.length; n += 1) D(s[n]).is(a) && r.apply(s[n], i) } }

            function l(e) { var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t) } "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1); for (var d, h = s.split(" "), c = 0; c < this.length; c += 1) { var p = this[c]; if (a)
                    for (d = 0; d < h.length; d += 1) { var u = h[d];
                        p.dom7LiveListeners || (p.dom7LiveListeners = {}), p.dom7LiveListeners[u] || (p.dom7LiveListeners[u] = []), p.dom7LiveListeners[u].push({ listener: r, proxyListener: o }), p.addEventListener(u, o, n) } else
                        for (d = 0; d < h.length; d += 1) { var f = h[d];
                            p.dom7Listeners || (p.dom7Listeners = {}), p.dom7Listeners[f] || (p.dom7Listeners[f] = []), p.dom7Listeners[f].push({ listener: r, proxyListener: l }), p.addEventListener(f, l, n) } } return this }, off: function() { for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i]; var s = t[0],
                n = t[1],
                a = t[2],
                r = t[3]; "function" == typeof t[1] && (s = (e = t)[0], a = e[1], r = e[2], n = void 0), r || (r = !1); for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) { var c = this[h],
                        p = void 0; if (!n && c.dom7Listeners ? p = c.dom7Listeners[d] : n && c.dom7LiveListeners && (p = c.dom7LiveListeners[d]), p && p.length)
                        for (var u = p.length - 1; 0 <= u; u -= 1) { var f = p[u];
                            a && f.listener === a ? (c.removeEventListener(d, f.proxyListener, r), p.splice(u, 1)) : a || (c.removeEventListener(d, f.proxyListener, r), p.splice(u, 1)) } }
            return this }, trigger: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; for (var i = e[0].split(" "), s = e[1], n = 0; n < i.length; n += 1)
                for (var a = i[n], r = 0; r < this.length; r += 1) { var o = this[r],
                        l = void 0; try { l = new _.CustomEvent(a, { detail: s, bubbles: !0, cancelable: !0 }) } catch (e) {
                        (l = m.createEvent("Event")).initEvent(a, !0, !0), l.detail = s }
                    o.dom7EventData = e.filter(function(e, t) { return 0 < t }), o.dispatchEvent(l), o.dom7EventData = [], delete o.dom7EventData }
            return this }, transitionEnd: function(t) { var i, s = ["webkitTransitionEnd", "transitionend"],
                n = this;

            function a(e) { if (e.target === this)
                    for (t.call(this, e), i = 0; i < s.length; i += 1) n.off(s[i], a) } if (t)
                for (i = 0; i < s.length; i += 1) n.on(s[i], a); return this }, outerWidth: function(e) { if (0 < this.length) { if (e) { var t = this.styles(); return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left")) } return this[0].offsetWidth } return null }, outerHeight: function(e) { if (0 < this.length) { if (e) { var t = this.styles(); return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom")) } return this[0].offsetHeight } return null }, offset: function() { if (0 < this.length) { var e = this[0],
                    t = e.getBoundingClientRect(),
                    i = m.body,
                    s = e.clientTop || i.clientTop || 0,
                    n = e.clientLeft || i.clientLeft || 0,
                    a = e === _ ? _.scrollY : e.scrollTop,
                    r = e === _ ? _.scrollX : e.scrollLeft; return { top: t.top + a - s, left: t.left + r - n } } return null }, css: function(e, t) { var i; if (1 === arguments.length) { if ("string" != typeof e) { for (i = 0; i < this.length; i += 1)
                        for (var s in e) this[i].style[s] = e[s]; return this } if (this[0]) return _.getComputedStyle(this[0], null).getPropertyValue(e) } if (2 !== arguments.length || "string" != typeof e) return this; for (i = 0; i < this.length; i += 1) this[i].style[e] = t; return this }, each: function(e) { if (!e) return this; for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this }, html: function(e) { if (void 0 === e) return this[0] ? this[0].innerHTML : void 0; for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e; return this }, text: function(e) { if (void 0 === e) return this[0] ? this[0].textContent.trim() : null; for (var t = 0; t < this.length; t += 1) this[t].textContent = e; return this }, is: function(e) { var t, i, s = this[0]; if (!s || void 0 === e) return !1; if ("string" == typeof e) { if (s.matches) return s.matches(e); if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e); if (s.msMatchesSelector) return s.msMatchesSelector(e); for (t = D(e), i = 0; i < t.length; i += 1)
                    if (t[i] === s) return !0;
                return !1 } if (e === m) return s === m; if (e === _) return s === _; if (e.nodeType || e instanceof l) { for (t = e.nodeType ? [e] : e, i = 0; i < t.length; i += 1)
                    if (t[i] === s) return !0;
                return !1 } return !1 }, index: function() { var e, t = this[0]; if (t) { for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1); return e } }, eq: function(e) { if (void 0 === e) return this; var t, i = this.length; return new l(i - 1 < e ? [] : e < 0 ? (t = i + e) < 0 ? [] : [this[t]] : [this[e]]) }, append: function() { for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i]; for (var s = 0; s < t.length; s += 1) { e = t[s]; for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof e) { var a = m.createElement("div"); for (a.innerHTML = e; a.firstChild;) this[n].appendChild(a.firstChild) } else if (e instanceof l)
                    for (var r = 0; r < e.length; r += 1) this[n].appendChild(e[r]);
                else this[n].appendChild(e) } return this }, prepend: function(e) { var t, i, s = this; for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) { var n = m.createElement("div"); for (n.innerHTML = e, i = n.childNodes.length - 1; 0 <= i; i -= 1) s[t].insertBefore(n.childNodes[i], s[t].childNodes[0]) } else if (e instanceof l)
                for (i = 0; i < e.length; i += 1) s[t].insertBefore(e[i], s[t].childNodes[0]);
            else s[t].insertBefore(e, s[t].childNodes[0]); return this }, next: function(e) { return 0 < this.length ? e ? this[0].nextElementSibling && D(this[0].nextElementSibling).is(e) ? new l([this[0].nextElementSibling]) : new l([]) : this[0].nextElementSibling ? new l([this[0].nextElementSibling]) : new l([]) : new l([]) }, nextAll: function(e) { var t = [],
                i = this[0]; if (!i) return new l([]); for (; i.nextElementSibling;) { var s = i.nextElementSibling;
                e ? D(s).is(e) && t.push(s) : t.push(s), i = s } return new l(t) }, prev: function(e) { if (0 < this.length) { var t = this[0]; return e ? t.previousElementSibling && D(t.previousElementSibling).is(e) ? new l([t.previousElementSibling]) : new l([]) : t.previousElementSibling ? new l([t.previousElementSibling]) : new l([]) } return new l([]) }, prevAll: function(e) { var t = [],
                i = this[0]; if (!i) return new l([]); for (; i.previousElementSibling;) { var s = i.previousElementSibling;
                e ? D(s).is(e) && t.push(s) : t.push(s), i = s } return new l(t) }, parent: function(e) { for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? D(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode)); return D(a(t)) }, parents: function(e) { for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].parentNode; s;) e ? D(s).is(e) && t.push(s) : t.push(s), s = s.parentNode; return D(a(t)) }, closest: function(e) { var t = this; return void 0 === e ? new l([]) : (t.is(e) || (t = t.parents(e).eq(0)), t) }, find: function(e) { for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].querySelectorAll(e), n = 0; n < s.length; n += 1) t.push(s[n]); return new l(t) }, children: function(e) { for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].childNodes, n = 0; n < s.length; n += 1) e ? 1 === s[n].nodeType && D(s[n]).is(e) && t.push(s[n]) : 1 === s[n].nodeType && t.push(s[n]); return new l(a(t)) }, remove: function() { for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]); return this }, add: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; var i, s; for (i = 0; i < e.length; i += 1) { var n = D(e[i]); for (s = 0; s < n.length; s += 1) this[this.length] = n[s], this.length += 1 } return this }, styles: function() { return this[0] ? _.getComputedStyle(this[0], null) : {} } };
    Object.keys(t).forEach(function(e) { D.fn[e] = t[e] }); var e, i, s, j = { deleteProps: function(e) { var t = e;
                Object.keys(t).forEach(function(e) { try { t[e] = null } catch (e) {} try { delete t[e] } catch (e) {} }) }, nextTick: function(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) }, now: function() { return Date.now() }, getTranslate: function(e, t) { var i, s, n;
                void 0 === t && (t = "x"); var a = _.getComputedStyle(e, null); return _.WebKitCSSMatrix ? (6 < (s = a.transform || a.webkitTransform).split(",").length && (s = s.split(", ").map(function(e) { return e.replace(",", ".") }).join(", ")), n = new _.WebKitCSSMatrix("none" === s ? "" : s)) : i = (n = a.MozTransform || a.OTransform || a.MsTransform || a.msTransform || a.transform || a.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (s = _.WebKitCSSMatrix ? n.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])), "y" === t && (s = _.WebKitCSSMatrix ? n.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])), s || 0 }, parseUrlQuery: function(e) { var t, i, s, n, a = {},
                    r = e || _.location.href; if ("string" == typeof r && r.length)
                    for (n = (i = (r = -1 < r.indexOf("?") ? r.replace(/\S*\?/, "") : "").split("&").filter(function(e) { return "" !== e })).length, t = 0; t < n; t += 1) s = i[t].replace(/#\S+/g, "").split("="), a[decodeURIComponent(s[0])] = void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || ""; return a }, isObject: function(e) { return "object" == typeof e && null !== e && e.constructor && e.constructor === Object }, extend: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; for (var i = Object(e[0]), s = 1; s < e.length; s += 1) { var n = e[s]; if (null != n)
                        for (var a = Object.keys(Object(n)), r = 0, o = a.length; r < o; r += 1) { var l = a[r],
                                d = Object.getOwnPropertyDescriptor(n, l);
                            void 0 !== d && d.enumerable && (j.isObject(i[l]) && j.isObject(n[l]) ? j.extend(i[l], n[l]) : !j.isObject(i[l]) && j.isObject(n[l]) ? (i[l] = {}, j.extend(i[l], n[l])) : i[l] = n[l]) } } return i } },
        B = (s = m.createElement("div"), { touch: _.Modernizr && !0 === _.Modernizr.touch || !!("ontouchstart" in _ || _.DocumentTouch && m instanceof _.DocumentTouch), pointerEvents: !(!_.navigator.pointerEnabled && !_.PointerEvent), prefixedPointerEvents: !!_.navigator.msPointerEnabled, transition: (i = s.style, "transition" in i || "webkitTransition" in i || "MozTransition" in i), transforms3d: _.Modernizr && !0 === _.Modernizr.csstransforms3d || (e = s.style, "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e), flexbox: function() { for (var e = s.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1)
                    if (t[i] in e) return !0;
                return !1 }(), observer: "MutationObserver" in _ || "WebkitMutationObserver" in _, passiveListener: function() { var e = !1; try { var t = Object.defineProperty({}, "passive", { get: function() { e = !0 } });
                    _.addEventListener("testPassiveListener", null, t) } catch (e) {} return e }(), gestures: "ongesturestart" in _ }),
        n = function(e) { void 0 === e && (e = {}); var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) { t.on(e, t.params.on[e]) }) },
        r = { components: { configurable: !0 } };
    n.prototype.on = function(e, t, i) { var s = this; if ("function" != typeof t) return s; var n = i ? "unshift" : "push"; return e.split(" ").forEach(function(e) { s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][n](t) }), s }, n.prototype.once = function(s, n, e) { var a = this; return "function" != typeof n ? a : a.on(s, function e() { for (var t = [], i = arguments.length; i--;) t[i] = arguments[i];
            n.apply(a, t), a.off(s, e) }, e) }, n.prototype.off = function(e, s) { var n = this; return n.eventsListeners && e.split(" ").forEach(function(i) { void 0 === s ? n.eventsListeners[i] = [] : n.eventsListeners[i] && n.eventsListeners[i].length && n.eventsListeners[i].forEach(function(e, t) { e === s && n.eventsListeners[i].splice(t, 1) }) }), n }, n.prototype.emit = function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; var i, s, n, a = this; return a.eventsListeners && (n = "string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a) : (i = e[0].events, s = e[0].data, e[0].context || a), (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) { if (a.eventsListeners && a.eventsListeners[e]) { var t = [];
                a.eventsListeners[e].forEach(function(e) { t.push(e) }), t.forEach(function(e) { e.apply(n, s) }) } })), a }, n.prototype.useModulesParams = function(i) { var s = this;
        s.modules && Object.keys(s.modules).forEach(function(e) { var t = s.modules[e];
            t.params && j.extend(i, t.params) }) }, n.prototype.useModules = function(s) { void 0 === s && (s = {}); var n = this;
        n.modules && Object.keys(n.modules).forEach(function(e) { var i = n.modules[e],
                t = s[e] || {};
            i.instance && Object.keys(i.instance).forEach(function(e) { var t = i.instance[e];
                n[e] = "function" == typeof t ? t.bind(n) : t }), i.on && n.on && Object.keys(i.on).forEach(function(e) { n.on(e, i.on[e]) }), i.create && i.create.bind(n)(t) }) }, r.components.set = function(e) { this.use && this.use(e) }, n.installModule = function(t) { for (var e = [], i = arguments.length - 1; 0 < i--;) e[i] = arguments[i + 1]; var s = this;
        s.prototype.modules || (s.prototype.modules = {}); var n = t.name || Object.keys(s.prototype.modules).length + "_" + j.now(); return (s.prototype.modules[n] = t).proto && Object.keys(t.proto).forEach(function(e) { s.prototype[e] = t.proto[e] }), t.static && Object.keys(t.static).forEach(function(e) { s[e] = t.static[e] }), t.install && t.install.apply(s, e), s }, n.use = function(e) { for (var t = [], i = arguments.length - 1; 0 < i--;) t[i] = arguments[i + 1]; var s = this; return Array.isArray(e) ? (e.forEach(function(e) { return s.installModule(e) }), s) : s.installModule.apply(s, [e].concat(t)) }, Object.defineProperties(n, r); var o = { updateSize: function() { var e, t, i = this,
                    s = i.$el;
                e = void 0 !== i.params.width ? i.params.width : s[0].clientWidth, t = void 0 !== i.params.height ? i.params.height : s[0].clientHeight, 0 === e && i.isHorizontal() || 0 === t && i.isVertical() || (e = e - parseInt(s.css("padding-left"), 10) - parseInt(s.css("padding-right"), 10), t = t - parseInt(s.css("padding-top"), 10) - parseInt(s.css("padding-bottom"), 10), j.extend(i, { width: e, height: t, size: i.isHorizontal() ? e : t })) }, updateSlides: function() { var e = this,
                    t = e.params,
                    i = e.$wrapperEl,
                    s = e.size,
                    n = e.rtlTranslate,
                    a = e.wrongRTL,
                    r = e.virtual && t.virtual.enabled,
                    o = r ? e.virtual.slides.length : e.slides.length,
                    l = i.children("." + e.params.slideClass),
                    d = r ? e.virtual.slides.length : l.length,
                    h = [],
                    c = [],
                    p = [],
                    u = t.slidesOffsetBefore; "function" == typeof u && (u = t.slidesOffsetBefore.call(e)); var f = t.slidesOffsetAfter; "function" == typeof f && (f = t.slidesOffsetAfter.call(e)); var m = e.snapGrid.length,
                    v = e.snapGrid.length,
                    g = t.spaceBetween,
                    y = -u,
                    b = 0,
                    w = 0; if (void 0 !== s) { var x, T; "string" == typeof g && 0 <= g.indexOf("%") && (g = parseFloat(g.replace("%", "")) / 100 * s), e.virtualSize = -g, n ? l.css({ marginLeft: "", marginTop: "" }) : l.css({ marginRight: "", marginBottom: "" }), 1 < t.slidesPerColumn && (x = Math.floor(d / t.slidesPerColumn) === d / e.params.slidesPerColumn ? d : Math.ceil(d / t.slidesPerColumn) * t.slidesPerColumn, "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (x = Math.max(x, t.slidesPerView * t.slidesPerColumn))); for (var E, S = t.slidesPerColumn, C = x / S, M = C - (t.slidesPerColumn * C - d), P = 0; P < d; P += 1) { T = 0; var k = l.eq(P); if (1 < t.slidesPerColumn) { var z = void 0,
                                R = void 0,
                                D = void 0; "column" === t.slidesPerColumnFill ? (D = P - (R = Math.floor(P / S)) * S, (M < R || R === M && D === S - 1) && S <= (D += 1) && (D = 0, R += 1), z = R + D * x / S, k.css({ "-webkit-box-ordinal-group": z, "-moz-box-ordinal-group": z, "-ms-flex-order": z, "-webkit-order": z, order: z })) : R = P - (D = Math.floor(P / C)) * C, k.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== D && t.spaceBetween && t.spaceBetween + "px").attr("data-swiper-column", R).attr("data-swiper-row", D) } if ("none" !== k.css("display")) { if ("auto" === t.slidesPerView) { var L = _.getComputedStyle(k[0], null),
                                    O = k[0].style.transform,
                                    $ = k[0].style.webkitTransform;
                                O && (k[0].style.transform = "none"), $ && (k[0].style.webkitTransform = "none"), T = t.roundLengths ? e.isHorizontal() ? k.outerWidth(!0) : k.outerHeight(!0) : e.isHorizontal() ? k[0].getBoundingClientRect().width + parseFloat(L.getPropertyValue("margin-left")) + parseFloat(L.getPropertyValue("margin-right")) : k[0].getBoundingClientRect().height + parseFloat(L.getPropertyValue("margin-top")) + parseFloat(L.getPropertyValue("margin-bottom")), O && (k[0].style.transform = O), $ && (k[0].style.webkitTransform = $), t.roundLengths && (T = Math.floor(T)) } else T = (s - (t.slidesPerView - 1) * g) / t.slidesPerView, t.roundLengths && (T = Math.floor(T)), l[P] && (e.isHorizontal() ? l[P].style.width = T + "px" : l[P].style.height = T + "px");
                            l[P] && (l[P].swiperSlideSize = T), p.push(T), t.centeredSlides ? (y = y + T / 2 + b / 2 + g, 0 === b && 0 !== P && (y = y - s / 2 - g), 0 === P && (y = y - s / 2 - g), Math.abs(y) < .001 && (y = 0), t.roundLengths && (y = Math.floor(y)), w % t.slidesPerGroup == 0 && h.push(y), c.push(y)) : (t.roundLengths && (y = Math.floor(y)), w % t.slidesPerGroup == 0 && h.push(y), c.push(y), y = y + T + g), e.virtualSize += T + g, b = T, w += 1 } } if (e.virtualSize = Math.max(e.virtualSize, s) + f, n && a && ("slide" === t.effect || "coverflow" === t.effect) && i.css({ width: e.virtualSize + t.spaceBetween + "px" }), B.flexbox && !t.setWrapperSize || (e.isHorizontal() ? i.css({ width: e.virtualSize + t.spaceBetween + "px" }) : i.css({ height: e.virtualSize + t.spaceBetween + "px" })), 1 < t.slidesPerColumn && (e.virtualSize = (T + t.spaceBetween) * x, e.virtualSize = Math.ceil(e.virtualSize / t.slidesPerColumn) - t.spaceBetween, e.isHorizontal() ? i.css({ width: e.virtualSize + t.spaceBetween + "px" }) : i.css({ height: e.virtualSize + t.spaceBetween + "px" }), t.centeredSlides)) { E = []; for (var I = 0; I < h.length; I += 1) { var X = h[I];
                            t.roundLengths && (X = Math.floor(X)), h[I] < e.virtualSize + h[0] && E.push(X) }
                        h = E } if (!t.centeredSlides) { E = []; for (var Y = 0; Y < h.length; Y += 1) { var H = h[Y];
                            t.roundLengths && (H = Math.floor(H)), h[Y] <= e.virtualSize - s && E.push(H) }
                        h = E, 1 < Math.floor(e.virtualSize - s) - Math.floor(h[h.length - 1]) && h.push(e.virtualSize - s) } if (0 === h.length && (h = [0]), 0 !== t.spaceBetween && (e.isHorizontal() ? n ? l.css({ marginLeft: g + "px" }) : l.css({ marginRight: g + "px" }) : l.css({ marginBottom: g + "px" })), t.centerInsufficientSlides) { var A = 0; if (p.forEach(function(e) { A += e + (t.spaceBetween ? t.spaceBetween : 0) }), (A -= t.spaceBetween) < s) { var N = (s - A) / 2;
                            h.forEach(function(e, t) { h[t] = e - N }), c.forEach(function(e, t) { c[t] = e + N }) } }
                    j.extend(e, { slides: l, snapGrid: h, slidesGrid: c, slidesSizesGrid: p }), d !== o && e.emit("slidesLengthChange"), h.length !== m && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), c.length !== v && e.emit("slidesGridLengthChange"), (t.watchSlidesProgress || t.watchSlidesVisibility) && e.updateSlidesOffset() } }, updateAutoHeight: function(e) { var t, i = this,
                    s = [],
                    n = 0; if ("number" == typeof e ? i.setTransition(e) : !0 === e && i.setTransition(i.params.speed), "auto" !== i.params.slidesPerView && 1 < i.params.slidesPerView)
                    for (t = 0; t < Math.ceil(i.params.slidesPerView); t += 1) { var a = i.activeIndex + t; if (a > i.slides.length) break;
                        s.push(i.slides.eq(a)[0]) } else s.push(i.slides.eq(i.activeIndex)[0]); for (t = 0; t < s.length; t += 1)
                    if (void 0 !== s[t]) { var r = s[t].offsetHeight;
                        n = n < r ? r : n }
                n && i.$wrapperEl.css("height", n + "px") }, updateSlidesOffset: function() { for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop }, updateSlidesProgress: function(e) { void 0 === e && (e = this && this.translate || 0); var t = this,
                    i = t.params,
                    s = t.slides,
                    n = t.rtlTranslate; if (0 !== s.length) { void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset(); var a = -e;
                    n && (a = e), s.removeClass(i.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = []; for (var r = 0; r < s.length; r += 1) { var o = s[r],
                            l = (a + (i.centeredSlides ? t.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + i.spaceBetween); if (i.watchSlidesVisibility) { var d = -(a - o.swiperSlideOffset),
                                h = d + t.slidesSizesGrid[r];
                            (0 <= d && d < t.size || 0 < h && h <= t.size || d <= 0 && h >= t.size) && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(r), s.eq(r).addClass(i.slideVisibleClass)) }
                        o.progress = n ? -l : l }
                    t.visibleSlides = D(t.visibleSlides) } }, updateProgress: function(e) { void 0 === e && (e = this && this.translate || 0); var t = this,
                    i = t.params,
                    s = t.maxTranslate() - t.minTranslate(),
                    n = t.progress,
                    a = t.isBeginning,
                    r = t.isEnd,
                    o = a,
                    l = r;
                r = 0 === s ? a = !(n = 0) : (a = (n = (e - t.minTranslate()) / s) <= 0, 1 <= n), j.extend(t, { progress: n, isBeginning: a, isEnd: r }), (i.watchSlidesProgress || i.watchSlidesVisibility) && t.updateSlidesProgress(e), a && !o && t.emit("reachBeginning toEdge"), r && !l && t.emit("reachEnd toEdge"), (o && !a || l && !r) && t.emit("fromEdge"), t.emit("progress", n) }, updateSlidesClasses: function() { var e, t = this,
                    i = t.slides,
                    s = t.params,
                    n = t.$wrapperEl,
                    a = t.activeIndex,
                    r = t.realIndex,
                    o = t.virtual && s.virtual.enabled;
                i.removeClass(s.slideActiveClass + " " + s.slideNextClass + " " + s.slidePrevClass + " " + s.slideDuplicateActiveClass + " " + s.slideDuplicateNextClass + " " + s.slideDuplicatePrevClass), (e = o ? t.$wrapperEl.find("." + s.slideClass + '[data-swiper-slide-index="' + a + '"]') : i.eq(a)).addClass(s.slideActiveClass), s.loop && (e.hasClass(s.slideDuplicateClass) ? n.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(s.slideDuplicateActiveClass) : n.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(s.slideDuplicateActiveClass)); var l = e.nextAll("." + s.slideClass).eq(0).addClass(s.slideNextClass);
                s.loop && 0 === l.length && (l = i.eq(0)).addClass(s.slideNextClass); var d = e.prevAll("." + s.slideClass).eq(0).addClass(s.slidePrevClass);
                s.loop && 0 === d.length && (d = i.eq(-1)).addClass(s.slidePrevClass), s.loop && (l.hasClass(s.slideDuplicateClass) ? n.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicateNextClass) : n.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicateNextClass), d.hasClass(s.slideDuplicateClass) ? n.children("." + s.slideClass + ":not(." + s.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicatePrevClass) : n.children("." + s.slideClass + "." + s.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(s.slideDuplicatePrevClass)) }, updateActiveIndex: function(e) { var t, i = this,
                    s = i.rtlTranslate ? i.translate : -i.translate,
                    n = i.slidesGrid,
                    a = i.snapGrid,
                    r = i.params,
                    o = i.activeIndex,
                    l = i.realIndex,
                    d = i.snapIndex,
                    h = e; if (void 0 === h) { for (var c = 0; c < n.length; c += 1) void 0 !== n[c + 1] ? s >= n[c] && s < n[c + 1] - (n[c + 1] - n[c]) / 2 ? h = c : s >= n[c] && s < n[c + 1] && (h = c + 1) : s >= n[c] && (h = c);
                    r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0) } if ((t = 0 <= a.indexOf(s) ? a.indexOf(s) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== o) { var p = parseInt(i.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                    j.extend(i, { snapIndex: t, realIndex: p, previousIndex: o, activeIndex: h }), i.emit("activeIndexChange"), i.emit("snapIndexChange"), l !== p && i.emit("realIndexChange"), i.emit("slideChange") } else t !== d && (i.snapIndex = t, i.emit("snapIndexChange")) }, updateClickedSlide: function(e) { var t = this,
                    i = t.params,
                    s = D(e.target).closest("." + i.slideClass)[0],
                    n = !1; if (s)
                    for (var a = 0; a < t.slides.length; a += 1) t.slides[a] === s && (n = !0); if (!s || !n) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
                t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(D(s).attr("data-swiper-slide-index"), 10) : t.clickedIndex = D(s).index(), i.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide() } },
        d = { getTranslate: function(e) { void 0 === e && (e = this.isHorizontal() ? "x" : "y"); var t = this.params,
                    i = this.rtlTranslate,
                    s = this.translate,
                    n = this.$wrapperEl; if (t.virtualTranslate) return i ? -s : s; var a = j.getTranslate(n[0], e); return i && (a = -a), a || 0 }, setTranslate: function(e, t) { var i = this,
                    s = i.rtlTranslate,
                    n = i.params,
                    a = i.$wrapperEl,
                    r = i.progress,
                    o = 0,
                    l = 0;
                i.isHorizontal() ? o = s ? -e : e : l = e, n.roundLengths && (o = Math.floor(o), l = Math.floor(l)), n.virtualTranslate || (B.transforms3d ? a.transform("translate3d(" + o + "px, " + l + "px, 0px)") : a.transform("translate(" + o + "px, " + l + "px)")), i.previousTranslate = i.translate, i.translate = i.isHorizontal() ? o : l; var d = i.maxTranslate() - i.minTranslate();
                (0 === d ? 0 : (e - i.minTranslate()) / d) !== r && i.updateProgress(e), i.emit("setTranslate", i.translate, t) }, minTranslate: function() { return -this.snapGrid[0] }, maxTranslate: function() { return -this.snapGrid[this.snapGrid.length - 1] } },
        h = { slideTo: function(e, t, i, s) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0); var n = this,
                    a = e;
                a < 0 && (a = 0); var r = n.params,
                    o = n.snapGrid,
                    l = n.slidesGrid,
                    d = n.previousIndex,
                    h = n.activeIndex,
                    c = n.rtlTranslate; if (n.animating && r.preventInteractionOnTransition) return !1; var p = Math.floor(a / r.slidesPerGroup);
                p >= o.length && (p = o.length - 1), (h || r.initialSlide || 0) === (d || 0) && i && n.emit("beforeSlideChangeStart"); var u, f = -o[p]; if (n.updateProgress(f), r.normalizeSlideIndex)
                    for (var m = 0; m < l.length; m += 1) - Math.floor(100 * f) >= Math.floor(100 * l[m]) && (a = m); if (n.initialized && a !== h) { if (!n.allowSlideNext && f < n.translate && f < n.minTranslate()) return !1; if (!n.allowSlidePrev && f > n.translate && f > n.maxTranslate() && (h || 0) !== a) return !1 } return u = h < a ? "next" : a < h ? "prev" : "reset", c && -f === n.translate || !c && f === n.translate ? (n.updateActiveIndex(a), r.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), "slide" !== r.effect && n.setTranslate(f), "reset" !== u && (n.transitionStart(i, u), n.transitionEnd(i, u)), !1) : (0 !== t && B.transition ? (n.setTransition(t), n.setTranslate(f), n.updateActiveIndex(a), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, s), n.transitionStart(i, u), n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(e) { n && !n.destroyed && e.target === this && (n.$wrapperEl[0].removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.$wrapperEl[0].removeEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(i, u)) }), n.$wrapperEl[0].addEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.$wrapperEl[0].addEventListener("webkitTransitionEnd", n.onSlideToWrapperTransitionEnd))) : (n.setTransition(0), n.setTranslate(f), n.updateActiveIndex(a), n.updateSlidesClasses(), n.emit("beforeTransitionStart", t, s), n.transitionStart(i, u), n.transitionEnd(i, u)), !0) }, slideToLoop: function(e, t, i, s) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0); var n = e; return this.params.loop && (n += this.loopedSlides), this.slideTo(n, t, i, s) }, slideNext: function(e, t, i) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var s = this,
                    n = s.params,
                    a = s.animating; return n.loop ? !a && (s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft, s.slideTo(s.activeIndex + n.slidesPerGroup, e, t, i)) : s.slideTo(s.activeIndex + n.slidesPerGroup, e, t, i) }, slidePrev: function(e, t, i) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var s = this,
                    n = s.params,
                    a = s.animating,
                    r = s.snapGrid,
                    o = s.slidesGrid,
                    l = s.rtlTranslate; if (n.loop) { if (a) return !1;
                    s.loopFix(), s._clientLeft = s.$wrapperEl[0].clientLeft }

                function d(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) } var h, c = d(l ? s.translate : -s.translate),
                    p = r.map(function(e) { return d(e) }),
                    u = (o.map(function(e) { return d(e) }), r[p.indexOf(c)], r[p.indexOf(c) - 1]); return void 0 !== u && (h = o.indexOf(u)) < 0 && (h = s.activeIndex - 1), s.slideTo(h, e, t, i) }, slideReset: function(e, t, i) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i) }, slideToClosest: function(e, t, i) { void 0 === e && (e = this.params.speed), void 0 === t && (t = !0); var s = this,
                    n = s.activeIndex,
                    a = Math.floor(n / s.params.slidesPerGroup); if (a < s.snapGrid.length - 1) { var r = s.rtlTranslate ? s.translate : -s.translate,
                        o = s.snapGrid[a];
                    (s.snapGrid[a + 1] - o) / 2 < r - o && (n = s.params.slidesPerGroup) } return s.slideTo(n, e, t, i) }, slideToClickedSlide: function() { var e, t = this,
                    i = t.params,
                    s = t.$wrapperEl,
                    n = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                    a = t.clickedIndex; if (i.loop) { if (t.animating) return;
                    e = parseInt(D(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? a < t.loopedSlides - n / 2 || a > t.slides.length - t.loopedSlides + n / 2 ? (t.loopFix(), a = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), j.nextTick(function() { t.slideTo(a) })) : t.slideTo(a) : a > t.slides.length - n ? (t.loopFix(), a = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), j.nextTick(function() { t.slideTo(a) })) : t.slideTo(a) } else t.slideTo(a) } },
        c = { loopCreate: function() { var s = this,
                    e = s.params,
                    t = s.$wrapperEl;
                t.children("." + e.slideClass + "." + e.slideDuplicateClass).remove(); var n = t.children("." + e.slideClass); if (e.loopFillGroupWithBlank) { var i = e.slidesPerGroup - n.length % e.slidesPerGroup; if (i !== e.slidesPerGroup) { for (var a = 0; a < i; a += 1) { var r = D(m.createElement("div")).addClass(e.slideClass + " " + e.slideBlankClass);
                            t.append(r) }
                        n = t.children("." + e.slideClass) } } "auto" !== e.slidesPerView || e.loopedSlides || (e.loopedSlides = n.length), s.loopedSlides = parseInt(e.loopedSlides || e.slidesPerView, 10), s.loopedSlides += e.loopAdditionalSlides, s.loopedSlides > n.length && (s.loopedSlides = n.length); var o = [],
                    l = [];
                n.each(function(e, t) { var i = D(t);
                    e < s.loopedSlides && l.push(t), e < n.length && e >= n.length - s.loopedSlides && o.push(t), i.attr("data-swiper-slide-index", e) }); for (var d = 0; d < l.length; d += 1) t.append(D(l[d].cloneNode(!0)).addClass(e.slideDuplicateClass)); for (var h = o.length - 1; 0 <= h; h -= 1) t.prepend(D(o[h].cloneNode(!0)).addClass(e.slideDuplicateClass)) }, loopFix: function() { var e, t = this,
                    i = t.params,
                    s = t.activeIndex,
                    n = t.slides,
                    a = t.loopedSlides,
                    r = t.allowSlidePrev,
                    o = t.allowSlideNext,
                    l = t.snapGrid,
                    d = t.rtlTranslate;
                t.allowSlidePrev = !0, t.allowSlideNext = !0; var h = -l[s] - t.getTranslate();
                s < a ? (e = n.length - 3 * a + s, e += a, t.slideTo(e, 0, !1, !0) && 0 !== h && t.setTranslate((d ? -t.translate : t.translate) - h)) : ("auto" === i.slidesPerView && 2 * a <= s || s >= n.length - a) && (e = -n.length + s + a, e += a, t.slideTo(e, 0, !1, !0) && 0 !== h && t.setTranslate((d ? -t.translate : t.translate) - h)), t.allowSlidePrev = r, t.allowSlideNext = o }, loopDestroy: function() { var e = this.$wrapperEl,
                    t = this.params,
                    i = this.slides;
                e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index") } },
        p = { setGrabCursor: function(e) { if (!(B.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) { var t = this.el;
                    t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab" } }, unsetGrabCursor: function() { B.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "") } },
        u = { appendSlide: function(e) { var t = this,
                    i = t.$wrapperEl,
                    s = t.params; if (s.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var n = 0; n < e.length; n += 1) e[n] && i.append(e[n]);
                else i.append(e);
                s.loop && t.loopCreate(), s.observer && B.observer || t.update() }, prependSlide: function(e) { var t = this,
                    i = t.params,
                    s = t.$wrapperEl,
                    n = t.activeIndex;
                i.loop && t.loopDestroy(); var a = n + 1; if ("object" == typeof e && "length" in e) { for (var r = 0; r < e.length; r += 1) e[r] && s.prepend(e[r]);
                    a = n + e.length } else s.prepend(e);
                i.loop && t.loopCreate(), i.observer && B.observer || t.update(), t.slideTo(a, 0, !1) }, addSlide: function(e, t) { var i = this,
                    s = i.$wrapperEl,
                    n = i.params,
                    a = i.activeIndex;
                n.loop && (a -= i.loopedSlides, i.loopDestroy(), i.slides = s.children("." + n.slideClass)); var r = i.slides.length; if (e <= 0) i.prependSlide(t);
                else if (r <= e) i.appendSlide(t);
                else { for (var o = e < a ? a + 1 : a, l = [], d = r - 1; e <= d; d -= 1) { var h = i.slides.eq(d);
                        h.remove(), l.unshift(h) } if ("object" == typeof t && "length" in t) { for (var c = 0; c < t.length; c += 1) t[c] && s.append(t[c]);
                        o = e < a ? a + t.length : a } else s.append(t); for (var p = 0; p < l.length; p += 1) s.append(l[p]);
                    n.loop && i.loopCreate(), n.observer && B.observer || i.update(), n.loop ? i.slideTo(o + i.loopedSlides, 0, !1) : i.slideTo(o, 0, !1) } }, removeSlide: function(e) { var t = this,
                    i = t.params,
                    s = t.$wrapperEl,
                    n = t.activeIndex;
                i.loop && (n -= t.loopedSlides, t.loopDestroy(), t.slides = s.children("." + i.slideClass)); var a, r = n; if ("object" == typeof e && "length" in e) { for (var o = 0; o < e.length; o += 1) a = e[o], t.slides[a] && t.slides.eq(a).remove(), a < r && (r -= 1);
                    r = Math.max(r, 0) } else a = e, t.slides[a] && t.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
                i.loop && t.loopCreate(), i.observer && B.observer || t.update(), i.loop ? t.slideTo(r + t.loopedSlides, 0, !1) : t.slideTo(r, 0, !1) }, removeAllSlides: function() { for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e) } },
        f = function() { var e = _.navigator.userAgent,
                t = { ios: !1, android: !1, androidChrome: !1, desktop: !1, windows: !1, iphone: !1, ipod: !1, ipad: !1, cordova: _.cordova || _.phonegap, phonegap: _.cordova || _.phonegap },
                i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                s = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                n = e.match(/(iPad).*OS\s([\d_]+)/),
                a = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                r = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/); if (i && (t.os = "windows", t.osVersion = i[2], t.windows = !0), s && !i && (t.os = "android", t.osVersion = s[2], t.android = !0, t.androidChrome = 0 <= e.toLowerCase().indexOf("chrome")), (n || r || a) && (t.os = "ios", t.ios = !0), r && !a && (t.osVersion = r[2].replace(/_/g, "."), t.iphone = !0), n && (t.osVersion = n[2].replace(/_/g, "."), t.ipad = !0), a && (t.osVersion = a[3] ? a[3].replace(/_/g, ".") : null, t.iphone = !0), t.ios && t.osVersion && 0 <= e.indexOf("Version/") && "10" === t.osVersion.split(".")[0] && (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]), t.desktop = !(t.os || t.android || t.webView), t.webView = (r || n || a) && e.match(/.*AppleWebKit(?!.*Safari)/i), t.os && "ios" === t.os) { var o = t.osVersion.split("."),
                    l = m.querySelector('meta[name="viewport"]');
                t.minimalUi = !t.webView && (a || r) && (1 * o[0] == 7 ? 1 <= 1 * o[1] : 7 < 1 * o[0]) && l && 0 <= l.getAttribute("content").indexOf("minimal-ui") } return t.pixelRatio = _.devicePixelRatio || 1, t }();

    function v() { var e = this,
            t = e.params,
            i = e.el; if (!i || 0 !== i.offsetWidth) { t.breakpoints && e.setBreakpoint(); var s = e.allowSlideNext,
                n = e.allowSlidePrev,
                a = e.snapGrid; if (e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), t.freeMode) { var r = Math.min(Math.max(e.translate, e.maxTranslate()), e.minTranslate());
                e.setTranslate(r), e.updateActiveIndex(), e.updateSlidesClasses(), t.autoHeight && e.updateAutoHeight() } else e.updateSlidesClasses(), ("auto" === t.slidesPerView || 1 < t.slidesPerView) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
            e.allowSlidePrev = n, e.allowSlideNext = s, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow() } } var g, y = { attachEvents: function() { var e = this,
                    t = e.params,
                    i = e.touchEvents,
                    s = e.el,
                    n = e.wrapperEl;
                e.onTouchStart = function(e) { var t = this,
                        i = t.touchEventsData,
                        s = t.params,
                        n = t.touches; if (!t.animating || !s.preventInteractionOnTransition) { var a = e; if (a.originalEvent && (a = a.originalEvent), i.isTouchEvent = "touchstart" === a.type, (i.isTouchEvent || !("which" in a) || 3 !== a.which) && !(!i.isTouchEvent && "button" in a && 0 < a.button || i.isTouched && i.isMoved))
                            if (s.noSwiping && D(a.target).closest(s.noSwipingSelector ? s.noSwipingSelector : "." + s.noSwipingClass)[0]) t.allowClick = !0;
                            else if (!s.swipeHandler || D(a).closest(s.swipeHandler)[0]) { n.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX, n.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY; var r = n.currentX,
                                o = n.currentY,
                                l = s.edgeSwipeDetection || s.iOSEdgeSwipeDetection,
                                d = s.edgeSwipeThreshold || s.iOSEdgeSwipeThreshold; if (!l || !(r <= d || r >= _.screen.width - d)) { if (j.extend(i, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), n.startX = r, n.startY = o, i.touchStartTime = j.now(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, 0 < s.threshold && (i.allowThresholdMove = !1), "touchstart" !== a.type) { var h = !0;
                                    D(a.target).is(i.formElements) && (h = !1), m.activeElement && D(m.activeElement).is(i.formElements) && m.activeElement !== a.target && m.activeElement.blur(), h && t.allowTouchMove && s.touchStartPreventDefault && a.preventDefault() }
                                t.emit("touchStart", a) } } } }.bind(e), e.onTouchMove = function(e) { var t = this,
                        i = t.touchEventsData,
                        s = t.params,
                        n = t.touches,
                        a = t.rtlTranslate,
                        r = e; if (r.originalEvent && (r = r.originalEvent), i.isTouched) { if (!i.isTouchEvent || "mousemove" !== r.type) { var o = "touchmove" === r.type ? r.targetTouches[0].pageX : r.pageX,
                                l = "touchmove" === r.type ? r.targetTouches[0].pageY : r.pageY; if (r.preventedByNestedSwiper) return n.startX = o, void(n.startY = l); if (!t.allowTouchMove) return t.allowClick = !1, void(i.isTouched && (j.extend(n, { startX: o, startY: l, currentX: o, currentY: l }), i.touchStartTime = j.now())); if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                                if (t.isVertical()) { if (l < n.startY && t.translate <= t.maxTranslate() || l > n.startY && t.translate >= t.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1) } else if (o < n.startX && t.translate <= t.maxTranslate() || o > n.startX && t.translate >= t.minTranslate()) return; if (i.isTouchEvent && m.activeElement && r.target === m.activeElement && D(r.target).is(i.formElements)) return i.isMoved = !0, void(t.allowClick = !1); if (i.allowTouchCallbacks && t.emit("touchMove", r), !(r.targetTouches && 1 < r.targetTouches.length)) { n.currentX = o, n.currentY = l; var d, h = n.currentX - n.startX,
                                    c = n.currentY - n.startY; if (!(t.params.threshold && Math.sqrt(Math.pow(h, 2) + Math.pow(c, 2)) < t.params.threshold))
                                    if (void 0 === i.isScrolling && (t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : 25 <= h * h + c * c && (d = 180 * Math.atan2(Math.abs(c), Math.abs(h)) / Math.PI, i.isScrolling = t.isHorizontal() ? d > s.touchAngle : 90 - d > s.touchAngle)), i.isScrolling && t.emit("touchMoveOpposite", r), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                                    else if (i.startMoving) { t.allowClick = !1, r.preventDefault(), s.touchMoveStopPropagation && !s.nested && r.stopPropagation(), i.isMoved || (s.loop && t.loopFix(), i.startTranslate = t.getTranslate(), t.setTransition(0), t.animating && t.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== t.allowSlideNext && !0 !== t.allowSlidePrev || t.setGrabCursor(!0), t.emit("sliderFirstMove", r)), t.emit("sliderMove", r), i.isMoved = !0; var p = t.isHorizontal() ? h : c;
                                    n.diff = p, p *= s.touchRatio, a && (p = -p), t.swipeDirection = 0 < p ? "prev" : "next", i.currentTranslate = p + i.startTranslate; var u = !0,
                                        f = s.resistanceRatio; if (s.touchReleaseOnEdges && (f = 0), 0 < p && i.currentTranslate > t.minTranslate() ? (u = !1, s.resistance && (i.currentTranslate = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + i.startTranslate + p, f))) : p < 0 && i.currentTranslate < t.maxTranslate() && (u = !1, s.resistance && (i.currentTranslate = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - i.startTranslate - p, f))), u && (r.preventedByNestedSwiper = !0), !t.allowSlideNext && "next" === t.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !t.allowSlidePrev && "prev" === t.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), 0 < s.threshold) { if (!(Math.abs(p) > s.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate); if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY) }
                                    s.followFinger && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (t.updateActiveIndex(), t.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({ position: n[t.isHorizontal() ? "startX" : "startY"], time: i.touchStartTime }), i.velocities.push({ position: n[t.isHorizontal() ? "currentX" : "currentY"], time: j.now() })), t.updateProgress(i.currentTranslate), t.setTranslate(i.currentTranslate)) } } } } else i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", r) }.bind(e), e.onTouchEnd = function(e) { var t = this,
                        i = t.touchEventsData,
                        s = t.params,
                        n = t.touches,
                        a = t.rtlTranslate,
                        r = t.$wrapperEl,
                        o = t.slidesGrid,
                        l = t.snapGrid,
                        d = e; if (d.originalEvent && (d = d.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", d), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                    s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1); var h, c = j.now(),
                        p = c - i.touchStartTime; if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap", d), p < 300 && 300 < c - i.lastClickTime && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = j.nextTick(function() { t && !t.destroyed && t.emit("click", d) }, 300)), p < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", d))), i.lastClickTime = j.now(), j.nextTick(function() { t.destroyed || (t.allowClick = !0) }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === n.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1); if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, h = s.followFinger ? a ? t.translate : -t.translate : -i.currentTranslate, s.freeMode) { if (h < -t.minTranslate()) return void t.slideTo(t.activeIndex); if (h > -t.maxTranslate()) return void(t.slides.length < l.length ? t.slideTo(l.length - 1) : t.slideTo(t.slides.length - 1)); if (s.freeModeMomentum) { if (1 < i.velocities.length) { var u = i.velocities.pop(),
                                    f = i.velocities.pop(),
                                    m = u.position - f.position,
                                    v = u.time - f.time;
                                t.velocity = m / v, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (150 < v || 300 < j.now() - u.time) && (t.velocity = 0) } else t.velocity = 0;
                            t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0; var g = 1e3 * s.freeModeMomentumRatio,
                                y = t.velocity * g,
                                b = t.translate + y;
                            a && (b = -b); var w, x, T = !1,
                                E = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio; if (b < t.maxTranslate()) s.freeModeMomentumBounce ? (b + t.maxTranslate() < -E && (b = t.maxTranslate() - E), w = t.maxTranslate(), T = !0, i.allowMomentumBounce = !0) : b = t.maxTranslate(), s.loop && s.centeredSlides && (x = !0);
                            else if (b > t.minTranslate()) s.freeModeMomentumBounce ? (b - t.minTranslate() > E && (b = t.minTranslate() + E), w = t.minTranslate(), T = !0, i.allowMomentumBounce = !0) : b = t.minTranslate(), s.loop && s.centeredSlides && (x = !0);
                            else if (s.freeModeSticky) { for (var S, C = 0; C < l.length; C += 1)
                                    if (l[C] > -b) { S = C; break }
                                b = -(b = Math.abs(l[S] - b) < Math.abs(l[S - 1] - b) || "next" === t.swipeDirection ? l[S] : l[S - 1]) } if (x && t.once("transitionEnd", function() { t.loopFix() }), 0 !== t.velocity) g = a ? Math.abs((-b - t.translate) / t.velocity) : Math.abs((b - t.translate) / t.velocity);
                            else if (s.freeModeSticky) return void t.slideToClosest();
                            s.freeModeMomentumBounce && T ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(b), t.transitionStart(!0, t.swipeDirection), t.animating = !0, r.transitionEnd(function() { t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(w), r.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() })) })) : t.velocity ? (t.updateProgress(b), t.setTransition(g), t.setTranslate(b), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, r.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() }))) : t.updateProgress(b), t.updateActiveIndex(), t.updateSlidesClasses() } else if (s.freeModeSticky) return void t.slideToClosest();
                        (!s.freeModeMomentum || p >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses()) } else { for (var M = 0, P = t.slidesSizesGrid[0], k = 0; k < o.length; k += s.slidesPerGroup) void 0 !== o[k + s.slidesPerGroup] ? h >= o[k] && h < o[k + s.slidesPerGroup] && (P = o[(M = k) + s.slidesPerGroup] - o[k]) : h >= o[k] && (M = k, P = o[o.length - 1] - o[o.length - 2]); var z = (h - o[M]) / P; if (p > s.longSwipesMs) { if (!s.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && (z >= s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (z > 1 - s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M)) } else { if (!s.shortSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && t.slideTo(M + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M) } } }.bind(e), e.onClick = function(e) { this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation())) }.bind(e); var a = "container" === t.touchEventsTarget ? s : n,
                    r = !!t.nested; if (B.touch || !B.pointerEvents && !B.prefixedPointerEvents) { if (B.touch) { var o = !("touchstart" !== i.start || !B.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                        a.addEventListener(i.start, e.onTouchStart, o), a.addEventListener(i.move, e.onTouchMove, B.passiveListener ? { passive: !1, capture: r } : r), a.addEventListener(i.end, e.onTouchEnd, o) }(t.simulateTouch && !f.ios && !f.android || t.simulateTouch && !B.touch && f.ios) && (a.addEventListener("mousedown", e.onTouchStart, !1), m.addEventListener("mousemove", e.onTouchMove, r), m.addEventListener("mouseup", e.onTouchEnd, !1)) } else a.addEventListener(i.start, e.onTouchStart, !1), m.addEventListener(i.move, e.onTouchMove, r), m.addEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && a.addEventListener("click", e.onClick, !0), e.on(f.ios || f.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", v, !0) }, detachEvents: function() { var e = this,
                    t = e.params,
                    i = e.touchEvents,
                    s = e.el,
                    n = e.wrapperEl,
                    a = "container" === t.touchEventsTarget ? s : n,
                    r = !!t.nested; if (B.touch || !B.pointerEvents && !B.prefixedPointerEvents) { if (B.touch) { var o = !("onTouchStart" !== i.start || !B.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                        a.removeEventListener(i.start, e.onTouchStart, o), a.removeEventListener(i.move, e.onTouchMove, r), a.removeEventListener(i.end, e.onTouchEnd, o) }(t.simulateTouch && !f.ios && !f.android || t.simulateTouch && !B.touch && f.ios) && (a.removeEventListener("mousedown", e.onTouchStart, !1), m.removeEventListener("mousemove", e.onTouchMove, r), m.removeEventListener("mouseup", e.onTouchEnd, !1)) } else a.removeEventListener(i.start, e.onTouchStart, !1), m.removeEventListener(i.move, e.onTouchMove, r), m.removeEventListener(i.end, e.onTouchEnd, !1);
                (t.preventClicks || t.preventClicksPropagation) && a.removeEventListener("click", e.onClick, !0), e.off(f.ios || f.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", v) } },
        b = { setBreakpoint: function() { var e = this,
                    t = e.activeIndex,
                    i = e.initialized,
                    s = e.loopedSlides;
                void 0 === s && (s = 0); var n = e.params,
                    a = n.breakpoints; if (a && (!a || 0 !== Object.keys(a).length)) { var r = e.getBreakpoint(a); if (r && e.currentBreakpoint !== r) { var o = r in a ? a[r] : e.originalParams,
                            l = n.loop && o.slidesPerView !== n.slidesPerView;
                        j.extend(e.params, o), j.extend(e, { allowTouchMove: e.params.allowTouchMove, allowSlideNext: e.params.allowSlideNext, allowSlidePrev: e.params.allowSlidePrev }), e.currentBreakpoint = r, l && i && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", o) } } }, getBreakpoint: function(e) { if (e) { var t = !1,
                        i = [];
                    Object.keys(e).forEach(function(e) { i.push(e) }), i.sort(function(e, t) { return parseInt(e, 10) - parseInt(t, 10) }); for (var s = 0; s < i.length; s += 1) { var n = i[s];
                        this.params.breakpointsInverse ? n <= _.innerWidth && (t = n) : n >= _.innerWidth && !t && (t = n) } return t || "max" } } },
        L = { isIE: !!_.navigator.userAgent.match(/Trident/g) || !!_.navigator.userAgent.match(/MSIE/g), isEdge: !!_.navigator.userAgent.match(/Edge/g), isSafari: (g = _.navigator.userAgent.toLowerCase(), 0 <= g.indexOf("safari") && g.indexOf("chrome") < 0 && g.indexOf("android") < 0), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(_.navigator.userAgent) },
        w = { init: !0, direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, preventInteractionOnTransition: !1, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsInverse: !1, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !1, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !0, touchStartPreventDefault: !0, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopFillGroupWithBlank: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0 },
        x = { update: o, translate: d, transition: { setTransition: function(e, t) { this.$wrapperEl.transition(e), this.emit("setTransition", e, t) }, transitionStart: function(e, t) { void 0 === e && (e = !0); var i = this,
                        s = i.activeIndex,
                        n = i.params,
                        a = i.previousIndex;
                    n.autoHeight && i.updateAutoHeight(); var r = t; if (r || (r = a < s ? "next" : s < a ? "prev" : "reset"), i.emit("transitionStart"), e && s !== a) { if ("reset" === r) return void i.emit("slideResetTransitionStart");
                        i.emit("slideChangeTransitionStart"), "next" === r ? i.emit("slideNextTransitionStart") : i.emit("slidePrevTransitionStart") } }, transitionEnd: function(e, t) { void 0 === e && (e = !0); var i = this,
                        s = i.activeIndex,
                        n = i.previousIndex;
                    i.animating = !1, i.setTransition(0); var a = t; if (a || (a = n < s ? "next" : s < n ? "prev" : "reset"), i.emit("transitionEnd"), e && s !== n) { if ("reset" === a) return void i.emit("slideResetTransitionEnd");
                        i.emit("slideChangeTransitionEnd"), "next" === a ? i.emit("slideNextTransitionEnd") : i.emit("slidePrevTransitionEnd") } } }, slide: h, loop: c, grabCursor: p, manipulation: u, events: y, breakpoints: b, checkOverflow: { checkOverflow: function() { var e = this,
                        t = e.isLocked;
                    e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), t && t !== e.isLocked && (e.isEnd = !1, e.navigation.update()) } }, classes: { addClasses: function() { var t = this.classNames,
                        i = this.params,
                        e = this.rtl,
                        s = this.$el,
                        n = [];
                    n.push(i.direction), i.freeMode && n.push("free-mode"), B.flexbox || n.push("no-flexbox"), i.autoHeight && n.push("autoheight"), e && n.push("rtl"), 1 < i.slidesPerColumn && n.push("multirow"), f.android && n.push("android"), f.ios && n.push("ios"), (L.isIE || L.isEdge) && (B.pointerEvents || B.prefixedPointerEvents) && n.push("wp8-" + i.direction), n.forEach(function(e) { t.push(i.containerModifierClass + e) }), s.addClass(t.join(" ")) }, removeClasses: function() { var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" ")) } }, images: { loadImage: function(e, t, i, s, n, a) { var r;

                    function o() { a && a() }
                    e.complete && n ? o() : t ? ((r = new _.Image).onload = o, r.onerror = o, s && (r.sizes = s), i && (r.srcset = i), t && (r.src = t)) : o() }, preloadImages: function() { var e = this;

                    function t() { null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady"))) }
                    e.imagesToLoad = e.$el.find("img"); for (var i = 0; i < e.imagesToLoad.length; i += 1) { var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t) } } } },
        T = {},
        E = function(p) {
            function u() { for (var e, t, n, i = [], s = arguments.length; s--;) i[s] = arguments[s];
                (n = 1 === i.length && i[0].constructor && i[0].constructor === Object ? i[0] : (t = (e = i)[0], e[1])) || (n = {}), n = j.extend({}, n), t && !n.el && (n.el = t), p.call(this, n), Object.keys(x).forEach(function(t) { Object.keys(x[t]).forEach(function(e) { u.prototype[e] || (u.prototype[e] = x[t][e]) }) }); var a = this;
                void 0 === a.modules && (a.modules = {}), Object.keys(a.modules).forEach(function(e) { var t = a.modules[e]; if (t.params) { var i = Object.keys(t.params)[0],
                            s = t.params[i]; if ("object" != typeof s || null === s) return; if (!(i in n && "enabled" in s)) return;!0 === n[i] && (n[i] = { enabled: !0 }), "object" != typeof n[i] || "enabled" in n[i] || (n[i].enabled = !0), n[i] || (n[i] = { enabled: !1 }) } }); var r = j.extend({}, w);
                a.useModulesParams(r), a.params = j.extend({}, r, T, n), a.originalParams = j.extend({}, a.params), a.passedParams = j.extend({}, n); var o = (a.$ = D)(a.params.el); if (t = o[0]) { if (1 < o.length) { var l = []; return o.each(function(e, t) { var i = j.extend({}, n, { el: t });
                            l.push(new u(i)) }), l }
                    t.swiper = a, o.data("swiper", a); var d, h, c = o.children("." + a.params.wrapperClass); return j.extend(a, { $el: o, el: t, $wrapperEl: c, wrapperEl: c[0], classNames: [], slides: D(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: function() { return "horizontal" === a.params.direction }, isVertical: function() { return "vertical" === a.params.direction }, rtl: "rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction"), rtlTranslate: "horizontal" === a.params.direction && ("rtl" === t.dir.toLowerCase() || "rtl" === o.css("direction")), wrongRTL: "-webkit-box" === c.css("display"), activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, allowSlideNext: a.params.allowSlideNext, allowSlidePrev: a.params.allowSlidePrev, touchEvents: (d = ["touchstart", "touchmove", "touchend"], h = ["mousedown", "mousemove", "mouseup"], B.pointerEvents ? h = ["pointerdown", "pointermove", "pointerup"] : B.prefixedPointerEvents && (h = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), a.touchEventsTouch = { start: d[0], move: d[1], end: d[2] }, a.touchEventsDesktop = { start: h[0], move: h[1], end: h[2] }, B.touch || !a.params.simulateTouch ? a.touchEventsTouch : a.touchEventsDesktop), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, formElements: "input, select, option, textarea, button, video", lastClickTime: j.now(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: !0, allowTouchMove: a.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), a.useModules(), a.params.init && a.init(), a } }
            p && (u.__proto__ = p); var e = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } }; return ((u.prototype = Object.create(p && p.prototype)).constructor = u).prototype.slidesPerViewDynamic = function() { var e = this,
                    t = e.params,
                    i = e.slides,
                    s = e.slidesGrid,
                    n = e.size,
                    a = e.activeIndex,
                    r = 1; if (t.centeredSlides) { for (var o, l = i[a].swiperSlideSize, d = a + 1; d < i.length; d += 1) i[d] && !o && (r += 1, n < (l += i[d].swiperSlideSize) && (o = !0)); for (var h = a - 1; 0 <= h; h -= 1) i[h] && !o && (r += 1, n < (l += i[h].swiperSlideSize) && (o = !0)) } else
                    for (var c = a + 1; c < i.length; c += 1) s[c] - s[a] < n && (r += 1); return r }, u.prototype.update = function() { var i = this; if (i && !i.destroyed) { var e = i.snapGrid,
                        t = i.params;
                    t.breakpoints && i.setBreakpoint(), i.updateSize(), i.updateSlides(), i.updateProgress(), i.updateSlidesClasses(), i.params.freeMode ? (s(), i.params.autoHeight && i.updateAutoHeight()) : (("auto" === i.params.slidesPerView || 1 < i.params.slidesPerView) && i.isEnd && !i.params.centeredSlides ? i.slideTo(i.slides.length - 1, 0, !1, !0) : i.slideTo(i.activeIndex, 0, !1, !0)) || s(), t.watchOverflow && e !== i.snapGrid && i.checkOverflow(), i.emit("update") }

                function s() { var e = i.rtlTranslate ? -1 * i.translate : i.translate,
                        t = Math.min(Math.max(e, i.maxTranslate()), i.minTranslate());
                    i.setTranslate(t), i.updateActiveIndex(), i.updateSlidesClasses() } }, u.prototype.init = function() { var e = this;
                e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init")) }, u.prototype.destroy = function(e, t) { void 0 === e && (e = !0), void 0 === t && (t = !0); var i = this,
                    s = i.params,
                    n = i.$el,
                    a = i.$wrapperEl,
                    r = i.slides; return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), n.removeAttr("style"), a.removeAttr("style"), r && r.length && r.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) { i.off(e) }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), j.deleteProps(i)), i.destroyed = !0), null }, u.extendDefaults = function(e) { j.extend(T, e) }, e.extendedDefaults.get = function() { return T }, e.defaults.get = function() { return w }, e.Class.get = function() { return p }, e.$.get = function() { return D }, Object.defineProperties(u, e), u }(n),
        S = { name: "device", proto: { device: f }, static: { device: f } },
        C = { name: "support", proto: { support: B }, static: { support: B } },
        M = { name: "browser", proto: { browser: L }, static: { browser: L } },
        P = { name: "resize", create: function() { var e = this;
                j.extend(e, { resize: { resizeHandler: function() { e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize")) }, orientationChangeHandler: function() { e && !e.destroyed && e.initialized && e.emit("orientationchange") } } }) }, on: { init: function() { _.addEventListener("resize", this.resize.resizeHandler), _.addEventListener("orientationchange", this.resize.orientationChangeHandler) }, destroy: function() { _.removeEventListener("resize", this.resize.resizeHandler), _.removeEventListener("orientationchange", this.resize.orientationChangeHandler) } } },
        k = { func: _.MutationObserver || _.WebkitMutationObserver, attach: function(e, t) { void 0 === t && (t = {}); var i = this,
                    s = new k.func(function(e) { if (1 !== e.length) { var t = function() { i.emit("observerUpdate", e[0]) };
                            _.requestAnimationFrame ? _.requestAnimationFrame(t) : _.setTimeout(t, 0) } else i.emit("observerUpdate", e[0]) });
                s.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), i.observer.observers.push(s) }, init: function() { var e = this; if (B.observer && e.params.observer) { if (e.params.observeParents)
                        for (var t = e.$el.parents(), i = 0; i < t.length; i += 1) e.observer.attach(t[i]);
                    e.observer.attach(e.$el[0], { childList: !1 }), e.observer.attach(e.$wrapperEl[0], { attributes: !1 }) } }, destroy: function() { this.observer.observers.forEach(function(e) { e.disconnect() }), this.observer.observers = [] } },
        z = { name: "observer", params: { observer: !1, observeParents: !1 }, create: function() { j.extend(this, { observer: { init: k.init.bind(this), attach: k.attach.bind(this), destroy: k.destroy.bind(this), observers: [] } }) }, on: { init: function() { this.observer.init() }, destroy: function() { this.observer.destroy() } } },
        R = { update: function(e) { var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    n = i.slidesPerGroup,
                    a = i.centeredSlides,
                    r = t.params.virtual,
                    o = r.addSlidesBefore,
                    l = r.addSlidesAfter,
                    d = t.virtual,
                    h = d.from,
                    c = d.to,
                    p = d.slides,
                    u = d.slidesGrid,
                    f = d.renderSlide,
                    m = d.offset;
                t.updateActiveIndex(); var v, g, y, b = t.activeIndex || 0;
                v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", y = a ? (g = Math.floor(s / 2) + n + o, Math.floor(s / 2) + n + l) : (g = s + (n - 1) + o, n + l); var w = Math.max((b || 0) - y, 0),
                    x = Math.min((b || 0) + g, p.length - 1),
                    T = (t.slidesGrid[w] || 0) - (t.slidesGrid[0] || 0);

                function E() { t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load() } if (j.extend(t.virtual, { from: w, to: x, offset: T, slidesGrid: t.slidesGrid }), h === w && c === x && !e) return t.slidesGrid !== u && T !== m && t.slides.css(v, T + "px"), void t.updateProgress(); if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, { offset: T, from: w, to: x, slides: function() { for (var e = [], t = w; t <= x; t += 1) e.push(p[t]); return e }() }), void E(); var S = [],
                    C = []; if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var M = h; M <= c; M += 1)(M < w || x < M) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + M + '"]').remove(); for (var P = 0; P < p.length; P += 1) w <= P && P <= x && (void 0 === c || e ? C.push(P) : (c < P && C.push(P), P < h && S.push(P)));
                C.forEach(function(e) { t.$wrapperEl.append(f(p[e], e)) }), S.sort(function(e, t) { return e < t }).forEach(function(e) { t.$wrapperEl.prepend(f(p[e], e)) }), t.$wrapperEl.children(".swiper-slide").css(v, T + "px"), E() }, renderSlide: function(e, t) { var i = this,
                    s = i.params.virtual; if (s.cache && i.virtual.cache[t]) return i.virtual.cache[t]; var n = s.renderSlide ? D(s.renderSlide.call(i, e, t)) : D('<div class="' + i.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>"); return n.attr("data-swiper-slide-index") || n.attr("data-swiper-slide-index", t), s.cache && (i.virtual.cache[t] = n), n }, appendSlide: function(e) { this.virtual.slides.push(e), this.virtual.update(!0) }, prependSlide: function(e) { var t = this; if (t.virtual.slides.unshift(e), t.params.virtual.cache) { var i = t.virtual.cache,
                        s = {};
                    Object.keys(i).forEach(function(e) { s[e + 1] = i[e] }), t.virtual.cache = s }
                t.virtual.update(!0), t.slideNext(0) } },
        O = { name: "virtual", params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, addSlidesBefore: 0, addSlidesAfter: 0 } }, create: function() { var e = this;
                j.extend(e, { virtual: { update: R.update.bind(e), appendSlide: R.appendSlide.bind(e), prependSlide: R.prependSlide.bind(e), renderSlide: R.renderSlide.bind(e), slides: e.params.virtual.slides, cache: {} } }) }, on: { beforeInit: function() { var e = this; if (e.params.virtual.enabled) { e.classNames.push(e.params.containerModifierClass + "virtual"); var t = { watchSlidesProgress: !0 };
                        j.extend(e.params, t), j.extend(e.originalParams, t), e.virtual.update() } }, setTranslate: function() { this.params.virtual.enabled && this.virtual.update() } } },
        $ = { handle: function(e) { var t = this,
                    i = t.rtlTranslate,
                    s = e;
                s.originalEvent && (s = s.originalEvent); var n = s.keyCode || s.charCode; if (!t.allowSlideNext && (t.isHorizontal() && 39 === n || t.isVertical() && 40 === n)) return !1; if (!t.allowSlidePrev && (t.isHorizontal() && 37 === n || t.isVertical() && 38 === n)) return !1; if (!(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || m.activeElement && m.activeElement.nodeName && ("input" === m.activeElement.nodeName.toLowerCase() || "textarea" === m.activeElement.nodeName.toLowerCase()))) { if (t.params.keyboard.onlyInViewport && (37 === n || 39 === n || 38 === n || 40 === n)) { var a = !1; if (0 < t.$el.parents("." + t.params.slideClass).length && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return; var r = _.innerWidth,
                            o = _.innerHeight,
                            l = t.$el.offset();
                        i && (l.left -= t.$el[0].scrollLeft); for (var d = [
                                [l.left, l.top],
                                [l.left + t.width, l.top],
                                [l.left, l.top + t.height],
                                [l.left + t.width, l.top + t.height]
                            ], h = 0; h < d.length; h += 1) { var c = d[h];
                            0 <= c[0] && c[0] <= r && 0 <= c[1] && c[1] <= o && (a = !0) } if (!a) return }
                    t.isHorizontal() ? (37 !== n && 39 !== n || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), (39 === n && !i || 37 === n && i) && t.slideNext(), (37 === n && !i || 39 === n && i) && t.slidePrev()) : (38 !== n && 40 !== n || (s.preventDefault ? s.preventDefault() : s.returnValue = !1), 40 === n && t.slideNext(), 38 === n && t.slidePrev()), t.emit("keyPress", n) } }, enable: function() { this.keyboard.enabled || (D(m).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0) }, disable: function() { this.keyboard.enabled && (D(m).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1) } },
        I = { name: "keyboard", params: { keyboard: { enabled: !1, onlyInViewport: !0 } }, create: function() { j.extend(this, { keyboard: { enabled: !1, enable: $.enable.bind(this), disable: $.disable.bind(this), handle: $.handle.bind(this) } }) }, on: { init: function() { this.params.keyboard.enabled && this.keyboard.enable() }, destroy: function() { this.keyboard.enabled && this.keyboard.disable() } } },
        X = { lastScrollTime: j.now(), event: -1 < _.navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function() { var e = "onwheel",
                    t = e in m; if (!t) { var i = m.createElement("div");
                    i.setAttribute(e, "return;"), t = "function" == typeof i[e] } return !t && m.implementation && m.implementation.hasFeature && !0 !== m.implementation.hasFeature("", "") && (t = m.implementation.hasFeature("Events.wheel", "3.0")), t }() ? "wheel" : "mousewheel", normalize: function(e) { var t = 0,
                    i = 0,
                    s = 0,
                    n = 0; return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, n = 10 * i, "deltaY" in e && (n = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || n) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, n *= 40) : (s *= 800, n *= 800)), s && !t && (t = s < 1 ? -1 : 1), n && !i && (i = n < 1 ? -1 : 1), { spinX: t, spinY: i, pixelX: s, pixelY: n } }, handleMouseEnter: function() { this.mouseEntered = !0 }, handleMouseLeave: function() { this.mouseEntered = !1 }, handle: function(e) { var t = e,
                    i = this,
                    s = i.params.mousewheel; if (!i.mouseEntered && !s.releaseOnEdges) return !0;
                t.originalEvent && (t = t.originalEvent); var n = 0,
                    a = i.rtlTranslate ? -1 : 1,
                    r = X.normalize(t); if (s.forceToAxis)
                    if (i.isHorizontal()) { if (!(Math.abs(r.pixelX) > Math.abs(r.pixelY))) return !0;
                        n = r.pixelX * a } else { if (!(Math.abs(r.pixelY) > Math.abs(r.pixelX))) return !0;
                        n = r.pixelY }
                else n = Math.abs(r.pixelX) > Math.abs(r.pixelY) ? -r.pixelX * a : -r.pixelY; if (0 === n) return !0; if (s.invert && (n = -n), i.params.freeMode) { i.params.loop && i.loopFix(); var o = i.getTranslate() + n * s.sensitivity,
                        l = i.isBeginning,
                        d = i.isEnd; if (o >= i.minTranslate() && (o = i.minTranslate()), o <= i.maxTranslate() && (o = i.maxTranslate()), i.setTransition(0), i.setTranslate(o), i.updateProgress(), i.updateActiveIndex(), i.updateSlidesClasses(), (!l && i.isBeginning || !d && i.isEnd) && i.updateSlidesClasses(), i.params.freeModeSticky && (clearTimeout(i.mousewheel.timeout), i.mousewheel.timeout = j.nextTick(function() { i.slideToClosest() }, 300)), i.emit("scroll", t), i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(), o === i.minTranslate() || o === i.maxTranslate()) return !0 } else { if (60 < j.now() - i.mousewheel.lastScrollTime)
                        if (n < 0)
                            if (i.isEnd && !i.params.loop || i.animating) { if (s.releaseOnEdges) return !0 } else i.slideNext(), i.emit("scroll", t);
                    else if (i.isBeginning && !i.params.loop || i.animating) { if (s.releaseOnEdges) return !0 } else i.slidePrev(), i.emit("scroll", t);
                    i.mousewheel.lastScrollTime = (new _.Date).getTime() } return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1 }, enable: function() { var e = this; if (!X.event) return !1; if (e.mousewheel.enabled) return !1; var t = e.$el; return "container" !== e.params.mousewheel.eventsTarged && (t = D(e.params.mousewheel.eventsTarged)), t.on("mouseenter", e.mousewheel.handleMouseEnter), t.on("mouseleave", e.mousewheel.handleMouseLeave), t.on(X.event, e.mousewheel.handle), e.mousewheel.enabled = !0 }, disable: function() { var e = this; if (!X.event) return !1; if (!e.mousewheel.enabled) return !1; var t = e.$el; return "container" !== e.params.mousewheel.eventsTarged && (t = D(e.params.mousewheel.eventsTarged)), t.off(X.event, e.mousewheel.handle), !(e.mousewheel.enabled = !1) } },
        Y = { update: function() { var e = this,
                    t = e.params.navigation; if (!e.params.loop) { var i = e.navigation,
                        s = i.$nextEl,
                        n = i.$prevEl;
                    n && 0 < n.length && (e.isBeginning ? n.addClass(t.disabledClass) : n.removeClass(t.disabledClass), n[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), s && 0 < s.length && (e.isEnd ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)) } }, init: function() { var e, t, i = this,
                    s = i.params.navigation;
                (s.nextEl || s.prevEl) && (s.nextEl && (e = D(s.nextEl), i.params.uniqueNavElements && "string" == typeof s.nextEl && 1 < e.length && 1 === i.$el.find(s.nextEl).length && (e = i.$el.find(s.nextEl))), s.prevEl && (t = D(s.prevEl), i.params.uniqueNavElements && "string" == typeof s.prevEl && 1 < t.length && 1 === i.$el.find(s.prevEl).length && (t = i.$el.find(s.prevEl))), e && 0 < e.length && e.on("click", function(e) { e.preventDefault(), i.isEnd && !i.params.loop || i.slideNext() }), t && 0 < t.length && t.on("click", function(e) { e.preventDefault(), i.isBeginning && !i.params.loop || i.slidePrev() }), j.extend(i.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] })) }, destroy: function() { var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass)) } },
        H = { update: function() { var e = this,
                    t = e.rtl,
                    n = e.params.pagination; if (n.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var a, i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        s = e.pagination.$el,
                        r = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length; if (e.params.loop ? ((a = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > i - 1 - 2 * e.loopedSlides && (a -= i - 2 * e.loopedSlides), r - 1 < a && (a -= r), a < 0 && "bullets" !== e.params.paginationType && (a = r + a)) : a = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === n.type && e.pagination.bullets && 0 < e.pagination.bullets.length) { var o, l, d, h = e.pagination.bullets; if (n.dynamicBullets && (e.pagination.bulletSize = h.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), s.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (n.dynamicMainBullets + 4) + "px"), 1 < n.dynamicMainBullets && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += a - e.previousIndex, e.pagination.dynamicBulletIndex > n.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = n.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), o = a - e.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, n.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(n.bulletActiveClass + " " + n.bulletActiveClass + "-next " + n.bulletActiveClass + "-next-next " + n.bulletActiveClass + "-prev " + n.bulletActiveClass + "-prev-prev " + n.bulletActiveClass + "-main"), 1 < s.length) h.each(function(e, t) { var i = D(t),
                                s = i.index();
                            s === a && i.addClass(n.bulletActiveClass), n.dynamicBullets && (o <= s && s <= l && i.addClass(n.bulletActiveClass + "-main"), s === o && i.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), s === l && i.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next")) });
                        else if (h.eq(a).addClass(n.bulletActiveClass), n.dynamicBullets) { for (var c = h.eq(o), p = h.eq(l), u = o; u <= l; u += 1) h.eq(u).addClass(n.bulletActiveClass + "-main");
                            c.prev().addClass(n.bulletActiveClass + "-prev").prev().addClass(n.bulletActiveClass + "-prev-prev"), p.next().addClass(n.bulletActiveClass + "-next").next().addClass(n.bulletActiveClass + "-next-next") } if (n.dynamicBullets) { var f = Math.min(h.length, n.dynamicMainBullets + 4),
                                m = (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
                                v = t ? "right" : "left";
                            h.css(e.isHorizontal() ? v : "top", m + "px") } } if ("fraction" === n.type && (s.find("." + n.currentClass).text(n.formatFractionCurrent(a + 1)), s.find("." + n.totalClass).text(n.formatFractionTotal(r))), "progressbar" === n.type) { var g;
                        g = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical"; var y = (a + 1) / r,
                            b = 1,
                            w = 1; "horizontal" === g ? b = y : w = y, s.find("." + n.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + b + ") scaleY(" + w + ")").transition(e.params.speed) } "custom" === n.type && n.renderCustom ? (s.html(n.renderCustom(e, a + 1, r)), e.emit("paginationRender", e, s[0])) : e.emit("paginationUpdate", e, s[0]), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](n.lockClass) } }, render: function() { var e = this,
                    t = e.params.pagination; if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var i = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
                        s = e.pagination.$el,
                        n = ""; if ("bullets" === t.type) { for (var a = e.params.loop ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, r = 0; r < a; r += 1) t.renderBullet ? n += t.renderBullet.call(e, r, t.bulletClass) : n += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
                        s.html(n), e.pagination.bullets = s.find("." + t.bulletClass) } "fraction" === t.type && (n = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', s.html(n)), "progressbar" === t.type && (n = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', s.html(n)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0]) } }, init: function() { var i = this,
                    e = i.params.pagination; if (e.el) { var t = D(e.el);
                    0 !== t.length && (i.params.uniqueNavElements && "string" == typeof e.el && 1 < t.length && 1 === i.$el.find(e.el).length && (t = i.$el.find(e.el)), "bullets" === e.type && e.clickable && t.addClass(e.clickableClass), t.addClass(e.modifierClass + e.type), "bullets" === e.type && e.dynamicBullets && (t.addClass("" + e.modifierClass + e.type + "-dynamic"), i.pagination.dynamicBulletIndex = 0, e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)), "progressbar" === e.type && e.progressbarOpposite && t.addClass(e.progressbarOppositeClass), e.clickable && t.on("click", "." + e.bulletClass, function(e) { e.preventDefault(); var t = D(this).index() * i.params.slidesPerGroup;
                        i.params.loop && (t += i.loopedSlides), i.slideTo(t) }), j.extend(i.pagination, { $el: t, el: t[0] })) } }, destroy: function() { var e = this,
                    t = e.params.pagination; if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) { var i = e.pagination.$el;
                    i.removeClass(t.hiddenClass), i.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && i.off("click", "." + t.bulletClass) } } },
        A = { setTranslate: function() { var e = this; if (e.params.scrollbar.el && e.scrollbar.el) { var t = e.scrollbar,
                        i = e.rtlTranslate,
                        s = e.progress,
                        n = t.dragSize,
                        a = t.trackSize,
                        r = t.$dragEl,
                        o = t.$el,
                        l = e.params.scrollbar,
                        d = n,
                        h = (a - n) * s;
                    i ? 0 < (h = -h) ? (d = n - h, h = 0) : a < -h + n && (d = a + h) : h < 0 ? (d = n + h, h = 0) : a < h + n && (d = a - h), e.isHorizontal() ? (B.transforms3d ? r.transform("translate3d(" + h + "px, 0, 0)") : r.transform("translateX(" + h + "px)"), r[0].style.width = d + "px") : (B.transforms3d ? r.transform("translate3d(0px, " + h + "px, 0)") : r.transform("translateY(" + h + "px)"), r[0].style.height = d + "px"), l.hide && (clearTimeout(e.scrollbar.timeout), o[0].style.opacity = 1, e.scrollbar.timeout = setTimeout(function() { o[0].style.opacity = 0, o.transition(400) }, 1e3)) } }, setTransition: function(e) { this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e) }, updateSize: function() { var e = this; if (e.params.scrollbar.el && e.scrollbar.el) { var t = e.scrollbar,
                        i = t.$dragEl,
                        s = t.$el;
                    i[0].style.width = "", i[0].style.height = ""; var n, a = e.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight,
                        r = e.size / e.virtualSize,
                        o = r * (a / e.size);
                    n = "auto" === e.params.scrollbar.dragSize ? a * r : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? i[0].style.width = n + "px" : i[0].style.height = n + "px", s[0].style.display = 1 <= r ? "none" : "", e.params.scrollbarHide && (s[0].style.opacity = 0), j.extend(t, { trackSize: a, divider: r, moveDivider: o, dragSize: n }), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass) } }, setDragPosition: function(e) { var t, i = this,
                    s = i.scrollbar,
                    n = i.rtlTranslate,
                    a = s.$el,
                    r = s.dragSize,
                    o = s.trackSize;
                t = ((i.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY) - a.offset()[i.isHorizontal() ? "left" : "top"] - r / 2) / (o - r), t = Math.max(Math.min(t, 1), 0), n && (t = 1 - t); var l = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
                i.updateProgress(l), i.setTranslate(l), i.updateActiveIndex(), i.updateSlidesClasses() }, onDragStart: function(e) { var t = this,
                    i = t.params.scrollbar,
                    s = t.scrollbar,
                    n = t.$wrapperEl,
                    a = s.$el,
                    r = s.$dragEl;
                t.scrollbar.isTouched = !0, e.preventDefault(), e.stopPropagation(), n.transition(100), r.transition(100), s.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), a.transition(0), i.hide && a.css("opacity", 1), t.emit("scrollbarDragStart", e) }, onDragMove: function(e) { var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    n = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), n.transition(0), this.emit("scrollbarDragMove", e)) }, onDragEnd: function(e) { var t = this,
                    i = t.params.scrollbar,
                    s = t.scrollbar.$el;
                t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, i.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = j.nextTick(function() { s.css("opacity", 0), s.transition(400) }, 1e3)), t.emit("scrollbarDragEnd", e), i.snapOnRelease && t.slideToClosest()) }, enableDraggable: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        i = e.touchEvents,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        a = t.$el[0],
                        r = !(!B.passiveListener || !n.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!B.passiveListener || !n.passiveListeners) && { passive: !0, capture: !1 };
                    B.touch || !B.pointerEvents && !B.prefixedPointerEvents ? (B.touch && (a.addEventListener(i.start, e.scrollbar.onDragStart, r), a.addEventListener(i.move, e.scrollbar.onDragMove, r), a.addEventListener(i.end, e.scrollbar.onDragEnd, o)), (n.simulateTouch && !f.ios && !f.android || n.simulateTouch && !B.touch && f.ios) && (a.addEventListener("mousedown", e.scrollbar.onDragStart, r), m.addEventListener("mousemove", e.scrollbar.onDragMove, r), m.addEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (a.addEventListener(s.start, e.scrollbar.onDragStart, r), m.addEventListener(s.move, e.scrollbar.onDragMove, r), m.addEventListener(s.end, e.scrollbar.onDragEnd, o)) } }, disableDraggable: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        i = e.touchEvents,
                        s = e.touchEventsDesktop,
                        n = e.params,
                        a = t.$el[0],
                        r = !(!B.passiveListener || !n.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!B.passiveListener || !n.passiveListeners) && { passive: !0, capture: !1 };
                    B.touch || !B.pointerEvents && !B.prefixedPointerEvents ? (B.touch && (a.removeEventListener(i.start, e.scrollbar.onDragStart, r), a.removeEventListener(i.move, e.scrollbar.onDragMove, r), a.removeEventListener(i.end, e.scrollbar.onDragEnd, o)), (n.simulateTouch && !f.ios && !f.android || n.simulateTouch && !B.touch && f.ios) && (a.removeEventListener("mousedown", e.scrollbar.onDragStart, r), m.removeEventListener("mousemove", e.scrollbar.onDragMove, r), m.removeEventListener("mouseup", e.scrollbar.onDragEnd, o))) : (a.removeEventListener(s.start, e.scrollbar.onDragStart, r), m.removeEventListener(s.move, e.scrollbar.onDragMove, r), m.removeEventListener(s.end, e.scrollbar.onDragEnd, o)) } }, init: function() { var e = this; if (e.params.scrollbar.el) { var t = e.scrollbar,
                        i = e.$el,
                        s = e.params.scrollbar,
                        n = D(s.el);
                    e.params.uniqueNavElements && "string" == typeof s.el && 1 < n.length && 1 === i.find(s.el).length && (n = i.find(s.el)); var a = n.find("." + e.params.scrollbar.dragClass);
                    0 === a.length && (a = D('<div class="' + e.params.scrollbar.dragClass + '"></div>'), n.append(a)), j.extend(t, { $el: n, el: n[0], $dragEl: a, dragEl: a[0] }), s.draggable && t.enableDraggable() } }, destroy: function() { this.scrollbar.disableDraggable() } },
        N = { setTransform: function(e, t) { var i = this.rtl,
                    s = D(e),
                    n = i ? -1 : 1,
                    a = s.attr("data-swiper-parallax") || "0",
                    r = s.attr("data-swiper-parallax-x"),
                    o = s.attr("data-swiper-parallax-y"),
                    l = s.attr("data-swiper-parallax-scale"),
                    d = s.attr("data-swiper-parallax-opacity"); if (r || o ? (r = r || "0", o = o || "0") : this.isHorizontal() ? (r = a, o = "0") : (o = a, r = "0"), r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t * n + "%" : r * t * n + "px", o = 0 <= o.indexOf("%") ? parseInt(o, 10) * t + "%" : o * t + "px", null != d) { var h = d - (d - 1) * (1 - Math.abs(t));
                    s[0].style.opacity = h } if (null == l) s.transform("translate3d(" + r + ", " + o + ", 0px)");
                else { var c = l - (l - 1) * (1 - Math.abs(t));
                    s.transform("translate3d(" + r + ", " + o + ", 0px) scale(" + c + ")") } }, setTranslate: function() { var s = this,
                    e = s.$el,
                    t = s.slides,
                    n = s.progress,
                    a = s.snapGrid;
                e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { s.parallax.setTransform(t, n) }), t.each(function(e, t) { var i = t.progress;
                    1 < s.params.slidesPerGroup && "auto" !== s.params.slidesPerView && (i += Math.ceil(e / 2) - n * (a.length - 1)), i = Math.min(Math.max(i, -1), 1), D(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { s.parallax.setTransform(t, i) }) }) }, setTransition: function(n) { void 0 === n && (n = this.params.speed), this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(e, t) { var i = D(t),
                        s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || n;
                    0 === n && (s = 0), i.transition(s) }) } },
        W = { getDistanceBetweenTouches: function(e) { if (e.targetTouches.length < 2) return 1; var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    n = e.targetTouches[1].pageY; return Math.sqrt(Math.pow(s - t, 2) + Math.pow(n - i, 2)) }, onGestureStart: function(e) { var t = this,
                    i = t.params.zoom,
                    s = t.zoom,
                    n = s.gesture; if (s.fakeGestureTouched = !1, s.fakeGestureMoved = !1, !B.gestures) { if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    s.fakeGestureTouched = !0, n.scaleStart = W.getDistanceBetweenTouches(e) }
                n.$slideEl && n.$slideEl.length || (n.$slideEl = D(e.target).closest(".swiper-slide"), 0 === n.$slideEl.length && (n.$slideEl = t.slides.eq(t.activeIndex)), n.$imageEl = n.$slideEl.find("img, svg, canvas"), n.$imageWrapEl = n.$imageEl.parent("." + i.containerClass), n.maxRatio = n.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== n.$imageWrapEl.length) ? (n.$imageEl.transition(0), t.zoom.isScaling = !0) : n.$imageEl = void 0 }, onGestureChange: function(e) { var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture; if (!B.gestures) { if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, s.scaleMove = W.getDistanceBetweenTouches(e) }
                s.$imageEl && 0 !== s.$imageEl.length && (B.gestures ? this.zoom.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")")) }, onGestureEnd: function(e) { var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture; if (!B.gestures) { if (!i.fakeGestureTouched || !i.fakeGestureMoved) return; if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !f.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1 }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0)) }, onTouchStart: function(e) { var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (f.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)) }, onTouchMove: function(e) { var t = this,
                    i = t.zoom,
                    s = i.gesture,
                    n = i.image,
                    a = i.velocity; if (s.$imageEl && 0 !== s.$imageEl.length && (t.allowClick = !1, n.isTouched && s.$slideEl)) { n.isMoved || (n.width = s.$imageEl[0].offsetWidth, n.height = s.$imageEl[0].offsetHeight, n.startX = j.getTranslate(s.$imageWrapEl[0], "x") || 0, n.startY = j.getTranslate(s.$imageWrapEl[0], "y") || 0, s.slideWidth = s.$slideEl[0].offsetWidth, s.slideHeight = s.$slideEl[0].offsetHeight, s.$imageWrapEl.transition(0), t.rtl && (n.startX = -n.startX, n.startY = -n.startY)); var r = n.width * i.scale,
                        o = n.height * i.scale; if (!(r < s.slideWidth && o < s.slideHeight)) { if (n.minX = Math.min(s.slideWidth / 2 - r / 2, 0), n.maxX = -n.minX, n.minY = Math.min(s.slideHeight / 2 - o / 2, 0), n.maxY = -n.minY, n.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, n.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !n.isMoved && !i.isScaling) { if (t.isHorizontal() && (Math.floor(n.minX) === Math.floor(n.startX) && n.touchesCurrent.x < n.touchesStart.x || Math.floor(n.maxX) === Math.floor(n.startX) && n.touchesCurrent.x > n.touchesStart.x)) return void(n.isTouched = !1); if (!t.isHorizontal() && (Math.floor(n.minY) === Math.floor(n.startY) && n.touchesCurrent.y < n.touchesStart.y || Math.floor(n.maxY) === Math.floor(n.startY) && n.touchesCurrent.y > n.touchesStart.y)) return void(n.isTouched = !1) }
                        e.preventDefault(), e.stopPropagation(), n.isMoved = !0, n.currentX = n.touchesCurrent.x - n.touchesStart.x + n.startX, n.currentY = n.touchesCurrent.y - n.touchesStart.y + n.startY, n.currentX < n.minX && (n.currentX = n.minX + 1 - Math.pow(n.minX - n.currentX + 1, .8)), n.currentX > n.maxX && (n.currentX = n.maxX - 1 + Math.pow(n.currentX - n.maxX + 1, .8)), n.currentY < n.minY && (n.currentY = n.minY + 1 - Math.pow(n.minY - n.currentY + 1, .8)), n.currentY > n.maxY && (n.currentY = n.maxY - 1 + Math.pow(n.currentY - n.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = n.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = n.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (n.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (n.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(n.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(n.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = n.touchesCurrent.x, a.prevPositionY = n.touchesCurrent.y, a.prevTime = Date.now(), s.$imageWrapEl.transform("translate3d(" + n.currentX + "px, " + n.currentY + "px,0)") } } }, onTouchEnd: function() { var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity; if (t.$imageEl && 0 !== t.$imageEl.length) { if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1; var n = 300,
                        a = 300,
                        r = s.x * n,
                        o = i.currentX + r,
                        l = s.y * a,
                        d = i.currentY + l;
                    0 !== s.x && (n = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (a = Math.abs((d - i.currentY) / s.y)); var h = Math.max(n, a);
                    i.currentX = o, i.currentY = d; var c = i.width * e.scale,
                        p = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - c / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - p / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)") } }, onTransitionEnd: function() { var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0, e.scale = 1, e.currentScale = 1) }, toggle: function(e) { var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e) }, in: function(e) { var t, i, s, n, a, r, o, l, d, h, c, p, u, f, m, v, g = this,
                    y = g.zoom,
                    b = g.params.zoom,
                    w = y.gesture,
                    x = y.image;
                w.$slideEl || (w.$slideEl = g.clickedSlide ? D(g.clickedSlide) : g.slides.eq(g.activeIndex), w.$imageEl = w.$slideEl.find("img, svg, canvas"), w.$imageWrapEl = w.$imageEl.parent("." + b.containerClass)), w.$imageEl && 0 !== w.$imageEl.length && (w.$slideEl.addClass("" + b.zoomedSlideClass), i = void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, x.touchesStart.y), y.scale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, y.currentScale = w.$imageWrapEl.attr("data-swiper-zoom") || b.maxRatio, e ? (m = w.$slideEl[0].offsetWidth, v = w.$slideEl[0].offsetHeight, s = w.$slideEl.offset().left + m / 2 - t, n = w.$slideEl.offset().top + v / 2 - i, o = w.$imageEl[0].offsetWidth, l = w.$imageEl[0].offsetHeight, d = o * y.scale, h = l * y.scale, u = -(c = Math.min(m / 2 - d / 2, 0)), f = -(p = Math.min(v / 2 - h / 2, 0)), (a = s * y.scale) < c && (a = c), u < a && (a = u), (r = n * y.scale) < p && (r = p), f < r && (r = f)) : r = a = 0, w.$imageWrapEl.transition(300).transform("translate3d(" + a + "px, " + r + "px,0)"), w.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")")) }, out: function() { var e = this,
                    t = e.zoom,
                    i = e.params.zoom,
                    s = t.gesture;
                s.$slideEl || (s.$slideEl = e.clickedSlide ? D(e.clickedSlide) : e.slides.eq(e.activeIndex), s.$imageEl = s.$slideEl.find("img, svg, canvas"), s.$imageWrapEl = s.$imageEl.parent("." + i.containerClass)), s.$imageEl && 0 !== s.$imageEl.length && (t.scale = 1, t.currentScale = 1, s.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), s.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), s.$slideEl.removeClass("" + i.zoomedSlideClass), s.$slideEl = void 0) }, enable: function() { var e = this,
                    t = e.zoom; if (!t.enabled) { t.enabled = !0; var i = !("touchstart" !== e.touchEvents.start || !B.passiveListener || !e.params.passiveListeners) && { passive: !0, capture: !1 };
                    B.gestures ? (e.$wrapperEl.on("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.on(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove) } }, disable: function() { var e = this,
                    t = e.zoom; if (t.enabled) { e.zoom.enabled = !1; var i = !("touchstart" !== e.touchEvents.start || !B.passiveListener || !e.params.passiveListeners) && { passive: !0, capture: !1 };
                    B.gestures ? (e.$wrapperEl.off("gesturestart", ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off("gesturechange", ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off("gestureend", ".swiper-slide", t.onGestureEnd, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, ".swiper-slide", t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, ".swiper-slide", t.onGestureChange, i), e.$wrapperEl.off(e.touchEvents.end, ".swiper-slide", t.onGestureEnd, i)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove) } } },
        F = { loadInSlide: function(e, l) { void 0 === l && (l = !0); var d = this,
                    h = d.params.lazy; if (void 0 !== e && 0 !== d.slides.length) { var c = d.virtual && d.params.virtual.enabled ? d.$wrapperEl.children("." + d.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : d.slides.eq(e),
                        t = c.find("." + h.elementClass + ":not(." + h.loadedClass + "):not(." + h.loadingClass + ")");!c.hasClass(h.elementClass) || c.hasClass(h.loadedClass) || c.hasClass(h.loadingClass) || (t = t.add(c[0])), 0 !== t.length && t.each(function(e, t) { var s = D(t);
                        s.addClass(h.loadingClass); var n = s.attr("data-background"),
                            a = s.attr("data-src"),
                            r = s.attr("data-srcset"),
                            o = s.attr("data-sizes");
                        d.loadImage(s[0], a || n, r, o, !1, function() { if (null != d && d && (!d || d.params) && !d.destroyed) { if (n ? (s.css("background-image", 'url("' + n + '")'), s.removeAttr("data-background")) : (r && (s.attr("srcset", r), s.removeAttr("data-srcset")), o && (s.attr("sizes", o), s.removeAttr("data-sizes")), a && (s.attr("src", a), s.removeAttr("data-src"))), s.addClass(h.loadedClass).removeClass(h.loadingClass), c.find("." + h.preloaderClass).remove(), d.params.loop && l) { var e = c.attr("data-swiper-slide-index"); if (c.hasClass(d.params.slideDuplicateClass)) { var t = d.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + d.params.slideDuplicateClass + ")");
                                        d.lazy.loadInSlide(t.index(), !1) } else { var i = d.$wrapperEl.children("." + d.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        d.lazy.loadInSlide(i.index(), !1) } }
                                d.emit("lazyImageReady", c[0], s[0]) } }), d.emit("lazyImageLoad", c[0], s[0]) }) } }, load: function() { var s = this,
                    t = s.$wrapperEl,
                    i = s.params,
                    n = s.slides,
                    e = s.activeIndex,
                    a = s.virtual && i.virtual.enabled,
                    r = i.lazy,
                    o = i.slidesPerView;

                function l(e) { if (a) { if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0 } else if (n[e]) return !0; return !1 }

                function d(e) { return a ? D(e).attr("data-swiper-slide-index") : D(e).index() } if ("auto" === o && (o = 0), s.lazy.initialImageLoaded || (s.lazy.initialImageLoaded = !0), s.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function(e, t) { var i = a ? D(t).attr("data-swiper-slide-index") : D(t).index();
                    s.lazy.loadInSlide(i) });
                else if (1 < o)
                    for (var h = e; h < e + o; h += 1) l(h) && s.lazy.loadInSlide(h);
                else s.lazy.loadInSlide(e); if (r.loadPrevNext)
                    if (1 < o || r.loadPrevNextAmount && 1 < r.loadPrevNextAmount) { for (var c = r.loadPrevNextAmount, p = o, u = Math.min(e + p + Math.max(c, p), n.length), f = Math.max(e - Math.max(p, c), 0), m = e + o; m < u; m += 1) l(m) && s.lazy.loadInSlide(m); for (var v = f; v < e; v += 1) l(v) && s.lazy.loadInSlide(v) } else { var g = t.children("." + i.slideNextClass);
                        0 < g.length && s.lazy.loadInSlide(d(g)); var y = t.children("." + i.slidePrevClass);
                        0 < y.length && s.lazy.loadInSlide(d(y)) } } },
        V = { LinearSpline: function(e, t) { var i, s, n, a, r; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) { return e ? (r = function(e, t) { for (s = -1, i = e.length; 1 < i - s;) e[n = i + s >> 1] <= t ? s = n : i = n; return i }(this.x, e), a = r - 1, (e - this.x[a]) * (this.y[r] - this.y[a]) / (this.x[r] - this.x[a]) + this.y[a]) : 0 }, this }, getInterpolateFunction: function(e) { var t = this;
                t.controller.spline || (t.controller.spline = t.params.loop ? new V.LinearSpline(t.slidesGrid, e.slidesGrid) : new V.LinearSpline(t.snapGrid, e.snapGrid)) }, setTranslate: function(e, t) { var i, s, n = this,
                    a = n.controller.control;

                function r(e) { var t = n.rtlTranslate ? -n.translate : n.translate; "slide" === n.params.controller.by && (n.controller.getInterpolateFunction(e), s = -n.controller.spline.interpolate(-t)), s && "container" !== n.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (n.maxTranslate() - n.minTranslate()), s = (t - n.minTranslate()) * i + e.minTranslate()), n.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, n), e.updateActiveIndex(), e.updateSlidesClasses() } if (Array.isArray(a))
                    for (var o = 0; o < a.length; o += 1) a[o] !== t && a[o] instanceof E && r(a[o]);
                else a instanceof E && t !== a && r(a) }, setTransition: function(t, e) { var i, s = this,
                    n = s.controller.control;

                function a(e) { e.setTransition(t, s), 0 !== t && (e.transitionStart(), e.params.autoHeight && j.nextTick(function() { e.updateAutoHeight() }), e.$wrapperEl.transitionEnd(function() { n && (e.params.loop && "slide" === s.params.controller.by && e.loopFix(), e.transitionEnd()) })) } if (Array.isArray(n))
                    for (i = 0; i < n.length; i += 1) n[i] !== e && n[i] instanceof E && a(n[i]);
                else n instanceof E && e !== n && a(n) } },
        G = { makeElFocusable: function(e) { return e.attr("tabIndex", "0"), e }, addElRole: function(e, t) { return e.attr("role", t), e }, addElLabel: function(e, t) { return e.attr("aria-label", t), e }, disableEl: function(e) { return e.attr("aria-disabled", !0), e }, enableEl: function(e) { return e.attr("aria-disabled", !1), e }, onEnterKey: function(e) { var t = this,
                    i = t.params.a11y; if (13 === e.keyCode) { var s = D(e.target);
                    t.navigation && t.navigation.$nextEl && s.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(i.lastSlideMessage) : t.a11y.notify(i.nextSlideMessage)), t.navigation && t.navigation.$prevEl && s.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(i.firstSlideMessage) : t.a11y.notify(i.prevSlideMessage)), t.pagination && s.is("." + t.params.pagination.bulletClass) && s[0].click() } }, notify: function(e) { var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e)) }, updateNavigation: function() { var e = this; if (!e.params.loop) { var t = e.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && 0 < s.length && (e.isBeginning ? e.a11y.disableEl(s) : e.a11y.enableEl(s)), i && 0 < i.length && (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i)) } }, updatePagination: function() { var s = this,
                    n = s.params.a11y;
                s.pagination && s.params.pagination.clickable && s.pagination.bullets && s.pagination.bullets.length && s.pagination.bullets.each(function(e, t) { var i = D(t);
                    s.a11y.makeElFocusable(i), s.a11y.addElRole(i, "button"), s.a11y.addElLabel(i, n.paginationBulletMessage.replace(/{{index}}/, i.index() + 1)) }) }, init: function() { var e = this;
                e.$el.append(e.a11y.liveRegion); var t, i, s = e.params.a11y;
                e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl), t && (e.a11y.makeElFocusable(t), e.a11y.addElRole(t, "button"), e.a11y.addElLabel(t, s.nextSlideMessage), t.on("keydown", e.a11y.onEnterKey)), i && (e.a11y.makeElFocusable(i), e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, s.prevSlideMessage), i.on("keydown", e.a11y.onEnterKey)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey) }, destroy: function() { var e, t, i = this;
                i.a11y.liveRegion && 0 < i.a11y.liveRegion.length && i.a11y.liveRegion.remove(), i.navigation && i.navigation.$nextEl && (e = i.navigation.$nextEl), i.navigation && i.navigation.$prevEl && (t = i.navigation.$prevEl), e && e.off("keydown", i.a11y.onEnterKey), t && t.off("keydown", i.a11y.onEnterKey), i.pagination && i.params.pagination.clickable && i.pagination.bullets && i.pagination.bullets.length && i.pagination.$el.off("keydown", "." + i.params.pagination.bulletClass, i.a11y.onEnterKey) } },
        q = { init: function() { var e = this; if (e.params.history) { if (!_.history || !_.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0); var t = e.history;
                    t.initialized = !0, t.paths = q.getPathValues(), (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || _.addEventListener("popstate", e.history.setHistoryPopState)) } }, destroy: function() { this.params.history.replaceState || _.removeEventListener("popstate", this.history.setHistoryPopState) }, setHistoryPopState: function() { this.history.paths = q.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1) }, getPathValues: function() { var e = _.location.pathname.slice(1).split("/").filter(function(e) { return "" !== e }),
                    t = e.length; return { key: e[t - 2], value: e[t - 1] } }, setHistory: function(e, t) { if (this.history.initialized && this.params.history.enabled) { var i = this.slides.eq(t),
                        s = q.slugify(i.attr("data-history"));
                    _.location.pathname.includes(e) || (s = e + "/" + s); var n = _.history.state;
                    n && n.value === s || (this.params.history.replaceState ? _.history.replaceState({ value: s }, null, s) : _.history.pushState({ value: s }, null, s)) } }, slugify: function(e) { return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "") }, scrollToSlide: function(e, t, i) { var s = this; if (t)
                    for (var n = 0, a = s.slides.length; n < a; n += 1) { var r = s.slides.eq(n); if (q.slugify(r.attr("data-history")) === t && !r.hasClass(s.params.slideDuplicateClass)) { var o = r.index();
                            s.slideTo(o, e, i) } } else s.slideTo(0, e, i) } },
        U = { onHashCange: function() { var e = this,
                    t = m.location.hash.replace("#", ""); if (t !== e.slides.eq(e.activeIndex).attr("data-hash")) { var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + t + '"]').index(); if (void 0 === i) return;
                    e.slideTo(i) } }, setHash: function() { var e = this; if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
                    if (e.params.hashNavigation.replaceState && _.history && _.history.replaceState) _.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || "");
                    else { var t = e.slides.eq(e.activeIndex),
                            i = t.attr("data-hash") || t.attr("data-history");
                        m.location.hash = i || "" } }, init: function() { var e = this; if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) { e.hashNavigation.initialized = !0; var t = m.location.hash.replace("#", ""); if (t)
                        for (var i = 0, s = e.slides.length; i < s; i += 1) { var n = e.slides.eq(i); if ((n.attr("data-hash") || n.attr("data-history")) === t && !n.hasClass(e.params.slideDuplicateClass)) { var a = n.index();
                                e.slideTo(a, 0, e.params.runCallbacksOnInit, !0) } }
                    e.params.hashNavigation.watchState && D(_).on("hashchange", e.hashNavigation.onHashCange) } }, destroy: function() { this.params.hashNavigation.watchState && D(_).off("hashchange", this.hashNavigation.onHashCange) } },
        Q = { run: function() { var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), e.autoplay.timeout = j.nextTick(function() { e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) }, i) }, start: function() { var e = this; return void 0 === e.autoplay.timeout && !e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0) }, stop: function() { var e = this; return !!e.autoplay.running && void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0) }, pause: function(e) { var t = this;
                t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run()))) } },
        Z = { setTranslate: function() { for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) { var s = e.slides.eq(i),
                        n = -s[0].swiperSlideOffset;
                    e.params.virtualTranslate || (n -= e.translate); var a = 0;
                    e.isHorizontal() || (a = n, n = 0); var r = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(s[0].progress), 0) : 1 + Math.min(Math.max(s[0].progress, -1), 0);
                    s.css({ opacity: r }).transform("translate3d(" + n + "px, " + a + "px, 0px)") } }, setTransition: function(e) { var i = this,
                    t = i.slides,
                    s = i.$wrapperEl; if (t.transition(e), i.params.virtualTranslate && 0 !== e) { var n = !1;
                    t.transitionEnd(function() { if (!n && i && !i.destroyed) { n = !0, i.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) s.trigger(e[t]) } }) } } },
        K = { setTranslate: function() { var e, t = this,
                    i = t.$el,
                    s = t.$wrapperEl,
                    n = t.slides,
                    a = t.width,
                    r = t.height,
                    o = t.rtlTranslate,
                    l = t.size,
                    d = t.params.cubeEffect,
                    h = t.isHorizontal(),
                    c = t.virtual && t.params.virtual.enabled,
                    p = 0;
                d.shadow && (h ? (0 === (e = s.find(".swiper-cube-shadow")).length && (e = D('<div class="swiper-cube-shadow"></div>'), s.append(e)), e.css({ height: a + "px" })) : 0 === (e = i.find(".swiper-cube-shadow")).length && (e = D('<div class="swiper-cube-shadow"></div>'), i.append(e))); for (var u = 0; u < n.length; u += 1) { var f = n.eq(u),
                        m = u;
                    c && (m = parseInt(f.attr("data-swiper-slide-index"), 10)); var v = 90 * m,
                        g = Math.floor(v / 360);
                    o && (v = -v, g = Math.floor(-v / 360)); var y = Math.max(Math.min(f[0].progress, 1), -1),
                        b = 0,
                        w = 0,
                        x = 0;
                    m % 4 == 0 ? (b = 4 * -g * l, x = 0) : (m - 1) % 4 == 0 ? (b = 0, x = 4 * -g * l) : (m - 2) % 4 == 0 ? (b = l + 4 * g * l, x = l) : (m - 3) % 4 == 0 && (b = -l, x = 3 * l + 4 * l * g), o && (b = -b), h || (w = b, b = 0); var T = "rotateX(" + (h ? 0 : -v) + "deg) rotateY(" + (h ? v : 0) + "deg) translate3d(" + b + "px, " + w + "px, " + x + "px)"; if (y <= 1 && -1 < y && (p = 90 * m + 90 * y, o && (p = 90 * -m - 90 * y)), f.transform(T), d.slideShadows) { var E = h ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            S = h ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = D('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'), f.append(E)), 0 === S.length && (S = D('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'), f.append(S)), E.length && (E[0].style.opacity = Math.max(-y, 0)), S.length && (S[0].style.opacity = Math.max(y, 0)) } } if (s.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }), d.shadow)
                    if (h) e.transform("translate3d(0px, " + (a / 2 + d.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else { var C = Math.abs(p) - 90 * Math.floor(Math.abs(p) / 90),
                            M = 1.5 - (Math.sin(2 * C * Math.PI / 360) / 2 + Math.cos(2 * C * Math.PI / 360) / 2),
                            P = d.shadowScale,
                            k = d.shadowScale / M,
                            z = d.shadowOffset;
                        e.transform("scale3d(" + P + ", 1, " + k + ") translate3d(0px, " + (r / 2 + z) + "px, " + -r / 2 / k + "px) rotateX(-90deg)") }
                var R = L.isSafari || L.isUiWebView ? -l / 2 : 0;
                s.transform("translate3d(0px,0," + R + "px) rotateX(" + (t.isHorizontal() ? 0 : p) + "deg) rotateY(" + (t.isHorizontal() ? -p : 0) + "deg)") }, setTransition: function(e) { var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e) } },
        J = { setTranslate: function() { for (var e = this, t = e.slides, i = e.rtlTranslate, s = 0; s < t.length; s += 1) { var n = t.eq(s),
                        a = n[0].progress;
                    e.params.flipEffect.limitRotation && (a = Math.max(Math.min(n[0].progress, 1), -1)); var r = -180 * a,
                        o = 0,
                        l = -n[0].swiperSlideOffset,
                        d = 0; if (e.isHorizontal() ? i && (r = -r) : (d = l, o = -r, r = l = 0), n[0].style.zIndex = -Math.abs(Math.round(a)) + t.length, e.params.flipEffect.slideShadows) { var h = e.isHorizontal() ? n.find(".swiper-slide-shadow-left") : n.find(".swiper-slide-shadow-top"),
                            c = e.isHorizontal() ? n.find(".swiper-slide-shadow-right") : n.find(".swiper-slide-shadow-bottom");
                        0 === h.length && (h = D('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), n.append(h)), 0 === c.length && (c = D('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), n.append(c)), h.length && (h[0].style.opacity = Math.max(-a, 0)), c.length && (c[0].style.opacity = Math.max(a, 0)) }
                    n.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + r + "deg)") } }, setTransition: function(e) { var i = this,
                    t = i.slides,
                    s = i.activeIndex,
                    n = i.$wrapperEl; if (t.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), i.params.virtualTranslate && 0 !== e) { var a = !1;
                    t.eq(s).transitionEnd(function() { if (!a && i && !i.destroyed) { a = !0, i.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], t = 0; t < e.length; t += 1) n.trigger(e[t]) } }) } } },
        ee = { setTranslate: function() { for (var e = this, t = e.width, i = e.height, s = e.slides, n = e.$wrapperEl, a = e.slidesSizesGrid, r = e.params.coverflowEffect, o = e.isHorizontal(), l = e.translate, d = o ? t / 2 - l : i / 2 - l, h = o ? r.rotate : -r.rotate, c = r.depth, p = 0, u = s.length; p < u; p += 1) { var f = s.eq(p),
                        m = a[p],
                        v = (d - f[0].swiperSlideOffset - m / 2) / m * r.modifier,
                        g = o ? h * v : 0,
                        y = o ? 0 : h * v,
                        b = -c * Math.abs(v),
                        w = o ? 0 : r.stretch * v,
                        x = o ? r.stretch * v : 0;
                    Math.abs(x) < .001 && (x = 0), Math.abs(w) < .001 && (w = 0), Math.abs(b) < .001 && (b = 0), Math.abs(g) < .001 && (g = 0), Math.abs(y) < .001 && (y = 0); var T = "translate3d(" + x + "px," + w + "px," + b + "px)  rotateX(" + y + "deg) rotateY(" + g + "deg)"; if (f.transform(T), f[0].style.zIndex = 1 - Math.abs(Math.round(v)), r.slideShadows) { var E = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            S = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === E.length && (E = D('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), f.append(E)), 0 === S.length && (S = D('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), f.append(S)), E.length && (E[0].style.opacity = 0 < v ? v : 0), S.length && (S[0].style.opacity = 0 < -v ? -v : 0) } }(B.pointerEvents || B.prefixedPointerEvents) && (n[0].style.perspectiveOrigin = d + "px 50%") }, setTransition: function(e) { this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) } },
        te = { init: function() { var e = this,
                    t = e.params.thumbs,
                    i = e.constructor;
                t.swiper instanceof i ? (e.thumbs.swiper = t.swiper, j.extend(e.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), j.extend(e.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 })) : j.isObject(t.swiper) && (e.thumbs.swiper = new i(j.extend({}, t.swiper, { watchSlidesVisibility: !0, watchSlidesProgress: !0, slideToClickedSlide: !1 })), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick) }, onThumbClick: function() { var e = this,
                    t = e.thumbs.swiper; if (t) { var i = t.clickedIndex; if (null != i) { var s; if (s = t.params.loop ? parseInt(D(t.clickedSlide).attr("data-swiper-slide-index"), 10) : i, e.params.loop) { var n = e.activeIndex;
                            e.slides.eq(n).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, n = e.activeIndex); var a = e.slides.eq(n).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
                                r = e.slides.eq(n).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                            s = void 0 === a ? r : void 0 === r ? a : r - n < n - a ? r : a }
                        e.slideTo(s) } } }, update: function(e) { var t = this,
                    i = t.thumbs.swiper; if (i) { var s = "auto" === i.params.slidesPerView ? i.slidesPerViewDynamic() : i.params.slidesPerView; if (t.realIndex !== i.realIndex) { var n, a = i.activeIndex; if (i.params.loop) { i.slides.eq(a).hasClass(i.params.slideDuplicateClass) && (i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft, a = i.activeIndex); var r = i.slides.eq(a).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
                                o = i.slides.eq(a).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
                            n = void 0 === r ? o : void 0 === o ? r : o - a < a - r ? o : r } else n = t.realIndex;
                        i.visibleSlidesIndexes.indexOf(n) < 0 && (i.params.centeredSlides ? n = a < n ? n - Math.floor(s / 2) + 1 : n + Math.floor(s / 2) - 1 : a < n && (n = n - s + 1), i.slideTo(n, e ? 0 : void 0)) } var l = 1,
                        d = t.params.thumbs.slideThumbActiveClass; if (1 < t.params.slidesPerView && !t.params.centeredSlides && (l = t.params.slidesPerView), i.slides.removeClass(d), i.params.loop)
                        for (var h = 0; h < l; h += 1) i.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(d);
                    else
                        for (var c = 0; c < l; c += 1) i.slides.eq(t.realIndex + c).addClass(d) } } },
        ie = [S, C, M, P, z, O, I, { name: "mousewheel", params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } }, create: function() { var e = this;
                j.extend(e, { mousewheel: { enabled: !1, enable: X.enable.bind(e), disable: X.disable.bind(e), handle: X.handle.bind(e), handleMouseEnter: X.handleMouseEnter.bind(e), handleMouseLeave: X.handleMouseLeave.bind(e), lastScrollTime: j.now() } }) }, on: { init: function() { this.params.mousewheel.enabled && this.mousewheel.enable() }, destroy: function() { this.mousewheel.enabled && this.mousewheel.disable() } } }, { name: "navigation", params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } }, create: function() { j.extend(this, { navigation: { init: Y.init.bind(this), update: Y.update.bind(this), destroy: Y.destroy.bind(this) } }) }, on: { init: function() { this.navigation.init(), this.navigation.update() }, toEdge: function() { this.navigation.update() }, fromEdge: function() { this.navigation.update() }, destroy: function() { this.navigation.destroy() }, click: function(e) { var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;!this.params.navigation.hideOnClick || D(e.target).is(s) || D(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), s && s.toggleClass(this.params.navigation.hiddenClass)) } } }, { name: "pagination", params: { pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: function(e) { return e }, formatFractionTotal: function(e) { return e }, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", modifierClass: "swiper-pagination-", currentClass: "swiper-pagination-current", totalClass: "swiper-pagination-total", hiddenClass: "swiper-pagination-hidden", progressbarFillClass: "swiper-pagination-progressbar-fill", progressbarOppositeClass: "swiper-pagination-progressbar-opposite", clickableClass: "swiper-pagination-clickable", lockClass: "swiper-pagination-lock" } }, create: function() { var e = this;
                j.extend(e, { pagination: { init: H.init.bind(e), render: H.render.bind(e), update: H.update.bind(e), destroy: H.destroy.bind(e), dynamicBulletIndex: 0 } }) }, on: { init: function() { this.pagination.init(), this.pagination.render(), this.pagination.update() }, activeIndexChange: function() { this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update() }, snapIndexChange: function() { this.params.loop || this.pagination.update() }, slidesLengthChange: function() { this.params.loop && (this.pagination.render(), this.pagination.update()) }, snapGridLengthChange: function() { this.params.loop || (this.pagination.render(), this.pagination.update()) }, destroy: function() { this.pagination.destroy() }, click: function(e) { var t = this;
                    t.params.pagination.el && t.params.pagination.hideOnClick && 0 < t.pagination.$el.length && !D(e.target).hasClass(t.params.pagination.bulletClass) && t.pagination.$el.toggleClass(t.params.pagination.hiddenClass) } } }, { name: "scrollbar", params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } }, create: function() { var e = this;
                j.extend(e, { scrollbar: { init: A.init.bind(e), destroy: A.destroy.bind(e), updateSize: A.updateSize.bind(e), setTranslate: A.setTranslate.bind(e), setTransition: A.setTransition.bind(e), enableDraggable: A.enableDraggable.bind(e), disableDraggable: A.disableDraggable.bind(e), setDragPosition: A.setDragPosition.bind(e), onDragStart: A.onDragStart.bind(e), onDragMove: A.onDragMove.bind(e), onDragEnd: A.onDragEnd.bind(e), isTouched: !1, timeout: null, dragTimeout: null } }) }, on: { init: function() { this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate() }, update: function() { this.scrollbar.updateSize() }, resize: function() { this.scrollbar.updateSize() }, observerUpdate: function() { this.scrollbar.updateSize() }, setTranslate: function() { this.scrollbar.setTranslate() }, setTransition: function(e) { this.scrollbar.setTransition(e) }, destroy: function() { this.scrollbar.destroy() } } }, { name: "parallax", params: { parallax: { enabled: !1 } }, create: function() { j.extend(this, { parallax: { setTransform: N.setTransform.bind(this), setTranslate: N.setTranslate.bind(this), setTransition: N.setTransition.bind(this) } }) }, on: { beforeInit: function() { this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, init: function() { this.params.parallax && this.parallax.setTranslate() }, setTranslate: function() { this.params.parallax && this.parallax.setTranslate() }, setTransition: function(e) { this.params.parallax && this.parallax.setTransition(e) } } }, { name: "zoom", params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }, create: function() { var t = this,
                    i = { enabled: !1, scale: 1, currentScale: 1, isScaling: !1, gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 }, image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 } }; "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(e) { i[e] = W[e].bind(t) }), j.extend(t, { zoom: i }) }, on: { init: function() { this.params.zoom.enabled && this.zoom.enable() }, destroy: function() { this.zoom.disable() }, touchStart: function(e) { this.zoom.enabled && this.zoom.onTouchStart(e) }, touchEnd: function(e) { this.zoom.enabled && this.zoom.onTouchEnd(e) }, doubleTap: function(e) { this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e) }, transitionEnd: function() { this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd() } } }, { name: "lazy", params: { lazy: { enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }, create: function() { j.extend(this, { lazy: { initialImageLoaded: !1, load: F.load.bind(this), loadInSlide: F.loadInSlide.bind(this) } }) }, on: { beforeInit: function() { this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1) }, init: function() { this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load() }, scroll: function() { this.params.freeMode && !this.params.freeModeSticky && this.lazy.load() }, resize: function() { this.params.lazy.enabled && this.lazy.load() }, scrollbarDragMove: function() { this.params.lazy.enabled && this.lazy.load() }, transitionStart: function() { var e = this;
                    e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load() }, transitionEnd: function() { this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load() } } }, { name: "controller", params: { controller: { control: void 0, inverse: !1, by: "slide" } }, create: function() { var e = this;
                j.extend(e, { controller: { control: e.params.controller.control, getInterpolateFunction: V.getInterpolateFunction.bind(e), setTranslate: V.setTranslate.bind(e), setTransition: V.setTransition.bind(e) } }) }, on: { update: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, resize: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, observerUpdate: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, setTranslate: function(e, t) { this.controller.control && this.controller.setTranslate(e, t) }, setTransition: function(e, t) { this.controller.control && this.controller.setTransition(e, t) } } }, { name: "a11y", params: { a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}" } }, create: function() { var t = this;
                j.extend(t, { a11y: { liveRegion: D('<span class="' + t.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }), Object.keys(G).forEach(function(e) { t.a11y[e] = G[e].bind(t) }) }, on: { init: function() { this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation()) }, toEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, fromEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, paginationUpdate: function() { this.params.a11y.enabled && this.a11y.updatePagination() }, destroy: function() { this.params.a11y.enabled && this.a11y.destroy() } } }, { name: "history", params: { history: { enabled: !1, replaceState: !1, key: "slides" } }, create: function() { var e = this;
                j.extend(e, { history: { init: q.init.bind(e), setHistory: q.setHistory.bind(e), setHistoryPopState: q.setHistoryPopState.bind(e), scrollToSlide: q.scrollToSlide.bind(e), destroy: q.destroy.bind(e) } }) }, on: { init: function() { this.params.history.enabled && this.history.init() }, destroy: function() { this.params.history.enabled && this.history.destroy() }, transitionEnd: function() { this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex) } } }, { name: "hash-navigation", params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } }, create: function() { var e = this;
                j.extend(e, { hashNavigation: { initialized: !1, init: U.init.bind(e), destroy: U.destroy.bind(e), setHash: U.setHash.bind(e), onHashCange: U.onHashCange.bind(e) } }) }, on: { init: function() { this.params.hashNavigation.enabled && this.hashNavigation.init() }, destroy: function() { this.params.hashNavigation.enabled && this.hashNavigation.destroy() }, transitionEnd: function() { this.hashNavigation.initialized && this.hashNavigation.setHash() } } }, { name: "autoplay", params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } }, create: function() { var t = this;
                j.extend(t, { autoplay: { running: !1, paused: !1, run: Q.run.bind(t), start: Q.start.bind(t), stop: Q.stop.bind(t), pause: Q.pause.bind(t), onTransitionEnd: function(e) { t && !t.destroyed && t.$wrapperEl && e.target === this && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop()) } } }) }, on: { init: function() { this.params.autoplay.enabled && this.autoplay.start() }, beforeTransitionStart: function(e, t) { this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop()) }, sliderFirstMove: function() { this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause()) }, destroy: function() { this.autoplay.running && this.autoplay.stop() } } }, { name: "effect-fade", params: { fadeEffect: { crossFade: !1 } }, create: function() { j.extend(this, { fadeEffect: { setTranslate: Z.setTranslate.bind(this), setTransition: Z.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("fade" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "fade"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        j.extend(e.params, t), j.extend(e.originalParams, t) } }, setTranslate: function() { "fade" === this.params.effect && this.fadeEffect.setTranslate() }, setTransition: function(e) { "fade" === this.params.effect && this.fadeEffect.setTransition(e) } } }, { name: "effect-cube", params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } }, create: function() { j.extend(this, { cubeEffect: { setTranslate: K.setTranslate.bind(this), setTransition: K.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("cube" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 };
                        j.extend(e.params, t), j.extend(e.originalParams, t) } }, setTranslate: function() { "cube" === this.params.effect && this.cubeEffect.setTranslate() }, setTransition: function(e) { "cube" === this.params.effect && this.cubeEffect.setTransition(e) } } }, { name: "effect-flip", params: { flipEffect: { slideShadows: !0, limitRotation: !0 } }, create: function() { j.extend(this, { flipEffect: { setTranslate: J.setTranslate.bind(this), setTransition: J.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; if ("flip" === e.params.effect) { e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d"); var t = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        j.extend(e.params, t), j.extend(e.originalParams, t) } }, setTranslate: function() { "flip" === this.params.effect && this.flipEffect.setTranslate() }, setTransition: function(e) { "flip" === this.params.effect && this.flipEffect.setTransition(e) } } }, { name: "effect-coverflow", params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } }, create: function() { j.extend(this, { coverflowEffect: { setTranslate: ee.setTranslate.bind(this), setTransition: ee.setTransition.bind(this) } }) }, on: { beforeInit: function() { var e = this; "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0) }, setTranslate: function() { "coverflow" === this.params.effect && this.coverflowEffect.setTranslate() }, setTransition: function(e) { "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e) } } }, { name: "thumbs", params: { thumbs: { swiper: null, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-container-thumbs" } }, create: function() { j.extend(this, { thumbs: { swiper: null, init: te.init.bind(this), update: te.update.bind(this), onThumbClick: te.onThumbClick.bind(this) } }) }, on: { beforeInit: function() { var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0)) }, slideChange: function() { this.thumbs.swiper && this.thumbs.update() }, update: function() { this.thumbs.swiper && this.thumbs.update() }, resize: function() { this.thumbs.swiper && this.thumbs.update() }, observerUpdate: function() { this.thumbs.swiper && this.thumbs.update() }, setTransition: function(e) { var t = this.thumbs.swiper;
                    t && t.setTransition(e) }, beforeDestroy: function() { var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy() } } }]; return void 0 === E.use && (E.use = E.Class.use, E.installModule = E.Class.installModule), E.use(ie), E }),
function(e, t) { "function" == typeof define && define.amd ? define(function() { return t(e) }) : t(e) }(this, function(oH) { var dS, pH = function() { var l, r, d, s, o, i, n = [],
            a = n.concat,
            h = n.filter,
            c = n.slice,
            p = oH.document,
            u = {},
            t = {},
            f = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 },
            m = /^\s*<(\w+|!)[^>]*>/,
            v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            g = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            y = /^(?:body|html)$/i,
            b = /([A-Z])/g,
            w = ["val", "css", "html", "text", "data", "width", "height", "offset"],
            e = p.createElement("table"),
            x = p.createElement("tr"),
            T = { tr: p.createElement("tbody"), tbody: e, thead: e, tfoot: e, td: x, th: x, "*": p.createElement("div") },
            E = /complete|loaded|interactive/,
            S = /^[\w-]*$/,
            C = {},
            M = C.toString,
            P = {},
            k = p.createElement("div"),
            z = { tabindex: "tabIndex", readonly: "readOnly", for: "htmlFor", class: "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" },
            R = Array.isArray || function(e) { return e instanceof Array };

        function D(e) { return null == e ? String(e) : C[M.call(e)] || "object" }

        function L(e) { return "function" == D(e) }

        function O(e) { return null != e && e == e.window }

        function $(e) { return null != e && e.nodeType == e.DOCUMENT_NODE }

        function I(e) { return "object" == D(e) }

        function X(e) { return I(e) && !O(e) && Object.getPrototypeOf(e) == Object.prototype }

        function Y(e) { var t = !!e && "length" in e && e.length,
                i = d.type(e); return "function" != i && !O(e) && ("array" == i || 0 === t || "number" == typeof t && 0 < t && t - 1 in e) }

        function H(e) { return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() }

        function A(e) { return e in t ? t[e] : t[e] = new RegExp("(^|\\s)" + e + "(\\s|$)") }

        function N(e, t) { return "number" != typeof t || f[H(e)] ? t : t + "px" }

        function _(e) { return "children" in e ? c.call(e.children) : d.map(e.childNodes, function(e) { if (1 == e.nodeType) return e }) }

        function j(e, t) { var i, s = e ? e.length : 0; for (i = 0; i < s; i++) this[i] = e[i];
            this.length = s, this.selector = t || "" }

        function B(e, t) { return null == t ? d(e) : d(e).filter(t) }

        function W(e, t, i, s) { return L(t) ? t.call(e, i, s) : t }

        function F(e, t, i) { null == i ? e.removeAttribute(t) : e.setAttribute(t, i) }

        function V(e, t) { var i = e.className || "",
                s = i && i.baseVal !== l; if (t === l) return s ? i.baseVal : i;
            s ? i.baseVal = t : e.className = t }

        function G(t) { try { return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? d.parseJSON(t) : t) : t } catch (e) { return t } } return P.matches = function(e, t) { if (!t || !e || 1 !== e.nodeType) return !1; var i = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector; if (i) return i.call(e, t); var s, n = e.parentNode,
                a = !n; return a && (n = k).appendChild(e), s = ~P.qsa(n, t).indexOf(e), a && k.removeChild(e), s }, o = function(e) { return e.replace(/-+(.)?/g, function(e, t) { return t ? t.toUpperCase() : "" }) }, i = function(i) { return h.call(i, function(e, t) { return i.indexOf(e) == t }) }, P.fragment = function(e, t, i) { var s, n, a; return v.test(e) && (s = d(p.createElement(RegExp.$1))), s || (e.replace && (e = e.replace(g, "<$1></$2>")), t === l && (t = m.test(e) && RegExp.$1), t in T || (t = "*"), (a = T[t]).innerHTML = "" + e, s = d.each(c.call(a.childNodes), function() { a.removeChild(this) })), X(i) && (n = d(s), d.each(i, function(e, t) {-1 < w.indexOf(e) ? n[e](t) : n.attr(e, t) })), s }, P.Z = function(e, t) { return new j(e, t) }, P.isZ = function(e) { return e instanceof P.Z }, P.init = function(e, t) { var i, s; if (!e) return P.Z(); if ("string" == typeof e)
                if ("<" == (e = e.trim())[0] && m.test(e)) i = P.fragment(e, RegExp.$1, t), e = null;
                else { if (t !== l) return d(t).find(e);
                    i = P.qsa(p, e) }
            else { if (L(e)) return d(p).ready(e); if (P.isZ(e)) return e; if (R(e)) s = e, i = h.call(s, function(e) { return null != e });
                else if (I(e)) i = [e], e = null;
                else if (m.test(e)) i = P.fragment(e.trim(), RegExp.$1, t), e = null;
                else { if (t !== l) return d(t).find(e);
                    i = P.qsa(p, e) } } return P.Z(i, e) }, (d = function(e, t) { return P.init(e, t) }).extend = function(t) { var i, e = c.call(arguments, 1); return "boolean" == typeof t && (i = t, t = e.shift()), e.forEach(function(e) {! function e(t, i, s) { for (r in i) s && (X(i[r]) || R(i[r])) ? (X(i[r]) && !X(t[r]) && (t[r] = {}), R(i[r]) && !R(t[r]) && (t[r] = []), e(t[r], i[r], s)) : i[r] !== l && (t[r] = i[r]) }(t, e, i) }), t }, P.qsa = function(e, t) { var i, s = "#" == t[0],
                n = !s && "." == t[0],
                a = s || n ? t.slice(1) : t,
                r = S.test(a); return e.getElementById && r && s ? (i = e.getElementById(a)) ? [i] : [] : 1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType ? [] : c.call(r && !s && e.getElementsByClassName ? n ? e.getElementsByClassName(a) : e.getElementsByTagName(t) : e.querySelectorAll(t)) }, d.contains = p.documentElement.contains ? function(e, t) { return e !== t && e.contains(t) } : function(e, t) { for (; t && (t = t.parentNode);)
                if (t === e) return !0;
            return !1 }, d.type = D, d.isFunction = L, d.isWindow = O, d.isArray = R, d.isPlainObject = X, d.isEmptyObject = function(e) { var t; for (t in e) return !1; return !0 }, d.isNumeric = function(e) { var t = Number(e),
                i = typeof e; return null != e && "boolean" != i && ("string" != i || e.length) && !isNaN(t) && isFinite(t) || !1 }, d.inArray = function(e, t, i) { return n.indexOf.call(t, e, i) }, d.camelCase = o, d.trim = function(e) { return null == e ? "" : String.prototype.trim.call(e) }, d.uuid = 0, d.support = {}, d.expr = {}, d.noop = function() {}, d.map = function(e, t) { var i, s, n, a, r = []; if (Y(e))
                for (s = 0; s < e.length; s++) null != (i = t(e[s], s)) && r.push(i);
            else
                for (n in e) null != (i = t(e[n], n)) && r.push(i); return 0 < (a = r).length ? d.fn.concat.apply([], a) : a }, d.each = function(e, t) { var i, s; if (Y(e)) { for (i = 0; i < e.length; i++)
                    if (!1 === t.call(e[i], i, e[i])) return e } else
                for (s in e)
                    if (!1 === t.call(e[s], s, e[s])) return e; return e }, d.grep = function(e, t) { return h.call(e, t) }, oH.JSON && (d.parseJSON = JSON.parse), d.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) { C["[object " + t + "]"] = t.toLowerCase() }), d.fn = { constructor: P.Z, length: 0, forEach: n.forEach, reduce: n.reduce, push: n.push, sort: n.sort, splice: n.splice, indexOf: n.indexOf, concat: function() { var e, t, i = []; for (e = 0; e < arguments.length; e++) t = arguments[e], i[e] = P.isZ(t) ? t.toArray() : t; return a.apply(P.isZ(this) ? this.toArray() : this, i) }, map: function(i) { return d(d.map(this, function(e, t) { return i.call(e, t, e) })) }, slice: function() { return d(c.apply(this, arguments)) }, ready: function(e) { return E.test(p.readyState) && p.body ? e(d) : p.addEventListener("DOMContentLoaded", function() { e(d) }, !1), this }, get: function(e) { return e === l ? c.call(this) : this[0 <= e ? e : e + this.length] }, toArray: function() { return this.get() }, size: function() { return this.length }, remove: function() { return this.each(function() { null != this.parentNode && this.parentNode.removeChild(this) }) }, each: function(i) { return n.every.call(this, function(e, t) { return !1 !== i.call(e, t, e) }), this }, filter: function(t) { return L(t) ? this.not(this.not(t)) : d(h.call(this, function(e) { return P.matches(e, t) })) }, add: function(e, t) { return d(i(this.concat(d(e, t)))) }, is: function(e) { return 0 < this.length && P.matches(this[0], e) }, not: function(t) { var i = []; if (L(t) && t.call !== l) this.each(function(e) { t.call(this, e) || i.push(this) });
                else { var s = "string" == typeof t ? this.filter(t) : Y(t) && L(t.item) ? c.call(t) : d(t);
                    this.forEach(function(e) { s.indexOf(e) < 0 && i.push(e) }) } return d(i) }, has: function(e) { return this.filter(function() { return I(e) ? d.contains(this, e) : d(this).find(e).size() }) }, eq: function(e) { return -1 === e ? this.slice(e) : this.slice(e, +e + 1) }, first: function() { var e = this[0]; return e && !I(e) ? e : d(e) }, last: function() { var e = this[this.length - 1]; return e && !I(e) ? e : d(e) }, find: function(e) { var i = this; return e ? "object" == typeof e ? d(e).filter(function() { var t = this; return n.some.call(i, function(e) { return d.contains(e, t) }) }) : 1 == this.length ? d(P.qsa(this[0], e)) : this.map(function() { return P.qsa(this, e) }) : d() }, closest: function(i, s) { var n = [],
                    a = "object" == typeof i && d(i); return this.each(function(e, t) { for (; t && !(a ? 0 <= a.indexOf(t) : P.matches(t, i));) t = t !== s && !$(t) && t.parentNode;
                    t && n.indexOf(t) < 0 && n.push(t) }), d(n) }, parents: function(e) { for (var t = [], i = this; 0 < i.length;) i = d.map(i, function(e) { if ((e = e.parentNode) && !$(e) && t.indexOf(e) < 0) return t.push(e), e }); return B(t, e) }, parent: function(e) { return B(i(this.pluck("parentNode")), e) }, children: function(e) { return B(this.map(function() { return _(this) }), e) }, contents: function() { return this.map(function() { return this.contentDocument || c.call(this.childNodes) }) }, siblings: function(e) { return B(this.map(function(e, t) { return h.call(_(t.parentNode), function(e) { return e !== t }) }), e) }, empty: function() { return this.each(function() { this.innerHTML = "" }) }, pluck: function(t) { return d.map(this, function(e) { return e[t] }) }, show: function() { return this.each(function() { var e, t, i; "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = (e = this.nodeName, u[e] || (t = p.createElement(e), p.body.appendChild(t), i = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == i && (i = "block"), u[e] = i), u[e])) }) }, replaceWith: function(e) { return this.before(e).remove() }, wrap: function(t) { var i = L(t); if (this[0] && !i) var s = d(t).get(0),
                    n = s.parentNode || 1 < this.length; return this.each(function(e) { d(this).wrapAll(i ? t.call(this, e) : n ? s.cloneNode(!0) : s) }) }, wrapAll: function(e) { if (this[0]) { var t; for (d(this[0]).before(e = d(e));
                        (t = e.children()).length;) e = t.first();
                    d(e).append(this) } return this }, wrapInner: function(n) { var a = L(n); return this.each(function(e) { var t = d(this),
                        i = t.contents(),
                        s = a ? n.call(this, e) : n;
                    i.length ? i.wrapAll(s) : t.append(s) }) }, unwrap: function() { return this.parent().each(function() { d(this).replaceWith(d(this).children()) }), this }, clone: function() { return this.map(function() { return this.cloneNode(!0) }) }, hide: function() { return this.css("display", "none") }, toggle: function(t) { return this.each(function() { var e = d(this);
                    (t === l ? "none" == e.css("display") : t) ? e.show(): e.hide() }) }, prev: function(e) { return d(this.pluck("previousElementSibling")).filter(e || "*") }, next: function(e) { return d(this.pluck("nextElementSibling")).filter(e || "*") }, html: function(i) { return 0 in arguments ? this.each(function(e) { var t = this.innerHTML;
                    d(this).empty().append(W(this, i, e, t)) }) : 0 in this ? this[0].innerHTML : null }, text: function(i) { return 0 in arguments ? this.each(function(e) { var t = W(this, i, e, this.textContent);
                    this.textContent = null == t ? "" : "" + t }) : 0 in this ? this.pluck("textContent").join("") : null }, attr: function(t, i) { var e; return "string" != typeof t || 1 in arguments ? this.each(function(e) { if (1 === this.nodeType)
                        if (I(t))
                            for (r in t) F(this, r, t[r]);
                        else F(this, t, W(this, i, e, this.getAttribute(t))) }) : 0 in this && 1 == this[0].nodeType && null != (e = this[0].getAttribute(t)) ? e : l }, removeAttr: function(e) { return this.each(function() { 1 === this.nodeType && e.split(" ").forEach(function(e) { F(this, e) }, this) }) }, prop: function(t, i) { return t = z[t] || t, 1 in arguments ? this.each(function(e) { this[t] = W(this, i, e, this[t]) }) : this[0] && this[0][t] }, removeProp: function(e) { return e = z[e] || e, this.each(function() { delete this[e] }) }, data: function(e, t) { var i = "data-" + e.replace(b, "-$1").toLowerCase(),
                    s = 1 in arguments ? this.attr(i, t) : this.attr(i); return null !== s ? G(s) : l }, val: function(t) { return 0 in arguments ? (null == t && (t = ""), this.each(function(e) { this.value = W(this, t, e, this.value) })) : this[0] && (this[0].multiple ? d(this[0]).find("option").filter(function() { return this.selected }).pluck("value") : this[0].value) }, offset: function(a) { if (a) return this.each(function(e) { var t = d(this),
                        i = W(this, a, e, t.offset()),
                        s = t.offsetParent().offset(),
                        n = { top: i.top - s.top, left: i.left - s.left }; "static" == t.css("position") && (n.position = "relative"), t.css(n) }); if (!this.length) return null; if (p.documentElement !== this[0] && !d.contains(p.documentElement, this[0])) return { top: 0, left: 0 }; var e = this[0].getBoundingClientRect(); return { left: e.left + oH.pageXOffset, top: e.top + oH.pageYOffset, width: Math.round(e.width), height: Math.round(e.height) } }, css: function(e, t) { if (arguments.length < 2) { var i = this[0]; if ("string" == typeof e) { if (!i) return; return i.style[o(e)] || getComputedStyle(i, "").getPropertyValue(e) } if (R(e)) { if (!i) return; var s = {},
                            n = getComputedStyle(i, ""); return d.each(e, function(e, t) { s[t] = i.style[o(t)] || n.getPropertyValue(t) }), s } } var a = ""; if ("string" == D(e)) t || 0 === t ? a = H(e) + ":" + N(e, t) : this.each(function() { this.style.removeProperty(H(e)) });
                else
                    for (r in e) e[r] || 0 === e[r] ? a += H(r) + ":" + N(r, e[r]) + ";" : this.each(function() { this.style.removeProperty(H(r)) }); return this.each(function() { this.style.cssText += ";" + a }) }, index: function(e) { return e ? this.indexOf(d(e)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function(e) { return !!e && n.some.call(this, function(e) { return this.test(V(e)) }, A(e)) }, addClass: function(i) { return i ? this.each(function(e) { if ("className" in this) { s = []; var t = V(this);
                        W(this, i, e, t).split(/\s+/g).forEach(function(e) { d(this).hasClass(e) || s.push(e) }, this), s.length && V(this, t + (t ? " " : "") + s.join(" ")) } }) : this }, removeClass: function(t) { return this.each(function(e) { if ("className" in this) { if (t === l) return V(this, "");
                        s = V(this), W(this, t, e, s).split(/\s+/g).forEach(function(e) { s = s.replace(A(e), " ") }), V(this, s.trim()) } }) }, toggleClass: function(i, s) { return i ? this.each(function(e) { var t = d(this);
                    W(this, i, e, V(this)).split(/\s+/g).forEach(function(e) {
                        (s === l ? !t.hasClass(e) : s) ? t.addClass(e): t.removeClass(e) }) }) : this }, scrollTop: function(e) { if (this.length) { var t = "scrollTop" in this[0]; return e === l ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ? function() { this.scrollTop = e } : function() { this.scrollTo(this.scrollX, e) }) } }, scrollLeft: function(e) { if (this.length) { var t = "scrollLeft" in this[0]; return e === l ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ? function() { this.scrollLeft = e } : function() { this.scrollTo(e, this.scrollY) }) } }, position: function() { if (this.length) { var e = this[0],
                        t = this.offsetParent(),
                        i = this.offset(),
                        s = y.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset(); return i.top -= parseFloat(d(e).css("margin-top")) || 0, i.left -= parseFloat(d(e).css("margin-left")) || 0, s.top += parseFloat(d(t[0]).css("border-top-width")) || 0, s.left += parseFloat(d(t[0]).css("border-left-width")) || 0, { top: i.top - s.top, left: i.left - s.left } } }, offsetParent: function() { return this.map(function() { for (var e = this.offsetParent || p.body; e && !y.test(e.nodeName) && "static" == d(e).css("position");) e = e.offsetParent; return e }) } }, d.fn.detach = d.fn.remove, ["width", "height"].forEach(function(s) { var n = s.replace(/./, function(e) { return e[0].toUpperCase() });
            d.fn[s] = function(t) { var e, i = this[0]; return t === l ? O(i) ? i["inner" + n] : $(i) ? i.documentElement["scroll" + n] : (e = this.offset()) && e[s] : this.each(function(e) {
                    (i = d(this)).css(s, W(this, t, e, i[s]())) }) } }), ["after", "prepend", "before", "append"].forEach(function(t, r) { var o = r % 2;
            d.fn[t] = function() { var i, s, n = d.map(arguments, function(e) { var t = []; return "array" == (i = D(e)) ? (e.forEach(function(e) { return e.nodeType !== l ? t.push(e) : d.zepto.isZ(e) ? t = t.concat(e.get()) : void(t = t.concat(P.fragment(e))) }), t) : "object" == i || null == e ? e : P.fragment(e) }),
                    a = 1 < this.length; return n.length < 1 ? this : this.each(function(e, t) { s = o ? t : t.parentNode, t = 0 == r ? t.nextSibling : 1 == r ? t.firstChild : 2 == r ? t : null; var i = d.contains(p.documentElement, s);
                    n.forEach(function(e) { if (a) e = e.cloneNode(!0);
                        else if (!s) return d(e).remove();
                        s.insertBefore(e, t), i && function e(t, i) { i(t); for (var s = 0, n = t.childNodes.length; s < n; s++) e(t.childNodes[s], i) }(e, function(e) { if (!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) { var t = e.ownerDocument ? e.ownerDocument.defaultView : oH;
                                t.eval.call(t, e.innerHTML) } }) }) }) }, d.fn[o ? t + "To" : "insert" + (r ? "Before" : "After")] = function(e) { return d(e)[t](this), this } }), P.Z.prototype = j.prototype = d.fn, P.uniq = i, P.deserializeValue = G, d.zepto = P, d }(); return oH.Zepto = pH, void 0 === oH.$ && (oH.$ = pH),
        function(h) { var c, t = 1,
                d = Array.prototype.slice,
                p = h.isFunction,
                u = function(e) { return "string" == typeof e },
                f = {},
                a = {},
                i = "onfocusin" in oH,
                s = { focus: "focusin", blur: "focusout" },
                m = { mouseenter: "mouseover", mouseleave: "mouseout" };

            function v(e) { return e._zid || (e._zid = t++) }

            function r(e, t, i, s) { if ((t = g(t)).ns) var n = (a = t.ns, new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)")); var a; return (f[v(e)] || []).filter(function(e) { return e && (!t.e || e.e == t.e) && (!t.ns || n.test(e.ns)) && (!i || v(e.fn) === v(i)) && (!s || e.sel == s) }) }

            function g(e) { var t = ("" + e).split("."); return { e: t[0], ns: t.slice(1).sort().join(" ") } }

            function y(e, t) { return e.del && !i && e.e in s || !!t }

            function b(e) { return m[e] || i && s[e] || e }

            function w(n, e, t, a, r, o, l) { var i = v(n),
                    d = f[i] || (f[i] = []);
                e.split(/\s/).forEach(function(e) { if ("ready" == e) return h(document).ready(t); var i = g(e);
                    i.fn = t, i.sel = r, i.e in m && (t = function(e) { var t = e.relatedTarget; if (!t || t !== this && !h.contains(this, t)) return i.fn.apply(this, arguments) }); var s = (i.del = o) || t;
                    i.proxy = function(e) { if (!(e = E(e)).isImmediatePropagationStopped()) { e.data = a; var t = s.apply(n, e._args == c ? [e] : [e].concat(e._args)); return !1 === t && (e.preventDefault(), e.stopPropagation()), t } }, i.i = d.length, d.push(i), "addEventListener" in n && n.addEventListener(b(i.e), i.proxy, y(i, l)) }) }

            function x(t, e, i, s, n) { var a = v(t);
                (e || "").split(/\s/).forEach(function(e) { r(t, e, i, s).forEach(function(e) { delete f[a][e.i], "removeEventListener" in t && t.removeEventListener(b(e.e), e.proxy, y(e, n)) }) }) }
            a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents", h.event = { add: w, remove: x }, h.proxy = function(e, t) { var i = 2 in arguments && d.call(arguments, 2); if (p(e)) { var s = function() { return e.apply(t, i ? i.concat(d.call(arguments)) : arguments) }; return s._zid = v(e), s } if (u(t)) return i ? (i.unshift(e[t], e), h.proxy.apply(null, i)) : h.proxy(e[t], e); throw new TypeError("expected function") }, h.fn.bind = function(e, t, i) { return this.on(e, t, i) }, h.fn.unbind = function(e, t) { return this.off(e, t) }, h.fn.one = function(e, t, i, s) { return this.on(e, t, i, s, 1) }; var o = function() { return !0 },
                T = function() { return !1 },
                n = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
                e = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" };

            function E(s, n) { return !n && s.isDefaultPrevented || (n || (n = s), h.each(e, function(e, t) { var i = n[e];
                    s[e] = function() { return this[t] = o, i && i.apply(n, arguments) }, s[t] = T }), s.timeStamp || (s.timeStamp = Date.now()), (n.defaultPrevented !== c ? n.defaultPrevented : "returnValue" in n ? !1 === n.returnValue : n.getPreventDefault && n.getPreventDefault()) && (s.isDefaultPrevented = o)), s }

            function S(e) { var t, i = { originalEvent: e }; for (t in e) n.test(t) || e[t] === c || (i[t] = e[t]); return E(i, e) }
            h.fn.delegate = function(e, t, i) { return this.on(t, e, i) }, h.fn.undelegate = function(e, t, i) { return this.off(t, e, i) }, h.fn.live = function(e, t) { return h(document.body).delegate(this.selector, e, t), this }, h.fn.die = function(e, t) { return h(document.body).undelegate(this.selector, e, t), this }, h.fn.on = function(t, n, i, a, r) { var o, l, s = this; return t && !u(t) ? (h.each(t, function(e, t) { s.on(e, n, i, t, r) }), s) : (u(n) || p(a) || !1 === a || (a = i, i = n, n = c), a !== c && !1 !== i || (a = i, i = c), !1 === a && (a = T), s.each(function(e, s) { r && (o = function(e) { return x(s, e.type, a), a.apply(this, arguments) }), n && (l = function(e) { var t, i = h(e.target).closest(n, s).get(0); if (i && i !== s) return t = h.extend(S(e), { currentTarget: i, liveFired: s }), (o || a).apply(i, [t].concat(d.call(arguments, 1))) }), w(s, t, a, i, n, l || o) })) }, h.fn.off = function(e, i, t) { var s = this; return e && !u(e) ? (h.each(e, function(e, t) { s.off(e, i, t) }), s) : (u(i) || p(t) || !1 === t || (t = i, i = c), !1 === t && (t = T), s.each(function() { x(this, e, t, i) })) }, h.fn.trigger = function(e, t) { return (e = u(e) || h.isPlainObject(e) ? h.Event(e) : E(e))._args = t, this.each(function() { e.type in s && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : h(this).triggerHandler(e, t) }) }, h.fn.triggerHandler = function(i, s) { var n, a; return this.each(function(e, t) {
                    (n = S(u(i) ? h.Event(i) : i))._args = s, n.target = t, h.each(r(t, i.type || i), function(e, t) { if (a = t.proxy(n), n.isImmediatePropagationStopped()) return !1 }) }), a }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) { h.fn[t] = function(e) { return 0 in arguments ? this.bind(t, e) : this.trigger(t) } }), h.Event = function(e, t) { u(e) || (e = (t = e).type); var i = document.createEvent(a[e] || "Events"),
                    s = !0; if (t)
                    for (var n in t) "bubbles" == n ? s = !!t[n] : i[n] = t[n]; return i.initEvent(e, s, !0), E(i) } }(pH),
        function(MP) { var PP, QP, NP = +new Date,
                OP = oH.document,
                RP = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                SP = /^(?:text|application)\/javascript/i,
                TP = /^(?:text|application)\/xml/i,
                UP = "application/json",
                VP = "text/html",
                WP = /^\s*$/,
                XP = OP.createElement("a");

            function ZP(e, t, i, s) { if (e.global) return n = t || OP, a = i, r = s, o = MP.Event(a), MP(n).trigger(o, r), !o.isDefaultPrevented(); var n, a, r, o }

            function aQ(e, t) { var i = t.context; if (!1 === t.beforeSend.call(i, e, t) || !1 === ZP(t, i, "ajaxBeforeSend", [e, t])) return !1;
                ZP(t, i, "ajaxSend", [e, t]) }

            function bQ(e, t, i, s) { var n = i.context,
                    a = "success";
                i.success.call(n, e, a, t), s && s.resolveWith(n, [e, a, t]), ZP(i, n, "ajaxSuccess", [t, i, e]), dQ(a, t, i) }

            function cQ(e, t, i, s, n) { var a = s.context;
                s.error.call(a, i, t, e), n && n.rejectWith(a, [i, t, e]), ZP(s, a, "ajaxError", [i, s, e || t]), dQ(t, i, s) }

            function dQ(e, t, i) { var s, n = i.context;
                i.complete.call(n, t, e), ZP(i, n, "ajaxComplete", [t, i]), (s = i).global && !--MP.active && ZP(s, null, "ajaxStop") }

            function fQ() {}

            function hQ(e, t) { return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?") }

            function jQ(e, t, i, s) { return MP.isFunction(t) && (s = i, i = t, t = void 0), MP.isFunction(i) || (s = i, i = void 0), { url: e, data: t, success: i, dataType: s } }
            XP.href = oH.location.href, MP.active = 0, MP.ajaxJSONP = function(i, s) { if (!("type" in i)) return MP.ajax(i); var n, a, e = i.jsonpCallback,
                    r = (MP.isFunction(e) ? e() : e) || "Zepto" + NP++,
                    o = OP.createElement("script"),
                    l = oH[r],
                    t = function(e) { MP(o).triggerHandler("error", e || "abort") },
                    d = { abort: t }; return s && s.promise(d), MP(o).on("load error", function(e, t) { clearTimeout(a), MP(o).off().remove(), "error" != e.type && n ? bQ(n[0], d, i, s) : cQ(null, t || "error", d, i, s), oH[r] = l, n && MP.isFunction(l) && l(n[0]), l = n = void 0 }), !1 === aQ(d, i) ? t("abort") : (oH[r] = function() { n = arguments }, o.src = i.url.replace(/\?(.+)=\?/, "?$1=" + r), OP.head.appendChild(o), 0 < i.timeout && (a = setTimeout(function() { t("timeout") }, i.timeout))), d }, MP.ajaxSettings = { type: "GET", beforeSend: fQ, success: fQ, error: fQ, complete: fQ, context: null, global: !0, xhr: function() { return new oH.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript, application/x-javascript", json: UP, xml: "application/xml, text/xml", html: VP, text: "text/plain" }, crossDomain: !1, timeout: 0, processData: !0, cache: !0, dataFilter: fQ }, MP.ajax = function(iR) { var lR, mR, uQ, hR, jR = MP.extend({}, iR || {}),
                    kR = MP.Deferred && MP.Deferred(); for (PP in MP.ajaxSettings) void 0 === jR[PP] && (jR[PP] = MP.ajaxSettings[PP]);
                (uQ = jR).global && 0 == MP.active++ && ZP(uQ, null, "ajaxStart"), jR.crossDomain || ((lR = OP.createElement("a")).href = jR.url, lR.href = lR.href, jR.crossDomain = XP.protocol + "//" + XP.host != lR.protocol + "//" + lR.host), jR.url || (jR.url = oH.location.toString()), -1 < (mR = jR.url.indexOf("#")) && (jR.url = jR.url.slice(0, mR)), (hR = jR).processData && hR.data && "string" != MP.type(hR.data) && (hR.data = MP.param(hR.data, hR.traditional)), !hR.data || hR.type && "GET" != hR.type.toUpperCase() && "jsonp" != hR.dataType || (hR.url = hQ(hR.url, hR.data), hR.data = void 0); var nR = jR.dataType,
                    oR = /\?.+=\?/.test(jR.url); if (oR && (nR = "jsonp"), !1 !== jR.cache && (iR && !0 === iR.cache || "script" != nR && "jsonp" != nR) || (jR.url = hQ(jR.url, "_=" + Date.now())), "jsonp" == nR) return oR || (jR.url = hQ(jR.url, jR.jsonp ? jR.jsonp + "=?" : !1 === jR.jsonp ? "" : "callback=?")), MP.ajaxJSONP(jR, kR); var vR, pR = jR.accepts[nR],
                    qR = {},
                    rR = function(e, t) { qR[e.toLowerCase()] = [e, t] },
                    sR = /^([\w-]+:)\/\//.test(jR.url) ? RegExp.$1 : oH.location.protocol,
                    tR = jR.xhr(),
                    uR = tR.setRequestHeader; if (kR && kR.promise(tR), jR.crossDomain || rR("X-Requested-With", "XMLHttpRequest"), rR("Accept", pR || "*/*"), (pR = jR.mimeType || pR) && (-1 < pR.indexOf(",") && (pR = pR.split(",", 2)[0]), tR.overrideMimeType && tR.overrideMimeType(pR)), (jR.contentType || !1 !== jR.contentType && jR.data && "GET" != jR.type.toUpperCase()) && rR("Content-Type", jR.contentType || "application/x-www-form-urlencoded"), jR.headers)
                    for (QP in jR.headers) rR(QP, jR.headers[QP]); if (tR.setRequestHeader = rR, !(tR.onreadystatechange = function() { if (4 == tR.readyState) { tR.onreadystatechange = fQ, clearTimeout(vR); var zR, AR = !1; if (200 <= tR.status && tR.status < 300 || 304 == tR.status || 0 == tR.status && "file:" == sR) { if (nR = nR || ((eR = jR.mimeType || tR.getResponseHeader("content-type")) && (eR = eR.split(";", 2)[0]), eR && (eR == VP ? "html" : eR == UP ? "json" : SP.test(eR) ? "script" : TP.test(eR) && "xml") || "text"), "arraybuffer" == tR.responseType || "blob" == tR.responseType) zR = tR.response;
                                else { zR = tR.responseText; try { zR = function(e, t, i) { if (i.dataFilter == fQ) return e; var s = i.context; return i.dataFilter.call(s, e, t) }(zR, nR, jR), "script" == nR ? eval(zR) : "xml" == nR ? zR = tR.responseXML : "json" == nR && (zR = WP.test(zR) ? null : MP.parseJSON(zR)) } catch (e) { AR = e } if (AR) return cQ(AR, "parsererror", tR, jR, kR) }
                                bQ(zR, tR, jR, kR) } else cQ(tR.statusText || null, tR.status ? "error" : "abort", tR, jR, kR) } var eR }) === aQ(tR, jR)) return tR.abort(), cQ(null, "abort", tR, jR, kR), tR; var wR = !("async" in jR) || jR.async; if (tR.open(jR.type, jR.url, wR, jR.username, jR.password), jR.xhrFields)
                    for (QP in jR.xhrFields) tR[QP] = jR.xhrFields[QP]; for (QP in qR) uR.apply(tR, qR[QP]); return 0 < jR.timeout && (vR = setTimeout(function() { tR.onreadystatechange = fQ, tR.abort(), cQ(null, "timeout", tR, jR, kR) }, jR.timeout)), tR.send(jR.data ? jR.data : null), tR }, MP.get = function() { return MP.ajax(jQ.apply(null, arguments)) }, MP.post = function() { var e = jQ.apply(null, arguments); return e.type = "POST", MP.ajax(e) }, MP.getJSON = function() { var e = jQ.apply(null, arguments); return e.dataType = "json", MP.ajax(e) }, MP.fn.load = function(e, t, i) { if (!this.length) return this; var s, n = this,
                    a = e.split(/\s/),
                    r = jQ(e, t, i),
                    o = r.success; return 1 < a.length && (r.url = a[0], s = a[1]), r.success = function(e) { n.html(s ? MP("<div>").html(e.replace(RP, "")).find(s) : e), o && o.apply(n, arguments) }, MP.ajax(r), this }; var kQ = encodeURIComponent;
            MP.param = function(e, t) { var i = []; return i.add = function(e, t) { MP.isFunction(t) && (t = t()), null == t && (t = ""), this.push(kQ(e) + "=" + kQ(t)) },
                    function i(s, e, n, a) { var r, o = MP.isArray(e),
                            l = MP.isPlainObject(e);
                        MP.each(e, function(e, t) { r = MP.type(t), a && (e = n ? a : a + "[" + (l || "object" == r || "array" == r ? e : "") + "]"), !a && o ? s.add(t.name, t.value) : "array" == r || !n && "object" == r ? i(s, t, n, e) : s.add(e, t) }) }(i, e, t), i.join("&").replace(/%20/g, "+") } }(pH), (dS = pH).fn.serializeArray = function() { var i, s, t = [],
                n = function(e) { if (e.forEach) return e.forEach(n);
                    t.push({ name: i, value: e }) }; return this[0] && dS.each(this[0].elements, function(e, t) { s = t.type, (i = t.name) && "fieldset" != t.nodeName.toLowerCase() && !t.disabled && "submit" != s && "reset" != s && "button" != s && "file" != s && ("radio" != s && "checkbox" != s || t.checked) && n(dS(t).val()) }), t }, dS.fn.serialize = function() { var t = []; return this.serializeArray().forEach(function(e) { t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)) }), t.join("&") }, dS.fn.submit = function(e) { if (0 in arguments) this.bind("submit", e);
            else if (this.length) { var t = dS.Event("submit");
                this.eq(0).trigger(t), t.isDefaultPrevented() || this.get(0).submit() } return this },
        function() { try { getComputedStyle(void 0) } catch (e) { var i = getComputedStyle;
                oH.getComputedStyle = function(e, t) { try { return i(e, t) } catch (e) { return null } } } }(), pH }),
function(o) { var l, d, h, c, p, u, f, m, v, g = {},
        y = !1;

    function b() { c = null, g.last && (g.el.trigger("longTap"), g = {}) }

    function w() { c && clearTimeout(c), c = null }

    function x() { l && clearTimeout(l), d && clearTimeout(d), h && clearTimeout(h), c && clearTimeout(c), l = d = h = c = null, g = {} }

    function T(e) { return ("touch" == e.pointerType || e.pointerType == e.MSPOINTER_TYPE_TOUCH) && e.isPrimary }

    function E(e, t) { return e.type == "pointer" + t || e.type.toLowerCase() == "mspointer" + t }

    function e(e) { var t, i, s, n, a = 0,
            r = 0;
        y && (o(document).off(v.down, u).off(v.up, f).off(v.move, m).off(v.cancel, x), o(window).off("scroll", x), x(), y = !1), (v = e && "down" in e ? e : "ontouchstart" in document ? { down: "touchstart", up: "touchend", move: "touchmove", cancel: "touchcancel" } : "onpointerdown" in document ? { down: "pointerdown", up: "pointerup", move: "pointermove", cancel: "pointercancel" } : "onmspointerdown" in document && { down: "MSPointerDown", up: "MSPointerUp", move: "MSPointerMove", cancel: "MSPointerCancel" }) && ("MSGesture" in window && ((p = new MSGesture).target = document.body, o(document).bind("MSGestureEnd", function(e) { var t = 1 < e.velocityX ? "Right" : e.velocityX < -1 ? "Left" : 1 < e.velocityY ? "Down" : e.velocityY < -1 ? "Up" : null;
            t && (g.el.trigger("swipe"), g.el.trigger("swipe" + t)) })), u = function(e) {
            (n = E(e, "down")) && !T(e) || (s = n ? e : e.touches[0], e.touches && 1 === e.touches.length && g.x2 && (g.x2 = void 0, g.y2 = void 0), t = Date.now(), i = t - (g.last || t), g.el = o("tagName" in s.target ? s.target : s.target.parentNode), l && clearTimeout(l), g.x1 = s.pageX, g.y1 = s.pageY, 0 < i && i <= 250 && (g.isDoubleTap = !0), g.last = t, c = setTimeout(b, 750), p && n && p.addPointer(e.pointerId)) }, m = function(e) {
            (n = E(e, "move")) && !T(e) || (s = n ? e : e.touches[0], w(), g.x2 = s.pageX, g.y2 = s.pageY, a += Math.abs(g.x1 - g.x2), r += Math.abs(g.y1 - g.y2)) }, f = function(e) {
            (n = E(e, "up")) && !T(e) || (w(), g.x2 && 30 < Math.abs(g.x1 - g.x2) || g.y2 && 30 < Math.abs(g.y1 - g.y2) ? h = setTimeout(function() { var e, t, i, s;
                g.el && (g.el.trigger("swipe"), g.el.trigger("swipe" + (e = g.x1, t = g.x2, i = g.y1, s = g.y2, Math.abs(e - t) >= Math.abs(i - s) ? 0 < e - t ? "Left" : "Right" : 0 < i - s ? "Up" : "Down"))), g = {} }, 0) : "last" in g && (a < 30 && r < 30 ? d = setTimeout(function() { var e = o.Event("tap");
                e.cancelTouch = x, g.el && g.el.trigger(e), g.isDoubleTap ? (g.el && g.el.trigger("doubleTap"), g = {}) : l = setTimeout(function() { l = null, g.el && g.el.trigger("singleTap"), g = {} }, 250) }, 0) : g = {}), a = r = 0) }, o(document).on(v.up, f).on(v.down, u).on(v.move, m), o(document).on(v.cancel, x), o(window).on("scroll", x), y = !0) }["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(t) { o.fn[t] = function(e) { return this.on(t, e) } }), o.touch = { setup: e }, o(document).ready(e) }(Zepto);