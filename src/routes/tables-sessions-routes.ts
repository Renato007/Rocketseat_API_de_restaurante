import { Router } from "express";
import { TablesSessionsController } from "@/controlles/tables-sessions-controller";

const tableSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tableSessionsRoutes.get("/", tablesSessionsController.index);
tableSessionsRoutes.post("/", tablesSessionsController.create);

export {tableSessionsRoutes}
