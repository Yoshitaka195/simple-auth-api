import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
import {
  UserDeleteResponsePresenter,
  UserFindResponsePresenter,
  UserUpdateResponsePresenter,
} from '../../presenters/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_USECASE_TOKEN)
    private readonly userUsecase: IUserUsecase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async me(@CurrentUser() user: CurrentUserDto) {
    const command = new UserFindCommand({ id: user.id });
    const output = await this.userUsecase.find(command);

    return new UserFindResponsePresenter(output).convertToResponse();
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Body() input: UserUpdateInputDto,
    @CurrentUser() user: CurrentUserDto,
  ) {
    const command = new UserUpdateCommand({
      id: user.id,
      name: input.name,
    });
    const output = await this.userUsecase.update(command);

    return new UserUpdateResponsePresenter(output).convertToResponse();
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async delete(@CurrentUser() user: CurrentUserDto) {
    const command = new UserDeleteCommand({ id: user.id });
    const output = await this.userUsecase.delete(command);

    return new UserDeleteResponsePresenter(output).convertToResponse();
  }
}
