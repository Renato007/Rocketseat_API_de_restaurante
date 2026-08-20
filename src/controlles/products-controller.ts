import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppErros";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json(products);
    } catch (error) {
      // Proximo processo de execução passando um erro que podem vir de um processo assícrono.
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      //validação dos dados da requisição
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0, { message: "value must be greater than 0" }),
      });
      // ler e passa para o zod para validação, caso não seja validado, o zod lança um erro que é capturado pelo catch e passado para o next(error)
      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      // validação para id apenas número
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);
      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();
      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), { message: "id must be a number" })
        .parse(request.params.id);

      //para resolver o problema de id número não encontrado
      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();
      if (!product) {

        throw new AppError("Product not found");
      }

      await knex<ProductRepository>("products").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
