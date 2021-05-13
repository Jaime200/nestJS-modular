import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
@Injectable()
export class AppService {
  constructor( 
    @Inject('API_KEY') private apiKey:string, 
    @Inject('task') private task: any,
    private configservice:ConfigService
  ){
    
  }
  getHello(): string {
    const apiKey = this.configservice.get('API_KEY');
    const dbName = this.configservice.get('DATABASE_NAME');
    return 'Hello World! API ' + apiKey + ' db ' + dbName  ;
  }
}
