import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
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

  //Get all groups--------------------------------------------------
  @ApiOperation({ summary: 'Get all groups list' })
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
    return (await this.groupService.getAllGroups()).map((entity) =>
      this.groupPresenter.toResponseDto(entity),
    );
  }

  //Add a group-------------------------------------------------------
  @ApiOperation({ summary: 'Add a new group to the list' })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    example: {
      statusCode: 400,
      messages: 'Group name must not contain spaces',
      timestamp: '2024-12-03T18:38:15.306Z',
      path: '/group',
    },
  })
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
}
