import BoardComponent from "./components/board";
import BoardController from "./controllers/board";
import FilterComponent from "./components/filter";
import SiteMenuComponent from "./components/site-menu";
import TasksModel from "./models/tasks"
import {generateFilters} from "./mock/filter";
import {generateTasks} from "./mock/task";
import {render} from "./utils/render";

const TASK_COUNT = 20;

// Сохраняем в переменные ключевые элементы страницы.
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// Генерируем задачи
const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

render(siteHeaderElement, new SiteMenuComponent());
render(siteMainElement, new FilterComponent(filters));

const boardComponent = new BoardComponent();
const boardController = new BoardController(boardComponent, tasksModel);
boardController.render(tasks);
render(siteMainElement, boardComponent);
