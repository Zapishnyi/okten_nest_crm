import { ApiProperty } from '@nestjs/swagger';

export class GroupResDto {
  @ApiProperty({ description: 'Group ID', format: 'int', example: 254 })
  public readonly id: number;

  @ApiProperty()
  public readonly name: string;

  @ApiProperty({
    description: 'Date nad time when record made',
    example: new Date(),
  })
  public readonly created_at: Date;
}
