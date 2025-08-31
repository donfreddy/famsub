import type {User} from '~~/app/core/entities';

export class UserMapper {
  toDomain(raw: any): User {
    return {
      id: raw.id,
      firstName: raw.first_name ?? '',
      lastName: raw.last_name ?? '',
      username: raw.username ?? '',
      email: raw.email ?? '',
      provider: raw.provider ?? 'email',
      providerId: raw.provider_id ?? null,
      contactNumber: raw.contact_number ?? '',
      gender: raw.gender ?? 'Other',
      role: raw.role ?? 'user',
      emailVerified: raw.email_verified ?? false,
      avatar: raw.avatar ?? '',
      country: raw.country ?? '',
      score: raw.score ?? 0,
      pin_code: raw.pin_code ?? null,
      birthdate: raw.birthdate ?? '',
      status: raw.status ?? 'inactive',
      bannedReason: raw.banned_reason ?? null,
      createdAt: raw.created_at ?? '',
      updatedAt: raw.updated_at ?? '',
      deletedAt: raw.deleted_at ?? null,
    };
  }

  toDTO(domain: User): any {
    return {
      id: domain.id,
      first_name: domain.firstName,
      last_name: domain.lastName,
      username: domain.username,
      email: domain.email,
      provider: domain.provider,
      provider_id: domain.providerId,
      contact_number: domain.contactNumber,
      gender: domain.gender,
      role: domain.role,
      email_verified: domain.emailVerified,
      avatar: domain.avatar,
      country: domain.country,
      score: domain.score,
      pin_code: domain.pin_code,
      birthdate: domain.birthdate,
      status: domain.status,
      banned_reason: domain.bannedReason,
      created_at: domain.createdAt,
      updated_at: domain.updatedAt,
      deleted_at: domain.deletedAt,
    };
  }
}
