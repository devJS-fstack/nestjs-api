import Constant from "../../utils/constant";
require('dotenv').config()
export default {
    dbName: Constant.DB,
    host: {
        cluster:process.env.MONGODB_CLUSTER,
        dbUserName:process.env.MONGODB_USERNAME,
        dbPassword:process.env.MONGODB_PASSWORD
    }
}