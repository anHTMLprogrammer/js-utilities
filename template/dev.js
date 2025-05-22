/* 
 * ABOUT
 * simple function to create DOM
 * Node by template from HTML document
 * 
 * USAGE EXAMPLE
 * <ol class="todo-list">
 *   <h3>${ToDo List}</h3>
 *   <template id="todo-template">
 *     <li id="todoNo${todo.id}">${todo.text}</li>
 *   </template>
 * </ol>
 * -------------------------
 * template`todo-template`({
 *   todo: {
 *     text: 'create todo',
 *     id: 1
 *   }
 * }, true)({
 *   todo: {
 *     text: 'create todo list',
 *     id: 0
 *   }
 * });
 * ----------------------
 * <ol class="todo-list">
 * <li id="todoNo1">create todo</li>
 *   <template id="todo-template">
 *     <li id="todoNo${todo.id}">${todo.text}</li>
 *   </template>
 *   <li id="todoNo0">create todo list</li>
 * </ol>
 */
function template(id) {
  const target = document.getElementById(id);
  return function fill(data, prepend) {
    target.parentElement
    [prepend ? 'prepend' : 'append'](
      template.parser.parseFromString(
        target.innerHTML.replaceAll(/\${(.*)}/g,
          (_, prop) => prop.startsWith('\\')
            ? prop.slice(1)
            : data[prop] ?? `there should have been a ${prop} here but the developer forgot about it`
        ), 'text/html'
      ).body.firstChild
    );
    return fill;
  }
}

template.parser = new DOMParser();