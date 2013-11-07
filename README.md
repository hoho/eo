Extendable Object
=================

## Basic

```js
var eo = new $EO;

// There are four built in methods: on, off, set, get.

eo.on('prop', function(val, prev, name) {
    console.log('name: "' + name + '", previous value: "' + prev +
                '", new value: "' + val + '"');
});

eo.set('prop', 'ololo');
> name: "prop", previous value: "undefined", new value: "ololo"

eo.set('prop', 'piupiu');
> name: "prop", previous value: "ololo", new value: "piupiu"

// These properties are stored in a special container.
console.log(eo.prop);
> undefined

console.log(eo.get('prop'));
> piupiu
```
    
## Extending

```js
var MyEO = $EO.extend({
    init: function(arg1, arg2) {
        // init() method is called with new instance creation.
        console.log('args: "' + arg1 + '" and "' + arg2 + '"');
    },
    something: 'hello',
    another: 'world',
    method: function(arg) { return this.something + arg + this.another; }
});

var myeo = new MyEO('aaa', 'bbb');
> args: "aaa" and "bbb"

console.log(myeo.method('_'));
> hello_world

var MyMyEO = MyEO.extend({
    something: 'hi'
});

var mymyeo = new MyMyEO('11', '22');
> args: "11" and "22"

console.log(mymyeo.method('|'));
> hi|world

console.log(myeo instanceof $EO);
> true

console.log(myeo instanceof MyEO);
> true

console.log(mymyeo instanceof MyEO);
> true

console.log(mymyeo instanceof MyMyEO);
> true

console.log(myeo instanceof MyMyEO);
> false
```

## Calling superclass methods

```js
var MyEO = $EO.extend({
    meme: function() { return 'oooo'; }
});

var MyMyEO = MyEO.extend({
    meme: function() { return MyMyEO.__super__.meme() + 'zzzz'; }
});

var eo = new MyMyEO();

console.log(eo.meme());
> oooozzzz
```
