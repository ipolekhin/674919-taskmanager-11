import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent from "../components/sort.js";
import {TagsSortType} from "../const";
import TaskEditComponent from "../components/task-edit.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import {Keys} from "../const";
import {remove, render, replace} from "../utils/render";

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const collectTasks = (tasks, container, endCount, beginCount = 0) => {
  return tasks
    .slice(beginCount, endCount)
    .forEach((task) => renderTask(container, task));
};

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  // 4.2.1 обработчик нажатия клавиши «Esc», который будет заменять форму редактирования на карточку задачи
  const onEscKeyDown = (event) => {
    const isEscapeKey = event.key === Keys.ESC || event.key === Keys.ESCAPE;

    if (isEscapeKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((event) => {
    event.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent);
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

    render(container, this._sortComponent);
    render(container, this._tasksComponent);

    const taskListElement = this._tasksComponent.getElement();

    collectTasks(tasks, taskListElement, SHOWING_TASKS_COUNT_ON_START);

    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreButtonComponent);

      this._loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        collectTasks(tasks, taskListElement, showingTasksCount, prevTasksCount);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreButtonComponent);
        }
      });
    };

    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((TagsSortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, TagsSortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      collectTasks(sortedTasks, taskListElement, showingTasksCount);

      renderLoadMoreButton();
    });
  }
}
