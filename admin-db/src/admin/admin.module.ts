import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CitySchema, citySchema } from './schema/citySchema';
import { HttpModule } from '@nestjs/axios';

@Module({

  imports: [MongooseModule.forFeature([{name:citySchema.name,schema:CitySchema}]),HttpModule],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
