import {createMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting";
import {createFilterTemplate} from "./components/filter.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createBoardTemplate} from "./components/board.js";
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

// Функция для рендеринга компонентов на страницу.
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Сохраняем в переменные ключевые элементы страницы.
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);
const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);
console.log(tasks);

render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

// Сохраняем в переменные новые ключевые элементы после рендеринга.
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement, createSortingTemplate(), `afterbegin`);
render(taskListElement, createTaskEditTemplate(tasks[0]));

for (const task of tasks) {
  render(taskListElement, createTaskTemplate(task));
}

render(boardElement, createLoadMoreButtonTemplate());
