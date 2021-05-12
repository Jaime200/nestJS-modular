import { Inject, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUsertDto, UpdateUserDto } from '../DTO/users.dto';
import { User } from '../entities/user.entity'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class UserService {
    constructor(
        @Inject('API_KEY') apiKey: string,
        private configservice:ConfigService
        ){}

    private counterId = 2
    private users: User[] = [
        {
            id :1,
            email:'jaime.munoz200@gmail.com',
            password: '12345',
            role:'admin'
        },
        {
            id: 2,
            email: 'test@gmail.com',
            password: '12345',
            role: 'admin'
        }
    ]

    findAll() {
        const apiKey = this.configservice.get('API_KEY');
        const myDB = this.configservice.get('DATABASE_NAME');
        console.log(apiKey, myDB)
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find((item) => item.id === id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    create(payload: CreateUsertDto) {
        console.log(payload);
        this.counterId = this.counterId + 1;
        const newUser = {
            id: this.counterId,
            ...payload,
        };
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, payload: UpdateUserDto) {
        const user = this.findOne(id);
        const index = this.users.findIndex((item) => item.id === id);
        this.users[index] = {
            ...user,
            ...payload,
        };
        return this.users[index];
    }

    remove(id: number) {
        const index = this.users.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        this.users.splice(index, 1);
        return true;
    }
}
