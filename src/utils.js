import {MONTH_NAMES} from "./const";

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

// Функция для рендеринга компонентов на страницу.
const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export {
  blockForTaskTemplates,
  formatTime,
  getRandomBooleanValue,
  render,
};
