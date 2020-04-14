import {FILTER_NAMES} from "./const";
import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

const FIRST = 1;
const TASK_COUNT = 20;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// Функция для рендеринга компонентов на страницу.
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Сохраняем в переменные ключевые элементы страницы.
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// Генерируем задачи
const tasks = generateTasks(TASK_COUNT);
console.log(tasks);

const countsOfFilters = {
  'all': 0,
  'overdue': 0,
  'today': 0,
  'favorites': 0,
  'repeating': 0,
  'archive': 0,
};

tasks.map((task, index) => {
  const {dueDate, repeatingDays, isArchive, isFavorite} = task;
  const isRepeatingTask = Object.values(repeatingDays).some(Boolean);

  countsOfFilters[`all`]++;
  dueDate instanceof Date && dueDate < Date.now() ? countsOfFilters[`overdue`]++ : null;

  if (dueDate instanceof Date && dueDate < Date.now()) {
    const date = Date.now();
    countsOfFilters[`today`]++;
    // console.log(dueDate.getDate());
    // console.log(date.getDate);
  }

  isFavorite ? countsOfFilters[`favorites`]++ : null;
  isRepeatingTask ? countsOfFilters[`repeating`]++ : null;
  isArchive ? countsOfFilters[`archive`]++ : null;
});

const filters = generateFilters(countsOfFilters);
console.log(generateFilters(countsOfFilters));

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

// Сохраняем в переменные новые ключевые элементы после рендеринга.
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

const createTasks = (begin, end) => {
  tasks.slice(begin, end)
    .forEach((task) => {
      render(taskListElement, createTaskTemplate(task));
    });
};

createTasks(FIRST, showingTasksCount);

render(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;

  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;
  createTasks(prevTaskCount, showingTasksCount);

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
