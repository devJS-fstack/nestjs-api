import * as jwt from "jsonwebtoken";
import { IUser } from "../schemas";

export class BaseAuthentication {
    generateToken(user: IUser) {
        delete user.password;
        return jwt.sign(
            {
                ...user,
            },
            "private key",
            { expiresIn: "30m" },
        );
    }
}
