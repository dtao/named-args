# named-args

Ever wish JavaScript had named arguments?

```javascript
function sortableName(first, middle, last) {
  return last + ', ' + first + ' ' + middle;
}

sortableName.withArgs({
  last: 'Smith',
  first: 'Peter',
  middle: 'M'
});
// => 'Smith, Peter M'
```

Ever wish that `arguments` were *object-like* instead of array-like?

```javascript
function f(x, y, z) {
  console.log(arguments.named());
}

f(1, 2, 3);
// => { x: 1, y: 2, z: 3 }
```

There you go. Don't say I never gave you anything.
