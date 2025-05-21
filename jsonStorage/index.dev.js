/*
 * Allowed types
 * key: string
 * value: object|array|number|string|boolean|null
 */
function jsonStorage(key) {

  const $this = new Map();
  const $key = key;

  $this.save = key => (
    localStorage.setItem($key ?? key,
      JSON.stringify(
        Object.fromEntries($this) ?? {}
      )
    ), $this
  );

  $this.load = key => (
    (
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