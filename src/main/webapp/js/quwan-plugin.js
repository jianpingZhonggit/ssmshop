/*cookie插件*/
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') {
        options = options || {};
        if (value === null) {
            value = '';
            options = $.extend({}, options);
            options.expires = -1
        };
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000))
            } else {
                date = options.expires
            };
            expires = '; expires=' + date.toUTCString();
        };
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('')
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        };
        return cookieValue
    }
};
/*倒计时插件*/
;
(function($) {
    function set(obj) {
        if (obj <= 9) {
            obj = "0" + obj
        };
        return obj
    };
    $.fn.countdown = function(options) {
        if (this.length == 0) {
            return false
        };
        return this.each(function() {
            var Default = {
                    Sdate: null,
                    Edate: null,
                    Day: null,
                    callback: function() {
                        return false
                    }
                },
                _H_Text = '小时',
                _M_Text = '分',
                _S_Text = '秒',
                _lT = null,
                _cT = new Date(),
                _eT = null,
                _elT = null,
                ctime = null,
                etime = null,
                DomId = null,
                _timeout = null,
                _gt = function() {
                    if (_lT == null) {
                        _elT = (etime - ctime);
                        if (_elT < 0) {
                            $("#" + DomId).html("抢购结束！").addClass("end")
                        };
                        var _xT = Math.ceil(_elT / (24 * 60 * 60 * 1000));
                        _cT = parseInt(_cT.match(/\s(\d+)\D/)[1] * 3600) + parseInt(_cT.split(":")[1] * 60) + parseInt(_cT.split(":")[2]);
                        _eT = _xT * 24 * 3600 + parseInt(_eT.match(/\s(\d+)\D/)[1] * 3600) + parseInt(_eT.split(":")[1] * 60) + parseInt(_eT.split(":")[2]);
                        _lT = _elT / 1000
                    };
                    if (_elT > 0) {
                        if (_lT >= 0) {
                            if (s.Day != null) {
                                var _D = Math.floor(_lT / 86400);
                                var _H = Math.floor((_lT - _D * 86400) / 3600);
                                var _M = Math.floor((_lT - _D * 86400 - _H * 3600) / 60);
                                var _S = _lT % 60;
                                $('#' + DomId).html("<strong>" + _D + "</strong>天" + "<strong>" + set(_H) + "</strong>" + _H_Text + "<strong>" + set(_M) + "</strong>" + _M_Text + "<strong>" + set(_S) + "</strong>" + _S_Text);
                            } else {
                                var _H = Math.floor(_lT / 3600);
                                var _M = Math.floor((_lT - _H * 3600) / 60);
                                var _S = (_lT - _H * 3600) % 60;
                                $('#' + DomId).html("<strong>" + _H + "</strong>" + _H_Text + ":<strong>" + _M + "</strong>" + _M_Text + ":<strong>" + _S + "</strong>" + _S_Text)
                            };
                            _lT--
                        } else {
                            clearInterval(_timeout);
                            if (s.callback && $.isFunction(s.callback)) {
                                s.callback.call(this)
                            }
                        }
                    } else {
                        clearInterval(_timeout);
                        if (s.callback && $.isFunction(s.callback)) {
                            s.callback.call(this)
                        }
                    }
                },
                strDateTime = function(str) {
                    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
                    var r = str.match(reg);
                    if (r == null) return false;
                    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
                    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7])
                };
            var s = $.extend({}, Default, options || {});
            DomId = this.id;
            if (DomId == 'null') {
                return
            };
            _eT = s.Edate;
            if (!strDateTime(_eT)) { /*alert('结束日期格式不正确');*/
                return false
            };
            if (s.Sdate != null) {
                _cT = s.Sdate
            };
            _cT = _cT.toString();
            cdate = _cT.replace(/-/g, '/');
            _eT = _eT.toString();
            edate = _eT.replace(/-/g, '/');
            ctime = new Date(cdate);
            etime = new Date(edate);
            _timeout = setInterval(_gt, 1000)
        })
    }
})(jQuery);
/*
 * Cloud Zoom V1.0.2
 * (c) 2010 by R Cecco. <http://www.professorcloud.com>
 * MIT License
 */
(function($) {
    $(document).ready(function() {
        $('.cloud-zoom, .cloud-zoom-gallery').CloudZoom()
    });

    function format(str) {
        for (var i = 1; i < arguments.length; i++) {
            str = str.replace('%' + (i - 1), arguments[i])
        }
        return str
    }

    function CloudZoom(jWin, opts) {
        var sImg = $('img', jWin);
        var img1;
        var img2;
        var zoomDiv = null;
        var $mouseTrap = null;
        var lens = null;
        var $tint = null;
        var softFocus = null;
        var $ie6Fix = null;
        var zoomImage;
        var controlTimer = 0;
        var cw, ch;
        var destU = 0;
        var destV = 0;
        var currV = 0;
        var currU = 0;
        var filesLoaded = 0;
        var mx, my;
        var ctx = this,
            zw;
        setTimeout(function() {
            if ($mouseTrap === null) {
                var w = jWin.width();
                jWin.parent().append(format('<div style="width:%0px;position:absolute;top:75%;left:%1px;text-align:center" class="cloud-zoom-loading" >Loading...</div>', w / 3, (w / 2) - (w / 6))).find(':last').css('opacity', 0.5)
            }
        }, 200);
        var ie6FixRemove = function() {
            if ($ie6Fix !== null) {
                $ie6Fix.remove();
                $ie6Fix = null
            }
        };
        this.removeBits = function() {
            if (lens) {
                lens.remove();
                lens = null
            }
            if ($tint) {
                $tint.remove();
                $tint = null
            }
            if (softFocus) {
                softFocus.remove();
                softFocus = null
            }
            ie6FixRemove();
            $('.cloud-zoom-loading', jWin.parent()).remove()
        };
        this.destroy = function() {
            jWin.data('zoom', null);
            if ($mouseTrap) {
                $mouseTrap.unbind();
                $mouseTrap.remove();
                $mouseTrap = null
            }
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null
            }
            this.removeBits()
        };
        this.fadedOut = function() {
            if (zoomDiv) {
                zoomDiv.remove();
                zoomDiv = null
            }
            this.removeBits()
        };
        this.controlLoop = function() {
            if (lens) {
                var x = (mx - sImg.offset().left - (cw * 0.5)) >> 0;
                var y = (my - sImg.offset().top - (ch * 0.5)) >> 0;
                if (x < 0) {
                    x = 0
                } else if (x > (sImg.outerWidth() - cw)) {
                    x = (sImg.outerWidth() - cw)
                }
                if (y < 0) {
                    y = 0
                } else if (y > (sImg.outerHeight() - ch)) {
                    y = (sImg.outerHeight() - ch)
                }
                lens.css({
                    left: x,
                    top: y
                });
                lens.css('background-position', (-x) + 'px ' + (-y) + 'px');
                destU = (((x) / sImg.outerWidth()) * zoomImage.width) >> 0;
                destV = (((y) / sImg.outerHeight()) * zoomImage.height) >> 0;
                currU += (destU - currU) / opts.smoothMove;
                currV += (destV - currV) / opts.smoothMove;
                zoomDiv.css('background-position', (-(currU >> 0) + 'px ') + (-(currV >> 0) + 'px'))
            }
            controlTimer = setTimeout(function() {
                ctx.controlLoop()
            }, 30)
        };
        this.init2 = function(img, id) {
            filesLoaded++;
            if (id === 1) {
                zoomImage = img
            }
            if (filesLoaded === 2) {
                this.init()
            }
        };
        this.init = function() {
            $('.cloud-zoom-loading', jWin.parent()).remove();
            $mouseTrap = jWin.parent().append(format("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:100%;_width:478px;height:100%;_height:478px;left:%2px;top:%3px;\'></div>", sImg.outerWidth(), sImg.outerHeight(), 0, 0)).find(':last');
            $mouseTrap.bind('mousemove', this, function(event) {
                mx = event.pageX;
                my = event.pageY
            });
            $mouseTrap.bind('mouseleave', this, function(event) {
                clearTimeout(controlTimer);
                if (lens) {
                    lens.fadeOut(299)
                }
                if ($tint) {
                    $tint.fadeOut(299)
                }
                if (softFocus) {
                    softFocus.fadeOut(299)
                }
                zoomDiv.fadeOut(300, function() {
                    ctx.fadedOut()
                });
                return false
            });
            $mouseTrap.bind('mouseenter', this, function(event) {
                mx = event.pageX;
                my = event.pageY;
                zw = event.data;
                if (zoomDiv) {
                    zoomDiv.stop(true, false);
                    zoomDiv.remove()
                }
                var xPos = opts.adjustX,
                    yPos = opts.adjustY;
                var siw = sImg.outerWidth();
                var sih = sImg.outerHeight();
                var w = opts.zoomWidth;
                var h = opts.zoomHeight;
                if (opts.zoomWidth == 'auto') {
                    w = siw
                }
                if (opts.zoomHeight == 'auto') {
                    h = sih
                }
                var appendTo = jWin.parent();
                switch (opts.position) {
                    case 'top':
                        yPos -= h;
                        break;
                    case 'right':
                        xPos += siw;
                        break;
                    case 'bottom':
                        yPos += sih;
                        break;
                    case 'left':
                        xPos -= w;
                        break;
                    case 'inside':
                        w = siw;
                        h = sih;
                        break;
                    default:
                        appendTo = $('#' + opts.position);
                        if (!appendTo.length) {
                            appendTo = jWin;
                            xPos += siw;
                            yPos += sih
                        } else {
                            w = appendTo.innerWidth();
                            h = appendTo.innerHeight()
                        }
                }
                zoomDiv = appendTo.append(format('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');z-index:99;"></div>', xPos, yPos, w, h, zoomImage.src)).find(':last');
                if (sImg.attr('title') && opts.showTitle) {
                    zoomDiv.append(format('<div class="cloud-zoom-title">%0</div>', sImg.attr('title'))).find(':last').css('opacity', opts.titleOpacity)
                }
                if ($.browser.msie && $.browser.version < 7) {
                    $ie6Fix = $('<iframe frameborder="0" src="#"></iframe>').css({
                        position: "absolute",
                        left: xPos,
                        top: yPos,
                        zIndex: 99,
                        width: w,
                        height: h
                    }).insertBefore(zoomDiv)
                }
                zoomDiv.fadeIn(500);
                if (lens) {
                    lens.remove();
                    lens = null
                }
                cw = (sImg.outerWidth() / zoomImage.width) * zoomDiv.width();
                ch = (sImg.outerHeight() / zoomImage.height) * zoomDiv.height();
                lens = jWin.append(format("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", cw, ch)).find(':last');
                $mouseTrap.css('cursor', lens.css('cursor'));
                var noTrans = false;
                if (opts.tint) {
                    lens.css('background', 'url("' + sImg.attr('src') + '")');
                    $tint = jWin.append(format('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', sImg.outerWidth(), sImg.outerHeight(), opts.tint)).find(':last');
                    $tint.css('opacity', opts.tintOpacity);
                    noTrans = true;
                    $tint.fadeIn(500)
                }
                if (opts.softFocus) {
                    lens.css('background', 'url("' + sImg.attr('src') + '")');
                    softFocus = jWin.append(format('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', sImg.outerWidth() - 2, sImg.outerHeight() - 2, opts.tint)).find(':last');
                    softFocus.css('background', 'url("' + sImg.attr('src') + '")');
                    softFocus.css('opacity', 0.5);
                    noTrans = true;
                    softFocus.fadeIn(500)
                }
                if (!noTrans) {
                    lens.css('opacity', opts.lensOpacity)
                }
                if (opts.position !== 'inside') {
                    lens.fadeIn(500)
                }
                zw.controlLoop();
                return
            })
        };
        img1 = new Image();
        $(img1).load(function() {
            ctx.init2(this, 0)
        });
        img1.src = sImg.attr('src');
        img2 = new Image();
        $(img2).load(function() {
            ctx.init2(this, 1)
        });
        img2.src = jWin.attr('href')
    }
    $.fn.CloudZoom = function(options) {
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (e) {}
        this.each(function() {
            var relOpts, opts;
            eval('var a = {' + $(this).attr('rel') + '}');
            relOpts = a;
            if ($(this).is('.cloud-zoom')) {
                $(this).css({
                    'position': 'relative',
                    'display': 'block'
                });
                $('img', $(this)).css({
                    'display': 'block'
                });
                if ($(this).parent().attr('id') != 'wrap') {
                    $(this).wrap('<div id="wrap" style="top:0px;z-index:9999;position:relative;"></div>')
                }
                opts = $.extend({}, $.fn.CloudZoom.defaults, options);
                opts = $.extend({}, opts, relOpts);
                $(this).data('zoom', new CloudZoom($(this), opts))
            } else if ($(this).is('.cloud-zoom-gallery')) {
                opts = $.extend({}, relOpts, options);
                $(this).data('relOpts', opts);
                $(this).bind('click', $(this), function(event) {
                    var data = event.data.data('relOpts');
                    $('#' + data.useZoom).data('zoom').destroy();
                    $('#' + data.useZoom).attr('href', event.data.attr('href'));
                    $('#' + data.useZoom + ' img').attr('src', event.data.data('relOpts').smallImage);
                    $('#' + event.data.data('relOpts').useZoom).CloudZoom();
                    return false
                })
            }
        });
        return this
    };
    $.fn.CloudZoom.defaults = {
        zoomWidth: 'auto',
        zoomHeight: 'auto',
        position: 'right',
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: true,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    }
})(jQuery);
/*!
 * Masonry PACKAGED v3.1.5
 */
(function(window) {
    var slice = Array.prototype.slice;

    function noop() {}

    function defineBridget($) {
        if (!$) {
            return
        }

        function addOptionMethod(PluginClass) {
            if (PluginClass.prototype.option) {
                return
            }
            PluginClass.prototype.option = function(opts) {
                if (!$.isPlainObject(opts)) {
                    return
                }
                this.options = $.extend(true, this.options, opts)
            }
        }
        var logError = typeof console === "undefined" ? noop : function(message) {
            console.error(message)
        };

        function bridge(namespace, PluginClass) {
            $.fn[namespace] = function(options) {
                if (typeof options === "string") {
                    var args = slice.call(arguments, 1);
                    for (var i = 0, len = this.length; i < len; i++) {
                        var elem = this[i];
                        var instance = $.data(elem, namespace);
                        if (!instance) {
                            logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
                            continue
                        }
                        if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                            logError("no such method '" + options + "' for " + namespace + " instance");
                            continue
                        }
                        var returnValue = instance[options].apply(instance, args);
                        if (returnValue !== undefined) {
                            return returnValue
                        }
                    }
                    return this
                } else {
                    return this.each(function() {
                        var instance = $.data(this, namespace);
                        if (instance) {
                            instance.option(options);
                            instance._init()
                        } else {
                            instance = new PluginClass(this, options);
                            $.data(this, namespace, instance)
                        }
                    })
                }
            }
        }
        $.bridget = function(namespace, PluginClass) {
            addOptionMethod(PluginClass);
            bridge(namespace, PluginClass)
        };
        return $.bridget
    }
    if (typeof define === "function" && define.amd) {
        define("jquery-bridget/jquery.bridget", ["jquery"], defineBridget)
    } else {
        defineBridget(window.jQuery)
    }
})(window);
/*!
 * eventie v1.0.5
 */
