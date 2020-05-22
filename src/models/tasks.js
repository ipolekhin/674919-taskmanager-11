import {getTasksByFilter} from "../utils/filter";
import {FilterType} from "../const";

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  // Метод получения всех отфильтрованных задач
  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  // Метод получения всех неотфильтрованных задач
  getTasksAll() {
    return this._tasks;
  }

  // Метод заполнения задачами
  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  // Метод подписывается снаружи на изменение фильтра
  setFilter(filterType) {
    // меняем активный тип фильтра
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
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

  // Callback фильтра при изменении
  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
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
