import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent from "../components/sort.js";
import {TagsSortType} from "../const";
import TasksComponent from "../components/tasks.js";
import {remove, render} from "../utils/render";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const collectTasks = (tasks, container) => {
  return tasks
    .forEach((task) => {
      renderTask(container, task);
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
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    const container = this._container.getElement();
    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);


    // 4.2.2 Сообщение о том, что все задачи выполнены, если таковых нет или они все в архиве.
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    const taskListElement = this._tasksComponent.getElement();

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    collectTasks(tasks.slice(0, this._showingTasksCount), taskListElement);
    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      collectTasks(sortedTasks.slice(0, this._showingTasksCount), taskListElement);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, thi._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    collectTasks(sortedTasks, taskListElement);

    this._renderLoadMoreButton();
  }
}
