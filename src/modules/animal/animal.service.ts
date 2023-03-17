import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AnimalDocument } from "../../schemas";
import axios, { AxiosRequestConfig } from "axios";
import { PETFINDER_INTEGRATION } from "../../utils/constants";
import { CommonMapper } from "../../utils/mapper";
import * as qs from "qs";

@Injectable()
export class AnimalService {
    constructor(@InjectModel("animals") private readonly animalModel: Model<AnimalDocument>) {}

    async ingestDataFrom3Party({ type, totalPage }: { type: string; totalPage: number }) {
        console.log("service", { type, totalPage });
        const commonMapper = new CommonMapper();
        const { access_token: accessToken } = await this.getAccessToken();
        if (accessToken) {
            for (let i = 1; i <= totalPage; i++) {
                const data = await this.fetchData({ type, page: i, accessToken });
                const animals = (data?.animals ?? []).map((animal) => {
                    return commonMapper.mapFromPetFinderToAnimal(animal);
                });
                await this.animalModel.insertMany(animals);
            }
        }
    }

    async getAccessToken() {
        const { url } = PETFINDER_INTEGRATION.SERVICES.GET_TOKEN;
        const { clientId, clientSecret, grantType } = PETFINDER_INTEGRATION.AUTHORIZATION;
        const config: AxiosRequestConfig = {
            url,
            method: "POST",
            data: qs.stringify({
                grant_type: grantType,
                client_id: clientId,
                client_secret: clientSecret,
            }),
        };

        const result = await axios(config);
        return result.data;
    }

    async fetchData({
        type,
        page,
        accessToken,
    }: {
        type: string;
        page: number;
        accessToken: string;
    }) {
        const { url } = PETFINDER_INTEGRATION.SERVICES.GET_ANIMAL;
        const config: AxiosRequestConfig = {
            url,
            method: "GET",
            params: { type, page },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        console.log(config);

        const result = await axios(config);
        return result.data;
    }

    async getList({ limit, skip, type }: { limit: number; skip: number; type: string }) {
        return this.animalModel.find(
            {
                type: new RegExp(type, "i"),
            },
            {},
            { limit, skip },
        );
    }

    async getById(id: string) {
        return this.animalModel.findById(id);
    }
}
