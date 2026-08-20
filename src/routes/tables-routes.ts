import { TableController } from "@/controlles/tables-controller";
import { Router } from "express";

const tablesRoutes = Router();
const tablesController = new TableController();

tablesRoutes.get("/", tablesController.index);

export { tablesRoutes };
