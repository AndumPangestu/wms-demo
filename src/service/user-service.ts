import {
    LoginUserRequest,
    toUserResponse,
    UpdateUserRequest,
    UserResponse
} from "../model/user-model";
import { Validation } from "../validation/validation";
import { UserValidation } from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../application/config";

export class UserService {

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        });

        if (!user) {
            throw new ResponseError(401, "Username or password is wrong");
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong");
        }


        const token = jwt.sign(
            {
                userId: user.id,
                userName: user.name
            },
            JWT_SECRET_KEY,
            {
                expiresIn: "12h",
            }
        );


        const response = toUserResponse(user);
        response.token = token;
        return response;
    }

    static async get(userId: number): Promise<UserResponse> {
        if (isNaN(userId)) {
            throw new ResponseError(400, "Invalid id");
        }

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new ResponseError(404, "User not found");
        }

        return toUserResponse(user);

    }

    // static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    //     const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    //     if (updateRequest.name) {
    //         user.name = updateRequest.name;
    //     }

    //     if (updateRequest.password) {
    //         user.password = await bcrypt.hash(updateRequest.password, 10);
    //     }

    //     const result = await prismaClient.user.update({
    //         where: {
    //             username: user.username
    //         },
    //         data: user
    //     });

    //     return toUserResponse(result);
    // }

}
