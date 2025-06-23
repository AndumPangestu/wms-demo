import { ProcessedFile } from "@prisma/client";

export type ProcessedFileResponse = {
    id: number;
    file_name: string;
    type: string;
    created_at: Date;
}

export type CreateProcessedFileRequest = {
    file_name: string;
    type: string;

}


export function toProcessedFileResponse(file: ProcessedFile): ProcessedFileResponse {
    return {
        id: file.id,
        file_name: file.file_name,
        type: file.type,
        created_at: file.created_at
    }
}