(function(window) {
    var docElem = document.documentElement;
    var bind = function() {};

    function getIEEvent(obj) {
        var event = window.event;
        event.target = event.target || event.srcElement || obj;
        return event
    }
    if (docElem.addEventListener) {
        bind = function(obj, type, fn) {
            obj.addEventListener(type, fn, false)
        }
    } else {
        if (docElem.attachEvent) {
            bind = function(obj, type, fn) {
                obj[type + fn] = fn.handleEvent ? function() {
                    var event = getIEEvent(obj);
                    fn.handleEvent.call(fn, event)
                } : function() {
                    var event = getIEEvent(obj);
                    fn.call(obj, event)
                };
                obj.attachEvent("on" + type, obj[type + fn])
            }
        }
    }
    var unbind = function() {};
    if (docElem.removeEventListener) {
        unbind = function(obj, type, fn) {
            obj.removeEventListener(type, fn, false)
        }
    } else {
        if (docElem.detachEvent) {
            unbind = function(obj, type, fn) {
                obj.detachEvent("on" + type, obj[type + fn]);
                try {
                    delete obj[type + fn]
                } catch (err) {
                    obj[type + fn] = undefined
                }
            }
        }
    }
    var eventie = {
        bind: bind,
        unbind: unbind
    };
    if (typeof define === "function" && define.amd) {
        define("eventie/eventie", eventie)
    } else {
        if (typeof exports === "object") {
            module.exports = eventie
        } else {
            window.eventie = eventie
        }
    }
})(this);
/*!
 * docReady
 */
(function(window) {
    var document = window.document;
    var queue = [];

    function docReady(fn) {
        if (typeof fn !== "function") {
            return
        }
        if (docReady.isReady) {
            fn()
        } else {
            queue.push(fn)
        }
    }
    docReady.isReady = false;

    function init(event) {
        var isIE8NotReady = event.type === "readystatechange" && document.readyState !== "complete";
        if (docReady.isReady || isIE8NotReady) {
            return
        }
        docReady.isReady = true;
        for (var i = 0, len = queue.length; i < len; i++) {
            var fn = queue[i];
            fn()
        }
    }

    function defineDocReady(eventie) {
        eventie.bind(document, "DOMContentLoaded", init);
        eventie.bind(document, "readystatechange", init);
        eventie.bind(window, "load", init);
        return docReady
    }
    if (typeof define === "function" && define.amd) {
        docReady.isReady = typeof requirejs === "function";
        define("doc-ready/doc-ready", ["eventie/eventie"], defineDocReady)
    } else {
        window.docReady = defineDocReady(window.eventie)
    }
})(this);
/*!
 * EventEmitter v4.2.7 - git.io/ee
 */
(function() {
    function EventEmitter() {}
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i
            }
        }
        return -1
    }

    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments)
        }
    }
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key]
                }
            }
        } else {
            response = events[evt] || (events[evt] = [])
        }
        return response
    };
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener)
        }
        return flatListeners
    };
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners
        }
        return response || listeners
    };
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === "object";
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                })
            }
        }
        return this
    };
    proto.on = alias("addListener");
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        })
    };
    proto.once = alias("addOnceListener");
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this
    };
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i])
        }
        return this
    };
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);
                if (index !== -1) {
                    listeners[key].splice(index, 1)
                }
            }
        }
        return this
    };
    proto.off = alias("removeListener");
    proto.addListeners = function addListeners(evt, listeners) {
        return this.manipulateListeners(false, evt, listeners)
    };
    proto.removeListeners = function removeListeners(evt, listeners) {
        return this.manipulateListeners(true, evt, listeners)
    };
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if (typeof evt === "object" && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    if (typeof value === "function") {
                        single.call(this, i, value)
                    } else {
                        multiple.call(this, i, value)
                    }
                }
            }
        } else {
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i])
            }
        }
        return this
    };
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;
        if (type === "string") {
            delete events[evt]
        } else {
            if (evt instanceof RegExp) {
                for (key in events) {
                    if (events.hasOwnProperty(key) && evt.test(key)) {
                        delete events[key]
                    }
                }
            } else {
                delete this._events
            }
        }
        return this
    };
    proto.removeAllListeners = alias("removeEvent");
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;
                while (i--) {
                    listener = listeners[key][i];
                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener)
                    }
                    response = listener.listener.apply(this, args || []);
                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener)
                    }
                }
            }
        }
        return this
    };
    proto.trigger = alias("emitEvent");
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args)
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this
    };
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty("_onceReturnValue")) {
            return this._onceReturnValue
        } else {
            return true
        }
    };
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {})
    };
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter
    };
    if (typeof define === "function" && define.amd) {
        define("eventEmitter/EventEmitter", [], function() {
            return EventEmitter
        })
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = EventEmitter
        } else {
            this.EventEmitter = EventEmitter
        }
    }
}.call(this));
/*!
 * getStyleProperty v1.0.3
 */
(function(window) {
    var prefixes = "Webkit Moz ms Ms O".split(" ");
    var docElemStyle = document.documentElement.style;

    function getStyleProperty(propName) {
        if (!propName) {
            return
        }
        if (typeof docElemStyle[propName] === "string") {
            return propName
        }
        propName = propName.charAt(0).toUpperCase() + propName.slice(1);
        var prefixed;
        for (var i = 0, len = prefixes.length; i < len; i++) {
            prefixed = prefixes[i] + propName;
            if (typeof docElemStyle[prefixed] === "string") {
                return prefixed
            }
        }
    }
    if (typeof define === "function" && define.amd) {
        define("get-style-property/get-style-property", [], function() {
            return getStyleProperty
        })
    } else {
        if (typeof exports === "object") {
            module.exports = getStyleProperty
        } else {
            window.getStyleProperty = getStyleProperty
        }
    }
})(window);
(function(window, undefined) {
    var getComputedStyle = window.getComputedStyle;
    var getStyle = getComputedStyle ? function(elem) {
        return getComputedStyle(elem, null)
    } : function(elem) {
        return elem.currentStyle
    };

    function getStyleSize(value) {
        var num = parseFloat(value);
        var isValid = value.indexOf("%") === -1 && !isNaN(num);
        return isValid && num
    }
    var measurements = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0, len = measurements.length; i < len; i++) {
            var measurement = measurements[i];
            size[measurement] = 0
        }
        return size
    }

    function defineGetSize(getStyleProperty) {
        var boxSizingProp = getStyleProperty("boxSizing");
        var isBoxSizeOuter;
        (function() {
            if (!boxSizingProp) {
                return
            }
            var div = document.createElement("div");
            div.style.width = "200px";
            div.style.padding = "1px 2px 3px 4px";
            div.style.borderStyle = "solid";
            div.style.borderWidth = "1px 2px 3px 4px";
            div.style[boxSizingProp] = "border-box";
            var body = document.body || document.documentElement;
            body.appendChild(div);
            var style = getStyle(div);
            isBoxSizeOuter = getStyleSize(style.width) === 200;
            body.removeChild(div)
        })();

        function getSize(elem) {
            if (typeof elem === "string") {
                elem = document.querySelector(elem)
            }
            if (!elem || typeof elem !== "object" || !elem.nodeType) {
                return
            }
            var style = getStyle(elem);
            if (style.display === "none") {
                return getZeroSize()
            }
            var size = {};
            size.width = elem.offsetWidth;
            size.height = elem.offsetHeight;
            var isBorderBox = size.isBorderBox = !!(boxSizingProp && style[boxSizingProp] && style[boxSizingProp] === "border-box");
            for (var i = 0, len = measurements.length; i < len; i++) {
                var measurement = measurements[i];
                var value = style[measurement];
                value = mungeNonPixel(elem, value);
                var num = parseFloat(value);
                size[measurement] = !isNaN(num) ? num : 0
            }
            var paddingWidth = size.paddingLeft + size.paddingRight;
            var paddingHeight = size.paddingTop + size.paddingBottom;
            var marginWidth = size.marginLeft + size.marginRight;
            var marginHeight = size.marginTop + size.marginBottom;
            var borderWidth = size.borderLeftWidth + size.borderRightWidth;
            var borderHeight = size.borderTopWidth + size.borderBottomWidth;
            var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
            var styleWidth = getStyleSize(style.width);
            if (styleWidth !== false) {
                size.width = styleWidth + (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth)
            }
            var styleHeight = getStyleSize(style.height);
            if (styleHeight !== false) {
                size.height = styleHeight + (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight)
            }
            size.innerWidth = size.width - (paddingWidth + borderWidth);
            size.innerHeight = size.height - (paddingHeight + borderHeight);
            size.outerWidth = size.width + marginWidth;
            size.outerHeight = size.height + marginHeight;
            return size
        }

        function mungeNonPixel(elem, value) {
            if (getComputedStyle || value.indexOf("%") === -1) {
                return value
            }
            var style = elem.style;
            var left = style.left;
            var rs = elem.runtimeStyle;
            var rsLeft = rs && rs.left;
            if (rsLeft) {
                rs.left = elem.currentStyle.left
            }
            style.left = value;
            value = style.pixelLeft;
            style.left = left;
            if (rsLeft) {
                rs.left = rsLeft
            }
            return value
        }
        return getSize
    }
    if (typeof define === "function" && define.amd) {
        define("get-size/get-size", ["get-style-property/get-style-property"], defineGetSize)
    } else {
        if (typeof exports === "object") {
            module.exports = defineGetSize(require("get-style-property"))
        } else {
            window.getSize = defineGetSize(window.getStyleProperty)
        }
    }
})(window);
(function(global, ElemProto) {
    var matchesMethod = (function() {
        if (ElemProto.matchesSelector) {
            return "matchesSelector"
        }
        var prefixes = ["webkit", "moz", "ms", "o"];
        for (var i = 0, len = prefixes.length; i < len; i++) {
            var prefix = prefixes[i];
            var method = prefix + "MatchesSelector";
            if (ElemProto[method]) {
                return method
            }
        }
    })();

    function match(elem, selector) {
        return elem[matchesMethod](selector)
    }

    function checkParent(elem) {
        if (elem.parentNode) {
            return
        }
        var fragment = document.createDocumentFragment();
        fragment.appendChild(elem)
    }

    function query(elem, selector) {
        checkParent(elem);
        var elems = $(elem.parentNode).find(selector);
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i] === elem) {
                return true
            }
        }
        return false
    }

    function matchChild(elem, selector) {
        checkParent(elem);
        return match(elem, selector)
    }
    var matchesSelector;
    if (matchesMethod) {
        var div = document.createElement("div");
        var supportsOrphans = match(div, "div");
        matchesSelector = supportsOrphans ? match : matchChild
    } else {
        matchesSelector = query
    }
    if (typeof define === "function" && define.amd) {
        define("matches-selector/matches-selector", [], function() {
            return matchesSelector
        })
    } else {
        window.matchesSelector = matchesSelector
    }
})(this, typeof Element !== "undefined" ? Element.prototype : {});
(function(window) {
    var getComputedStyle = window.getComputedStyle;
    var getStyle = getComputedStyle ? function(elem) {
        return getComputedStyle(elem, null)
    } : function(elem) {
        return elem.currentStyle
    };

    function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop]
        }
        return a
    }

    function isEmptyObj(obj) {
        for (var prop in obj) {
            return false
        }
        prop = null;
        return true
    }

    function toDash(str) {
        return str.replace(/([A-Z])/g, function($1) {
            return "-" + $1.toLowerCase()
        })
    }

    function outlayerItemDefinition(EventEmitter, getSize, getStyleProperty) {
        var transitionProperty = getStyleProperty("transition");
        var transformProperty = getStyleProperty("transform");
        var supportsCSS3 = transitionProperty && transformProperty;
        var is3d = !!getStyleProperty("perspective");
        var transitionEndEvent = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }[transitionProperty];
        var prefixableProperties = ["transform", "transition", "transitionDuration", "transitionProperty"];
        var vendorProperties = (function() {
            var cache = {};
            for (var i = 0, len = prefixableProperties.length; i < len; i++) {
                var prop = prefixableProperties[i];
                var supportedProp = getStyleProperty(prop);
                if (supportedProp && supportedProp !== prop) {
                    cache[prop] = supportedProp
                }
            }
            return cache
        })();

        function Item(element, layout) {
            if (!element) {
                return
            }
            this.element = element;
            this.layout = layout;
            this.position = {
                x: 0,
                y: 0
            };
            this._create()
        }
        extend(Item.prototype, EventEmitter.prototype);
        Item.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            };
            this.css({
                position: "absolute"
            })
        };
        Item.prototype.handleEvent = function(event) {
            var method = "on" + event.type;
            if (this[method]) {
                this[method](event)
            }
        };
        Item.prototype.getSize = function() {
            this.size = getSize(this.element)
        };
        Item.prototype.css = function(style) {
            var elemStyle = this.element.style;
            for (var prop in style) {
                var supportedProp = vendorProperties[prop] || prop;
                elemStyle[supportedProp] = style[prop]
            }
        };
        Item.prototype.getPosition = function() {
            var style = getStyle(this.element);
            var layoutOptions = this.layout.options;
            var isOriginLeft = layoutOptions.isOriginLeft;
            var isOriginTop = layoutOptions.isOriginTop;
            var x = parseInt(style[isOriginLeft ? "left" : "right"], 10);
            var y = parseInt(style[isOriginTop ? "top" : "bottom"], 10);
            x = isNaN(x) ? 0 : x;
            y = isNaN(y) ? 0 : y;
            var layoutSize = this.layout.size;
            x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
            y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
            this.position.x = x;
            this.position.y = y
        };
        Item.prototype.layoutPosition = function() {
            var layoutSize = this.layout.size;
            var layoutOptions = this.layout.options;
            var style = {};
            if (layoutOptions.isOriginLeft) {
                style.left = (this.position.x + layoutSize.paddingLeft) + "px";
                style.right = ""
            } else {
                style.right = (this.position.x + layoutSize.paddingRight) + "px";
                style.left = ""
            }
            if (layoutOptions.isOriginTop) {
                style.top = (this.position.y + layoutSize.paddingTop) + "px";
                style.bottom = ""
            } else {
                style.bottom = (this.position.y + layoutSize.paddingBottom) + "px";
                style.top = ""
            }
            this.css(style);
            this.emitEvent("layout", [this])
        };
        var translate = is3d ? function(x, y) {
            return "translate3d(" + x + "px, " + y + "px, 0)"
        } : function(x, y) {
            return "translate(" + x + "px, " + y + "px)"
        };
        Item.prototype._transitionTo = function(x, y) {
            this.getPosition();
            var curX = this.position.x;
            var curY = this.position.y;
            var compareX = parseInt(x, 10);
            var compareY = parseInt(y, 10);
            var didNotMove = compareX === this.position.x && compareY === this.position.y;
            this.setPosition(x, y);
            if (didNotMove && !this.isTransitioning) {
                this.layoutPosition();
                return
            }
            var transX = x - curX;
            var transY = y - curY;
            var transitionStyle = {};
            var layoutOptions = this.layout.options;
            transX = layoutOptions.isOriginLeft ? transX : -transX;
            transY = layoutOptions.isOriginTop ? transY : -transY;
            transitionStyle.transform = translate(transX, transY);
            this.transition({
                to: transitionStyle,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: true
            })
        };
        Item.prototype.goTo = function(x, y) {
            this.setPosition(x, y);
            this.layoutPosition()
        };
        Item.prototype.moveTo = supportsCSS3 ? Item.prototype._transitionTo : Item.prototype.goTo;
        Item.prototype.setPosition = function(x, y) {
            this.position.x = parseInt(x, 10);
            this.position.y = parseInt(y, 10)
        };
        Item.prototype._nonTransition = function(args) {
            this.css(args.to);
            if (args.isCleaning) {
                this._removeStyles(args.to)
            }
            for (var prop in args.onTransitionEnd) {
                args.onTransitionEnd[prop].call(this)
            }
        };
        Item.prototype._transition = function(args) {
            if (!parseFloat(this.layout.options.transitionDuration)) {
                this._nonTransition(args);
                return
            }
            var _transition = this._transn;
            for (var prop in args.onTransitionEnd) {
                _transition.onEnd[prop] = args.onTransitionEnd[prop]
            }
            for (prop in args.to) {
                _transition.ingProperties[prop] = true;
                if (args.isCleaning) {
                    _transition.clean[prop] = true
                }
            }
            if (args.from) {
                this.css(args.from);
                var h = this.element.offsetHeight;
                h = null
            }
            this.enableTransition(args.to);
            this.css(args.to);
            this.isTransitioning = true
        };
        var itemTransitionProperties = transformProperty && (toDash(transformProperty) + ",opacity");
        Item.prototype.enableTransition = function() {
            if (this.isTransitioning) {
                return
            }
            this.css({
                transitionProperty: itemTransitionProperties,
                transitionDuration: this.layout.options.transitionDuration
            });
            this.element.addEventListener(transitionEndEvent, this, false)
        };
        Item.prototype.transition = Item.prototype[transitionProperty ? "_transition" : "_nonTransition"];
        Item.prototype.onwebkitTransitionEnd = function(event) {
            this.ontransitionend(event)
        };
        Item.prototype.onotransitionend = function(event) {
            this.ontransitionend(event)
        };
        var dashedVendorProperties = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        Item.prototype.ontransitionend = function(event) {
            if (event.target !== this.element) {
                return
            }
            var _transition = this._transn;
            var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName;
            delete _transition.ingProperties[propertyName];
            if (isEmptyObj(_transition.ingProperties)) {
                this.disableTransition()
            }
            if (propertyName in _transition.clean) {
                this.element.style[event.propertyName] = "";
                delete _transition.clean[propertyName]
            }
            if (propertyName in _transition.onEnd) {
                var onTransitionEnd = _transition.onEnd[propertyName];
                onTransitionEnd.call(this);
                delete _transition.onEnd[propertyName]
            }
            this.emitEvent("transitionEnd", [this])
        };
        Item.prototype.disableTransition = function() {
            this.removeTransitionStyles();
            this.element.removeEventListener(transitionEndEvent, this, false);
            this.isTransitioning = false
        };
        Item.prototype._removeStyles = function(style) {
            var cleanStyle = {};
            for (var prop in style) {
                cleanStyle[prop] = ""
            }
            this.css(cleanStyle)
        };
        var cleanTransitionStyle = {
            transitionProperty: "",
            transitionDuration: ""
        };
        Item.prototype.removeTransitionStyles = function() {
            this.css(cleanTransitionStyle)
        };
        Item.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element);
            this.emitEvent("remove", [this])
        };
        Item.prototype.remove = function() {
            if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
                this.removeElem();
                return
            }
            var _this = this;
            this.on("transitionEnd", function() {
                _this.removeElem();
                return true
            });
            this.hide()
        };
        Item.prototype.reveal = function() {
            delete this.isHidden;
            this.css({
                display: ""
            });
            var options = this.layout.options;
            this.transition({
                from: options.hiddenStyle,
                to: options.visibleStyle,
                isCleaning: true
            })
        };
        Item.prototype.hide = function() {
            this.isHidden = true;
            this.css({
                display: ""
            });
            var options = this.layout.options;
            this.transition({
                from: options.visibleStyle,
                to: options.hiddenStyle,
                isCleaning: true,
                onTransitionEnd: {
                    opacity: function() {
                        if (this.isHidden) {
                            this.css({
                                display: "none"
                            })
                        }
                    }
                }
            })
        };
        Item.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        };
        return Item
    }
    if (typeof define === "function" && define.amd) {
        define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], outlayerItemDefinition)
    } else {
        window.Outlayer = {};
        window.Outlayer.Item = outlayerItemDefinition(window.EventEmitter, window.getSize, window.getStyleProperty)
    }
})(window);
/*!
 * Outlayer v1.2.0
 */
