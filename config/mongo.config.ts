import constant from "../utils/constant";
require('dotenv').config()


export default {
    dbName: constant.DB,
    host: {
        cluster: process.env.MONGODB_CLUSTER,
        dbUserName: process.env.MONGODB_USERNAME,
        dbPassword: process.env.MONGODB_PASSWORD
    },
    url: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${constant.DB}?retryWrites=true&w=majority`
};
