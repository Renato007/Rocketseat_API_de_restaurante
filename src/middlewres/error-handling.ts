import { AppError } from "@/utils/AppErros";
import { Request, Response, NextFunction } from "express";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: error.message });
}

// Verifica se esse erro é um erro que foi lançado por nós, dentro da nossa aplicação, tratado por nós.