(function(window) {
    var document = window.document;
    var console = window.console;
    var jQuery = window.jQuery;
    var noop = function() {};

    function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop]
        }
        return a
    }
    var objToString = Object.prototype.toString;

    function isArray(obj) {
        return objToString.call(obj) === "[object Array]"
    }

    function makeArray(obj) {
        var ary = [];
        if (isArray(obj)) {
            ary = obj
        } else {
            if (obj && typeof obj.length === "number") {
                for (var i = 0, len = obj.length; i < len; i++) {
                    ary.push(obj[i])
                }
            } else {
                ary.push(obj)
            }
        }
        return ary
    }
    var isElement = (typeof HTMLElement === "object") ? function isElementDOM2(obj) {
        return obj instanceof HTMLElement
    } : function isElementQuirky(obj) {
        return obj && typeof obj === "object" && obj.nodeType === 1 && typeof obj.nodeName === "string"
    };
    var indexOf = Array.prototype.indexOf ? function(ary, obj) {
        return ary.indexOf(obj)
    } : function(ary, obj) {
        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i] === obj) {
                return i
            }
        }
        return -1
    };

    function removeFrom(obj, ary) {
        var index = indexOf(ary, obj);
        if (index !== -1) {
            ary.splice(index, 1)
        }
    }

    function toDashed(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + "-" + $2
        }).toLowerCase()
    }

    function outlayerDefinition(eventie, docReady, EventEmitter, getSize, matchesSelector, Item) {
        var GUID = 0;
        var instances = {};

        function Outlayer(element, options) {
            if (typeof element === "string") {
                element = document.querySelector(element)
            }
            if (!element || !isElement(element)) {
                if (console) {
                    console.error("Bad " + this.constructor.namespace + " element: " + element)
                }
                return
            }
            this.element = element;
            this.options = extend({}, this.constructor.defaults);
            this.option(options);
            var id = ++GUID;
            this.element.outlayerGUID = id;
            instances[id] = this;
            this._create();
            if (this.options.isInitLayout) {
                this.layout()
            }
        }
        Outlayer.namespace = "outlayer";
        Outlayer.Item = Item;
        Outlayer.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: true,
            isOriginLeft: true,
            isOriginTop: true,
            isResizeBound: true,
            isResizingContainer: true,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        };
        extend(Outlayer.prototype, EventEmitter.prototype);
        Outlayer.prototype.option = function(opts) {
            extend(this.options, opts)
        };
        Outlayer.prototype._create = function() {
            this.reloadItems();
            this.stamps = [];
            this.stamp(this.options.stamp);
            extend(this.element.style, this.options.containerStyle);
            if (this.options.isResizeBound) {
                this.bindResize()
            }
        };
        Outlayer.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        };
        Outlayer.prototype._itemize = function(elems) {
            var itemElems = this._filterFindItemElements(elems);
            var Item = this.constructor.Item;
            var items = [];
            for (var i = 0, len = itemElems.length; i < len; i++) {
                var elem = itemElems[i];
                var item = new Item(elem, this);
                items.push(item)
            }
            return items
        };
        Outlayer.prototype._filterFindItemElements = function(elems) {
            elems = makeArray(elems);
            var itemSelector = this.options.itemSelector;
            var itemElems = [];
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                if (!isElement(elem)) {
                    continue
                }
                if (itemSelector) {
                    if (matchesSelector(elem, itemSelector)) {
                        itemElems.push(elem)
                    }
                    var childElems = $(elem).find(itemSelector);
                    for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                        itemElems.push(childElems[j])
                    }
                } else {
                    itemElems.push(elem)
                }
            }
            return itemElems
        };
        Outlayer.prototype.getItemElements = function() {
            var elems = [];
            for (var i = 0, len = this.items.length; i < len; i++) {
                elems.push(this.items[i].element)
            }
            return elems
        };
        Outlayer.prototype.layout = function() {
            this._resetLayout();
            this._manageStamps();
            var isInstant = this.options.isLayoutInstant !== undefined ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, isInstant);
            this._isLayoutInited = true
        };
        Outlayer.prototype._init = Outlayer.prototype.layout;
        Outlayer.prototype._resetLayout = function() {
            this.getSize()
        };
        Outlayer.prototype.getSize = function() {
            this.size = getSize(this.element)
        };
        Outlayer.prototype._getMeasurement = function(measurement, size) {
            var option = this.options[measurement];
            var elem;
            if (!option) {
                this[measurement] = 0
            } else {
                if (typeof option === "string") {
                    elem = this.element.querySelector(option)
                } else {
                    if (isElement(option)) {
                        elem = option
                    }
                }
                this[measurement] = elem ? getSize(elem)[size] : option
            }
        };
        Outlayer.prototype.layoutItems = function(items, isInstant) {
            items = this._getItemsForLayout(items);
            this._layoutItems(items, isInstant);
            this._postLayout()
        };
        Outlayer.prototype._getItemsForLayout = function(items) {
            var layoutItems = [];
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                if (!item.isIgnored) {
                    layoutItems.push(item)
                }
            }
            return layoutItems
        };
        Outlayer.prototype._layoutItems = function(items, isInstant) {
            var _this = this;

            function onItemsLayout() {
                _this.emitEvent("layoutComplete", [_this, items])
            }
            if (!items || !items.length) {
                onItemsLayout();
                return
            }
            this._itemsOn(items, "layout", onItemsLayout);
            var queue = [];
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                var position = this._getItemLayoutPosition(item);
                position.item = item;
                position.isInstant = isInstant || item.isLayoutInstant;
                queue.push(position)
            }
            this._processLayoutQueue(queue)
        };
        Outlayer.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        };
        Outlayer.prototype._processLayoutQueue = function(queue) {
            for (var i = 0, len = queue.length; i < len; i++) {
                var obj = queue[i];
                this._positionItem(obj.item, obj.x, obj.y, obj.isInstant)
            }
        };
        Outlayer.prototype._positionItem = function(item, x, y, isInstant) {
            if (isInstant) {
                item.goTo(x, y)
            } else {
                item.moveTo(x, y)
            }
        };
        Outlayer.prototype._postLayout = function() {
            this.resizeContainer()
        };
        Outlayer.prototype.resizeContainer = function() {
            if (!this.options.isResizingContainer) {
                return
            }
            var size = this._getContainerSize();
            if (size) {
                this._setContainerMeasure(size.width, true);
                this._setContainerMeasure(size.height, false)
            }
        };
        Outlayer.prototype._getContainerSize = noop;
        Outlayer.prototype._setContainerMeasure = function(measure, isWidth) {
            if (measure === undefined) {
                return
            }
            var elemSize = this.size;
            if (elemSize.isBorderBox) {
                measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth
            }
            measure = Math.max(measure, 0);
            this.element.style[isWidth ? "width" : "height"] = measure + "px"
        };
        Outlayer.prototype._itemsOn = function(items, eventName, callback) {
            var doneCount = 0;
            var count = items.length;
            var _this = this;

            function tick() {
                doneCount++;
                if (doneCount === count) {
                    callback.call(_this)
                }
                return true
            }
            for (var i = 0, len = items.length; i < len; i++) {
                var item = items[i];
                item.on(eventName, tick)
            }
        };
        Outlayer.prototype.ignore = function(elem) {
            var item = this.getItem(elem);
            if (item) {
                item.isIgnored = true
            }
        };
        Outlayer.prototype.unignore = function(elem) {
            var item = this.getItem(elem);
            if (item) {
                delete item.isIgnored
            }
        };
        Outlayer.prototype.stamp = function(elems) {
            elems = this._find(elems);
            if (!elems) {
                return
            }
            this.stamps = this.stamps.concat(elems);
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                this.ignore(elem)
            }
        };
        Outlayer.prototype.unstamp = function(elems) {
            elems = this._find(elems);
            if (!elems) {
                return
            }
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                removeFrom(elem, this.stamps);
                this.unignore(elem)
            }
        };
        Outlayer.prototype._find = function(elems) {
            if (!elems) {
                return
            }
            if (typeof elems === "string") {
                elems = $(this.element).find(elems)
            }
            elems = makeArray(elems);
            return elems
        };
        Outlayer.prototype._manageStamps = function() {
            if (!this.stamps || !this.stamps.length) {
                return
            }
            this._getBoundingRect();
            for (var i = 0, len = this.stamps.length; i < len; i++) {
                var stamp = this.stamps[i];
                this._manageStamp(stamp)
            }
        };
        Outlayer.prototype._getBoundingRect = function() {
            var boundingRect = this.element.getBoundingClientRect();
            var size = this.size;
            this._boundingRect = {
                left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
                top: boundingRect.top + size.paddingTop + size.borderTopWidth,
                right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
                bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
            }
        };
        Outlayer.prototype._manageStamp = noop;
        Outlayer.prototype._getElementOffset = function(elem) {
            var boundingRect = elem.getBoundingClientRect();
            var thisRect = this._boundingRect;
            var size = getSize(elem);
            var offset = {
                left: boundingRect.left - thisRect.left - size.marginLeft,
                top: boundingRect.top - thisRect.top - size.marginTop,
                right: thisRect.right - boundingRect.right - size.marginRight,
                bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
            };
            return offset
        };
        Outlayer.prototype.handleEvent = function(event) {
            var method = "on" + event.type;
            if (this[method]) {
                this[method](event)
            }
        };
        Outlayer.prototype.bindResize = function() {
            if (this.isResizeBound) {
                return
            }
            eventie.bind(window, "resize", this);
            this.isResizeBound = true
        };
        Outlayer.prototype.unbindResize = function() {
            if (this.isResizeBound) {
                eventie.unbind(window, "resize", this)
            }
            this.isResizeBound = false
        };
        Outlayer.prototype.onresize = function() {
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout)
            }
            var _this = this;

            function delayed() {
                _this.resize();
                delete _this.resizeTimeout
            }
            this.resizeTimeout = setTimeout(delayed, 100)
        };
        Outlayer.prototype.resize = function() {
            if (!this.isResizeBound || !this.needsResizeLayout()) {
                return
            }
            this.layout()
        };
        Outlayer.prototype.needsResizeLayout = function() {
            var size = getSize(this.element);
            var hasSizes = this.size && size;
            return hasSizes && size.innerWidth !== this.size.innerWidth
        };
        Outlayer.prototype.addItems = function(elems) {
            var items = this._itemize(elems);
            if (items.length) {
                this.items = this.items.concat(items)
            }
            return items
        };
        Outlayer.prototype.appended = function(elems) {
            var items = this.addItems(elems);
            if (!items.length) {
                return
            }
            this.layoutItems(items, true);
            this.reveal(items)
        };
        Outlayer.prototype.prepended = function(elems) {
            var items = this._itemize(elems);
            if (!items.length) {
                return
            }
            var previousItems = this.items.slice(0);
            this.items = items.concat(previousItems);
            this._resetLayout();
            this._manageStamps();
            this.layoutItems(items, true);
            this.reveal(items);
            this.layoutItems(previousItems)
        };
        Outlayer.prototype.reveal = function(items) {
            var len = items && items.length;
            if (!len) {
                return
            }
            for (var i = 0; i < len; i++) {
                var item = items[i];
                item.reveal()
            }
        };
        Outlayer.prototype.hide = function(items) {
            var len = items && items.length;
            if (!len) {
                return
            }
            for (var i = 0; i < len; i++) {
                var item = items[i];
                item.hide()
            }
        };
        Outlayer.prototype.getItem = function(elem) {
            for (var i = 0, len = this.items.length; i < len; i++) {
                var item = this.items[i];
                if (item.element === elem) {
                    return item
                }
            }
        };
        Outlayer.prototype.getItems = function(elems) {
            if (!elems || !elems.length) {
                return
            }
            var items = [];
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                var item = this.getItem(elem);
                if (item) {
                    items.push(item)
                }
            }
            return items
        };
        Outlayer.prototype.remove = function(elems) {
            elems = makeArray(elems);
            var removeItems = this.getItems(elems);
            if (!removeItems || !removeItems.length) {
                return
            }
            this._itemsOn(removeItems, "remove", function() {
                this.emitEvent("removeComplete", [this, removeItems])
            });
            for (var i = 0, len = removeItems.length; i < len; i++) {
                var item = removeItems[i];
                item.remove();
                removeFrom(item, this.items)
            }
        };
        Outlayer.prototype.destroy = function() {
            var style = this.element.style;
            style.height = "";
            style.position = "";
            style.width = "";
            for (var i = 0, len = this.items.length; i < len; i++) {
                var item = this.items[i];
                item.destroy()
            }
            this.unbindResize();
            delete this.element.outlayerGUID;
            if (jQuery) {
                jQuery.removeData(this.element, this.constructor.namespace)
            }
        };
        Outlayer.data = function(elem) {
            var id = elem && elem.outlayerGUID;
            return id && instances[id]
        };
        Outlayer.create = function(namespace, options) {
            function Layout() {
                Outlayer.apply(this, arguments)
            }
            if (Object.create) {
                Layout.prototype = Object.create(Outlayer.prototype)
            } else {
                extend(Layout.prototype, Outlayer.prototype)
            }
            Layout.prototype.constructor = Layout;
            Layout.defaults = extend({}, Outlayer.defaults);
            extend(Layout.defaults, options);
            Layout.prototype.settings = {};
            Layout.namespace = namespace;
            Layout.data = Outlayer.data;
            Layout.Item = function LayoutItem() {
                Item.apply(this, arguments)
            };
            Layout.Item.prototype = new Item();
            docReady(function() {
                var dashedNamespace = toDashed(namespace);
                var elems = $(".js-" + dashedNamespace);
                var dataAttr = "data-" + dashedNamespace + "-options";
                for (var i = 0, len = elems.length; i < len; i++) {
                    var elem = elems[i];
                    var attr = elem.getAttribute(dataAttr);
                    var options;
                    try {
                        options = attr && JSON.parse(attr)
                    } catch (error) {
                        if (console) {
                            console.error("Error parsing " + dataAttr + " on " + elem.nodeName.toLowerCase() + (elem.id ? "#" + elem.id : "") + ": " + error)
                        }
                        continue
                    }
                    var instance = new Layout(elem, options);
                    if (jQuery) {
                        jQuery.data(elem, namespace, instance)
                    }
                }
            });
            if (jQuery && jQuery.bridget) {
                jQuery.bridget(namespace, Layout)
            }
            return Layout
        };
        Outlayer.Item = Item;
        return Outlayer
    }
    if (typeof define === "function" && define.amd) {
        define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], outlayerDefinition)
    } else {
        window.Outlayer = outlayerDefinition(window.eventie, window.docReady, window.EventEmitter, window.getSize, window.matchesSelector, window.Outlayer.Item)
    }
})(window);
/*!
 * Masonry v3.1.5
 */
