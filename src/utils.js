import {MONTH_NAMES} from "./const";

const castTimeFormat = (value) => {
  return value.toString().padStart(2, `0`);
};

const formatTime = (time) => {
  const hours = castTimeFormat(time.getHours() % 24);
  const minutes = castTimeFormat(time.getMinutes());

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
