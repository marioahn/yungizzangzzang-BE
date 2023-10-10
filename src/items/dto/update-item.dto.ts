import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ItemEntity } from '../entities/item.entity';

export class UpdateItemDto extends PickType(ItemEntity, [
  'name',
  'content',
  'prevPrice',
  'price',
  'count',
  'imgUrl',
] as const) {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '할인 시작 시간',
    example: '19',
  })
  startTime!: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: '할인 마감 시간',
    example: '21',
  })
  endTime!: number;
}