(function(window) {
    var indexOf = Array.prototype.indexOf ? function(items, value) {
        return items.indexOf(value)
    } : function(items, value) {
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            if (item === value) {
                return i
            }
        }
        return -1
    };

    function masonryDefinition(Outlayer, getSize) {
        var Masonry = Outlayer.create("masonry");
        Masonry.prototype._resetLayout = function() {
            this.getSize();
            this._getMeasurement("columnWidth", "outerWidth");
            this._getMeasurement("gutter", "outerWidth");
            this.measureColumns();
            var i = this.cols;
            this.colYs = [];
            while (i--) {
                this.colYs.push(0)
            }
            this.maxY = 0
        };
        Masonry.prototype.measureColumns = function() {
            this.getContainerWidth();
            if (!this.columnWidth) {
                var firstItem = this.items[0];
                var firstItemElem = firstItem && firstItem.element;
                this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter;
            this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth);
            this.cols = Math.max(this.cols, 1)
        };
        Masonry.prototype.getContainerWidth = function() {
            var container = this.options.isFitWidth ? this.element.parentNode : this.element;
            var size = getSize(container);
            this.containerWidth = size && size.innerWidth
        };
        Masonry.prototype._getItemLayoutPosition = function(item) {
            item.getSize();
            var remainder = item.size.outerWidth % this.columnWidth;
            var mathMethod = remainder && remainder < 1 ? "round" : "ceil";
            var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
            colSpan = Math.min(colSpan, this.cols);
            var colGroup = this._getColGroup(colSpan);
            var minimumY = Math.min.apply(Math, colGroup);
            var shortColIndex = indexOf(colGroup, minimumY);
            var position = {
                x: this.columnWidth * shortColIndex,
                y: minimumY
            };
            var setHeight = minimumY + item.size.outerHeight;
            var setSpan = this.cols + 1 - colGroup.length;
            for (var i = 0; i < setSpan; i++) {
                this.colYs[shortColIndex + i] = setHeight
            }
            return position
        };
        Masonry.prototype._getColGroup = function(colSpan) {
            if (colSpan < 2) {
                return this.colYs
            }
            var colGroup = [];
            var groupCount = this.cols + 1 - colSpan;
            for (var i = 0; i < groupCount; i++) {
                var groupColYs = this.colYs.slice(i, i + colSpan);
                colGroup[i] = Math.max.apply(Math, groupColYs)
            }
            return colGroup
        };
        Masonry.prototype._manageStamp = function(stamp) {
            var stampSize = getSize(stamp);
            var offset = this._getElementOffset(stamp);
            var firstX = this.options.isOriginLeft ? offset.left : offset.right;
            var lastX = firstX + stampSize.outerWidth;
            var firstCol = Math.floor(firstX / this.columnWidth);
            firstCol = Math.max(0, firstCol);
            var lastCol = Math.floor(lastX / this.columnWidth);
            lastCol -= lastX % this.columnWidth ? 0 : 1;
            lastCol = Math.min(this.cols - 1, lastCol);
            var stampMaxY = (this.options.isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;
            for (var i = firstCol; i <= lastCol; i++) {
                this.colYs[i] = Math.max(stampMaxY, this.colYs[i])
            }
        };
        Masonry.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var size = {
                height: this.maxY
            };
            if (this.options.isFitWidth) {
                size.width = this._getContainerFitWidth()
            }
            return size
        };
        Masonry.prototype._getContainerFitWidth = function() {
            var unusedCols = 0;
            var i = this.cols;
            while (--i) {
                if (this.colYs[i] !== 0) {
                    break
                }
                unusedCols++
            }
            return (this.cols - unusedCols) * this.columnWidth - this.gutter
        };
        Masonry.prototype.needsResizeLayout = function() {
            var previousWidth = this.containerWidth;
            this.getContainerWidth();
            return previousWidth !== this.containerWidth
        };
        return Masonry
    }
    if (typeof define === "function" && define.amd) {
        define(["outlayer/outlayer", "get-size/get-size"], masonryDefinition)
    } else {
        window.Masonry = masonryDefinition(window.Outlayer, window.getSize)
    }
})(window);

