import {MONTH_NAMES} from "./const";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomBooleanValue = () => Math.random() > 0.5;

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

export {formatTime, getRandomBooleanValue, blockForTaskTemplates};
