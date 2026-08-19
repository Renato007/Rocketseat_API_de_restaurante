import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppErros";

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
}

export { ProductController };
