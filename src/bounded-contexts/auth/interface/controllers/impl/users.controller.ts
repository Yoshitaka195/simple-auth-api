import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  CurrentUser,
  CurrentUserDto,
} from '../../../../../common/decorator/current-user.decorator';
import {
  UserDeleteCommand,
  UserFindCommand,
  UserUpdateCommand,
} from '../../../application/commands/user';
import {
  IUserUsecase,
  USER_USECASE_TOKEN,
} from '../../../application/usecases/core/i-user.usecase';
import { UserUpdateInputDto } from '../../dtos/user';
import { BasicAuthGuard } from '../../guards/basic-auth.guard';
import {
  UserDeleteResponsePresenter,
  UserFindResponsePresenter,
  UserUpdateResponsePresenter,
} from '../../presenters/user';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_USECASE_TOKEN)
    private readonly userUsecase: IUserUsecase,
  ) {}

  @Get(':user_id')
  @UseGuards(BasicAuthGuard)
  async get(@CurrentUser() user: CurrentUserDto) {
    const command = new UserFindCommand({ id: user.id });
    const output = await this.userUsecase.find(command);

    return new UserFindResponsePresenter(output).convertToResponse();
  }

  @Patch(':user_id') 
  @UseGuards(BasicAuthGuard)
  async update(
    @Param('user_id') userId: string,
    @Body() input: UserUpdateInputDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const command = new UserUpdateCommand({
      id: userId,
      nickname: input.nickname,
    });
    const output = await this.userUsecase.update(command);

    return new UserUpdateResponsePresenter(output).convertToResponse();
  }

  @Delete('close')
  @UseGuards(BasicAuthGuard)
  async delete(@CurrentUser() user: CurrentUserDto) {
    const command = new UserDeleteCommand({ id: user.id });
    const output = await this.userUsecase.delete(command);

    return new UserDeleteResponsePresenter(output).convertToResponse();
  }
}
