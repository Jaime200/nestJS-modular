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

    @Get(':productId')
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param('productId', ParseIntPipe) productId: number) {
        // response.status(200).send({
        //   message: `product ${productId}`,
        // });
        return this.userservice.findOne(productId);
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
