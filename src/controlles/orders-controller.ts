import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppErros";
import z from "zod";
import { knex } from "@/database/knex";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body,
      );

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      //Verificar se a sessão ela existe
      if (!session) {
        throw new AppError("sessions table not found");
      }

      //Verificar se a mesa encerrou os pedidos
      if (session.closed_at) {
        throw new AppError("this table is closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      //Verificar se o produto não existe
      if (!product) {
        throw new AppError("product not found");
      }

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price, // preco no momento do pedido.
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
