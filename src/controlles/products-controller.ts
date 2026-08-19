import { NextFunction, Request, Response } from "express";
import {knex} from "@/database/knex"
import { z } from "zod";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // throw new AppError("Erro de teste", 501) testando
      return response.json({ message: "OK" });
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

      await knex<ProductRepository>("products").insert({name, price})

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
