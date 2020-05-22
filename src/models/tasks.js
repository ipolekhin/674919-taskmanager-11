export default class Tasks {
  constructor() {
    this._tasks = [];
    this._dataChangeHandlers = [];
  }

  // Метод получения всех задач
  getTasks(tasks) {
    return this._tasks;
  }

  // Метод заполнения задачами
  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  // Обновить одну задачу в модели
  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  //  Callback метод, если задача изменилась то будем её вызывать
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  // Метод, который вызывает эти callbacks
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
