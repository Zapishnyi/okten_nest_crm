import { ApiProperty } from '@nestjs/swagger';

export class OrderResDto {
  @ApiProperty({ example: '245' })
  id: number;
  @ApiProperty({ example: 'Joe' })
  name: string;
  @ApiProperty({ example: 'Doe' })
  surname: string;
  @ApiProperty({ example: 'Joe.doe@example.com' })
  email: string;
  @ApiProperty({ example: '+1200120012' })
  phone: string;
  @ApiProperty({ example: 24 })
  age: number;
  @ApiProperty({ example: 'QACX' })
  course: string;
  @ApiProperty({ example: 'static' })
  course_format: string;
  @ApiProperty({ example: 'pro' })
  course_type: string;
  @ApiProperty({ example: '3353' })
  sum: number;
  @ApiProperty({ example: '3353' })
  alreadyPaid: number;
  @ApiProperty({ example: null })
  utm: string;
  @ApiProperty({ example: null })
  msg: string;
  @ApiProperty({ example: null })
  status: string;
  @ApiProperty({ example: null })
  group: string;
  @ApiProperty({ example: null })
  manager: string;
  @ApiProperty({ example: new Date() })
  created_at: Date;
}
