import moment from "moment";

const blockForTaskTemplates = (dueDate) => {
  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  return {
    isDateShowing: !!dueDate,
    date: isDateShowing ? formatDate(dueDate) : ``,
    time: isDateShowing ? formatTime(dueDate) : ``,
    deadlineClass: isExpired ? `card--deadline` : ``,
  };
};

const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

const getRandomBooleanValue = () => Math.random() > 0.5;

export {
  blockForTaskTemplates,
  formatDate,
  formatTime,
  getRandomBooleanValue,
};
