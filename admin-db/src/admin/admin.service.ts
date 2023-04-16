import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { cityDocument, citySchema } from './schema/citySchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from "axios"
import { response } from 'express';

import { HttpService } from '@nestjs/axios';
import { Observable, forkJoin, from, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AdminService {
  

  constructor(@InjectModel(citySchema.name) private cityModel:Model<cityDocument> ,private readonly httpService: HttpService){}
  create(createAdminDto: CreateAdminDto, apiKey:string) : Promise<citySchema> {
    console.log(apiKey);
    if(apiKey==="ADMIN3214"){
    const model = new this.cityModel();
    model.cityName=createAdminDto.cityName;
    console.log(model);
    return model.save();
    }

    else{
      return Promise.reject(new Error('fail'))
      console.log('hi');
        }
  }


  findAll() {
    return this.cityModel.find().exec();
  }

  createdcity(createAdminDto: CreateAdminDto) : any {
    const temp=(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${createAdminDto.cityName}&appid=532e04f5a8e8ec0be5867f4fd335b1b5&units=metric`).pipe(map((response) => response.data.main.temp)));
    return temp;
  }

  // getTemperature(createAdminDto: CreateAdminDto) : any {
  //   const temp=(this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${createAdminDto.cityName}&appid=532e04f5a8e8ec0be5867f4fd335b1b5&units=metric`).pipe(map((response) => response.data.main.temp)));
  //   return temp;
  // }

  

  

  async getTemperature() {
    const cities = await this.findAll();
    const promises = cities.map(async ({ cityName }) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=532e04f5a8e8ec0be5867f4fd335b1b5&units=metric`);
        console.log(response.data.main.temp);
        var para ={
          city : cityName,
          temp: response.data.main.temp
        }
        return para
      } catch (err) {
        console.error(err);
        return null;
      }
    });
    const data = await Promise.all(promises);
    return data.filter(temp => temp !== null);
  }
 
  

  
}
