require('../namedArgs');

var expect = require('expect.js');

describe('arguments', function() {

  it('adds "named" and "names" functions to the arguments object', function() {
    expect(arguments.named).to.be.a(Function);
    expect(arguments.names).to.be.a(Function);
  });

  it('does not add functions to plain vanilla objects', function() {
    expect(({}).named).to.be(undefined);
    expect(({}).names).to.be(undefined);
  });

  it('does not interfere with other objects with "named", etc. functions', function() {
    expect(({ named: 5 }).named).to.eql(5);
    expect(({ names: function() {} }).names).to.be.a(Function);
  });

  describe('arguments#named', function() {
    it('accesses the value of the argument with the given name', function() {
      (function(x, y) {
        expect(arguments.named('x')).to.eql('foo');
        expect(arguments.named('y')).to.eql('bar');
      }('foo', 'bar'));
    });

    it('returns undefined for a name that belongs to no arguments', function() {
      (function(x, y) {
        expect(arguments.named('z')).to.be(undefined);
      }('foo', 'bar'));
    });

    it('throws no exception for functions without arguments', function() {
      (function() {
        expect(arguments.named('a')).to.be(undefined);
      }());
    });

    it('works just fine for named functions', function() {
      (function foo(bar, baz) {
        expect(arguments.named('bar')).to.eql(77);
        expect(arguments.named('baz')).to.eql(88);
      }(77, 88));
    });

    it('allows any kind of crazy spacing', function() {
      (function  whoa  (  crazy , pants  ) {
        expect(arguments.named('crazy')).to.eql([1, 2]);
        expect(arguments.named('pants')).to.eql([3, 4, 5]);
      }([1, 2], [3, 4, 5]));
    });

    describe('when called with no arguments', function() {
      it('provides an object mapping argument names to their values', function() {
        (function(foo, bar) {
          expect(arguments.named()).to.eql({
            foo: 3,
            bar: 4
          });
        }(3, 4));
      });
    });
  });

  describe('arguments#names', function() {
    it('gets the names of the arguments', function() {
      (function(foo, bar) {
        expect(arguments.names()).to.eql(['foo', 'bar']);
      }());
    });
  });

});

describe('Function', function() {

  it('adds "applyNamed" to the Function prototype', function() {
    expect(Function.prototype.applyNamed).to.be.a(Function);
  });

  describe('Function#applyNamed', function() {
    it('maps the args to their appropriate places', function() {
      (function(x, y) {
        expect(x).to.eql('foo');
        expect(y).to.eql('bar');
      }).applyNamed(null, { x: 'foo', y: 'bar' });
    });

    it('passes in missing values as undefined', function() {
      (function(x, y, z) {
        expect(x).to.eql('blah');
        expect(y).to.eql(undefined);
        expect(z).to.eql('whatever');
      }).applyNamed(null, { x: 'blah', z: 'whatever' });
    });

    it('correctly binds "this" to the first argument', function() {
      var object = {
        foo: 1,
        bar: 2
      };

      var result = (function(prop) {
        return this[prop];
      }).applyNamed(object, { prop: 'foo' });

      expect(result).to.eql(1);
    });
  });

});
