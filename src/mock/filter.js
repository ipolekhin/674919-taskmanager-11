import {FILTER_NAMES} from "../const";

// Функция считатет статиститку фильтра
const calculateFilterStatistics = (tasks) => {
  const statisticsOfFilters = {
    'all': 0,
    'overdue': 0,
    'today': 0,
    'favorites': 0,
    'repeating': 0,
    'archive': 0,
  };

  tasks.map((task, index) => {
    const date = new Date;
    const {dueDate, repeatingDays, isArchive, isFavorite} = task;
    const isRepeatingTask = Object.values(repeatingDays).some(Boolean);

    statisticsOfFilters[`all`]++;
    dueDate instanceof Date && dueDate < date ? statisticsOfFilters[`overdue`]++ : null;
    dueDate instanceof Date && dueDate.getDate() === date.getDate() ? statisticsOfFilters[`today`]++ : null;
    isFavorite ? statisticsOfFilters[`favorites`]++ : null;
    isRepeatingTask ? statisticsOfFilters[`repeating`]++ : null;
    isArchive ? statisticsOfFilters[`archive`]++ : null;
  });

  return statisticsOfFilters;
};

const generateFilters = (statistics) => {
  return FILTER_NAMES.map((filterName) => {
    return {
      'name': filterName,
      'count': statistics[filterName],
    };
  });
};

export {generateFilters, calculateFilterStatistics};
