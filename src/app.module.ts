import { Module, HttpModule, HttpService } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'
import { enviroments } from './enviroments'
import config from './config'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:enviroments[process.env.NODE_ENV] || '.env'
    , load : [config]
    , isGlobal: true
   })
  , UsersModule
  , ProductsModule
  , HttpModule
  , DatabaseModule],
  controllers: [AppController],
  providers: [AppService, 
   
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
export class AppModule {
  constructor(){
    console.log(process.env.NODE_ENV, enviroments[process.env.NODE_ENV])
  }
}
