import { Test, TestingModule } from "@nestjs/testing";
import { UserModule } from "./user.module";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import mongoConfig from "../../config/mongo.config";

describe("UserController", () => {
    let controller: UserController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UserModule, MongooseModule.forRoot(mongoConfig.url)],
        }).compile();

        controller = module.get<UserController>(UserController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
