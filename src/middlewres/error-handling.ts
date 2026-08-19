import { AppError } from "@/utils/AppErros";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "validadtion error", issues: error.format() });
  }

  return response.status(500).json({ message: error.message });
}

// Verifica se esse erro é um erro que foi lançado por nós, dentro da nossa aplicação, tratado por nós.
