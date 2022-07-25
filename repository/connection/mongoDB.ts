import mongoose from 'mongoose'
import mongoConfig from '../../config/database/mongo.config'

const url = `mongodb+srv://${mongoConfig.host.dbUserName}:${mongoConfig.host.dbPassword}@${mongoConfig.host.cluster}/${mongoConfig.dbName}?retryWrites=true&w=majority`

export default class MongoDB {
    connect = async () => {
        console.log(url)
        console.log('Connecting to database...')
        mongoose.set('debug',true);
        if(mongoose.connection.readyState == 1) return mongoose
        console.log('Creating new connection...')
        await mongoose.connect(url,{
            dbName:mongoConfig.dbName
        })
        return mongoose
    }

    close = () => {
        if(mongoose.connection.readyState == 1) {
            console.log('Closing connection...')
            return mongoose.connection.close()
        }
    }
}