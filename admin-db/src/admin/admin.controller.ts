import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { map, tap } from 'rxjs';


@Controller('city')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Query('apiKey') apiKey: string,@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto,apiKey);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  // @Post("weatherTemp")
  // getTemperature(@Body() createAdminDto: CreateAdminDto) {
  //   return this.adminService.getTemperature(createAdminDto);
  // }

  
  @Post("name")
  createdcity(@Body() createAdminDto: CreateAdminDto) {

    return this.adminService.createdcity(createAdminDto);
  }


  @Get('weatherTemp')
  getTemperature() {
    return this.adminService.getTemperature();
  }
  



 
  
}
