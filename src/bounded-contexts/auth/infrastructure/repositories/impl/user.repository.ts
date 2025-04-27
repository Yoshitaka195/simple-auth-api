import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { HashedString, UserModel } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/interface/i-user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async findById(id: number): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (user === null) {
      return null;
    }

    return this.convertToModel(user);
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, deletedAt: null },
    });

    if (user === null) {
      return null;
    }

    return this.convertToModel(user);
  }

  async create(user: UserModel): Promise<UserModel> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        hashedPassword: user.hashedPassword,
      },
    });

    return this.convertToModel(createdUser);
  }

  async update(user: UserModel): Promise<UserModel> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id as number, deletedAt: null },
      data: {
        name: user.name,
      },
    });

    return this.convertToModel(updatedUser);
  }

  async delete(user: UserModel): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id as number, deletedAt: null },
      data: { email: user.email, deletedAt: new Date() },
    });
  }

  private convertToModel(user: User): UserModel {
    return new UserModel({
      id: user.id,
      name: user.name,
      email: user.email,
      hashedPassword: user.hashedPassword as HashedString,
    });
  }
}