/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 */
(function($) {
    var last_data = "";
    typeof $.browser == "undefined" && ($.browser = $.support), $.fn.extend({
        autocomplete: function(urlOrData, options) {
            var isUrl = typeof urlOrData == "string";
            return options = $.extend({}, $.Autocompleter.defaults, {
                url: isUrl ? urlOrData : null,
                data: isUrl ? null : urlOrData,
                delay: isUrl ? $.Autocompleter.defaults.delay : 10,
                max: options && !options.scroll ? 10 : 150
            }, options), options.highlight = options.highlight || function(value) {
                return value
            }, options.formatMatch = options.formatMatch || options.formatItem, this.each(function() {
                new $.Autocompleter(this, options)
            })
        },
        result: function(handler) {
            return this.bind("result", handler)
        },
        search: function(handler) {
            return this.trigger("search", [handler])
        },
        flushCache: function() {
            return this.trigger("flushCache")
        },
        setOptions: function(options) {
            return this.trigger("setOptions", [options])
        },
        unautocomplete: function() {
            return this.trigger("unautocomplete")
        }
    }), $.Autocompleter = function(input, options) {
        function selectCurrent() {
            var selected = select.selected();
            if (!selected) return !1;
            var v = selected.result;
            previousValue = v;
            if (options.multiple) {
                var words = trimWords($input.val());
                if (words.length > 1) {
                    var seperator = options.multipleSeparator.length,
                        cursorAt = $(input).selection().start,
                        wordAt, progress = 0;
                    $.each(words, function(i, word) {
                        progress += word.length;
                        if (cursorAt <= progress) return wordAt = i, !1;
                        progress += seperator
                    }), words[wordAt] = v, v = words.join(options.multipleSeparator)
                }
                v += options.multipleSeparator
            }
            return $input.val(v), hideResultsNow(), $input.trigger("result", [selected.data, selected.value]), options.resultUrl != "" ? (typeof $.cookie == "function" && $.cookie("autocomplete_words", v), window.location.href = options.resultUrl + encodeURIComponent(v), !0) : !0
        }

        function onChange(crap, skipPrevCheck) {
            if (lastKeyPressCode == KEY.DEL) {
                select.hide();
                return
            }
            var currentValue = $input.val();
            if (!skipPrevCheck && currentValue == previousValue) return;
            previousValue = currentValue, currentValue = lastWord(currentValue), currentValue.length >= options.minChars ? ($input.addClass(options.loadingClass), options.matchCase || (currentValue = currentValue.toLowerCase()), request(currentValue, receiveData, hideResultsNow)) : (stopLoading(), select.hide())
        }

        function trimWords(value) {
            return value ? options.multiple ? $.map(value.split(options.multipleSeparator), function(word) {
                return $.trim(value).length ? $.trim(word) : null
            }) : [$.trim(value)] : [""]
        }

        function lastWord(value) {
            if (!options.multiple) return value;
            var words = trimWords(value);
            if (words.length == 1) return words[0];
            var cursorAt = $(input).selection().start;
            return cursorAt == value.length ? words = trimWords(value) : words = trimWords(value.replace(value.substring(cursorAt), "")), words[words.length - 1]
        }

        function autoFill(q, sValue) {
            options.autoFill && lastWord($input.val()).toLowerCase() == q.toLowerCase() && lastKeyPressCode != KEY.BACKSPACE && ($input.val($input.val() + sValue.substring(lastWord(previousValue).length)), $(input).selection(previousValue.length, previousValue.length + sValue.length))
        }

        function hideResults() {
            clearTimeout(timeout), timeout = setTimeout(hideResultsNow, 200)
        }

        function hideResultsNow() {
            var wasVisible = select.visible();
            select.hide(), clearTimeout(timeout), stopLoading(), options.mustMatch && $input.search(function(result) {
                if (!result)
                    if (options.multiple) {
                        var words = trimWords($input.val()).slice(0, -1);
                        $input.val(words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : ""))
                    } else $input.val(""), $input.trigger("result", null)
            })
        }

        function receiveData(q, data) {
            data && data.length && hasFocus ? (stopLoading(), select.display(data, q), autoFill(q, data[0].value), select.show()) : hideResultsNow()
        }

        function request(term, success, failure) {
            options.matchCase || (term = term.toLowerCase());
            var data = cache.load(term);
            if (data && data.length) success(term, data);
            else if (typeof options.url == "string" && options.url.length > 0) {
                var extraParams = {
                    timestamp: +(new Date)
                };
                $.each(options.extraParams, function(key, param) {
                    extraParams[key] = typeof param == "function" ? param() : param
                }), $.ajax({
                    mode: "abort",
                    port: "autocomplete" + input.name,
                    dataType: options.dataType,
                    url: options.url,
                    data: $.extend({
                        q: lastWord(term),
                        limit: options.max
                    }, extraParams),
                    success: function(data) {
                        var parsed = options.parse && options.parse(data) || parse(data);
                        cache.add(term, parsed), success(term, parsed)
                    }
                })
            } else select.emptyList(), failure(term)
        }

        function parse(data) {
            var parsed = [],
                rows = data.split("\n");
            for (var i = 0; i < rows.length; i++) {
                var row = $.trim(rows[i]);
                row && (row = row.split("|"), parsed[parsed.length] = {
                    data: row,
                    value: row[0],
                    result: options.formatResult && options.formatResult(row, row[0]) || row[0]
                })
            }
            return parsed
        }

        function stopLoading() {
            $input.removeClass(options.loadingClass)
        }
        var KEY = {
                UP: 38,
                DOWN: 40,
                DEL: 46,
                TAB: 9,
                RETURN: 13,
                ESC: 27,
                COMMA: 188,
                PAGEUP: 33,
                PAGEDOWN: 34,
                BACKSPACE: 8
            },
            $input = $(input).attr("autocomplete", "off").addClass(options.inputClass),
            timeout, previousValue = "",
            cache = $.Autocompleter.Cache(options),
            hasFocus = 0,
            lastKeyPressCode, config = {
                mouseDownOnSelect: !1
            },
            select = $.Autocompleter.Select(options, input, selectCurrent, config),
            blockSubmit;
        $.browser.opera && $(input.form).bind("submit.autocomplete", function() {
            if (blockSubmit) return blockSubmit = !1, !1
        }), $input.bind(($.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
            hasFocus = 1, lastKeyPressCode = event.keyCode;
            switch (event.keyCode) {
                case KEY.UP:
                    event.preventDefault(), select.visible() ? select.prev() : onChange(0, !0);
                    break;
                case KEY.DOWN:
                    event.preventDefault(), select.visible() ? select.next() : onChange(0, !0);
                    break;
                case KEY.PAGEUP:
                    event.preventDefault(), select.visible() ? select.pageUp() : onChange(0, !0);
                    break;
                case KEY.PAGEDOWN:
                    event.preventDefault(), select.visible() ? select.pageDown() : onChange(0, !0);
                    break;
                case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
                case KEY.TAB:
                case KEY.RETURN:
                    if (selectCurrent()) return event.preventDefault(), blockSubmit = !0, !1;
                    break;
                case KEY.ESC:
                    select.hide();
                    break;
                default:
                    clearTimeout(timeout), timeout = setTimeout(onChange, options.delay)
            }
        }).focus(function() {
            hasFocus++
        }).blur(function() {
            hasFocus = 0, config.mouseDownOnSelect || hideResults()
        }).click(function() {
            hasFocus++ > 1 && !select.visible() && onChange(0, !0)
        }).bind("search", function() {
            function findValueCallback(q, data) {
                var result;
                if (data && data.length)
                    for (var i = 0; i < data.length; i++)
                        if (data[i].result.toLowerCase() == q.toLowerCase()) {
                            result = data[i];
                            break
                        }
                typeof fn == "function" ? fn(result) : $input.trigger("result", result && [result.data, result.value])
            }
            var fn = arguments.length > 1 ? arguments[1] : null;
            $.each(trimWords($input.val()), function(i, value) {
                request(value, findValueCallback, findValueCallback)
            })
        }).bind("flushCache", function() {
            cache.flush()
        }).bind("setOptions", function() {
            $.extend(options, arguments[1]), "data" in arguments[1] && cache.populate()
        }).bind("unautocomplete", function() {
            select.unbind(), $input.unbind(), $(input.form).unbind(".autocomplete")
        })
    }, $.Autocompleter.defaults = {
        inputClass: "ac_input",
        resultsClass: "ac_results",
        loadingClass: "ac_loading",
        minChars: 1,
        delay: 400,
        matchCase: !1,
        matchSubset: !0,
        matchContains: !1,
        cacheLength: 10,
        max: 100,
        mustMatch: !1,
        extraParams: {},
        selectFirst: !0,
        formatItem: function(row) {
            return row[0]
        },
        formatMatch: null,
        autoFill: !1,
        width: 0,
        multiple: !1,
        multipleSeparator: ", ",
        highlight: function(value, term) {
            return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>")
        },
        scroll: !0,
        scrollHeight: 180,
        resultUrl: ""
    }, $.Autocompleter.Cache = function(options) {
        function matchSubset(s, sub) {
            options.matchCase || (s = s.toLowerCase());
            var i = s.indexOf(sub);
            return options.matchContains == "word" && (i = s.toLowerCase().search("\\b" + sub.toLowerCase())), i == -1 ? !1 : i == 0 || options.matchContains
        }

        function add(q, value) {
            length > options.cacheLength && flush(), data[q] || length++, data[q] = value
        }

        function populate() {
            if (!options.data) return !1;
            var stMatchSets = {},
                nullData = 0;
            options.url || (options.cacheLength = 1), stMatchSets[""] = [];
            for (var i = 0, ol = options.data.length; i < ol; i++) {
                var rawValue = options.data[i];
                rawValue = typeof rawValue == "string" ? [rawValue] : rawValue;
                var value = options.formatMatch(rawValue, i + 1, options.data.length);
                if (value === !1) continue;
                var firstChar = value.charAt(0).toLowerCase();
                stMatchSets[firstChar] || (stMatchSets[firstChar] = []);
                var row = {
                    value: value,
                    data: rawValue,
                    result: options.formatResult && options.formatResult(rawValue) || value
                };
                stMatchSets[firstChar].push(row), nullData++ < options.max && stMatchSets[""].push(row)
            }
            $.each(stMatchSets, function(i, value) {
                options.cacheLength++, add(i, value)
            })
        }

        function flush() {
            data = {}, length = 0
        }
        var data = {},
            length = 0;
        return setTimeout(populate, 25), {
            flush: flush,
            add: add,
            populate: populate,
            load: function(q) {
                if (!options.cacheLength || !length) return null;
                if (!options.url && options.matchContains) {
                    var csub = [];
                    for (var k in data)
                        if (k.length > 0) {
                            var c = data[k];
                            $.each(c, function(i, x) {
                                matchSubset(x.value, q) && csub.push(x)
                            })
                        }
                    return csub
                }
                if (data[q]) return data[q];
                if (options.matchSubset)
                    for (var i = q.length - 1; i >= options.minChars; i--) {
                        var c = data[q.substr(0, i)];
                        if (c) {
                            var csub = [];
                            return $.each(c, function(i, x) {
                                matchSubset(x.value, q) && (csub[csub.length] = x)
                            }), csub
                        }
                    }
                return null
            }
        }
    }, $.Autocompleter.Select = function(options, input, select, config) {
        function init() {
            if (!needsInit) return;
            element = $("<div/>").hide().addClass(options.resultsClass).css("position", "absolute").appendTo(document.body), list = $("<ul/>").appendTo(element).mouseover(function(event) {
                target(event).nodeName && target(event).nodeName.toUpperCase() == "LI" && (active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event)), $(target(event)).addClass(CLASSES.ACTIVE))
            }).click(function(event) {
                return $(target(event)).addClass(CLASSES.ACTIVE), select(), input.focus(), !1
            }).mousedown(function() {
                config.mouseDownOnSelect = !0
            }).mouseup(function() {
                config.mouseDownOnSelect = !1
            }), options.width > 0 && element.css("width", options.width), needsInit = !1
        }

        function target(event) {
            var element = event.target;
            while (element && element.tagName != "LI") element = element.parentNode;
            return element ? element : []
        }

        function moveSelect(step) {
            listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE), movePosition(step);
            var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
            if (options.scroll) {
                var offset = 0;
                listItems.slice(0, active).each(function() {
                    offset += this.offsetHeight
                }), offset + activeItem[0].offsetHeight - list.scrollTop() > list[0].clientHeight ? list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight()) : offset < list.scrollTop() && list.scrollTop(offset)
            }
        }

        function movePosition(step) {
            active += step, active < 0 ? active = listItems.size() - 1 : active >= listItems.size() && (active = 0)
        }

        function limitNumberOfItems(available) {
            return options.max && options.max < available ? options.max : available
        }

        function fillList() {
            list.empty();
            var max = limitNumberOfItems(data.length);
            for (var i = 0; i < max; i++) {
                if (!data[i]) continue;
                var formatted = options.formatItem(data[i].data, i + 1, max, data[i].value, term);
                if (formatted === !1) continue;
                var li = $("<li/>").html(options.highlight(formatted, term)).addClass(i % 2 == 0 ? "ac_even" : "ac_odd").appendTo(list)[0];
                $.data(li, "ac_data", data[i])
            }
            listItems = list.find("li"), options.selectFirst && (active = 0), $.fn.bgiframe && list.bgiframe()
        }
        var CLASSES = {
                ACTIVE: "ac_over"
            },
            listItems, active = -1,
            data, term = "",
            needsInit = !0,
            element, list;
        return {
            display: function(d, q) {
                init(), data = d, term = q, fillList()
            },
            next: function() {
                moveSelect(1)
            },
            prev: function() {
                moveSelect(-1)
            },
            pageUp: function() {
                active != 0 && active - 8 < 0 ? moveSelect(-active) : moveSelect(-8)
            },
            pageDown: function() {
                active != listItems.size() - 1 && active + 8 > listItems.size() ? moveSelect(listItems.size() - 1 - active) : moveSelect(8)
            },
            hide: function() {
                element && element.hide(), listItems && listItems.removeClass(CLASSES.ACTIVE), active = -1
            },
            visible: function() {
                return element && element.is(":visible")
            },
            current: function() {
                return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0])
            },
            show: function() {
                var offset = $(input).offset();
                element.css({
                    width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).width(),
                    top: offset.top + input.offsetHeight,
                    left: offset.left
                }).show();
                if (options.scroll) {
                    list.scrollTop(0), list.css({
                        maxHeight: options.scrollHeight,
                        overflow: "auto"
                    });
                    if ($.browser.msie && typeof document.body.style.maxHeight == "undefined") {
                        var listHeight = 0;
                        listItems.each(function() {
                            listHeight += this.offsetHeight
                        });
                        var scrollbarsVisible = listHeight > options.scrollHeight;
                        list.css("height", scrollbarsVisible ? options.scrollHeight : listHeight), scrollbarsVisible || listItems.width(list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")))
                    }
                }
            },
            selected: function() {
                var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
                return selected && selected.length && $.data(selected[0], "ac_data")
            },
            emptyList: function() {
                list && list.empty()
            },
            unbind: function() {
                element && element.remove()
            }
        }
    }, $.fn.selection = function(start, end) {
        if (start !== undefined) return this.each(function() {
            if (this.createTextRange) {
                var selRange = this.createTextRange();
                end === undefined || start == end ? (selRange.move("character", start), selRange.select()) : (selRange.collapse(!0), selRange.moveStart("character", start), selRange.moveEnd("character", end), selRange.select())
            } else this.setSelectionRange ? this.setSelectionRange(start, end) : this.selectionStart && (this.selectionStart = start, this.selectionEnd = end)
        });
        var field = this[0];
        if (field.createTextRange) {
            var range = document.selection.createRange(),
                orig = field.value,
                teststring = "<->",
                textLength = range.text.length;
            range.text = teststring;
            var caretAt = field.value.indexOf(teststring);
            return field.value = orig, this.selection(caretAt, caretAt + textLength), {
                start: caretAt,
                end: caretAt + textLength
            }
        }
        if (field.selectionStart !== undefined) return {
            start: field.selectionStart,
            end: field.selectionEnd
        }
    }
})(jQuery)
//fav
function fav(c) {
    var d = $(c).attr("id"),
        b = $(c).attr("type"),
        a = $(c).attr("status");
    $.ajax({
        url: "fav.a.asp?act=favs",
        type: "POST",
        dataType: "html",
        data: "id=" + d + "&type=" + b + "&status=" + a,
        success: function(r) {
			var response="";if(r==""||r==null){response="ERROR|发生错误,请重试"}else{response=r};
			Alert_open(response);
			var arr=response.split("|");var alert_state=arr[0];var alert_str=arr[1];
            if (alert_state == "ERROR") {
                //jQuery.loginShow();
                return false
            } else {
				$(c).toggleClass("faved");
				($(c).attr("status") == 1) ? $(c).attr("status", 0):$(c).attr("status", 1);
				($(c).attr("class") == "fav") ? $(c).html("收藏"):$(c).html("已收藏");
            }
            return false
        },
        error: function() {
            return false
        }
    });
    return false
}
//buy
function buy(c) {
    var d = $(c).attr("id"),
        b = $(c).attr("type"),
        a = $(c).attr("status");
    $.ajax({
        url: "cart.a.asp?act=buys",
        type: "POST",
        dataType: "html",
        data: "id=" + d + "&type=" + b + "&status=" + a,
        success: function(r) {
			var response="";if(r==""||r==null){response="ERROR|发生错误,请重试"}else{response=r};
			Alert_open(response);
			var arr=response.split("|");var alert_state=arr[0];var alert_str=arr[1];
            if (alert_state == "ERROR") {
                //jQuery.loginShow();
                return false
            } else {
				$(c).toggleClass("bought");
				($(c).attr("status") == 1) ? $(c).attr("status", 0):$(c).attr("status", 1);
				($(c).attr("class") == "buy") ? $(c).html("选购"):$(c).html("已选购");
            }
            return false
        },
        error: function() {
            return false
        }
    });
    return false
}
//bind_actions
$(function() {
	$(".brick").live("mouseover mouseleave", function(a) {
	  if (a.type == "mouseover") {
		  if ($(this).children(".actions").length > 0 && $(this).children("div.actions").children("a.buy").attr("status")=="1") {
			  $(this).children("div.actions").slideDown(200)
		  } else {
			  return
		  }
	  } else {
		  if ($(this).children(".actions").length > 0 && $(this).children("div.actions").children("a.buy").attr("status")=="1") {
			  $(this).children("div.actions").fadeOut(10)
		  }
	  }
  });
  $("a.fav").live("click", function() {
	  fav(this)
  })
  $("a.buy").live("click", function() {
	  buy(this)
  })
});
//follow
$(function() {
    var follow = function(e) {
        var atten_id = $(e).attr("data"),
            status = $(e).attr("status"),
            range = $(e).attr("range");
        if (typeof(atten_id) == "undefined" || atten_id == "") {
            return false
        }
        if (typeof(status) == "undefined" || status == "") {
            status = 1
        }
        var fun = range == "all" ? "add_attention_all" : "add_attention";
        $.ajax({
            url: "/router.php?m=user&a=" + fun,
            type: "POST",
            data: "atten_id=" + atten_id + "&status=" + status,
            success: function(r) {
                var r = eval("(" + r + ")");
                if (r.error == 1) {
                    jQuery.loginShow();
                    return false
                } else {
                    if (r.error == 3) {
                        alert(r.content);
                        return false
                    } else {
                        if (r.error == 0) {
                            var t = $(e).html();
                            if (t == "加关注" || t == "关注全部") {
                                $(e).addClass("followed").html("已关注")
                            } else {
                                var tx = $(e).attr("range") == "all" ? "关注全部" : "加关注";
                                $(e).removeClass("followed cancel").html(tx)
                            }
                            $(e).attr("status") == 1 ? $(e).attr("status", 0) : $(e).attr("status", 1);
                            return false
                        }
                    }
                }
            }
        });
        return false
    };
    $("a.follow_btn").bind("mouseover mouseleave", function(event) {
        if (event.type == "mouseover") {
            var tx = $(this).attr("range") == "all" ? "关注全部" : "加关注";
            $(this).html() == "已关注" ? $(this).addClass("cancel").html("取消关注") : $(this).html(tx)
        } else {
            $(this).html() == "取消关注" ? $(this).removeClass("cancel").html("已关注") : $(this).removeClass("cancel")
        }
    });
    $("a.follow_btn").bind("click", function() {
        follow(this)
    })
});

//share
function replaceStr(b, a) {
    if (b.indexOf("?") > 0) {
        return b += "&" + a
    } else {
        return b += "?" + a
    }
}

function quwan_share(g, c) {
    if (c == "") {
        return false
    }
    var f = "",
        b = $(g).attr("url"),
        h = $(g).attr("share-title"),
        e = $(g).attr("content"),
        a = $(g).attr("img"),
        d = $(g).attr("data");
    if (typeof(b) == "undefined" || b == "") {
        b = window.location.href
    }
    if (typeof(h) == "undefined" || h == "") {
        h = document.getElementsByTagName("title")[0].innerHTML
    }
    if (typeof(e) == "undefined" || e == "") {
        e = h
    }
    if (typeof(a) == "undefined") {
        a = ""
    }
    if (typeof(d) == "undefined") {
        d = ""
    }
    e += "";
    if (c == "sina") {
        f = "http://v.t.sina.com.cn/share/share.php?appkey=2926504205";
        b = replaceStr(b, "fm=shareweibo");
        f += "&title=" + encodeURIComponent(e) + "&url=" + encodeURIComponent(b);
        if (a != "") {
            f += "&pic=" + encodeURIComponent(a)
        }
    }
    if (c == "renren") {
        f = "http://share.renren.com/share/buttonshare/post/4001?";
        b = replaceStr(b, "fm=sharerenren");
        f += "title=" + encodeURI(h) + "&content=" + encodeURI(e) + "&url=" + encodeURIComponent(b);
        if (a != "") {
            f += "&pic=" + encodeURI(a)
        }
    }
    if (c == "qblog") {
        f = "http://v.t.qq.com/share/share.php?";
        b = replaceStr(b, "fm=sharetqblog");
        f += "title=" + encodeURI(e) + "&url=" + encodeURIComponent(b) + "&appkey=f92ccbb0e5bd4fdd8cc4343602f4ef98&site=" + encodeURIComponent(b);
        if (a != "") {
            f += "&pic=" + encodeURI(a)
        }
    }
    if (c == "qzone") {
        f = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
        b = replaceStr(b, "fm=shareqzone");
        f += "title=" + encodeURIComponent(h) + "&desc=" + encodeURIComponent(e) + "&url=" + encodeURIComponent(b);
        if (a != "") {
            f += "&pics=" + encodeURIComponent(a)
        }
    }
    if (c == "douban") {
        b = replaceStr(b, "fm=sharedouban");
        f = "http://www.douban.com/share/service?source=&image=" + encodeURIComponent(a) + "&href=" + encodeURIComponent(b) + "&name=" + encodeURI(e)
    }
    if (f == "") {
        return false
    }
/*    if (!isNaN(d)) {
        $.ajax({
            type: "POST",
            url: "{$web}source/goods_share_record.php",
            data: "type=" + c + "&get_goods_id=" + d + "&r=" + Math.random(),
            success: function(i) {}
        })
    }*/
    window.open(f, "", "height=500, width=600");
    return true
}
$(function() {
    $("a.sina").bind("click", function() {
        quwan_share(this, "sina")
    });
    $("a.qblog").bind("click", function() {
        quwan_share(this, "qblog")
    });
    $("a.qzone").bind("click", function() {
        quwan_share(this, "qzone")
    });
    $("a.douban").bind("click", function() {
        quwan_share(this, "douban")
    });
    $("a.renren").bind("click", function() {
        quwan_share(this, "renren")
    })
});

//center
$.fn.center = function() {
    return $(this).each(function() {
        var a, c, b;
        a = $(this);
        c = -a.width() / 2;
        b = -a.height() / 2;
        return a.css({
            position: "fixed",
            left: "50%",
            top: "50%",
            marginLeft: c,
            marginTop: b
        })
    })
};

//modal_box
$.modal_box = function(g, e, a, c) {
    var f, d, b;
    if (a == null) {
        a = true
    }
    if (c == null) {
        c = "550"
    }
    if ($("#modal_box_wrapper").length === 0 && a) {
        $("body").append($("<div id='modal_box_wrapper' style='width:" + c + "px;'><h6 style=\"font-size:16px;\"></h6><div class='content'></div></div>"))
    } else {
        $("body").append($("<div id='modal_box_wrapper' style='width:" + c + "px;'><div class='content'></div></div>"))
    }
    if ($(".mask").length === 0) {
        $("body").append($("<div class='mask'></div>"))
    }
    f = $("#modal_box_wrapper");
    d = $("#modal_box_wrapper h6");
    b = $("#modal_box_wrapper .content");
    if (a) {
        d.html('<a href="javascript:;" class="modal_box_close"></a>' + g)
    }
    b.html(e);
    f.center().fadeIn("fast");
    $(".mask").css("display", "block").animate({
        opacity: "0.75"
    }, 500);
    return true
};
$.modal_box.close = function() {
    $("#modal_box_wrapper").fadeOut("fast");
    $(".mask").animate({
        opacity: "0"
    }, 500, function() {
        $(this).css("display", "none")
    })
};
$(function() {
    $("body").delegate(".modal_box_close", "click", function(a) {
        post_guide(6);
        $.modal_box.close()
    });
    $(".modal_box").bind("click", function(a) {
        var b;
        b = $(this);
        $.ajax({
            url: b.attr("href"),
            dataType: "html",
            success: function(c) {
                return $.modal_box(b.attr("title"), c)
            }
        });
        a.preventDefault();
        return false
    })
});

