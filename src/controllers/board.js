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
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    // 4.2.2 Сообщение о том, что все задачи выполнены, если таковых нет или они все в архиве.
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);

      return;
    }

    const taskListElement = this._tasksComponent.getElement();

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    collectTasks(tasks.slice(0, showingTasksCount), taskListElement);
    renderLoadMoreButton();
  }

  _renderLoadMoreButton() {
    if (showingTasksCount >= tasks.length) {
      return;
    }

    render(container, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);

      collectTasks(sortedTasks, taskListElement);

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

    taskListElement.innerHTML = ``;

    collectTasks(sortedTasks, taskListElement);

    renderLoadMoreButton();
  }
}
