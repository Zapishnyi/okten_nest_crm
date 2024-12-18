import { ApiProperty } from '@nestjs/swagger';

export class CommentResDto {
  @ApiProperty({ description: 'Comment ID', format: 'int', example: 254 })
  public readonly id: number;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  author_name: string;

  @ApiProperty()
  author_surname: string;

  @ApiProperty({
    description: 'Date nad time when record made',
    example: new Date(),
  })
  public readonly created_at: Date;
}
