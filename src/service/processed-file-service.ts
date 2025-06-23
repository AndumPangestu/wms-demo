import { ProcessedFileResponse, CreateProcessedFileRequest, toProcessedFileResponse } from "../model/processed-file-model";
import { Validation } from "../validation/validation";
import { ProcessedFileValidation } from "../validation/processed-file-validation";
import { ProcessedFile } from "@prisma/client";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";


export class ProcessedFileService {

    static async create(request: CreateProcessedFileRequest): Promise<ProcessedFileResponse> {
        const createRequest = Validation.validate(ProcessedFileValidation.CREATE, request);


        const isCodeExist = await prismaClient.processedFile.findFirst({
            where: {
                file_name: createRequest.file_name,
                type: createRequest.type
            }
        });

        if (isCodeExist) {
            logger.error(`ProcessedFile with file_name ${createRequest.file_name} and type ${createRequest.type} already exists`);
            throw new ResponseError(400, "ProcessedFile already exists");
        }

        const processedFile = await prismaClient.processedFile.create({
            data: createRequest
        });

        return toProcessedFileResponse(processedFile);
    }



    static async isAlreadyExist(file_name: string, type: string): Promise<boolean> {

        if (!file_name || !type) {
            throw new ResponseError(400, "File name and type must be provided");
        }

        const processedFile = await prismaClient.processedFile.findUnique({
            where: {
                file_name: file_name,
                type: type
            }
        });

        if (processedFile) {
            return true;
        }

        return false;
    }

}


