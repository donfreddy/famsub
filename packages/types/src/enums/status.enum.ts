export enum ProjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEPLOYING = 'deploying',
  ERROR = 'error',
  FAILED = 'failed',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export enum TeamMemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum TeamMemberStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

export enum ServerStatus {
  // Initial state after server details are submitted
  CREATED = 'created',

  // States during the verification/connection process
  PENDING_VERIFICATION = 'pending_verification',
  FETCHING_SECRETS = 'fetching_secrets',
  CONNECTING_SERVER = 'connecting_server',
  GATHERING_INFO = 'gathering_info',
  REPORTING_INFO = 'reporting_info',

  // Final states after verification/connection
  ONLINE = 'online',
  OFFLINE = 'offline',
  ERROR = 'error',
}

export enum DeploymentStatus {
  QUEUED = 'queued',
  PROVISIONING = 'provisioning',
  PROVISIONING_COMPLETE = 'provisioning_complete',
  FETCHING_SECRETS = 'fetching_secrets',
  CONNECTING_VPS = 'connecting_vps',
  DEPLOYING = 'deploying',
  RUNNING_MIGRATIONS = 'running_migrations',
  RESTARTING_APP = 'restarting_app',
  UPDATING_NGINX = 'updating_nginx',
  ISSUING_SSL = 'issuing_ssl',
  SUCCESS = 'success',
  FAILED = 'failed',
  VALIDATING = 'validating',
  IN_PROGRESS = 'in_progress',
  CLEANING_UP = 'cleaning_up',
  CANCELLED = 'cancelled',
  ROLLING_BACK = 'rolling_back',
  ROLLBACK_SUCCESS = 'rollback_success',
  ROLLBACK_FAILED = 'rollback_failed',
}

export enum AppSetupStatus {
  PENDING = 'pending',
  FETCHING_SECRETS = 'fetching_secrets',
  CONNECTING_VPS = 'connecting_vps',
  RUNNING_PRE_SETUP_SCRIPTS = 'running_pre_setup_scripts',
  CONFIGURING_APP_ENV = 'configuring_app_env',
  CONFIGURING_NGINX = 'configuring_nginx',
  INSTALLING_CERTBOT = 'installing_certbot',
  ISSUING_SSL = 'issuing_ssl',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum BackupStatus {
  PENDING = 'pending',
  CONNECTING_VPS = 'connecting_vps',
  CREATING_ARCHIVE = 'creating_archive',
  UPLOADING_TO_STORAGE = 'uploading_to_storage',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum RestoreStatus {
  PENDING = 'pending',
  CONNECTING_VPS = 'connecting_vps',
  DOWNLOADING_ARCHIVE = 'downloading_archive',
  EXTRACTING_ARCHIVE = 'extracting_archive',
  RESTORING_DB = 'restoring_db',
  RESTARTING_APP = 'restarting_app',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum DomainSslStatus {
  PENDING = 'pending',
  CONNECTING_VPS = 'connecting_vps',
  CHECKING_DNS = 'checking_dns',
  UPDATING_NGINX_CONF = 'updating_nginx_conf',
  ISSUING_SSL = 'issuing_ssl',
  RENEWING_SSL = 'renewing_ssl',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum CleanupStatus {
  PENDING = 'pending',
  CONNECTING_VPS = 'connecting_vps',
  CLEANING_OLD_DEPLOYS = 'cleaning_old_deploys',
  CLEANING_LOGS = 'cleaning_logs',
  CLEANING_CACHE = 'cleaning_cache',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum MonitoringStatus {
  PENDING = 'pending',
  CONNECTING_VPS = 'connecting_vps',
  FETCHING_METRICS = 'fetching_metrics',
  UPDATING_STATUS = 'updating_status',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export enum DnsVerificationStatus {
  PENDING = 'pending',
  VERIFYING = 'verifying',
  SUCCESS = 'success',
  FAILED = 'failed',
}