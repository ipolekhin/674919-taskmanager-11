import {isRepeating, isOneDay, isOverdueDate} from "./common";
import {FilterType} from "../const";

// Получение задач в архиве getArchiveTasks
const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

// Получение задач не из архива getNotArchiveTasks
const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

// Получение избранных задач getFavoriteTasks
const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

// Получение просроченных задач getOverdueTasks
const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

// Получение повторяющихся задач getRepeatingTasks
const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

// Получение задач за сегодняшний день getTasksInOneDay
const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

// Функция фильтрации getTasksByFilter
const getTasksByFilter = (tasks, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.ALL:
      return getNotArchiveTasks(tasks);
    case FilterType.ARCHIVE:
      return getArchiveTasks(tasks);
    case FilterType.FAVORITES:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case FilterType.OVERDUE:
      return getOverdueTasks(getNotArchiveTasks(tasks), nowDate);
    case FilterType.REPEATING:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case FilterType.TODAY:
      return getTasksInOneDay(getNotArchiveTasks(tasks), nowDate);
  }

  return tasks;
};

export {
  getArchiveTasks,
  getNotArchiveTasks,
  getFavoriteTasks,
  getOverdueTasks,
  getRepeatingTasks,
  getTasksInOneDay,
  getTasksByFilter,
};