//img ready
var imgReady = (function() {
    var d = [],
        c = null,
        b = function() {
            var e = 0;
            for (; e < d.length; e++) {
                d[e].end ? d.splice(e--, 1) : d[e]()
            }!d.length && a()
        },
        a = function() {
            clearInterval(c);
            c = null
        };
    return function(f, k, m, j) {
        var l, g, n, i, e, h = new Image();
        h.src = f;
        if (h.complete) {
            k.call(h);
            m && m.call(h);
            return
        }
        g = h.width;
        n = h.height;
        h.onerror = function() {
            j && j.call(h);
            l.end = true;
            h = h.onload = h.onerror = null
        };
        l = function() {
            i = h.width;
            e = h.height;
            if (i !== g || e !== n || i * e > 1024) {
                k.call(h);
                l.end = true
            }
        };
        l();
        h.onload = function() {
            !l.end && l();
            m && m.call(h);
            h = h.onload = h.onerror = null
        };
        if (!l.end) {
            d.push(l);
            if (c === null) {
                c = setInterval(b, 40)
            }
        }
    }
})();

/*!
 * jQuery Tools v1.2.7 - The missing UI library for the Web
 *
 * scrollable/scrollable.js
 * tabs/tabs.js
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 */
(function(a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.scrollable = {
        conf: {
            activeClass: "active",
            circular: !1,
            clonedClass: "cloned",
            disabledClass: "disabled",
            easing: "swing",
            initialIndex: 0,
            item: "> *",
            items: ".items",
            keyboard: !0,
            mousewheel: !1,
            next: ".next",
            prev: ".prev",
            size: 1,
            speed: 400,
            vertical: !1,
            touch: !0,
            wheelSpeed: 0
        }
    };

    function b(a, b) {
        var c = parseInt(a.css(b), 10);
        if (c) return c;
        var d = a[0].currentStyle;
        return d && d.width && parseInt(d.width, 10)
    }

    function c(b, c) {
        var d = a(c);
        return d.length < 2 ? d : b.parent().find(c)
    }
    var d;

    function e(b, e) {
        var f = this,
            g = b.add(f),
            h = b.children(),
            i = 0,
            j = e.vertical;
        d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, {
            getConf: function() {
                return e
            },
            getIndex: function() {
                return i
            },
            getSize: function() {
                return f.getItems().size()
            },
            getNaviButtons: function() {
                return n.add(o)
            },
            getRoot: function() {
                return b
            },
            getItemWrap: function() {
                return h
            },
            getItems: function() {
                return h.find(e.item).not("." + e.clonedClass)
            },
            move: function(a, b) {
                return f.seekTo(i + a, b)
            },
            next: function(a) {
                return f.move(e.size, a)
            },
            prev: function(a) {
                return f.move(-e.size, a)
            },
            begin: function(a) {
                return f.seekTo(0, a)
            },
            end: function(a) {
                return f.seekTo(f.getSize() - 1, a)
            },
            focus: function() {
                d = f;
                return f
            },
            addItem: function(b) {
                b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]);
                return f
            },
            seekTo: function(b, c, k) {
                b.jquery || (b *= 1);
                if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                var l = b;
                b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                var m = a.Event("onBeforeSeek");
                if (!k) {
                    g.trigger(m, [b, c]);
                    if (m.isDefaultPrevented() || !l.length) return f
                }
                var n = j ? {
                    top: -l.position().top
                } : {
                    left: -l.position().left
                };
                i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function() {
                    g.trigger("onSeek", [b])
                });
                return f
            }
        }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function(b, c) {
            a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                b && a(f).bind(c, b);
                return f
            }
        });
        if (e.circular) {
            var k = f.getItems().slice(-1).clone().prependTo(h),
                l = f.getItems().eq(1).clone().appendTo(h);
            k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function(a, b, c) {
                if (!a.isDefaultPrevented()) {
                    if (b == -1) {
                        f.seekTo(k, c, function() {
                            f.end(0)
                        });
                        return a.preventDefault()
                    }
                    b == f.getSize() && f.seekTo(l, c, function() {
                        f.begin(0)
                    })
                }
            });
            var m = b.parents().add(b).filter(function() {
                if (a(this).css("display") === "none") return !0
            });
            m.length ? (m.show(), f.seekTo(0, 0, function() {}), m.hide()) : f.seekTo(0, 0, function() {})
        }
        var n = c(b, e.prev).click(function(a) {
                a.stopPropagation(), f.prev()
            }),
            o = c(b, e.next).click(function(a) {
                a.stopPropagation(), f.next()
            });
        e.circular || (f.onBeforeSeek(function(a, b) {
            setTimeout(function() {
                a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1))
            }, 1)
        }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function(a, b) {
            if (e.mousewheel) {
                f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50);
                return !1
            }
        });
        if (e.touch) {
            var p = {};
            h[0].ontouchstart = function(a) {
                var b = a.touches[0];
                p.x = b.clientX, p.y = b.clientY
            }, h[0].ontouchmove = function(a) {
                if (a.touches.length == 1 && !h.is(":animated")) {
                    var b = a.touches[0],
                        c = p.x - b.clientX,
                        d = p.y - b.clientY;
                    f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault()
                }
            }
        }
        e.keyboard && a(document).bind("keydown.scrollable", function(b) {
            if (!(!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input"))) {
                if (e.keyboard != "static" && d != f) return;
                var c = b.keyCode;
                if (j && (c == 38 || c == 40)) {
                    f.move(c == 38 ? -1 : 1);
                    return b.preventDefault()
                }
                if (!j && (c == 37 || c == 39)) {
                    f.move(c == 37 ? -1 : 1);
                    return b.preventDefault()
                }
            }
        }), e.initialIndex && f.seekTo(e.initialIndex, 0, function() {})
    }
    a.fn.scrollable = function(b) {
        var c = this.data("scrollable");
        if (c) return c;
        b = a.extend({}, a.tools.scrollable.conf, b), this.each(function() {
            c = new e(a(this), b), a(this).data("scrollable", c)
        });
        return b.api ? c : this
    }
})(jQuery);
(function(a) {
    a.tools = a.tools || {
        version: "v1.2.7"
    }, a.tools.tabs = {
        conf: {
            tabs: "a",
            current: "current",
            onBeforeClick: null,
            onClick: null,
            effect: "default",
            initialEffect: !1,
            initialIndex: 0,
            event: "click",
            rotate: !1,
            slideUpSpeed: 400,
            slideDownSpeed: 400,
            history: !1
        },
        addEffect: function(a, c) {
            b[a] = c
        }
    };
    var b = {
            "default": function(a, b) {
                this.getPanes().hide().eq(a).show(), b.call()
            },
            fade: function(a, b) {
                var c = this.getConf(),
                    d = c.fadeOutSpeed,
                    e = this.getPanes();
                d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
            },
            slide: function(a, b) {
                var c = this.getConf();
                this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
            },
            ajax: function(a, b) {
                this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
            }
        },
        c, d;
    a.tools.tabs.addEffect("horizontal", function(b, e) {
        if (!c) {
            var f = this.getPanes().eq(b),
                g = this.getCurrentPane();
            d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
                width: 0
            }, {
                step: function(a) {
                    f.css("width", d - a)
                },
                complete: function() {
                    a(this).hide(), e.call(), c = !1
                }
            }), g.length || (e.call(), c = !1)
        }
    });

    function e(c, d, e) {
        var f = this,
            g = c.add(this),
            h = c.find(e.tabs),
            i = d.jquery ? d : c.children(d),
            j;
        h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
            click: function(d, i) {
                var k = h.eq(d),
                    l = !c.data("tabs");
                typeof d == "string" && d.replace("#", "") && (k = h.filter("[href*=\"" + d.replace("#", "") + "\"]"), d = Math.max(h.index(k), 0));
                if (e.rotate) {
                    var m = h.length - 1;
                    if (d < 0) return f.click(m, i);
                    if (d > m) return f.click(0, i)
                }
                if (!k.length) {
                    if (j >= 0) return f;
                    d = e.initialIndex, k = h.eq(d)
                }
                if (d === j) return f;
                i = i || a.Event(), i.type = "onBeforeClick", g.trigger(i, [d]);
                if (!i.isDefaultPrevented()) {
                    var n = l ? e.initialEffect && e.effect || "default" : e.effect;
                    b[n].call(f, d, function() {
                        j = d, i.type = "onClick", g.trigger(i, [d])
                    }), h.removeClass(e.current), k.addClass(e.current);
                    return f
                }
            },
            getConf: function() {
                return e
            },
            getTabs: function() {
                return h
            },
            getPanes: function() {
                return i
            },
            getCurrentPane: function() {
                return i.eq(j)
            },
            getCurrentTab: function() {
                return h.eq(j)
            },
            getIndex: function() {
                return j
            },
            next: function() {
                return f.click(j + 1)
            },
            prev: function() {
                return f.click(j - 1)
            },
            destroy: function() {
                h.off(e.event).removeClass(e.current), i.find("a[href^=\"#\"]").off("click.T");
                return f
            }
        }), a.each("onBeforeClick,onClick".split(","), function(b, c) {
            a.isFunction(e[c]) && a(f).bind(c, e[c]), f[c] = function(b) {
                b && a(f).bind(c, b);
                return f
            }
        }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function(b) {
            a(this).bind(e.event, function(a) {
                f.click(b, a);
                return a.preventDefault()
            })
        }), i.find("a[href^=\"#\"]").bind("click.T", function(b) {
            f.click(a(this).attr("href"), b)
        }), location.hash && e.tabs == "a" && c.find("[href=\"" + location.hash + "\"]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
    }
    a.fn.tabs = function(b, c) {
        var d = this.data("tabs");
        d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
            onBeforeClick: c
        }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function() {
            d = new e(a(this), b, c), a(this).data("tabs", d)
        });
        return c.api ? d : this
    }
})(jQuery);


//user recommend
function recommendGoods() {
    var a = "";
    var b = "";
    $("#modal_box_wrapper").remove();
    $(".next").remove();
    $(".prev").remove();
    $.modal_box("\u63a8\u8350\u7269\u54c1\u5230\u8da3\u73a9<span>\u6211\u4eec\u4f1a\u5c3d\u529b\u5e2e\u4f60\u5bfb\u627e\u6b64\u5546\u54c1</span>", '<form action="#" class="reco" method="post" onsumbit="return false;"><div><label>\u8f93\u5165\u56fe\u7247\u94fe\u63a5\u6216\u7f51\u7ad9\u5730\u5740</label><input class="text" id="recom_path" type="text" placeholder="http://"  onkeydown="javascript: if(event.keyCode==13) {return false;}" /></div><div><input class="button" type="button" value="\u53d6\u5f97\u56fe\u7247" /><img src="/themes/default/imgs/2013/modal_box/loading.gif" /></form></div>');
    $(".modal_box_close").click(function() {
        close_modal_box()
    });
    $("form.reco input.button").click(function() {
        $(this).hide();
        $(this).siblings().show();
        var c = $("#recom_path").val();
        if ($.trim(c) == "") {
            alert("\u8f93\u5165\u5730\u5740");
            $(this).show();
            $(this).siblings().hide();
            return false
        }
        $.ajax({
            url: "/router.php?m=Userrecommend&a=get_url_imagelist",
            type: "POST",
            data: "path=" + c,
            dataType: "json",
            timeout: 30000,
            cache: false,
            success: function(e) {
                if (e.error == 0) {
                    var d = '<form class="reco_detail" action="#" method="post" onSubmit="return false;"><h6>\u7269\u54c1\u8be6\u60c5<span>\uff08\u4e4b\u540e\u53ef\u4ee5\u968f\u65f6\u66f4\u6362\uff09</span></h6><fieldset><div class="picture"><div class="scrollable" id="scrollable"><ul class="items" id="recomlist"></ul></div><dl><dt><a class="prev browse left" href="javascript:;"></a><a class="next browse right" href="javascript:;"></a><span id="pageitem">1 of 0</span></dt><dd id="pxitem">478 x 478</dd></dl></div><div class="info" style="background:none"><div><label>\u6807\u9898</label><input class="text" type="text" id="recom_title"/></div><div><label>\u7f51\u9875\u94fe\u63a5</label><input class="text" type="text" id="recom_linkurl" value="' + e.url + '"/></div><div><label>\u5206\u7c7b</label><input id="classification" class="text" type="text" placeholder="\u9009\u62e9\u4e00\u4e2a\u5206\u7c7b" /><input id="classification_val" class="text" type="hidden" value="" /><ul id="typelist_recom">';
                    $.each(e.typelist, function(f, g) {
                        d += '<li><label><input type="checkbox" rel="' + g.cat_id + '">' + g.cat_name + "</label></li>"
                    });
                    d += '</ul></div></div></fieldset><div><input type="hidden" value="" id="imgsrc"/><input class="button" type="button" value="\u63d0\u4ea4\u5230\u8da3\u73a9" onclick="sentRecomGoods();"/><a id="back" href="javascript:;" onclick="recommendGoods();return false;">\u8fd4\u56de</a></div></form>';
                    $("#modal_box_wrapper").remove();
                    $.modal_box("\u63a8\u8350\u7269\u54c1\u5230\u8da3\u73a9<span>\u6211\u4eec\u4f1a\u5c3d\u529b\u5e2e\u4f60\u5bfb\u627e\u6b64\u5546\u54c1</span>", d);
                    $(".modal_box_close").click(function() {
                        close_modal_box()
                    });
                    $("input#classification").last().click(function() {
                        $(this).siblings("ul").toggle()
                    });
                    $(".info li").click(function() {
                        var f = $(this).text();
                        $("#classification_val").val($(this).find("input").attr("rel"));
                        $("#classification").val(f);
                        $(this).parent().hide()
                    });
                    check(e.content)
                } else {
                    if (e.error == 1) {
                        location.href = "/user.php?back_act=" + location.href + "@userrecom"
                    } else {
                        if (e.error == 2) {
                            recommendGoods();
                            alert("\u8bf7\u52ff\u63a8\u8350\u672c\u7ad9\u4ea7\u54c1")
                        } else {
                            alert("\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u56fe\u7247");
                            $("form.reco input.button").show();
                            $("form.reco input.button").siblings().hide()
                        }
                    }
                }
                return false
            },
            error: function() {
                alert("\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u56fe\u7247");
                $("form.reco input.button").show();
                $("form.reco input.button").siblings().hide()
            }
        })
    });
    return false
}

function close_modal_box() {
    $("#modal_box_wrapper").remove();
    $(".mask").animate({
        opacity: "0"
    }, 500, function() {
        $(this).css("display", "none")
    })
}

function sentRecomGoods() {
    var d = $("#recom_title").val();
    var a = $("#recom_linkurl").val();
    var c = $("#classification_val").val();
    var b = $("#imgsrc").val();
    if ($.trim(d) == "" || $.trim(a) == "" || $.trim(c) == "" || $.trim(b) == "") {
        alert("\u8bf7\u5b8c\u6574\u586b\u5199\u63a8\u8350\u5546\u54c1\u7684\u4fe1\u606f");
        return false
    }
    $.ajax({
        url: "/router.php?m=Userrecommend&a=save_userrecommend",
        type: "POST",
        data: "recom_name=" + d + "&recom_linkurl=" + a + "&recom_cat=" + c + "&recom_image=" + b,
        dataType: "json",
        timeout: 30000,
        cache: false,
        success: function(e) {
            if (e.error == 0) {
                close_modal_box()
            }
        }
    })
}

