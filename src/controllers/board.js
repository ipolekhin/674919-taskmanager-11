import LoadMoreButtonComponent from "../components/load-more-button";
import NoTasksComponent from "../components/no-tasks";
import SortComponent from "../components/sort";
import {Mode as TaskControllerMode, TagsSortType} from "../const";
import TaskController, {EmptyTask} from "./task";
import TasksComponent from "../components/tasks";
import {remove, render} from "../utils/render";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const collectTasks = (tasks, container, onDataChange, onViewChange) => {
  return tasks
    .map((task) => {
      const taskController = new TaskController(container, onDataChange, onViewChange);
      taskController.render(task, TaskControllerMode.DEFAULT);

      return taskController;
    });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case TagsSortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case TagsSortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case TagsSortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._creatingTask = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const container = this._container.getElement();
    const tasks = this._tasksModel.getTasks();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    // 4.2.2 Сообщение о том, что все задачи выполнены, если таковых нет или они все в архиве.
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    this._renderTasks(tasks.slice(0, this._showingTasksCount));
    this._renderLoadMoreButton();
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._tasksComponent.getElement();
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, TaskControllerMode.ADDING);
  }

  _removeTasks() {
    this._showedTaskControllers.forEach((taskController) => taskController.destroy());
    this._showedTaskControllers = [];
  }

  _renderTasks(tasks) {
    const taskListElement = this._tasksComponent.getElement();

    const newTasks = collectTasks(tasks, taskListElement, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);
    this._showingTasksCount = this._showedTaskControllers.length;
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasksModel.getTasks().length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._onLoadMoreButtonClick);
  }

  _updateTasks(count) {
    this._removeTasks();
    this._renderTasks(this._tasksModel.getTasks().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === EmptyTask) {
      // Добавление
      // Флаг для определения состояния boardcontroller
      this._creatingTask = null;
      if (newData === null) {
        taskController.destroy();
        this._updateTasks(this._showingTasksCount);
      } else {
        this._tasksModel.addTask(newData);
        taskController.render(newData, TaskControllerMode.DEFAULT);

        if (this._showingTasksCount % SHOWING_TASKS_COUNT_BY_BUTTON === 0) {
          const destroyedTask = this._showedTaskControllers.pop();
          destroyedTask.destroy();
        }

        this._showedTaskControllers = [].concat(taskController, this._showedTaskControllers);
        this._showingTasksCount = this._showedTaskControllers.length;

        this._renderLoadMoreButton();
      }
    } else if (newData === null) {
      // Удаление
      this._tasksModel.removeTask(oldData.id);
      this._updateTasks(this._showingTasksCount);
      // Обновление
    } else {
      // Обновление
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        taskController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((value) => value.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;
    const sortedTasks = getSortedTasks(this._tasksModel.getTasks(), sortType, 0, this._showingTasksCount);
    this._removeTasks();
    this._renderTasks(sortedTasks);
    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingTasksCount;
    const tasks = this._tasksModel.getTasks();
    // const taskListElement = this._tasksComponent.getElement();
    this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
    this._renderTasks(sortedTasks);

    if (this._showingTasksCount >= sortedTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _onFilterChange() {
    this._updateTasks(SHOWING_TASKS_COUNT_ON_START);
  }
}
