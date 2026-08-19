import { NextFunction, Request, Response } from "express";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json({ message: "Ok" });
    } catch (error) {
      // Proximo processo de execução passando um erro que podem vir de um processo assícrono.
      next(error);
    }
  }
}

export { ProductController };
