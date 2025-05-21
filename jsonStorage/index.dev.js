/*
 * Allowed types
 * key: string
 * value: object|array|number|string|boolean|null
 */
function jsonStorage(key) {

  const $this = new Map();
  const $key = key;
  
  // .dev-only
  const dev_validate = (key, value) => {
    if (typeof key !== 'string') {
      throw new TypeError(`key has type ${typeof key} but expected string`);
    }

    if (
      value === null
      || ['boolean',
          'number',
          'string',
          'object',
        ].includes(typeof value)
      || Array.isArray(value)
    ) {
      throw new TypeError(`value has type ${typeof value} but expected null, boolean, number, string, array or object`);
    }
  }

  // .dev-only
  $this.delete = key => (dev_validate(key, null), Map.prototype.delete.call($this, key));
  $this.get = key => (dev_validate(key, null), Map.prototype.get.call($this, key));
  $this.has = key => (dev_validate(key, null), Map.prototype.has.call($this, key));
  $this.set = key => (dev_validate(key, value), Map.prototype.set.call($this, key, value));


  $this.save = key => (
    dev_validate(key ?? $key, null), // .dev-only
    localStorage.setItem($key ?? key,
      JSON.stringify(
        Object.fromEntries($this) ?? {}
      )
    ), $this
  );

  $this.load = key => (
    (
      dev_validate(key ?? $key, null), // .dev-only
      Object.entries(
        JSON.parse(
          localStorage.getItem($key ?? key)
        ) ?? {}
      )
    ).forEach(
      ([k, v]) => $this.set(k, v)
    ), $this
  );

  return $this;
}