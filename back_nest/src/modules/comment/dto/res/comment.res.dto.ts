import { ApiProperty } from '@nestjs/swagger';

export class CommentResDto {
  @ApiProperty({ description: 'Comment ID', format: 'int', example: 254 })
  public readonly id: number;

  @ApiProperty()
  public readonly comment: string;

  @ApiProperty()
  public readonly author_name: string;

  @ApiProperty()
  public readonly author_surname: string;

  @ApiProperty({
    description: 'Date nad time when record made',
    example: new Date(),
  })
  public readonly created_at: Date;
}
