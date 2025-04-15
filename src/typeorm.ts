import {DataSource} from 'typeorm'
import { Customers } from './entity/entities/Customers'
import { Products } from './entity/entities/Products'
import { Orders } from './entity/entities/Orders'
import { Orderitems } from './entity/entities/Orderitems'

export const AppDataSource = new DataSource(
    {
        type : 'mysql',
        database : 'sample',
        username : 'root',
        password : 'root',
        synchronize: false,
        logging: false,
        entities: [Customers, Products, Orders, Orderitems]
    }
)