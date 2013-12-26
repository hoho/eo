test('Modifier class changes', function() {
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
