export default {
    DB: "pet-shop",
};

export const PETFINDER_INTEGRATION = {
    SERVICES: {
        GET_TOKEN: {
            url: "https://api.petfinder.com/v2/oauth2/token",
        },
        GET_ANIMAL: {
            url: "https://api.petfinder.com/v2/animals",
        }
    },
    AUTHORIZATION: {
        clientId: "Dg6YtzebbTBDZJ6lTC1SBESBo2k8plZRx4ZW5SdmAxLmDccCKO",
        clientSecret: "iXxN3SFJ53gCcwCKnCnHk9kdlKUDbeqUFHIJPevS",
        grantType: "client_credentials",
    }
}
