/*!
 * eo.js v0.2.0, https://github.com/hoho/eo
 * (c) 2013 Marat Abdullin, MIT license
 */
var $E = (function() {
    var objConstructor = {}.constructor,

        O = function() {
            this.__eo = {
                h: {},
                d: {}
            };
        };

    O.prototype = {
        on: function(name, callback) {
            var handlers = this.__eo.h;
            (handlers[name] || (handlers[name] = [])).push(callback);
            return this;
        },

        off: function(name, callback) {
            var handlers = this.__eo.h,
                tmp,
                i;

            if ((tmp = handlers[name])) {
                if (callback) {
                    i = 0;
                    while (i < tmp.length) {
                        if (tmp[i] === callback) {
                            tmp.splice(i, 1);
                        } else {
                            i++;
                        }
                    }
                }

                if (!callback || !tmp.length) {
                    delete handlers[name];
                }
            }

            return this;
        },

        trigger: function(name, val, prev) {
            var handlers = this.__eo.h,
                tmp,
                i;

            if ((tmp = handlers[name])) {
                for (i = 0; i < tmp.length; i++) {
                    tmp[i].call(this, val, prev, name);
                }
            }
        },

        set: function(name, val, force) {
            var self = this,
                vals,
                n,
                data = self.__eo.d,
                prev;

            // XXX: Rather simplified version of isPlainObject. Fix in case of
            //      necessity.
            if (name && (name.constructor === objConstructor)) {
                vals = name;
                force = val;
            } else {
                vals = {};
                vals[name] = val;
            }

            for (n in vals) {
                prev = data[n];
                val = data[n] = vals[n];

                if (val !== prev || force) {
                    self.trigger(n, val, prev);
                }
            }

            return self;
        },

        get: function(name) {
            var d = this.__eo.d;
            return name === undefined ? d : d[name];
        }
    };


    O.extend = function(obj) {
        var self = this,
            proto,
            key,

            F = function() {},

            EO = function() {
                var s = this;
                O.call(s);
                if (s.init) {
                    s.init.apply(s, Array.prototype.slice.call(arguments, 0));
                }
            };

        F.prototype = self.prototype;
        proto = EO.prototype = new F();
        proto.constructor = EO;
        for (key in obj) {
            proto[key] = obj[key];
        }
        EO.extend = O.extend;
        EO.__super__ = self.prototype;

        return EO;
    };

    return {O: O};
})();
