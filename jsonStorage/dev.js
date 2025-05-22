/*
 * ABOUT
 * simple Map-based jsonStorage with
 * functions to save to and load from
 * localStorage by key
 * 
 * INTERESTING FACT
 * in javascript numeric object keys
 * are automatically converted to strings
 * meaning you can access the same value
 * through a number and a string containing
 * that number
 */
function jsonStorage(key) {
  const $this = new Map();
  const $key = key;

  $this.save = key => (
    jsonStorage.dev_valid($key ?? key, null),
    localStorage.setItem($key ?? key,
      JSON.stringify(
        Object.fromEntries($this) ?? {}
      )
    ), $this
  );

  $this.load = key => (
    jsonStorage.dev_valid($key ?? key, null),
    Object.entries(
      JSON.parse(
        localStorage.getItem($key ?? key)
      ) ?? {}
    ).forEach(
      ([k, v]) => $this.set(k, v)
    ), $this
  );

  $this.delete = key => (
    jsonStorage.dev_valid(key, null), Map.prototype.delete.call($this, key), $this
  );

  $this.get = key => (
    jsonStorage.dev_valid(key, null), Map.prototype.get.call($this, key), $this
  );

  $this.has = key => (
    jsonStorage.dev_valid(key, null), Map.prototype.has.call($this, key), $this
  );

  $this.set = (key, value) => (
    jsonStorage.dev_valid(key, value), Map.prototype.set.call($this, key, value), $this
  );

  return $this;
}

jsonStorage.dev_valid = (key, value) => {
  if (
    typeof key !== 'string'
  ) throw new TypeError(`type of key ${key} is ${typeof key} but expected string`)

  if (
    value === undefined
    || typeof value === 'function'
    || typeof value === 'symbol'
    || (
      typeof value == 'number'
      && (
        Number.isNaN(value)
        || !Number.isFinite(value)
      )
    )
  ) throw new TypeError(`type of value ${value} is ${typeof value} but expected null, boolean, simple number, string, or object without reference cycle`)

  if (
    Array.isArray(value)
  ) value.forEach(v => jsonStorage.dev_valid('', v))

  if (
    typeof value === 'object' && value != null
  ) Object.entries(value).forEach(
    ([k, v]) => jsonStorage.dev_valid(k, v)
  )
}