import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUsertDto, UpdateUserDto } from '../../DTO/users.dto';
import { UserService } from '../../services/user.service';
import { ParseIntPipe } from '../../../common/parse-int.pipe'

@Controller('user')
export class UserController {

    constructor(private userservice:UserService){}
    @Get()
    getProducts(
        @Query('limit') limit = 100,
        @Query('offset') offset = 0,
        @Query('brand') brand: string,
    ) {
        // return {
        //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
        // };
        return this.userservice.findAll();
    }

    @Get('filter')
    getProductFilter() {
        return `yo soy un filter`;
    }

    @Get(':userId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('userId', ParseIntPipe) userId: number) {
        // response.status(200).send({
        //   message: `product ${userId}`,
        // });
        return this.userservice.findOne(userId);
    }

    @Post()
    create(@Body() payload: CreateUsertDto) {
        // return {
        //   message: 'accion de crear',
        //   payload,
        // };
        return this.userservice.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
        return this.userservice.update(+id, payload);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userservice.remove(+id);
    }
}
