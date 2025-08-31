import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RolesGuard } from '../roles.guard';
import { Role } from '../../entities/role.entity';
import { User } from '../../../models/user/entities/user.entity';
import { Reflector } from '@nestjs/core';
import { RoleCode } from '../../../common/helpers';
import { Test } from '@nestjs/testing';

describe('RoleGuard', () => {
  let roleGuard: RolesGuard;

  const user = { role: {} as Role } as User;
  const adminUser = { role: { code: RoleCode.ADMIN } as Role } as User;

  const reflectorGetMock = jest.fn();
  const requestMock = jest.fn();

  const context = {
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({
      getRequest: () => requestMock(),
    }),
  } as ExecutionContext;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            get: reflectorGetMock,
          },
        },
      ],
    }).compile();

    roleGuard = module.get(RolesGuard);
  });

  it('should pass if role is not provided', async () => {
    reflectorGetMock.mockReturnValue(null);
    const pass = await roleGuard.canActivate(context);
    expect(pass).toBe(true);
    expect(reflectorGetMock).toHaveBeenCalledTimes(2);
    expect(requestMock).not.toHaveBeenCalled();
  });

  it('should throw ForbiddenException if user is null', async () => {
    reflectorGetMock.mockReturnValue(RoleCode.USER);
    requestMock.mockReturnValue({ user: null });
    await expect(roleGuard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
    expect(reflectorGetMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it('should throw ForbiddenException if user does not have no role', async () => {
    requestMock.mockReturnValue({ user: user });
    reflectorGetMock.mockReturnValue(RoleCode.USER);
    await expect(roleGuard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
    expect(reflectorGetMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it('should throw ForbiddenException if user does not have allowed role', async () => {
    requestMock.mockReturnValue({ user: adminUser });
    reflectorGetMock.mockReturnValue(RoleCode.SUPER_ADMIN);
    await expect(roleGuard.canActivate(context)).rejects.toBeInstanceOf(ForbiddenException);
    expect(reflectorGetMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledTimes(1);
  });

  it('should pass if user has allowed role', async () => {
    requestMock.mockReturnValue({ user: adminUser });
    reflectorGetMock.mockReturnValue(RoleCode.ADMIN);
    const pass = await roleGuard.canActivate(context);
    expect(pass).toBe(true);
    expect(reflectorGetMock).toHaveBeenCalled();
    expect(requestMock).toHaveBeenCalledTimes(1);
  });
});
