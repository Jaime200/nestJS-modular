import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import config from './config'
@Injectable()
export class AppService {
  constructor( 
    @Inject('API_KEY') private apiKey:string, 
    @Inject('task') private task: any,
    @Inject(config.KEY) private configservice: ConfigType<typeof config>
    //private configservice:ConfigService
    
  ){
    
  }
  getHello(): string {
    //const apiKey = this.configservice.get('API_KEY');
    const apiKey = this.configservice.apiKey
    //const dbName = this.configservice.get('DATABASE_NAME');
    const dbName = this.configservice.database.name;
    return 'Hello World! API ' + apiKey + ' db ' + dbName  ;
  }
}
