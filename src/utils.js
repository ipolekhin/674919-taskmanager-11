import {MONTH_NAMES} from "./const";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterEnd`,
};

const blockForTaskTemplates = (dueDate) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  return {
    isDateShowing: !!dueDate,
    date: isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``,
    time: isDateShowing ? formatTime(dueDate) : ``,
    deadlineClass: isExpired ? `card--deadline` : ``,
  };
};

const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 24);
  const minutes = castTimeFormat(time.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomBooleanValue = () => Math.random() > 0.5;

// Функция создания DOM эелемента
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция для рендеринга компонентов на страницу.
const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    default:
      container.append(element);
  }
};

export {
  blockForTaskTemplates,
  createElement,
  formatTime,
  getRandomBooleanValue,
  render,
};