function check(a, b) {
    $.getScript("/themes/default/js/2013/jQuery-1.6.2.js", function() {
        var i = jQuery.noConflict(true);
        var c = 0;
        var d = [],
            g = [],
            h = 80,
            e = 30 / a.length;

        function f(l) {
            var k = i.Deferred(),
                j = new Image();
            j.onload = function() {
                h += e;
                if (h > 100) {
                    h = 100
                }
                if (this.width > 100 && this.height > 100) {
                    i("#recomlist").append('<li><img src="' + this.src + '" wh="' + this.width + " x " + this.height + '"/></li>');
                    g.push(this)
                }
                k.resolve(this)
            };
            j.onerror = function() {
                k.reject(this)
            };
            j.src = l;
            return k
        }
        i.each(a, function(j, k) {
            d[j] = f(k)
        });
        i.when.apply(i, d).then(function() {
            var j = g.length;
            if (g.length >= 1) {
                var k = 1;
                i("#imgsrc").val(g[0].src);
                i("#pxitem").text(g[0].width + " x " + g[0].height);
                i("#pxitem").text(g[0].width + " x " + g[0].height);
                i("#pageitem").html("<span>1</span> of " + g.length);
                i(".next").bind("click", function() {
                    if (k < j) {
                        k += 1;
                        i("#recomlist").css("left", -(k - 1) * 220 + "px");
                        i("#pageitem span").html(k)
                    }
                    if (k == j) {
                        i(".next").addClass("disabled");
                        i("#pageitem span").html(k)
                    }
                    i(".prev").removeClass("disabled");
                    nowW = i("#recomlist li").eq(k - 1).find("img").attr("wh");
                    i("#pxitem").text(nowW);
                    imgsrc = i("#recomlist li").eq(k - 1).find("img").attr("src");
                    i("#imgsrc").val(imgsrc)
                });
                i(".prev").bind("click", function() {
                    if (k > 1 && k <= j) {
                        k -= 1;
                        i("#recomlist").css("left", -(k - 1) * 220 + "px");
                        i("#pageitem span").html(k)
                    }
                    if (k == 1) {
                        i(".prev").addClass("disabled");
                        i("#pageitem span").html(k)
                    }
                    i(".next").removeClass("disabled");
                    nowW = i("#recomlist li").eq(k - 1).find("img").attr("wh");
                    i("#pxitem").text(nowW);
                    imgsrc = i("#recomlist li").eq(k - 1).find("img").attr("src");
                    i("#imgsrc").val(imgsrc)
                })
            } else {
                recommendGoods();
                alert("\u6ca1\u6709\u627e\u5230\u5408\u9002\u7684\u56fe\u7247")
            }
        })
    })
};

/*
 * Author : liling
 * Time : 2013-09-24 am
 * Description : Login and register show function
 */
jQuery.extend({
    loginShow: function() {
        var b = window.location.href;
        var a = '<div class="box_big"><!--p>\u5df2\u6709\u5408\u4f5c\u7f51\u7ad9\u5e10\u53f7</p><div class="hz_link"><a class="login_sina" href="javascript:void(0)" onclick="getApiUrl(1);"></a><a class="login_rr" href="javascript:void(0)" onclick="getApiUrl(2);"></a><a class="login_qq" href="javascript:void(0)" onclick="getApiUrl(8);"></a></div><p>\u4f7f\u7528\u5176\u4ed6\u5408\u4f5c\u7f51\u7ad9\u8d26\u53f7\u767b\u9646 \uff1a<a href="javascript:void(0)" onclick="getApiUrl(4);">\u6dd8\u5b9d</a> | <a href="javascript:void(0)" onclick="getApiUrl(6);">\u652f\u4ed8\u5b9d</a> | <a href="javascript:void(0)" onclick="getApiUrl(5);">\u8c46\u74e3</a></p><div class="login_line"></div><p>输入帐号密码登入</p--><div><form id="loginForm" name="loginForm" method="post" action="/flow.php?step=login"><table cellpadding="0" cellspacing="0" class="login_table"><tr height="34"><td class="td_title">帐号</td><td><div class="divInput"><input type="text" hkid=".uemail" name="username" id="login_user" value="" autocomplete="off" /></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="name_tip"><i></i><span id="nameErr"></span></p></td></tr><tr height="34"><td class="td_title">\u5bc6\u7801</td><td><div class="divInput"><input type="password" name="password" id="login_pass" value=""></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="pass_tip""><i></i><span id="nameErr"><span></p></td></tr><tr><td></td><td class="butTd"><span class="sub_box"><input class="login_but" id="login_sumbit" name="submit_login" type="button" value="\u767b \u5f55" onclick="submitLoginForm()" /></span><a class="butRegister" href="/user_reg.asp">\u5feb\u901f\u6ce8\u518c</a><a href="/user_get_password.asp">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a></td></tr></table><input type="hidden" value="signin" name="act"><input id="back_act" type="hidden" value="' + b + '" name="back_act"></form></div></div><form id="uniteloginForm" name="uniteloginForm" action="/user_combine_logreg.php" method="post"><input type="hidden" name="ulapitype" value="" id="ulapitype" /><input type="hidden" name="ulid" value="" id="ulid" /><input type="hidden" name="ulcode" value="" id="ulcode" /><input type="hidden" name="ulname" value="" id="ulname" /><input type="hidden" id="ulbackact" value="' + b + '" name="ulbackact"><input type="hidden" id="ulavatar" value="" name="ulavatar"></form>';
        jQuery("#modal_box_wrapper,.mask").remove();
        jQuery.modal_box("登入帐号", a, true, 500)
    },
    registerShow: function() {
        var a = window.location.href;
        var b = '<div class="box_big"><!--p>\u5df2\u6709\u5408\u4f5c\u7f51\u7ad9\u5e10\u53f7</p><div class="hz_link"><a class="login_sina" href="javascript:void(0)" onclick="getApiUrl(1);"></a><a class="login_rr" href="javascript:void(0)" onclick="getApiUrl(2);"></a><a class="login_qq" href="javascript:void(0)" onclick="getApiUrl(8);"></a></div><p>\u4f7f\u7528\u5176\u4ed6\u5408\u4f5c\u7f51\u7ad9\u8d26\u53f7\u767b\u9646 \uff1a<a href="javascript:void(0)" onclick="getApiUrl(4);">\u6dd8\u5b9d</a> | <a href="javascript:void(0)" onclick="getApiUrl(6);">\u652f\u4ed8\u5b9d</a> | <a href="javascript:void(0)" onclick="getApiUrl(5);">\u8c46\u74e3</a></p><div class="login_line"></div><p>注册帐号</p--><div><form id="formUser" name="formUser" method="post" action="/flow.php?step=login"><table cellpadding="0" cellspacing="0" class="login_table"><tr height="34"><td class="td_title">Email</td><td><div class="divInput"><input type="text" autocomplete="off" id="emailinput" name="email" hkid=".uemail" /><input class="prevIndex" type="hidden" name="prevIndex" value="0"></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="email_tip""><i></i><span><span></p></td></tr><tr height="34"><td class="td_title">\u6635\u79f0</td><td><div class="divInput"><input type="text" id="nick" name="nick" /></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="nick_tip""><i></i><span><span></p></td></tr><tr height="34"><td class="td_title">\u5bc6\u7801</td><td><div class="divInput"><input type="password" id="password" name="password" /></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="passReg_tip""><i></i><span><span></p></td></tr><tr height="34"><td class="td_title">\u786e\u8ba4\u5bc6\u7801</td><td><div class="divInput"><input type="password" id="conform_password" name="conform_password" /></div></td></tr><tr height="22"><td></td><td><p class="errTipBox" id="comPass_tip""><i></i><span><span></p></td></tr><tr style="display:none;"><td class="td_title"></td><td><input type="checkbox" checked="checked" value="1" \u3000class="autologin" name="agreement" id="agreement_input"></td></tr><tr style="display:none;"><td><input id="captcha" class="do_input s_input yzm_input" type="text" style="width: 80px;" name="captcha"><img src="/captcha.php?" alt="\u770b\u4e0d\u6e05\uff1f\u8bf7\u70b9\u51fb\uff01" style="vertical-align: middle; cursor: pointer; height: 22px;" onclick="this.src=\'/captcha.php?\'+Math.random()"></td></tr><tr><td></td><td class="butTd"><span class="sub_box"><input class="login_but" id="email_sumbit" name="submit_login" type="button" value="\u6ce8 \u518c" onclick="submitRegisterForm()" /></span></td></tr></table><input type="hidden" value="signup" name="act"><input id="back_act" type="hidden" value="' + a + '" name="back_act"></form></div></div><form id="uniteloginForm" name="uniteloginForm" action="/user_combine_logreg.php" method="post"><input type="hidden" name="ulapitype" value="" id="ulapitype" /><input type="hidden" name="ulid" value="" id="ulid" /><input type="hidden" name="ulcode" value="" id="ulcode" /><input type="hidden" name="ulname" value="" id="ulname" /><input id="back_act" type="hidden" value="' + a + '" name="back_act" id="back_act"><input type="hidden" id="ulbackact" value="' + a + '" name="ulbackact"><input type="hidden" id="ulavatar" value="" name="ulavatar"></form>';
        jQuery("#modal_box_wrapper,.mask").remove();
        jQuery.modal_box("注册帐号", b, true, 500)
    },
    binding: function(c) {
        var e, g, f, a, b;
        jQuery.ajax({
            type: "POST",
            url: "user.a.asp",
            dataType: "json",
            async: false,
            data: "act=check_bind&m=" + Math.random(),
            cache: false,
            success: function(h) {
                if (h.error == 0) {
                    e = h.ulapitype;
                    g = h.ulid;
                    f = h.ulname;
                    a = h.ulcode;
                    b = h.back_act;
                    avatar = h.avatar
                } else {
                    return false
                }
            }
        });
        var d = '<div class="bindBox"><div class="tabBox"><div class="noHas nowShow">\u65b0\u7528\u6237<i></i></div><div class="yesHas">\u5df2\u6709\u8da3\u73a9\u5e10\u53f7<i></i></div></div><p class="title">\u5feb\u901f\u6ce8\u518c\u8da3\u73a9\u5e10\u53f7\u5e76\u7ed1\u5b9a</p><div class="tabRes"><form id="formUser" name="formUser" method="post" action="user.php"><table class="login_table" cellspacing="0" cellpadding="0"><tr height="34"><td align="right" class="td_title">Email&nbsp;</td><td><div class="divInput"><input id="emailinput" type="text" hkid=".uemail" name="email" autocomplete="off"></div></td></tr><tr height="22"><td></td><td><p id="email_tip" class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title">\u6635\u79f0&nbsp;</td><td><div class="divInput"><input id="nick" class="do_input psd_input b_input" type="text" value="' + f + '" name="nick"></div></td></tr><tr height="22"><td></td><td><p class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title">\u5bc6\u7801&nbsp;</td><td><div class="divInput"><input id="password" type="password" name="password"></div></td></tr><tr height="22"><td></td><td><p id="passReg_tip" class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title">\u786e\u8ba4\u5bc6\u7801&nbsp;</td><td><div class="divInput"><input id="conform_password" type="password" name="conform_password"></div></td></tr><tr height="22"><td></td><td><p id="comPass_tip" class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title"></td><td valign="top"><input type="checkbox" checked="checked" class="autologin" value="1" id="agreement_input" name="agreement" /> \u5df2\u9605\u8bfb\u5e76\u63a5\u53d7<a href="/article.php?id=22">\u300a\u8da3\u73a9\u7f51\u7528\u6237\u534f\u8bae\u300b</a></td></tr><tr><td></td><td class="butTd"><span class="sub_box"><input type="hidden" name="act" value="act_register"><input type="hidden" name="ulapitype" value="' + e + '" id="ulapitype"><input type="hidden" name="ulid" value="' + g + '" id="ulid"><input type="hidden" name="ulcode" value="' + a + '" id="ulcode"><input type="hidden" name="back_act" value="' + b + '" id="back_act"><input type="hidden" name="ulavatar" value="' + avatar + '" id="ulavatar"><input type="button" onclick="submitRegisterForm()" value="\u5b8c \u6210"></span></td></tr></table></form></div><div class="tabLog"><form id="loginForm" method="post" action="user.php" name="loginForm"><table  class="login_table" cellspacing="0" cellpadding="0"><tr height="34"><td align="right" class="td_title">Email&nbsp;</td><td><div class="divInput"><input id="login_user" type="text" autocomplete="off" value="" name="username" hkid=".uemail"></div></td></tr><tr height="22"><td></td><td><p id="name_tip" class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title">\u5bc6\u7801&nbsp;</td><td><div class="divInput"><input id="login_pass" type="password" value="" name="password"></div></td></tr><tr height="22"><td></td><td><p id="pass_tip" class="errTipBox"><i></i><span><span></span></span></p></td></tr><tr height="34"><td align="right" class="td_title"></td><td><input id="remember" class="autologin" type="checkbox" name="remember" checked="checked"><b><label for="remember">\u4e0b\u6b21\u81ea\u52a8\u767b\u5f55</label></b></td></tr><tr><td></td><td class="butTd"><span class="sub_box"><input type="hidden" name="act" value="act_login"><input type="hidden" name="ulapitype" value="' + e + '" id="ulapitype"><input type="hidden" name="ulid" value="' + g + '" id="ulid"><input type="hidden" name="ulcode" value="' + a + '" id="ulcode"><input type="hidden" name="back_act" value="' + b + '" id="back_act"><input type="hidden" name="ulavatar" value="' + avatar + '" id="ulavatar"><input type="button" onclick="submitLoginForm()" value="\u7ed1 \u5b9a"></span></td></tr></table></form></div></div>';
        if (jQuery("#modal_box_wrapper,.mask") && jQuery("#modal_box_wrapper,.mask")) {
            jQuery("#modal_box_wrapper,.mask").remove()
        }
        jQuery.modal_box("\u7ed1\u5b9a\u8da3\u73a9\u5e10\u53f7", d, true, 500)
    }
});

function submitLoginForm() {
    var c = jQuery("#login_user"),
        d = jQuery("#login_pass"),
        a = jQuery("#back_act");
    var b = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[A-Za-z0-9-_.])*$/;
    if (c.val() == "") {
        jQuery("#name_tip").css("display", "block");
        jQuery("#name_tip").find("span").html("帐号不能为空！");
        return false
    }
    if (!b.test(c.val())) {
        jQuery("#name_tip").css("display", "block");
        jQuery("#name_tip").find("span").html("帐号格式有误！");
        return false
    }
	if (c.val() != "" && b.test(c.val())){
		jQuery("#name_tip").css("display", "none");
		}
    if (d.val().length <= 0) {
        jQuery("#pass_tip").css("display", "block");
        jQuery("#pass_tip").find("span").html("密码不能为空！");
        return false
    }
    jQuery.ajax({
        dataType:'json',
		type: "POST",
        url: "user.a.asp",
        data: "act=check_login_info&username=" + c.val() + "&password=" + d.val() + "&m=" + Math.random(),
		beforeSend: function(){},
		error: function(){},
        success: function(d) {
            if (d.status=='error') {
                jQuery("#pass_tip").css("display", "block");
                jQuery("#pass_tip").find("span").html(d.msg)
            } else{
                window.location.href = d.url
            }
        }
    })
}

