const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds', () => {
  expect(1).toBeTruthy();
  expect(1).toBeFalsy();
});