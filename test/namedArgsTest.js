require('../namedArgs');

var expect = require('expect.js');

describe('arguments', function() {

  it('adds a "named" function to the arguments object', function() {
    expect(arguments.named).to.be.a(Function);
  });

  it('does not add a "named" function to plain vanilla objects', function() {
    expect(({}).named).to.be(undefined);
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
  });

  describe('arguments#names', function() {
    it('gets the names of the arguments', function() {
      (function(foo, bar) {
        expect(arguments.names).to.eql(['foo', 'bar']);
      }());
    });
  });

  describe('arguments#asObject', function() {
    it('provides an object mapping argument names to their values', function() {
      (function(foo, bar) {
        expect(arguments.asObject()).to.eql({
          foo: 3,
          bar: 4
        });
      }(3, 4));
    });
  });
});