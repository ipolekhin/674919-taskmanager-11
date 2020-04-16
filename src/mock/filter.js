import {FILTER_NAMES} from "../const";

// Функция считатет статиститку фильтра
const calculateFilterStatistics = (tasks) => {
  const valuesOfFilterStatistics = {
    'all': 0,
    'overdue': 0,
    'today': 0,
    'favorites': 0,
    'repeating': 0,
    'archive': 0,
  };
  const date = new Date;

  tasks.map((task) => {
    const {dueDate, repeatingDays, isArchive, isFavorite} = task;
    const isRepeatingTask = Object.values(repeatingDays).some(element => element);

    valuesOfFilterStatistics[`all`]++;
    dueDate instanceof Date && dueDate < date ? valuesOfFilterStatistics[`overdue`]++ : null;
    dueDate instanceof Date && dueDate.getDate() === date.getDate() ? valuesOfFilterStatistics[`today`]++ : null;
    isFavorite ? valuesOfFilterStatistics[`favorites`]++ : null;
    isRepeatingTask ? valuesOfFilterStatistics[`repeating`]++ : null;
    isArchive ? valuesOfFilterStatistics[`archive`]++ : null;
  });

  return valuesOfFilterStatistics;
};

const generateFilters = (tasks) => {
  const valuesOfFilterStatistics = calculateFilterStatistics(tasks);
  return FILTER_NAMES.map((filterName) => {
    return {
      'name': filterName,
      'count': valuesOfFilterStatistics[filterName],
    };
  });
};

export {generateFilters};
