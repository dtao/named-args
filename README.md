# named-args

Ever wish the `arguments` object in JavaScript were *object-like* instead of array-like?

## Calling functions with named arguments

```javascript
function sortableName(first, middle, last) {
  return last + ', ' + first + ' ' + middle;
}

sortableName.forArgs({
  last: 'Smith',
  first: 'Peter',
  middle: 'M'
});
// => 'Smith, Peter M'
```

## Accessing `arguments` as an object

```javascript
function f(x, y, z) {
  console.log(arguments.named());
}

f(1, 2, 3);
// => { x: 1, y: 2, z: 3 }
```

There you go. Don't say I never gave you anything.
