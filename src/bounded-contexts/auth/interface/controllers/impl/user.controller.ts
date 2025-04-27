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
import { IUserUsecase } from '../../../application/usecases/core/i-user.usecase';
import { USER_REPOSITORY_TOKEN } from '../../../domain/repositories/interface/i-user.repository';
import { UserUpdateInputDto } from '../../dtos/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userUsecase: IUserUsecase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async me(@CurrentUser() user: CurrentUserDto) {
    const command = new UserFindCommand({ id: user.id });
    const output = await this.userUsecase.find(command);
    return output;
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
    return output;
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async delete(@CurrentUser() user: CurrentUserDto) {
    const command = new UserDeleteCommand({ id: user.id });
    const output = await this.userUsecase.delete(command);
    return output;
  }
}
