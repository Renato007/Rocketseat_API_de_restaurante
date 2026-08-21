import { Router } from "express";
import { OrdersController } from "@/controlles/orders-controller";

const ordersRoutes = Router();
const ordersController = new OrdersController();

ordersRoutes.post("/", ordersController.create);

export { ordersRoutes };
