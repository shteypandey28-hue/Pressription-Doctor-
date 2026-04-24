import { Injectable } from '@nestjs/common';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createMedicineDto: CreateMedicineDto) {
    return this.prisma.medicine.create({
      data: createMedicineDto,
    });
  }

  findAll(query?: string) {
    if (query) {
      return this.prisma.medicine.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { genericName: { contains: query, mode: 'insensitive' } },
          ],
        },
      });
    }
    return this.prisma.medicine.findMany();
  }

  findOne(id: string) {
    return this.prisma.medicine.findUnique({
      where: { id },
    });
  }

  update(id: string, updateMedicineDto: UpdateMedicineDto) {
    return this.prisma.medicine.update({
      where: { id },
      data: updateMedicineDto,
    });
  }

  remove(id: string) {
    return this.prisma.medicine.delete({
      where: { id },
    });
  }
}
