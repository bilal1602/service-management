// apps/api/src/modules/identity/identity.service.ts
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { PrismaService } from '@modules/prisma/prisma.service';

export type TenantRole = 'admin' | 'manager' | 'member';

export type UserMembership = {
  tenantId: string;
  role: TenantRole;
};

@Injectable()
export class IdentityService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserMemberships(userId: string): Promise<UserMembership[]> {
    const rows = await this.prisma.tenantMember.findMany({
      where: { userId },
      select: { tenantId: true, role: true },
      orderBy: { createdAt: 'asc' },
    });

    return rows.map((r) => ({
      tenantId: r.tenantId,
      role: r.role as TenantRole,
    }));
  }

  async getActiveTenantForUser(userId: string): Promise<string> {
    const memberships = await this.getUserMemberships(userId);
    if (memberships.length === 0) {
      throw new ForbiddenException('User is not a member of any tenant');
    }
    // Default policy: first membership (you can later replace with "last_active_tenant" preference)
    return memberships[0].tenantId;
  }

  async assertUserInTenant(
    userId: string,
    tenantId: string
  ): Promise<UserMembership> {
    const membership = await this.prisma.tenantMember.findUnique({
      where: { userId_tenantId: { userId, tenantId } },
      select: { tenantId: true, role: true },
    });

    if (!membership) {
      throw new ForbiddenException('User does not belong to this tenant');
    }

    return {
      tenantId: membership.tenantId,
      role: membership.role as TenantRole,
    };
  }

  async createInvite(params: {
    tenantId: string;
    role: TenantRole;
    expiresAt: Date;
  }): Promise<{ token: string }> {
    const { tenantId, role, expiresAt } = params;

    // Ensure tenant exists (nice error instead of FK violation)
    const tenant = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
      select: { id: true },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');

    // Token: URL-safe enough for practical purposes
    const token = randomBytes(24).toString('base64url');

    await this.prisma.invite.create({
      data: {
        token,
        tenantId,
        role,
        expiresAt,
      },
    });

    return { token };
  }
}
