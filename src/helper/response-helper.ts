import { Pagination } from './../model/page';
import { Response } from "express";
import { ResponseError } from "../error/response-error";



const sendSuccess = (
  res: Response,
  statusCode: number = 200,
  message: string | null = null,
  data: any = null,
  pagination: Pagination | null = null
) => {
  const response: {
    status: number;
    success: boolean;
    message: string | null;
    data?: any;
    pagination?: Pagination;
  } = {
    status: statusCode,
    success: true,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

const sendError = (
  res: Response,
  statusCode: number = 400,
  message: string,
  errors: Record<string, string[]> | null = null
) => {
  const response: {
    status: number;
    success: boolean;
    message: string;
    errors: Record<string, string[]> | null;
  } = {
    status: statusCode,
    success: false,
    message,
    errors,
  };

  return res.status(statusCode).json(response);
}


export { sendSuccess, sendError };
