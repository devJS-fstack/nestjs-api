import { IAnimal } from "../schemas/animal.schema";

export class CommonMapper {
    mapFromPetFinderToAnimal(data: IAnimal): IAnimal {
        return {
            age: data.age,
            breeds: data.breeds,
            colors: data.colors,
            description: data.description,
            gender: data.gender,
            name: data.name,
            photos: data.photos,
            size: data.size,
            type: data.type,
            videos: data.videos,
        }
    }
}