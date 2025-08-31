export enum Environment {
  DEVELOPMENT = 'dev',
  PRODUCTION = 'prod',
}

export const enum StatusCode {
  SUCCESS = 10000,
  FAILURE = 10001,
  RETRY = 10002,
  INVALID_ACCESS_TOKEN = 10003,
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  UNSPECIFIED = 'Unspecified',
}

export const enum HeaderKey {
  API_KEY = 'x-api-key',
  AUTHORIZATION = 'authorization',
}

export enum Permission {
  GENERAL = 'GENERAL', // All api end points are allowed
  XYZ_SERVICE = 'XYZ_SERVICE', // Only xyz service is allowed
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEACTIVATED = 'deactivated',
  BANNED = 'banned',
  DELETED = 'deleted',
}

export enum AuthProvider {
  EMAIL = 'email',
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export enum Frequency {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum FaqType {
  GENERAL = 'general',
  SPECIFIC = 'specific',
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum OfferStatus {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum SubStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CANCELLED = 'cancelled',
}

export enum SubReqStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  SUBSCRIPTION_PAYMENT = 'SUBSCRIPTION_PAYMENT',
  SUBSCRIPTION_REFUND = 'SUBSCRIPTION_REFUND',
  WALLET_TRANSFER = 'WALLET_TRANSFER',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  MOBILE_MONEY = 'MOBILE_MONEY',
  CREDIT_CARD = 'CREDIT_CARD',
  WALLET = 'WALLET',
}

export enum Currency {
  USD = 'USD',
  XAF = 'XAF',
}
