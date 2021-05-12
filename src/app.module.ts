import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';


const API_KEY = '1234WSDFE44'
const API_KEY_PROD = '1234_PROD'

@Module({
  imports: [UsersModule, ProductsModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide : 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    {
      provide : 'task',
      useFactory: async (http: HttpService) =>{
        const task = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();
        return task.data;
       },
      inject: [HttpService]
    }
  ],
})
export class AppModule {}
