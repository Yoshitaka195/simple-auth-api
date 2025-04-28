import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { HashedString, UserModel } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/interface/i-user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async findById(userId: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { userId, deletedAt: null },
    });

    if (user === null) {
      return null;
    }

    return this.convertToModel(user);
  }

  async create(user: UserModel): Promise<UserModel> {
    const createdUser = await this.prisma.user.create({
      data: {
        userId: user.id,
        nickname: user.nickname,
        password: user.hashedPassword,
      },
    });

    return this.convertToModel(createdUser);
  }

  async update(user: UserModel): Promise<UserModel> {
    const updatedUser = await this.prisma.user.update({
      where: { userId: user.id, deletedAt: null },
      data: {
        nickname: user.nickname,
        comment: user.comment,
      },
    });

    return this.convertToModel(updatedUser);
  }

  async delete(id: string, user: UserModel): Promise<void> {
    await this.prisma.user.update({
      where: { userId: id, deletedAt: null },
      data: { userId: user.id, deletedAt: new Date() },
    });
  }

  private convertToModel(user: User): UserModel {
    return new UserModel({
      id: user.userId,
      comment: user.comment,
      nickname: user.nickname,
      hashedPassword: user.password as HashedString,
    });
  }
}
