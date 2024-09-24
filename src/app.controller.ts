import { Controller, Get, Delete, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Body, UseInterceptors } from '@nestjs/common/decorators';
import { CreateDataDto } from './dtos/create-data.dto';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('custom_key') //Controlling key
  @CacheTTL(20) //Controlling the duration
  async getData() {
    try {
      return await this.appService.getData();
    } catch(error) {
      console.log(error);
      return error;
    }
  }

  @Post()
  async postData(@Body() createDataDto: CreateDataDto) {
    try {
      return await this.appService.postData(createDataDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Delete()
  async deleteData() {
    try {
      return await this.appService.deleteData();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
