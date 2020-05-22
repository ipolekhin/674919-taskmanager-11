import {isRepeating, isOneDay, isOverdueDate} from "./common";
import {FilterType} from "../const";

// Получение задач в архиве getArchiveTasks
export const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

// Получение задач не из архива getNotArchiveTasks
export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

// Получение избранных задач getFavoriteTasks
export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

// Получение просроченных задач getOverdueTasks
export const getOverdueTasks = (tasks, date) => {
  return tasks.filter((task) => {
    const dueDate = task.dueDate;

    if (!dueDate) {
      return false;
    }

    return isOverdueDate(dueDate, date);
  });
};

// Получение повторяющихся задач getRepeatingTasks
export const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

// Получение задач за сегодняшний день getTasksInOneDay
export const getTasksInOneDay = (tasks, date) => {
  return tasks.filter((task) => isOneDay(task.dueDate, date));
};

// Функция фильтрации getTasksByFilter
export const getTasksByFilter = (tasks, filterType) => {
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
