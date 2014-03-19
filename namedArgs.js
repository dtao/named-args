function defineArgumentsProperty(name, factory) {
  Object.defineProperty(Object.prototype, name, {
    get: function() {
      if (this.toString() !== '[object Arguments]') {
        return;
      }

      return factory(this);
    }
  });
}

defineArgumentsProperty('named', function(args) {
  var map  = getNameToIndexMap(args.callee);

  return function named(name) {
    var index = map[name];
    if (typeof index !== 'number') {
      return;
    }
    return args[index];
  };
});

defineArgumentsProperty('names', function(args) {
  return getArgumentNames(args.callee);
});

defineArgumentsProperty('asObject', function(args) {
  var fn = args.callee;

  return function asObject() {
    var map = getNameToIndexMap(fn);

    for (var key in map) {
      map[key] = args[map[key]];
    }

    return map;
  };
});

function getArgumentNames(fn) {
  var match = fn.toString().match(/function\s*(?:[\$\w]*)\s*\(([^\)]*)\)/),
      names = match[1].split(/\s*,\s*/);

  return names.map(trim);
}

function getNameToIndexMap(fn) {
  var names = getArgumentNames(fn),
      map   = {};

  for (var i = 0; i < names.length; ++i) {
    map[names[i]] = i;
  }

  return map;
}

function trim(string) {
  return string.replace(/^\s+/, '').replace(/\s+$/, '');
}
