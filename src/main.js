import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import {render} from "./utils";

const FIRST = 1;
const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// Сохраняем в переменные ключевые элементы страницы.
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

// Генерируем задачи
const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

// Сохраняем в переменные новые ключевые элементы после рендеринга.
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(tasks[0]));

const createTasks = (begin, end) => {
  const tasksShow = tasks.slice(begin, end)
    .map((task) => createTaskTemplate(task)).join(`\n`);
  render(taskListElement, tasksShow);
};

createTasks(FIRST, showingTasksCount);

render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = document.querySelector(`.load-more`);

// Создадим обработчик событий на кнопку loadmore
loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;

  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
  createTasks(prevTaskCount, showingTasksCount);

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
