/*!
 * EO.js v0.0.0+, https://github.com/hoho/eo
 * (c) 2013 Marat Abdullin, MIT license
 */

var $EO = function() {
    var self = this,
        data = {},
        handlers = {},
        tmp,
        tmp2,
        i;

    self.on = function(name, callback) {
        (handlers[name] || (handlers[name] = [])).push(callback);

        return self;
    };

    self.off = function(name, callback) {
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

        return self;
    };

    self.set = function(name, val) {
        tmp = data[name];
        data[name] = val;

        if ((tmp2 = handlers[name])) {
            for (i = 0; i < tmp2.length; i++) {
                tmp2[i].call(self, val, tmp, name);
            }
        }

        return self;
    };

    self.get = function(name) {
        return data[name];
    };
};


$EO.extend = function(obj) {
    var self = this,
        proto,
        key,

        F = function() {},

        EO = function() {
            var s = this;
            $EO.call(s);
            s.init && s.init.apply(s, Array.prototype.slice.call(arguments, 0));
        };

    F.prototype = self.prototype;
    proto = EO.prototype = new F;
    proto.constructor = EO;
    for (key in obj) {
        proto[key] = obj[key];
    }
    EO.extend = $EO.extend;
    EO.__super__ = self.prototype;

    return EO;
};
