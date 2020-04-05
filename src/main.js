'use strict';

const TASK_COUNT = 3;

// Функция для рендеринга компонентов на страницу.
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// Сохраняем в переменные ключевые элементы страницы.
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);


render(siteHeaderElement, createMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

// Сохраняем в переменные новые ключевые элементы после рендеринга.
const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate());
}

render(boardElement, createLoadMoreButtonTemplate());