function submitRegisterForm() {
    var c = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    var a = $("#emailinput").val();
    var d = $("#password").val();
    var b = $("#conform_password").val();
    if (a == "") {
        $("#email_tip").css("display", "block").find("span").html("\u90ae\u7bb1\u4e0d\u80fd\u4e3a\u7a7a\uff01");
        return false
    }
    if ($("#email_tip").find("span").html() == "\u5df2\u88ab\u6ce8\u518c\uff01") {
        return false
    }
    if ($("#email_tip").find("span").html() == "\u90ae\u7bb1\u683c\u5f0f\u6709\u8bef\uff01") {
        return false
    }
    if (d == "") {
        $("#passReg_tip").css("display", "block").find("span").html("\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01");
        return false
    }
    if ($("#passReg_tip").find("span").html() == "\u5bc6\u7801\u592a\u77ed\uff01") {
        return false
    }
    if ($("#passReg_tip").find("span").html() == "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01") {
        return false
    }
    if (d != b) {
        $("#comPass_tip").css("display", "block").find("span").html("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4\uff01");
        return false
    }
    document.formUser.submit()
}
$("#login_user").bind("blur", function() {
    var b = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    var a = $(this).val();
    if (a != "" && !b.test(a)) {
        $("#name_tip").css("display", "block").find("span").html("\u90ae\u7bb1\u683c\u5f0f\u6709\u8bef\uff01")
    } else {
        if (a == "") {
            $("#name_tip").css("display", "block").find("span").html("\u90ae\u7bb1\u4e0d\u80fd\u4e3a\u7a7a\uff01")
        } else {
            $("#name_tip").css("display", "none").find("span").html("")
        }
    }
});
$("#login_pass").bind("blur", function() {
    var a = $(this).val();
    if (a.length == 0) {
        $("#pass_tip").css("display", "block").find("span").html("\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01")
    }
});
$("#emailinput").bind("blur", function() {
    var b = /^\s*([A-Za-z0-9_-]+(\.\w+)*@(\w+\.)+\w{2,3})\s*$/;
    var a = $(this).val();
    if (a != "" && !b.test(a)) {
        $("#email_tip").css("display", "block").find("span").html("\u90ae\u7bb1\u683c\u5f0f\u6709\u8bef\uff01")
    } else {
        if (a == "") {
            $("#email_tip").css("display", "block").find("span").html("\u90ae\u7bb1\u4e0d\u80fd\u4e3a\u7a7a\uff01")
        } else {
            $.ajax({
                type: "GET",
                url: "user.a.asp",
                data: "act=check_email&email=" + a + "&m=" + Math.random(),
                success: function(c) {
                    if (c == "ok") {
                        $("#email_tip").css("display", "none").find("span").html("")
                    } else {
                        $("#email_tip").css("display", "block").find("span").html("\u5df2\u88ab\u6ce8\u518c\uff01")
                    }
                }
            })
        }
    }
});
$("#password").bind("blur", function() {
    var a = $(this).val();
    if (a.length > 0) {
        if (a.length < 6) {
            $("#passReg_tip").css("display", "block").find("span").html("\u5bc6\u7801\u592a\u77ed\uff01")
        } else {
            $("#passReg_tip").css("display", "none").find("span").html("")
        }
    } else {
        if (a.length == 0) {
            $("#passReg_tip").css("display", "block").find("span").html("\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01")
        }
    }
});
$("#conform_password").bind("blur", function() {
    var a = $(this).val();
    var b = $("#password").val();
    if (a != b) {
        $("#comPass_tip").css("display", "block").find("span").html("\u4e24\u6b21\u5bc6\u7801\u4e0d\u4e00\u81f4\uff01")
    } else {
        $("#comPass_tip").css("display", "none").find("span").html("")
    }
});
var emailArr = ["", "163.com", "126.com", "qq.com", "hotmail.com", "gmail.com", "sohu.com", "chinaren.com", "yahoo.com"];
$("#emailList").find("li").bind("mouseover", function() {
    $(this).addClass("nowhover").siblings("li").removeClass("nowhover")
});
var upDownClick = function(a) {
    document.onkeydown = function(i) {
        var i = i || event;
        var d = i.keyCode || i.which || i.charCode;
        var j = jQuery(a + " li"),
            h = j.length,
            c = jQuery(a + " li.liColorBg");
        var b = j.index(c),
            g = jQuery(a),
            f = g.height();
        if (d == 40) {} else {
            if (d == 38) {} else {
                if (d == 13) {}
            }
        }
    }
};
jQuery("body").delegate(".tabBox div", "click", function() {
    var a = jQuery(this);
    if (!a.hasClass("nowShow")) {
        a.addClass("nowShow").siblings("div").removeClass("nowShow")
    }
    if (a.hasClass("yesHas")) {
        $("p.title").html("\u7ed1\u5b9a\u60a8\u7684\u8da3\u73a9\u5e10\u53f7");
        $(".tabLog").css("display", "block").siblings(".tabRes").css("display", "none")
    }
    if (a.hasClass("noHas")) {
        $("p.title").html("\u5feb\u901f\u6ce8\u518c\u8da3\u73a9\u5e10\u53f7\u5e76\u7ed1\u5b9a");
        $(".tabRes").css("display", "block").siblings(".tabLog").css("display", "none")
    }
});

function bindRes() {};

//tip box
jQuery.extend({
    tipBox: function(b, c, d) {
        var a = "";
        if (jQuery.browser.msie && jQuery.browser.version == 6) {
            a = 'style="position:absolute;top:' + Math.ceil(jQuery(window).scrollTop() + jQuery(window).height() * 0.45) + 'px"'
        }
        if (jQuery("#tips_mod").length > 0) {
            jQuery("#tips_mod").find("em").attr("class", "tips_" + c).html(b)
        } else {
            jQuery("body").append('<div id="tips_mod" ' + a + '><strong><em class="tips_' + c + '">' + b + "</em></strong></div>");
            jQuery("#tips_mod").animate({
                "margin-top": "0",
                opacity: "1"
            }, 500)
        }
        setTimeout("jQuery('#tips_mod').fadeOut(500,function(){jQuery(this).remove();})", d)
    },
    sinaSuccessBox: function(a) {
        var b = '<div class="wbsq"><div class="searh_friends"><input type="text" id="keyFriend" value="\u641c\u7d22\u597d\u53cb" /><a href="javascript:;" id="submitKey" onclick="searchUserName();">\u641c\u7d22</a></div><div class="friends_list"><ul id="friendsContent">' + a + '</ul><div class="jtTx">&gt;</div><div class="tzWords">\u4eb2\u7231\u7684' + recipient + "\uff0c\u6211\u5728\u8da3\u73a9\u6311\u9009\u4e86\u4e00\u4ef6\u793c\u7269\u9001\u4f60\u54e6~\u5feb\u70b9\u6765\u9886\u53d6\u5427\uff01/shouli.html \u2014" + inscribe + ' @<span id="shouliren">\u6536\u793c\u4eba</span></div></div></div><div class="rightNow"><a href="javascript:;" id="nowSendWb">\u7acb\u5373\u901a\u77e5</a></div>';
        jQuery("#modal_box_wrapper,.mask").remove();
        jQuery.modal_box("\u9009\u62e9\u901a\u77e5\u597d\u53cb", b, true, 720)
    },
    sinaSuccessBoxRequest: function(a) {
        var b = '<div class="wbsq"><div class="searh_friends"><input type="text" id="keyFriend" value="\u641c\u7d22\u597d\u53cb " /><a href="javascript:;" id="submitKey" onclick="searchUserName();">\u641c\u7d22</a></div><div class="friends_list"><ul id="friendsContent">' + a + '</ul><div class="jtTx">&gt;</div><div class="tzWords">' + content + ' \u94fe\u63a5 @<span id="shouliren">\u6536\u793c\u4eba</span></div></div></div><div class="rightNow"><a href="javascript:;" id="nowSendWbRequest">\u7acb\u5373\u901a\u77e5</a></div>';
        jQuery("#modal_box_wrapper,.mask").remove();
        jQuery.modal_box("\u9009\u62e9\u901a\u77e5\u597d\u53cb", b, true, 720)
    }
});
jQuery("body").delegate(".wb_friendPhoto", "click", function() {
    jQuery(this).find("a").addClass("choseOnBg");
    var a = jQuery(this).find("a").attr("wbname");
    jQuery("#shouliren").text(a);
    jQuery(this).parents("li").siblings("li").find("a").attr("class", "")
});
jQuery("body").delegate("#nowSendWb", "click", function() {
    if (jQuery(".choseOnBg").size() == 0) {
        jQuery.tipBox("\u8bf7\u5148\u9009\u62e9\u4f60\u8981\u901a\u77e5\u7684\u597d\u53cb\uff01", "error", 2000)
    } else {
        var b = jQuery(".choseOnBg").attr("wbid");
        var a = jQuery(".choseOnBg").attr("wbname");
        var c = order_id;
        jQuery.ajax({
            url: "./interface/unitelogin/sinaweibogift/sendWeiBoApi.php",
            type: "POST",
            dataType: "json",
            timeout: 30000,
            cache: false,
            data: "&wbid=" + b + "&wbname=" + a + "&order=" + c + "&m=" + Math.random(),
            success: function(d) {
                if (d.error == 0) {
                    jQuery.tipBox(d.str, "success", 3000);
                    jQuery("#modal_box_wrapper").remove();
                    jQuery(".mask").remove()
                } else {
                    jQuery.tipBox(d.str, "warn", 2000)
                }
            }
        })
    }
});
jQuery("body").delegate("#nowSendWbRequest", "click", function() {
    if (jQuery(".choseOnBg").size() == 0) {
        jQuery.tipBox("\u8bf7\u5148\u9009\u62e9\u4f60\u8981\u901a\u77e5\u7684\u597d\u53cb\uff01", "error", 2000)
    } else {
        var b = jQuery(".choseOnBg").attr("wbid");
        var a = jQuery(".choseOnBg").attr("wbname");
        var c = order_id;
        jQuery.ajax({
            url: "./interface/unitelogin/sinaweibogift/sendWeiBoApi.php",
            type: "POST",
            dataType: "json",
            timeout: 30000,
            cache: false,
            data: "&wbid=" + b + "&wbname=" + a + "&order=" + c + "&request=1&m=" + Math.random(),
            success: function(d) {
                if (d.error == 0) {
                    jQuery.tipBox(d.str, "success", 3000);
                    jQuery("#modal_box_wrapper").remove();
                    jQuery(".mask").remove()
                } else {
                    jQuery.tipBox(d.str, "warn", 2000)
                }
            }
        })
    }
});

function showFriendTip() {
    var a = '<div  id="loading" style="margin-left:150px;margin-top:120px;"><img src="/themes/default/imgs/2013/common/indicator.gif">\u6b63\u5728\u52a0\u8f7d.....</div>';
    jQuery.sinaSuccessBox(a);
    userArrObj = [];
    jQuery.ajax({
        url: "./interface/unitelogin/sinaweibogift/friendlist.php",
        type: "POST",
        dataType: "json",
        timeout: 30000,
        cache: false,
        success: function(b) {
            if (b.error == 0) {
                jQuery.each(b.user_list, function(c, d) {
                    userArrObj.push(d);
                    htmlStr += '<li><div class="wb_friendPhoto" name="' + d.id + '"><img src="http://tp1.sinaimg.cn/' + d.id + '/50/0/1"/><a href="javascript:;" title="\u70b9\u51fb\u9009\u62e9" wbid="' + d.id + '" wbname="' + d.name + '"></a></div><p>' + d.name + "</p></li>"
                });
                jQuery.sinaSuccessBox(htmlStr)
            } else {
                jQuery.tipBox("\u6ca1\u6709\u83b7\u53d6\u5230\u60a8\u7684\u5173\u6ce8\u5217\u8868\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "error", 2000)
            }
        }
    })
}

function showFriendTipRequest() {
    var a = '<div  id="loading" style="margin-left:150px;margin-top:120px;"><img src="/themes/default/imgs/2013/common/indicator.gif">\u6b63\u5728\u52a0\u8f7d.....</div>';
    jQuery.sinaSuccessBoxRequest(a);
    userArrObj = [];
    jQuery.ajax({
        url: "./interface/unitelogin/sinaweibogift/friendlist.php",
        type: "POST",
        dataType: "json",
        timeout: 30000,
        cache: false,
        success: function(b) {
            if (b.error == 0) {
                jQuery.each(b.user_list, function(c, d) {
                    userArrObj.push(d);
                    htmlStr += '<li><div class="wb_friendPhoto" name="' + d.id + '"><img src="http://tp1.sinaimg.cn/' + d.id + '/50/0/1"/><a href="javascript:;" title="\u70b9\u51fb\u9009\u62e9" wbid="' + d.id + '" wbname="' + d.name + '"></a></div><p>' + d.name + "</p></li>"
                });
                jQuery.sinaSuccessBoxRequest(htmlStr)
            } else {
                jQuery.tipBox("\u6ca1\u6709\u83b7\u53d6\u5230\u60a8\u7684\u5173\u6ce8\u5217\u8868\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "error", 2000)
            }
        }
    })
}

function searchUserName() {
    var a = jQuery("#keyFriend").val();
    var b = "";
    if (a == "") {
        jQuery.sinaSuccessBox(htmlStr)
    }
    jQuery.each(userArrObj, function(c, d) {
        if (d.name.toString().indexOf(a) >= 0) {
            b += '<li><div class="wb_friendPhoto" name="' + d.id + '"><img src="http://tp1.sinaimg.cn/' + d.id + '/50/0/1"/><a href="javascript:;" title="\u70b9\u51fb\u9009\u62e9" wbid="' + d.id + '" wbname="' + d.name + '"></a></div><p>' + d.name + "</p></li>"
        }
    });
    if (b) {
        jQuery("#friendsContent").html(b)
    }
    if (b == "") {
        jQuery.tipBox("\u6ca1\u6709\u627e\u5230\u60a8\u641c\u7d22\u7684\u7684\u597d\u53cb\uff01", "warn", 2000)
    }
}

function checkSinaGift() {
    jQuery.ajax({
        type: "POST",
        url: "/router.php?m=Ordergift&a=checkGiftWeibo",
        dataType: "json",
        async: false,
        cache: false,
        success: function(a) {
            if (a.right == 0) {
                window.location.href = a.url
            } else {
                jQuery.tipBox(a.msg, "error", 3000)
            }
        },
        error: function() {
            jQuery.tipBox("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\uff01", "error", 3000)
        }
    })
};


//提示信息=====================================================================
var Alert_N=0;
function Alert_open(str,New){
	if(!$("#Alert_Box")[0]){$(document.body).append("<div id='Alert_Box'></div>");Alert_N=0;}
	//if(New==1){}
	Alert_N=Alert_N+1;
	$("#Alert_Box").append("<div id='Alert_Box"+Alert_N+"' class='Alert_Boxn'></div>")
	Alert_Timeout(Alert_N);
	//$(window).resize(function(){SetObjCenter('Alert_Box',0,0)})
	//$(window).scroll(function(){SetObjCenter('Alert_Box',0,0)})
	var response="";if (str==""||str==null){response="ERROR|发生错误，请重试"}else{response=str}
	arr=response.split("|");
	if(arr[0]=="SUCCESS"){
		//document.getElementById('Alert_Box'+Alert_N).style.background="#4B981D"
		document.getElementById('Alert_Box'+Alert_N).innerHTML="<span style='background:#4B981D'>"+arr[1]+"</span>";
	}
	else if(arr[0]=="ERROR"){
		//document.getElementById('Alert_Box'+Alert_N).style.background="#FF0000"
		document.getElementById('Alert_Box'+Alert_N).innerHTML= "<span style='background:#FF0000'>"+arr[1]+"</span>";
	}
	else if(arr[0]=="POINT"){
		//document.getElementById('Alert_Box'+Alert_N).style.background="#FF6600"
		document.getElementById('Alert_Box'+Alert_N).innerHTML="<span style='background:#FF6600'>"+arr[1]+"</span>";
	}
	else if(arr[0]=="WAIT"){
		if(arr[1]==""){document.getElementById('Alert_Box'+Alert_N).style.background="url(/images/wait4.gif) no-repeat center"}else{
		//document.getElementById('Alert_Box'+Alert_N).style.background="#FF6600"
		document.getElementById('Alert_Box'+Alert_N).innerHTML="<span style='background:#FF6600'>"+arr[1]+"</span>";
		}
	}
	//SetObjCenter('Alert_Box',0,0);//alert(''+($("#Alert_Box").size()))
}
function Alert_Timeout(N){
	setTimeout(function(){$('#Alert_Box'+N).animate({top:'-200px',height:'0px',marginTop:'0',opacity:'0'},1000,'',Alert_close(N));},3000)
}
function Alert_close(N){
	setTimeout(function(){if(N==Alert_N){$("#Alert_Box").remove();}},1000)
}