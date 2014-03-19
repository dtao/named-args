(function() {

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
      if (arguments.length === 0) {
        return convertIndicesToValues(args, map);
      }

      return args[map[name]];
    };
  });

  defineArgumentsProperty('names', function(args) {
    var fn = args.callee;

    return function names() {
      return getArgumentNames(fn);
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

  function convertIndicesToValues(args, nameToIndexMap) {
    var map = nameToIndexMap;

    for (var key in map) {
      map[key] = args[map[key]];
    }

    return map;
  }

  function trim(string) {
    return string.replace(/^\s+/, '').replace(/\s+$/, '');
  }

}());
