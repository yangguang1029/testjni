;/*!geolocation:static/js/util/webstorage.js*/
define("geolocation:static/js/util/webstorage.js", function(e, r, t) {
    function o(e) {
        this.backend = e
    }
    o.prototype.__defineGetter__("length", function() {
        try {
            return this.backend.length
        } catch (e) {
            return console.error("Read Storage length error:" + e),
            0
        }
    }),
    o.prototype.key = function(e) {
        try {
            return this.backend.key(e)
        } catch (r) {
            return console.error("Get Storage key error:" + r),
            null
        }
    }
    ,
    o.prototype.getItem = function(e) {
        try {
            return this.backend.getItem(e)
        } catch (r) {
            return console.error("Get Storage item error:" + r),
            null
        }
    }
    ,
    o.prototype.setItem = function(e, r) {
        try {
            return this.backend.setItem(e, r)
        } catch (t) {
            console.error("Set Storage item error:" + t)
        }
    }
    ,
    o.prototype.removeItem = function(e) {
        try {
            return this.backend.removeItem(e)
        } catch (r) {
            return console.error("Remove Storage item error:" + r),
            null
        }
    }
    ,
    o.prototype.clear = function() {
        try {
            return this.backend.clear()
        } catch (e) {
            console.error("Clear Storage error:" + e)
        }
    }
    ;
    var n, c;
    try {
        n = window.localStorage,
        c = window.sessionStorage
    } catch (a) {
        console.error("Get localStorage or sessionStorage error:" + a)
    }
    t.exports = {
        local: new o(n || {}),
        session: new o(c || {})
    }
});
;/*!geolocation:static/js/core/cachegeolocation.js*/
define("geolocation:static/js/core/cachegeolocation.js", function(e, t, a) {
    var r = e("geolocation:static/js/util/webstorage").local
      , n = {
        status: 0,
        getLocation: function(e) {
            if (window.geodebug)
                return null;
            if (1 == window.closeCache)
                return null;
            if (1 == window.clearCache)
                return r.clear(),
                null;
            var t = this;
            t.status = 1;
            var a = e ? "cache.robust" : "cache"
              , n = r.getItem("realgeocache")
              , o = r.getItem("realgeocacheTimestamp") || 0
              , c = null
              , i = null;
            if (n && (window.cacheType || "undefined" == typeof window.cacheType)) {
                var s = JSON.parse(n);
                if (c = s.lat,
                i = s.lng,
                n && c && i) {
                    var l = e ? 43200 : 360;
                    if (parseInt(Date.now() - o) < 1e3 * l) {
                        var u = JSON.parse(n);
                        return u.type = a,
                        u.accuracy = +u.accuracy * Math.round(Math.sqrt(Math.sqrt(l))),
                        t.status = 2,
                        listener.trigger("geolocation", "success", a, u),
                        u
                    }
                    return t.status = -1,
                    listener.trigger("geolocation", "fail", a, "expired"),
                    null
                }
                return t.status = -1,
                listener.trigger("geolocation", "fail", a, "missed"),
                null
            }
            return t.status = -1,
            listener.trigger("geolocation", "fail", a, "missed"),
            null
        },
        setLocation: function(e) {
            return e && (r.setItem("realgeocacheTimestamp", Date.now()),
            r.setItem("realgeocache", JSON.stringify(e))),
            !0
        }
    };
    a.exports = n
});
;/*!geolocation:static/js/util/detect.js*/
define("geolocation:static/js/util/detect.js", function(i, o, e) {
    var r = {}
      , s = r.os = {}
      , a = r.browser = {}
      , n = r.client = {}
      , t = navigator.userAgent;
    if ("string" == typeof t) {
        var d = t.match(/(android)\s+([\d.]+)/i)
          , c = !v && t.match(/(iphone\sos)\s([\d_]+)/i)
          , v = t.match(/(ipad).*os\s([\d_]+)/i)
          , m = !c && !v && t.match(/(ipod\sos)\s([\d_]+)/i)
          , h = t.match(/webkit\/([\d.]+)/i)
          , p = t.match(/chrome\/([\d.]+)/i) || t.match(/crios\/([\d.]+)/i)
          , b = t.match(/firefox\/([\d.]+)/i)
          , w = t.match(/mqqbrowser\/([\d\.]+)/i)
          , f = t.match(/ucbrowser\/([\d.]+)/i)
          , l = t.match(/baidubrowser\/([\d\.]+)/i)
          , g = t.match(/QQ\/([\d\.]+)/)
          , u = t.match(/micromessenger\/([\d\.]+)/i);
        d && (s.android = !0,
        s.version = d[2]),
        c && (s.ios = s.iphone = !0,
        s.version = c[2].replace(/_/g, ".")),
        v && (s.ios = s.ipad = !0,
        s.version = v[2].replace(/_/g, ".")),
        m && (s.ios = s.ipod = !0,
        s.version = m[2].replace(/_/g, ".")),
        h && (a.webkit = !0,
        a.version = h[1]),
        p && (a.chrome = !0,
        a.version = p[1]),
        b && (a.firefox = !0,
        a.version = b[1]),
        w && (a.qqbrowser = !0,
        a.version = w[1]),
        f && (a.ucbrowser = !0,
        a.version = f[1]),
        l && (a.baidubrowser = !0,
        a.version = l[1]),
        g && (n.mqq = !0,
        n.version = g[1]),
        u && (n.wechat = !0,
        n.version = u[1]),
        !s.ios || w || f || l || (a.safari = !0,
        a.version = s.version),
        !s.android || w || f || l || p || (a.android = !0,
        a.version = s.version),
        s.version = parseFloat(s.version),
        a.version = parseFloat(a.version),
        n.version = parseFloat(n.version)
    }
    e.exports = r
});
;/*!geolocation:static/js/core/h5geolocation.js*/
define("geolocation:static/js/core/h5geolocation.js", function(t, c, a) {
    var o = t("geolocation:static/js/util/detect")
      , e = (t("geolocation:static/js/util/webstorage").local,
    null)
      , i = 0
      , n = 0
      , r = 0
      , s = 0
      , l = 0
      , u = 0
      , g = 0
      , h = {
        status: 0,
        _config: {
            enableHighAccuracy: !0,
            maximumAge: 1e3,
            timeout: 15e3,
            accuracy: 2e3
        },
        _stat_geoloc_start: null,
        getLocation: function() {
            this.status = 1,
            this._getCurrentPosition()
        },
        _getCurrentPosition: function() {
            return navigator.geolocation.getCurrentPosition(this._onSuccess, this._onFailure, this._config)
        },
        watchPosition: function() {
            return e = Date.now(),
            navigator.geolocation.watchPosition(this._onWatchSuccess, this._onWatchFailure, this._config)
        },
        clearWatch: function(t) {
            return navigator.geolocation.clearWatch(t)
        },
        _onSuccess: function(t) {
            u = (new Date).getTime();
            {
                var c = h
                  , a = t.coords;
                a.accuracy
            }
            if (0 != a.longitude && 0 != a.latitude) {
                var e = {
                    lat: a.latitude,
                    lng: a.longitude,
                    accuracy: a.accuracy,
                    geoTime: g
                }
                  , i = 1;
                o.android && o.browser.baidubrowser && (i = 5,
                e.accuracy = e.accuracy || 60),
                c.status = 2,
                listener.trigger("geolocation", "success", "h5", e, i)
            } else
                c.status = -1,
                listener.trigger("geolocation", "fail", "h5", "accuracy low")
        },
        _onFailure: function(t) {
            var c = h
              , a = t;
            a.type = "h5",
            c.status = -1,
            listener.trigger("geolocation", "fail", "h5", a),
            listener.trigger("geolocation.report_fail", "fail", "h5")
        },
        _onWatchSuccess: function(t) {
            i++;
            var c = h
              , a = t.coords
              , l = a.accuracy;
            if (l < c._config.accuracy && a && 0 != a.longitude && 0 != a.latitude) {
                if (!r && 1 == i) {
                    r = 1;
                    var u = Date.now() - e;
                    listener.trigger("geolocation.watch", "success", "watch_loc_first", u)
                }
                if (!n && i >= 2 && (n = 1,
                listener.trigger("geolocation.watch", "success", "watch_loc_second")),
                !s && a.heading && 0 != a.heading && i >= 2) {
                    var g = Date.now() - e;
                    s = 1,
                    listener.trigger("geolocation.watch", "success", "watch_gps_load", g)
                }
                var _ = {
                    lat: a.latitude,
                    lng: a.longitude,
                    accuracy: a.accuracy
                }
                  , f = 1;
                o.android && o.browser.baidubrowser && (f = 5,
                _.accuracy = _.accuracy || 60),
                listener.trigger("geolocation.watch", "success", "h5_watch", _, f)
            }
        },
        _onWatchFailure: function(t) {
            i++,
            l || (l = 1,
            listener.trigger("geolocation.watch", "fail", "watch_loc_fail", t && t.code))
        }
    };
    a.exports = h
});
;/*!geolocation:static/js/core/x5geolocation.js*/
define("geolocation:static/js/core/x5geolocation.js", function(t, e, o) {
    var a = "//jsapi.qq.com/get?api=app.getGeoLocation"
      , i = {
        status: 0,
        getLocation: function() {
            var t = this;
            0 != t.status ? t._getLocation() : window.LazyLoad && window.LazyLoad.js ? window.LazyLoad.js(a, t._getLocation) : t._loadScript(a, t._getLocation)
        },
        _loadScript: function(t, e) {
            var o = document.createElement("SCRIPT");
            o.onload = o.onreadystatechange = function() {
                var t = o.readyState;
                if ("undefined" == typeof t || "loaded" == t || "complete" == t)
                    try {
                        e && e(o)
                    } finally {
                        o.onload = o.onreadystatechange = null
                    }
            }
            ,
            o.setAttribute("type", "text/javascript"),
            o.setAttribute("charset", "utf-8"),
            o.setAttribute("src", t),
            document.getElementsByTagName("head")[0].appendChild(o)
        },
        _getLocation: function() {
            var t = i;
            t.status = 1;
            var e = window.browser && window.browser.app && window.browser.app.getGeoLocation;
            e ? (e(function(e) {
                if (e && "true" == e.ret) {
                    var o = {
                        lat: e.latitude,
                        lng: e.longitude,
                        accuracy: 200
                    };
                    t.status = 2,
                    listener.trigger("geolocation", "success", "x5", o)
                } else
                    t.status = -1,
                    listener.trigger("geolocation", "fail", "x5", "error result")
            }, function() {
                t.status = -1,
                listener.trigger("geolocation", "fail", "x5", "error callback")
            }),
            setTimeout(function() {
                1 == t.status && (t.status = -1,
                listener.trigger("geolocation", "fail", "x5", "timeout"))
            }, 5e3)) : (t.status = -1,
            listener.trigger("geolocation", "fail", "x5", "NO_API"))
        }
    };
    o.exports = i
});
;/*!geolocation:static/js/core/wxgeolocation.js*/
define("geolocation:static/js/core/wxgeolocation.js", function(t, i, e) {
    function n() {
        for (var t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", i = "", e = 0; 8 > e; e++)
            i += t.split("")[parseInt(61 * Math.random(), 10)];
        return i
    }
    var a = {
        appId: "wx183412414b784345",
        timestamp: (new Date).getTime(),
        nonceStr: n(),
        signature: null,
        jsApiList: ["getLocation"]
    }
      , o = {
        status: 0,
        getLocation: function() {
            var t = this;
            if (t.status = 1,
            "serial" != window.h5GeoMode) {
                if (!window.wx)
                    return t.status = -1,
                    void listener.trigger("geolocation", "fail", "wx", "NO_API");
                var i = function() {
                    window.wx.config(a);
                    var i = function() {
                        window.wx.getLocation({
                            timestamp: a.timestamp,
                            nonceStr: a.noncestr,
                            addrSign: a.signature,
                            success: function(i) {
                                var e = {
                                    lat: i.latitude,
                                    lng: i.longitude,
                                    accuracy: i.accuracy
                                };
                                t.status = 2,
                                listener.trigger("geolocation", "success", "wx", e)
                            },
                            fail: function() {
                                t.status = -1,
                                listener.trigger("geolocation", "fail", "wx", "call wx jsapi fail")
                            }
                        })
                    };
                    window.wx.ready(i)
                };
                t._getJsapiTicket(i)
            } else if (window.wx.ready(function() {
                window.wx.getLocation({
                    success: function(i) {
                        var e = {
                            lat: i.latitude,
                            lng: i.longitude,
                            accuracy: i.accuracy
                        };
                        t.status = 2,
                        listener.trigger("geolocation", "success", "wx", e)
                    },
                    fail: function() {
                        t.status = -1,
                        listener.trigger("geolocation", "fail", "wx", "call wx jsapi fail")
                    }
                })
            }),
            "{}" == JSON.stringify(window.wx))
                return t.status = -1,
                void listener.trigger("geolocation", "fail", "wx", "NO_API")
        },
        _getJsapiTicket: function(t) {
            var i = this;
            Salo && Salo.ajax({
                type: "jsonp",
                url: "//weixincommon.map.qq.com/weixincommon/jsApiSign",
                data: {
                    appId: a.appId,
                    noncestr: a.nonceStr,
                    timestamp: a.timestamp,
                    url: encodeURIComponent(window.location.href.replace(window.location.hash, "")),
                    output: "jsonp"
                },
                callback: {
                    success: function(e) {
                        if ("string" == typeof e)
                            try {
                                e = JSON.parse(e)
                            } catch (n) {}
                        return e && 0 == e.returnValue ? (e = e.content,
                        void (e && e.signature && "accessfail" != e.signature && "tokenfail" != e.signature ? (a.signature = e.signature,
                        t(e)) : (i.status = -1,
                        listener.trigger("geolocation", "fail", "wx", "fetch JsapiTicket resp error")))) : (i.status = -1,
                        void listener.trigger("geolocation", "fail", "wx", "jsApiSign service result error"))
                    },
                    error: function() {
                        i.status = -1
                    }
                }
            })
        },
        _getQueryStr: function(t) {
            var i, e = String(window.document.location.href), n = new RegExp("(^|)" + t + "=([^&]*)(&|$)","gi").exec(e);
            return (i = n) ? i[2] : ""
        }
    };
    e.exports = o
});
;/*!geolocation:static/js/core/qqgeolocation.js*/
define("geolocation:static/js/core/qqgeolocation.js", function(t, o, i) {
    var e = {
        status: 0,
        getLocation: function() {
            var t = this;
            t.status = 1,
            window.mqq && (window.mqq.iOS || window.mqq.android) ? window.mqq.sensor.getLocation(function(o, i, e) {
                if (0 == o) {
                    var n = {
                        lat: i,
                        lng: e,
                        accuracy: 175
                    };
                    t.status = 2,
                    listener.trigger("geolocation", "success", "qq", n, 5)
                } else
                    t.status = -1,
                    listener.trigger("geolocation", "fail", "qq", o)
            }) : (t.status = -1,
            listener.trigger("geolocation", "fail", "qq", "NO_API"))
        }
    };
    i.exports = e
});
;/*!geolocation:static/js/core/ipgeolocation.js*/
define("geolocation:static/js/core/ipgeolocation.js", function(t, o, a) {
    var i = "TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU"
      , e = {
        status: 0,
        getLocation: function(t) {
            var o = this;
            Salo && Salo.ajax({
                type: "jsonp",
                url: "//apis.map.qq.com/ws/location/v1/ip",
                data: {
                    ip: t,
                    key: i,
                    output: "jsonp",
                    t: (new Date).getTime()
                },
                callback: {
                    success: function(t) {
                        if (t && 0 == t.status) {
                            var a = t.result
                              , i = {
                                module: "geolocation",
                                type: "ip",
                                adcode: a.ad_info.adcode || "",
                                nation: a.ad_info.nation,
                                province: a.ad_info.province,
                                city: a.ad_info.city,
                                addr: "",
                                lat: a.location.lat,
                                lng: a.location.lng,
                                accuracy: 1e4
                            };
                            o.status = 2,
                            listener.trigger("geolocation", "success", "ip", i)
                        } else
                            o.status = -1,
                            listener.trigger("geolocation", "fail", "ip", t && t.message)
                    },
                    error: function() {
                        o.status = -1,
                        listener.trigger("geolocation", "fail", "ip", "timeout")
                    }
                }
            })
        }
    };
    a.exports = e
});
;/*!geolocation:static/js/util/georeport.js*/
define("geolocation:static/js/util/georeport.js", function(o, e, t) {
    var n, i = {
        init: function() {
            this.geoLogId = "geopositioning",
            this.userLogId = "geolocation",
            this._bind(),
            n = (new Date).getTime()
        },
        _bind: function() {
            var o = this;
            listener.on("geolocation", "success", function() {}),
            listener.on("geolocation", "fail", function() {}),
            listener.on("geolocation.watch", "success", function() {}),
            listener.on("geolocation.watch", "fail", function() {}),
            listener.on("geolocation.report", "success", function(e, t, n) {
                o._report(o.userLogId, t, !0, "success", n)
            }),
            listener.on("geolocation.report", "fail", function(e, t, n) {
                o._report(o.userLogId, "temp", !1, n || "fail")
            })
        },
        _report: function(o, e, t, i, s) {
            var c = ((new Date).getTime() - n) / 1e3;
            0 >= s && (s = 0);
            try {
                window._prStat && window._prStat.report(o, {
                    type: e,
                    success: t ? 1 : 0,
                    message: i,
                    loc_time: c,
                    geoTime: s
                })
            } catch (r) {}
        }
    };
    t.exports = i
});
;/*!geolocation:static/js/util/inversegeo.js*/
define("geolocation:static/js/util/inversegeo.js", function(a, o, n) {
    var t = "TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU"
      , c = {
        inverse: function(a, o, n) {
            var c = this;
            Salo && Salo.ajax({
                type: "jsonp",
                url: "//apis.map.qq.com/ws/geocoder/v1",
                data: {
                    location: a.lat + "," + a.lng,
                    coord_type: o || 1,
                    key: t,
                    output: "jsonp",
                    t: (new Date).getTime()
                },
                callback: {
                    success: function(t) {
                        var e = t.result;
                        if (e && e.ad_info && e.ad_info.city && e.location || e && e.address_component && e.address_component.nation) {
                            var i = {
                                module: "geolocation",
                                adcode: e.ad_info.adcode || "",
                                nation: e.ad_info.nation || e.address_component.nation,
                                province: e.ad_info.province || "",
                                city: e.ad_info.city || e.address_component.ad_level_1,
                                district: e.ad_info.district || e.address_component.ad_level_2,
                                addr: e.formatted_addresses && e.formatted_addresses.recommend || e.ad_info.address,
                                lat: e.location.lat,
                                lng: e.location.lng,
                                accuracy: a.accuracy || ""
                            };
                            n(i)
                        } else
                            c._translate(a, o, n)
                    },
                    error: function() {
                        c._translate(a, o, n)
                    }
                }
            })
        },
        _translate: function(a, o, n) {
            var c = this;
            Salo && Salo.ajax({
                type: "jsonp",
                url: "//apis.map.qq.com/ws/coord/v1/translate",
                data: {
                    locations: a.lat + "," + a.lng,
                    type: o || 1,
                    key: t,
                    output: "jsonp",
                    t: (new Date).getTime()
                },
                callback: {
                    success: function(t) {
                        t && t.locations && t.locations[0] && (a = {
                            lat: t.locations[0].lat,
                            lng: t.locations[0].lng,
                            accuracy: a.accuracy
                        }),
                        c._finally(a, o, n)
                    },
                    error: function() {
                        c._finally(a, o, n)
                    }
                }
            })
        },
        _finally: function(a, o, n) {
            var t = {
                lat: a.lat,
                lng: a.lng,
                accuracy: a.accuracy
            };
            n(t)
        }
    };
    n.exports = c
});
;/*!geolocation:static/js/core/geolocation.js*/
define("geolocation:static/js/core/geolocation.js", function(o, t, i) {
    var e = o("geolocation:static/js/core/cachegeolocation")
      , c = o("geolocation:static/js/core/h5geolocation")
      , n = o("geolocation:static/js/core/x5geolocation")
      , s = o("geolocation:static/js/core/wxgeolocation")
      , a = o("geolocation:static/js/core/qqgeolocation")
      , r = o("geolocation:static/js/core/ipgeolocation")
      , u = o("geolocation:static/js/util/detect")
      , l = o("geolocation:static/js/util/georeport")
      , _ = o("geolocation:static/js/util/inversegeo")
      , d = o("geolocation:static/js/util/webstorage").local
      , w = {}
      , g = !1
      , p = !1
      , T = 0
      , h = 0
      , L = 0
      , f = 0
      , b = 0
      , y = !1
      , m = {
        status: 0,
        ipStatus: 0,
        ipLocation: {
            module: "geolocation",
            adcode: window._DEFAULT_CITY.adcode,
            type: window._DEFAULT_CITY.type,
            nation: window._DEFAULT_CITY.nation,
            province: window._DEFAULT_CITY.province,
            city: window._DEFAULT_CITY.city,
            district: window._DEFAULT_CITY.district,
            addr: window._DEFAULT_CITY.addr,
            lat: window._DEFAULT_CITY.lat,
            lng: window._DEFAULT_CITY.lng,
            accuracy: window._DEFAULT_CITY.accuracy || 10010
        },
        myLocation: {
            module: "geolocation",
            adcode: window._DEFAULT_CITY.adcode,
            type: window._DEFAULT_CITY.type,
            nation: window._DEFAULT_CITY.nation,
            province: window._DEFAULT_CITY.province,
            city: window._DEFAULT_CITY.city,
            district: window._DEFAULT_CITY.district,
            addr: window._DEFAULT_CITY.addr,
            lat: window._DEFAULT_CITY.lat,
            lng: window._DEFAULT_CITY.lng,
            accuracy: window._DEFAULT_CITY.accuracy || 10010
        },
        init: function(o) {
            var t = this
              , i = window.locType || "";
            if (0 == t.status && (t._bind(),
            l.init(),
            "serial" == window.h5GeoMode ? (t._subGeos = [e],
            u.client.mqq && t._subGeos.push(a),
            u.client.wechat && t._subGeos.push(s),
            u.browser.qqbrowser && t._subGeos.push(n),
            u.client.mqq || u.client.wechat || u.browser.qqbrowser || t._subGeos.push(c)) : (t._subGeos = [e],
            "h5" == i ? t._subGeos.push(c) : "qq" == i ? u.client.mqq && t._subGeos.push(a) : "wx" == i ? u.client.wechat && t._subGeos.push(s) : "x5" == i ? u.browser.qqbrowser && t._subGeos.push(n) : (t.isUseH5() && t._subGeos.push(c),
            u.client.mqq && t._subGeos.push(a),
            u.client.wechat && t._subGeos.push(s),
            u.browser.qqbrowser && t._subGeos.push(n)))),
            o = o === !1 ? !1 : !0,
            1 != t.status && o)
                if (T = (new Date).getTime(),
                t.status = 1,
                g = p = !1,
                "serial" == window.h5GeoMode)
                    setTimeout(function() {
                        for (var o = 0, i = t._subGeos.length; i > o; o++)
                            t._subGeos[o].getLocation()
                    }, 1500);
                else
                    for (var r = 0, _ = t._subGeos.length; _ > r; r++)
                        t._subGeos[r].getLocation()
        },
        getLocation: function(o) {
            var t = this;
            if (o) {
                if (2 == t.ipStatus)
                    return t.ipLocation;
                var i = (window._DEFAULT_CITY.type,
                window._DEFAULT_CITY.ip);
                i ? ("serial" == window.h5GeoMode && (t._bind(),
                y = !1),
                i && r.getLocation(i) ? t.ipLocation = i && r.getLocation(i) : t.ipLocation.city && t.ipLocation.lat && t.ipLocation.lng && t._success("ip", t.ipLocation)) : t._success("ip", t.ipLocation)
            } else
                setTimeout(function() {
                    t.status = 0,
                    t.init(!0)
                }, 0)
        },
        watchPosition: function() {
            this.WATCH_ID || (this._bind(),
            this.WATCH_ID = c.watchPosition())
        },
        clearWatch: function() {
            this.WATCH_ID && (this.WATCH_ID = null,
            c.clearWatch(this.WATCH_ID))
        },
        _bind: function() {
            var o = this;
            listener.on("geolocation", "success", function(t, i, e, c) {
                "cache" == i || "cache.robust" == i || "ip" == i ? o._success(i, e) : _.inverse(e, c, function(t) {
                    o._success(i, t)
                })
            }),
            listener.on("geolocation", "fail", function(t, i, e) {
                if ("serial" != window.h5GeoMode) {
                    for (var n = 0, s = o._subGeos.length; s > n; n++)
                        if (-1 != o._subGeos[n].status)
                            return;
                    o._fail(e);
                    for (var n = 0, s = o._subGeos.length; s > n; n++)
                        o._subGeos[n].status = 0
                } else {
                    if (!y) {
                        for (var n = 0, s = o._subGeos.length; s > n; n++)
                            if (-1 != o._subGeos[n].status)
                                return;
                        return void c.getLocation()
                    }
                    y = !0,
                    y && o._fail(e);
                    for (var n = 0, s = o._subGeos.length; s > n; n++)
                        o._subGeos[n].status = 0
                }
            }),
            listener.on("geolocation.watch", "success", function(t, i, e, c) {
                "h5_watch" == i && _.inverse(e, c, function(t) {
                    o._success(i, t, !0)
                })
            })
        },
        _success: function(o, t, i) {
            var c = this;
            if (c.status = 2,
            "ip" == o)
                c.ipLocation = t,
                c.ipStatus = 2,
                listener.trigger("common.geolocation", "success", c.ipLocation);
            else if ("cache" == o)
                c.myLocation = t;
            else {
                var n = parseInt(t.accuracy);
                b = f,
                f = (new Date).getTime();
                var s = 0;
                f >= b && (s = (f - b) / 1e3);
                var a = c.myLocation.accuracy;
                s && s >= 60 || "h5_watch" == o ? c.myLocation = {
                    module: "geolocation",
                    type: o,
                    adcode: t.adcode || "",
                    nation: t.nation || "",
                    province: t.province || "",
                    city: t.city || "",
                    district: t.district || "",
                    addr: t.addr || "",
                    lat: t.lat,
                    lng: t.lng,
                    accuracy: n
                } : n && a > n && (c.myLocation = {
                    module: "geolocation",
                    type: o,
                    adcode: t.adcode || "",
                    nation: t.nation || "",
                    province: t.province || "",
                    city: t.city || "",
                    district: t.district || "",
                    addr: t.addr || "",
                    lat: t.lat,
                    lng: t.lng,
                    accuracy: n
                }),
                (i || n && a > n) && "cache.robust" != o && e.setLocation(c.myLocation),
                listener.trigger("common.geolocation.watch", "success", c.myLocation)
            }
            g || (g = !0,
            listener.trigger("common.geolocation", "success", c.myLocation),
            h = (new Date).getTime(),
            L >= 0 && (L = h - T),
            "cache.robust" != o && "ip" != o && listener.trigger("geolocation.report", "success", o, L))
        },
        _fail: function(o) {
            var t = this;
            t.status = -1;
            var i = o;
            if ("h5" == i.type && (w = i),
            !p) {
                p = !0,
                listener.trigger("common.geolocation", "fail", w),
                listener.trigger("geolocation.report", "fail");
                var c = e.getLocation(!0);
                if (null == c) {
                    var n = (window._DEFAULT_CITY.type,
                    window._DEFAULT_CITY.ip);
                    n && n && r.getLocation(n)
                }
            }
        },
        isUseH5: function() {
            var o = !0
              , t = d.getItem("realgeocache")
              , i = d.getItem("realgeocacheTimestamp") || 0
              , e = 300;
            if (t && (window.cacheType || "undefined" == typeof window.cacheType)) {
                var c = JSON.parse(t);
                preLat = c.lat,
                preLng = c.lng,
                t && preLat && preLng && parseInt(Date.now() - i) < 1e3 * e && (o = !1)
            }
            return o
        }
    };
    i.exports = m
});
;/*!geolocation:static/js/util/auth.js*/
var storage = require("geolocation:static/js/util/webstorage").local;
define("geolocation:static/js/util/auth.js", function(t, e, o) {
    var r = t("geolocation:static/js/util/detect")
      , n = !1
      , a = 0
      , i = document.createElement("a");
    i.href = document.referrer;
    var c = null
      , g = 0
      , m = !0
      , s = 6048e5
      , u = "";
    document.referrer && i.hostname && (u = i.hostname,
    c = storage.getItem(u + "_authority"),
    g = storage.getItem(u + "_authTimeStamp") || 0,
    m = parseInt(Date.now() - g) > s);
    var l = function() {
        return r.os.android && r.client.mqq ? n ? !0 : !u || a > 0 ? !1 : /(^|\.)(dianping|meituan|mtwaimai|jingdong|58|elong|fang|gtimg|tenpay|qq|jd|51ping)\.com$/.test(u) ? n = !0 : (a++,
        n = confirm("“" + u + "”想使用您当前的位置")) : !0
    }
      , d = function() {
        var t;
        if (document.referrer && i.hostname) {
            var e = i.port ? ":" + i.port : "";
            t = i.protocol + "//" + i.hostname + e
        }
        return t
    };
    o.exports = {
        getAuth: l,
        getOrigin: d
    }
});
;/*!geolocation:static/js/boot.js*/
define("geolocation:static/js/boot.js", function(o, e, n) {
    function t() {
        window.geodebug = 1
    }
    function i() {
        window.clearCache = 1
    }
    function c(o) {
        window.locType = o
    }
    var a = o("geolocation:static/js/core/geolocation")
      , s = o("geolocation:static/js/util/auth")
      , g = {
        init: function(o) {
            1 == o.debug && t(),
            o.clearCache && i(),
            o.locType && c(o.locType),
            o.key && (this.key = o.key,
            this._bind(),
            a.init(o.initgeo))
        },
        _bind: function() {
            var o = this;
            window.addEventListener("message", function(e) {
                switch (e.data) {
                case "watchPosition":
                    a.watchPosition();
                    break;
                case "clearWatch":
                    a.clearWatch();
                    break;
                case "getLocation":
                    var n = a.getLocation();
                    n && o._send(n);
                    break;
                case "getLocation.robust":
                    var n = a.getLocation(!0);
                    n && o._send(n);
                    break;
                case "geoLocation.geodebug":
                    t()
                }
            }, !1),
            listener.on("common.geolocation", "success", function(e, n) {
                n && o._send(n)
            }),
            listener.on("common.geolocation.watch", "success", function(e, n) {
                n && o._send(n)
            }),
            listener.on("common.geolocation", "fail", function() {
                o._send(null)
            })
        },
        _send: function(o) {
            var e = s.getAuth()
              , n = s.getOrigin();
            o && e && n ? window.parent.postMessage(o, n) : window.parent.postMessage(null, "*")
        }
    };
    n.exports = g
});
;/*!geolocation:static/js/libs/listener.js*/
!function() {
    var n = 50
      , t = 25
      , e = {}
      , r = [].slice
      , a = {}
      , c = function(n, t, r, c) {
        var o = a[n];
        o || (o = a[n] = {}),
        o[t] = o[t] || [],
        o[t].push({
            func: r,
            context: c || e
        })
    }
      , o = function(n, t, r, a) {
        var o = function() {
            return e.off(n, t, o),
            r.apply(a || e, arguments)
        };
        c(n, t, o, a)
    }
      , f = function(e, c) {
        if (a[e] && a[e][c] && a[e][c].length) {
            for (var o = a[e][c], f = [], i = o.length; i--; )
                f.push({
                    handler: o[i],
                    args: r.call(arguments, 1)
                });
            !function() {
                var e = +new Date;
                do {
                    var r = f.shift()
                      , a = r.handler;
                    try {
                        a.func.apply(a.context, r.args)
                    } catch (c) {}
                } while (f.length && +new Date - e < n);f.length > 0 && setTimeout(arguments.callee, t)
            }()
        }
    }
      , i = function(n, t, r, c) {
        if (c = c || e,
        a[n] && a[n][t] && a[n][t].length)
            for (var o, f = a[n][t], i = f.length; i--; )
                o = f[i],
                o.func === r && o.context === c && f.splice(i, 1)
    };
    e.on = c,
    e.once = o,
    e.trigger = f,
    e.off = i,
    window.listener = window.listener || e
}();
;/*!geolocation:static/js/libs/mod.js*/
!function(e) {
    "use strict";
    function t() {}
    function n(e, t) {
        for (var n = e.length; n--; )
            if (e[n].listener === t)
                return n;
        return -1
    }
    function r(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    function i(e) {
        return "function" == typeof e || e instanceof RegExp ? !0 : e && "object" == typeof e ? i(e.listener) : !1
    }
    var s = t.prototype
      , o = e.EventEmitter;
    s.getListeners = function(e) {
        var t, n, r = this._getEvents();
        if (e instanceof RegExp) {
            t = {};
            for (n in r)
                r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
        } else
            t = r[e] || (r[e] = []);
        return t
    }
    ,
    s.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1)
            n.push(e[t].listener);
        return n
    }
    ,
    s.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {},
        t[e] = n),
        t || n
    }
    ,
    s.addListener = function(e, t) {
        if (!i(t))
            throw new TypeError("listener must be a function");
        var r, s = this.getListenersAsObject(e), o = "object" == typeof t;
        for (r in s)
            s.hasOwnProperty(r) && -1 === n(s[r], t) && s[r].push(o ? t : {
                listener: t,
                once: !1
            });
        return this
    }
    ,
    s.on = r("addListener"),
    s.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }
    ,
    s.once = r("addOnceListener"),
    s.defineEvent = function(e) {
        return this.getListeners(e),
        this
    }
    ,
    s.defineEvents = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this.defineEvent(e[t]);
        return this
    }
    ,
    s.removeListener = function(e, t) {
        var r, i, s = this.getListenersAsObject(e);
        for (i in s)
            s.hasOwnProperty(i) && (r = n(s[i], t),
            -1 !== r && s[i].splice(r, 1));
        return this
    }
    ,
    s.off = r("removeListener"),
    s.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }
    ,
    s.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }
    ,
    s.manipulateListeners = function(e, t, n) {
        var r, i, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (r = n.length; r--; )
                s.call(this, t, n[r]);
        else
            for (r in t)
                t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
        return this
    }
    ,
    s.removeEvent = function(e) {
        var t, n = typeof e, r = this._getEvents();
        if ("string" === n)
            delete r[e];
        else if (e instanceof RegExp)
            for (t in r)
                r.hasOwnProperty(t) && e.test(t) && delete r[t];
        else
            delete this._events;
        return this
    }
    ,
    s.removeAllListeners = r("removeEvent"),
    s.emitEvent = function(e, t) {
        var n, r, i, s, o, u = this.getListenersAsObject(e);
        for (s in u)
            if (u.hasOwnProperty(s))
                for (n = u[s].slice(0),
                i = 0; i < n.length; i++)
                    r = n[i],
                    r.once === !0 && this.removeListener(e, r.listener),
                    o = r.listener.apply(this, t || []),
                    o === this._getOnceReturnValue() && this.removeListener(e, r.listener);
        return this
    }
    ,
    s.trigger = r("emitEvent"),
    s.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }
    ,
    s.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e,
        this
    }
    ,
    s._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }
    ,
    s._getEvents = function() {
        return this._events || (this._events = {})
    }
    ,
    t.noConflict = function() {
        return e.EventEmitter = o,
        t
    }
    ,
    "function" == typeof define && define.amd ? define(function() {
        return t
    }) : "object" == typeof module && module.exports ? module.exports = t : e.EventEmitter = t
}(this || {});
var require, define;
!function(e) {
    if (!require) {
        var t = document.getElementsByTagName("head")[0]
          , n = {}
          , r = {}
          , i = {}
          , s = {}
          , o = {}
          , u = {}
          , a = function(e, n) {
            for (var r = document.createDocumentFragment(), i = 0, o = e.length; o > i; i++) {
                var u = e[i].id
                  , a = e[i].url;
                if (!(a in s)) {
                    s[a] = !0;
                    var c = document.createElement("script");
                    n && !function(e, t) {
                        var r = setTimeout(function() {
                            n(t)
                        }, require.timeout);
                        e.onerror = function() {
                            clearTimeout(r),
                            n(t)
                        }
                        ;
                        var i = function() {
                            clearTimeout(r)
                        };
                        "onload"in e ? e.onload = i : e.onreadystatechange = function() {
                            ("loaded" === this.readyState || "complete" === this.readyState) && i()
                        }
                    }(c, u),
                    c.type = "text/javascript",
                    c.src = a,
                    r.appendChild(c)
                }
            }
            t.appendChild(r)
        }
          , c = function(e, t, r) {
            for (var i = [], s = 0, c = e.length; c > s; s++) {
                var f = e[s]
                  , l = n[f] || (n[f] = []);
                l.push(t);
                var h, p = o[f] || o[f + ".js"] || {}, v = p.pkg;
                h = v ? u[v].url || u[v].uri : p.url || p.uri || f,
                i.push({
                    id: f,
                    url: h
                })
            }
            a(i, r)
        };
        define = function(e, t) {
            e = e.replace(/\.js$/i, ""),
            r[e] = t;
            var i = n[e];
            if (i) {
                for (var s = 0, o = i.length; o > s; s++)
                    i[s]();
                delete n[e]
            }
        }
        ,
        require = function(e) {
            if (e && e.splice)
                return require.async.apply(this, arguments);
            e = require.alias(e);
            var t = i[e];
            if (t)
                return t.exports;
            var n = r[e];
            if (!n)
                throw "[ModJS] Cannot find module `" + e + "`";
            t = i[e] = {
                exports: {},
                eventEmitter: this.__EventEmitter || (this.__EventEmitter = new EventEmitter)
            };
            var s = "function" == typeof n ? n.apply(t, [require, t.exports, t]) : n;
            return s && (t.exports = s),
            t.exports
        }
        ,
        require.async = function(t, n, i) {
            function s(e) {
                for (var t, n = 0, i = e.length; i > n; n++) {
                    var u = require.alias(e[n]);
                    u in a || (a[u] = !0,
                    u in r ? (t = o[u] || o[u + ".js"],
                    t && "deps"in t && s(t.deps)) : (l.push(u),
                    f++,
                    t = o[u] || o[u + ".js"],
                    t && "deps"in t && s(t.deps)))
                }
            }
            function u() {
                if (0 === f--) {
                    for (var r = [], i = 0, s = t.length; s > i; i++)
                        r[i] = require(t[i]);
                    n && n.apply(e, r)
                }
            }
            "string" == typeof t && (t = [t]);
            var a = {}
              , f = 0
              , l = [];
            s(t),
            c(l, u, i),
            u()
        }
        ,
        require.ensure = function(e, t) {
            require.async(e, function() {
                t && t.call(this, require)
            })
        }
        ,
        require.resourceMap = function(e) {
            var t, n;
            n = e.res;
            for (t in n)
                n.hasOwnProperty(t) && (o[t] = n[t]);
            n = e.pkg;
            for (t in n)
                n.hasOwnProperty(t) && (u[t] = n[t])
        }
        ,
        require.loadJs = function(e) {
            if (!(e in s)) {
                s[e] = !0;
                var n = document.createElement("script");
                n.type = "text/javascript",
                n.src = e,
                t.appendChild(n)
            }
        }
        ,
        require.loadCss = function(e) {
            if (e.content) {
                var n = document.createElement("style");
                n.type = "text/css",
                n.styleSheet ? n.styleSheet.cssText = e.content : n.innerHTML = e.content,
                t.appendChild(n)
            } else if (e.url) {
                var r = document.createElement("link");
                r.href = e.url,
                r.rel = "stylesheet",
                r.type = "text/css",
                t.appendChild(r)
            }
        }
        ,
        require.alias = function(e) {
            return e.replace(/\.js$/i, "")
        }
        ,
        require.timeout = 5e3
    }
}(this);
;/*!geolocation:static/js/util/ajax.js*/
!function() {
    var t = function(t) {
        t = t[0] || {},
        this.url = t.url || "",
        this.type = t.type || "xhr",
        this.method = "jsonp" == this.type ? "GET" : t.method && t.method.toUpperCase() || "GET",
        this.param = t.data || null,
        this.callback = t.callback || {
            success: new Function,
            error: new Function
        },
        this.XHR = null,
        "undefined" == typeof window._JSONP_callback && (window._JSONP_callback = {}),
        this._createRequest()
    };
    t.prototype = {
        _createXHR: function() {
            for (var t = [function() {
                return new XMLHttpRequest
            }
            , function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }
            , function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
            ], e = 0, n = t.length; n > e; e++) {
                try {
                    t[e]()
                } catch (a) {
                    continue
                }
                return this._createXHR = t[e],
                t[e]()
            }
        },
        _createRequest: function() {
            return "jsonp" == this.type ? this._setJSONPRequest() : this._setXHRRequest()
        },
        _setXHRRequest: function() {
            var t = this
              , e = "";
            for (var n in this.param)
                "" == e ? e = n + "=" + this.param[n] : e += "&" + n + "=" + this.param[n];
            if (this.XHR = this._createXHR(),
            this.XHR.onreadystatechange = function() {
                4 == t.XHR.readyState && 200 == t.XHR.status ? t.callback.success(t.XHR.responseText) : t.callback.error("retry")
            }
            ,
            "GET" == this.method) {
                var a = -1 == this.url.indexOf("?") ? this.url + "?" + e : this.url + "&" + e;
                this.XHR.open(this.method, a, !0),
                this.XHR.send()
            } else
                this.XHR.open(this.method, this.url, !0),
                this.XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"),
                this.XHR.send(e)
        },
        _setJSONPRequest: function() {
            var t = document.getElementsByTagName("head")[0]
              , e = document.createElement("script")
              , n = this._setRandomFun()
              , a = this
              , i = "";
            for (var s in this.param)
                "" == i ? i = s + "=" + this.param[s] : i += "&" + s + "=" + this.param[s];
            e.type = "text/javascript",
            e.charset = "utf-8",
            t ? t.appendChild(e) : document.body.appendChild(e),
            window._JSONP_callback[n.id] = function(t) {
                throw new Error('lalala')
                a.callback.success(t),
                setTimeout(function() {
                    delete window._JSONP_callback[n.id],
                    e.parentNode.removeChild(e)
                }, 100)
            }
            ,
            e.src = this.url + "?callback=" + n.name + "&" + i
        },
        _setRandomFun: function() {
            var t = "";
            do
                t = "JSONP" + Math.floor(1e4 * Math.random());
            while (window._JSONP_callback[t]);return {
                id: t,
                name: "window._JSONP_callback." + t
            }
        }
    },
    window.Salo = window.Salo || {},
    Salo.ajax = function() {
        return new t(arguments)
    }
}();
;/*!geolocation:static/js/util/stat.js*/
define("geolocation:static/js/util/stat.js", function(e, r, t) {
    function o() {
        var e = 1
          , r = navigator.userAgent
          , t = window.devicePixelRatio || 1;
        (navigator.platform.match(/iPhone|iPad|iPod/) || r.match(/Chrome/) && window.chrome || r.match(/Opera/) || r.match(/Firefox/) || r.match(/IEMobile/)) && (e = t),
        i.report("pv", {
            sw: screen.width * e,
            sh: screen.height * e,
            dpr: t
        })
    }
    var n = function(e) {
        var r = [];
        for (var t in e)
            null != e[t] && r.push(encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
        return r.join("&")
    }
      , i = {
        init: function(e) {
            this.appId = e.appId,
            this.statService = e.statService,
            this.from = e.from,
            o()
        },
        report: function(e, r) {
            var t = this
              , o = new Image(1,1)
              , i = {
                appid: t.appId,
                logid: e,
                from: t.from,
                referer: document.referrer,
                _ignore: parseInt(1e5 * Math.random())
            };
            r = r || {};
            for (var a in r)
                r.hasOwnProperty(a) && !i.hasOwnProperty(a) && (i[a] = r[a]);
            o.src = t.statService + "?" + n(i)
        }
    };
    t.exports = i
});
