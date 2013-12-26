/*!
 * eo.js v0.2.0, https://github.com/hoho/eo
 * (c) 2013 Marat Abdullin, MIT license
 */
var $E = {
    O: function() {
        this.__eo = {
            h: {},
            d: {}
        };
    }
};

$E.O.prototype = {
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
            data = self.__eo.d,
            tmp = data[name];

        data[name] = val;

        if (val !== tmp || force) {
            self.trigger(name, val, tmp);
        }

        return self;
    },

    get: function(name) {
        return this.__eo.d[name];
    }
};


$E.O.extend = function(obj) {
    var self = this,
        proto,
        key,

        F = function() {},

        EO = function() {
            var s = this;
            $E.O.call(s);
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
    EO.extend = $E.O.extend;
    EO.__super__ = self.prototype;

    return EO;
};
