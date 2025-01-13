import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAccessGuard } from '../../common/guards/jwt-access.guard';
import { GroupReqDto } from './dto/req/group.req.dto';
import { GroupResDto } from './dto/res/group.res.dto';
import { GroupService } from './services/group.service';
import { GroupPresenterService } from './services/group-presenter.service';

@ApiTags('4.Groups')
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly groupPresenter: GroupPresenterService,
  ) {}

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/groups',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard)
  @Get('/all')
  public async getAllGroups(): Promise<GroupResDto[]> {
    const groups = await this.groupService.getAllGroups();
    return groups.map((entity) => this.groupPresenter.toResponseDto(entity));
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/group',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard)
  @Post()
  public async addGroup(@Body() dto: GroupReqDto): Promise<GroupResDto> {
    return this.groupPresenter.toResponseDto(
      await this.groupService.addGroup(dto),
    );
  }

  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/groups/:id',
    },
  })
  @ApiBearerAuth('Access-Token')
  @UseGuards(JwtAccessGuard)
  @Delete('/:id')
  public async deleteGroup(
    @Param('id', ParseIntPipe) group_id: number,
  ): Promise<void> {
    await this.groupService.deleteGroup(group_id);
  }
}
