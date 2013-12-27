test('Inheritance test', function() {
    var ret = [];

    var class1 = $E.O.extend({init: function() { ret.push(1 + ', ' + Array.prototype.slice.call(arguments, 0)); }}),
        class2 = $E.O.extend({init: function() { ret.push(2 + ', ' + Array.prototype.slice.call(arguments, 0)); }}),
        class3 = class1.extend({init: function() { ret.push(3 + ', ' + Array.prototype.slice.call(arguments, 0)); class3.__super__.init.call(this); }}),
        class4 = class3.extend({init: function() { ret.push(4 + ', ' + Array.prototype.slice.call(arguments, 0)); class4.__super__.init.call(this, '44'); }}),
        class5 = class4.extend({init: function() { ret.push(5 + ', ' + Array.prototype.slice.call(arguments, 0)); }});

    var instance0 = new $E.O();
    deepEqual(ret, []);
    ret = [];

    var instance1 = new class1('1');
    deepEqual(ret, ['1, 1']);
    ret = [];

    var instance2 = new class2('2');
    deepEqual(ret, ['2, 2']);
    ret = [];

    var instance3 = new class3('3');
    deepEqual(ret, ['3, 3', '1, ']);
    ret = [];

    var instance4 = new class4('4');
    deepEqual(ret, ['4, 4', '3, 44', '1, ']);
    ret = [];

    var instance5 = new class5('5');
    deepEqual(ret, ['5, 5']);
    ret = [];

    var instance6 = new class3('6');
    deepEqual(ret, ['3, 6', '1, ']);
    ret = [];

    deepEqual(instance0 instanceof $E.O, true);

    deepEqual(instance1 instanceof $E.O, true);

    deepEqual(instance2 instanceof $E.O, true);

    deepEqual(instance3 instanceof $E.O, true);

    deepEqual(instance4 instanceof $E.O, true);

    deepEqual(instance5 instanceof $E.O, true);

    deepEqual(instance6 instanceof $E.O, true);

    deepEqual(instance2 instanceof class1, false);

    deepEqual(instance5 instanceof class2, false);

    deepEqual(instance5 instanceof class1, true);
});

test('Setters and getters test', function() {
    var ret = [];

    var eo = new ($E.O)();

    eo.on('prop', function(val, prev, name) {
        ret.push('name: "' + name + '", previous value: "' + prev +
                 '", new value: "' + val + '"');
    });

    eo.set('prop', 'ololo');
    deepEqual(ret, ['name: "prop", previous value: "undefined", new value: "ololo"']);
    ret = [];

    eo.set('prop', 'piupiu');
    deepEqual(ret, ['name: "prop", previous value: "ololo", new value: "piupiu"']);
    ret = [];

    eo.set('prop', 'piupiu');
    deepEqual(ret, []);

    eo.set('prop', 'piupiu', true);
    deepEqual(ret, ['name: "prop", previous value: "piupiu", new value: "piupiu"']);
    ret = [];

    eo.trigger('prop', 'hahaha', 'prevprev');
    deepEqual(ret, ['name: "prop", previous value: "prevprev", new value: "hahaha"']);
    ret = [];

    eo.trigger('prop', 'hihihi');
    deepEqual(ret, ['name: "prop", previous value: "undefined", new value: "hihihi"']);
    ret = [];

    deepEqual(eo.prop, undefined);

    deepEqual(eo.get('prop'), 'piupiu');
});

test('Multiple properties setters and getters test', function() {
    var ret = [];

    var eo = new ($E.O)();

    eo
        .on('prop1', function(val, prev, name) {
            ret.push('name: "' + name + '", previous value: "' + prev +
                     '", new value: "' + val + '"');
        })
        .on('prop2', function(val, prev, name) {
            ret.push('name: "' + name + '", previous value: "' + prev +
                     '", new value: "' + val + '"');
        });

    eo.set({prop0: 'aaa', prop1: 'bbb', prop2: 'ccc', prop3: 'ddd'});
    deepEqual(ret, [
        'name: "prop1", previous value: "undefined", new value: "bbb"',
        'name: "prop2", previous value: "undefined", new value: "ccc"'
    ]);
    ret = [];

    eo.set({prop0: 'aaa', prop1: 'bbb', prop2: 'ccc', prop3: 'ddd'});
    deepEqual(ret, []);

    eo.set({prop0: 'aaa', prop1: 'bbb', prop2: 'ccc', prop3: 'ddd'}, true);
    deepEqual(ret, [
        'name: "prop1", previous value: "bbb", new value: "bbb"',
        'name: "prop2", previous value: "ccc", new value: "ccc"'
    ]);
    ret = [];

    deepEqual(eo.get(), {prop0: 'aaa', prop1: 'bbb', prop2: 'ccc', prop3: 'ddd'});

    eo.set({prop0: 'aaa', prop1: 'eee'});
    deepEqual(ret, ['name: "prop1", previous value: "bbb", new value: "eee"']);
    ret = [];
    deepEqual(eo.get(), {prop0: 'aaa', prop1: 'eee', prop2: 'ccc', prop3: 'ddd'});

    eo.set(new String('prop2'), 'fff');
    deepEqual(ret, ['name: "prop2", previous value: "ccc", new value: "fff"']);
    ret = [];

    var o = new (function() { this.aaa = 123; })();
    eo.set(o, 999);

    deepEqual(eo.get(), {prop0: 'aaa', prop1: 'eee', prop2: 'fff', prop3: 'ddd', '[object Object]': 999});
});
