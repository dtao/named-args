# named-args

Ever wish the `arguments` object in JavaScript were *object-like* instead of array-like?

```javascript
function f(x, y, z) {
  console.log(arguments.asObject());
}

f(1, 2, 3);
// => { x: 1, y: 2, z: 3 }

f('foo', 'bar', 'baz');
// => { x: 'foo', y: 'bar', z: 'baz' }

f();
// => { x: undefined, y: undefined, x: undefined }
```

There you go. Don't say I never gave you anything.
