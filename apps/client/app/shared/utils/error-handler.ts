import {FetchError} from 'ofetch';

// ============================================
// Types and Interfaces
// ============================================

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: string[];
  statusCode?: number;
}

interface FetchErrorLike {
  status?: number;
  statusCode?: number;
  statusText?: string;
  data?: ErrorResponse;
  message?: string;
  response?: {
    status?: number;
    data?: ErrorResponse;
  };
}

interface ErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  customMessage?: string;
  fallbackMessage?: string;
  toastDuration?: number;
  toastColor?: Toast["color"];
  toastIcon?: string;
}

interface ErrorInfo {
  message: string;
  statusCode?: number;
  originalError: unknown;
  details?: any;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Extracts error message from various response data formats
 */
const extractErrorMessage = (data: any): string | null => {
  if (!data) return null;

  // Check various common error message formats
  if (typeof data === 'string') return data;
  if (data.message) return data.message;
  if (data.error) return data.error;
  if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors[0];
  }

  return null;
};

/**
 * Provides user-friendly messages for common HTTP status codes
 */
const getStatusCodeMessage = (statusCode?: number): string | null => {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Authentication required. Please log in.';
    case 403:
      return 'Access denied. You don\'t have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 409:
      return 'A conflict occurred. The resource may already exist.';
    case 422:
      return 'Validation failed. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again later.';
    default:
      return null;
  }
};

/**
 * Parses error and extracts relevant information
 */
const parseError = (error: unknown): { message: string; statusCode?: number; details?: any } => {
  let errorMessage = 'An unexpected error occurred';
  let statusCode: number | undefined;
  let errorDetails: any = null;

  if (error instanceof FetchError) {
    statusCode = error.status || error.statusCode;
    errorMessage = extractErrorMessage(error.data) || error.message || errorMessage;
    errorDetails = error.data;
  } else if (error && typeof error === 'object' && 'statusCode' in error) {
    // Handle custom HttpClientError or similar
    const customError = error as any;
    statusCode = customError.statusCode;
    errorMessage = extractErrorMessage(customError.originalError) || customError.message || errorMessage;
    errorDetails = customError.originalError;
  } else if (error && typeof error === 'object' && 'response' in error) {
    // Handle axios-like errors (adapter pattern)
    const axiosLikeError = error as FetchErrorLike;
    statusCode = axiosLikeError.response?.status;
    errorMessage = extractErrorMessage(axiosLikeError.response?.data) || errorMessage;
    errorDetails = axiosLikeError.response?.data;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  return {message: errorMessage, statusCode, details: errorDetails};
};

// ============================================
// Main Error Handlers
// ============================================

/**
 * Basic error handler - simple replacement for AxiosError handling
 */
export const handleError = (error: unknown, errorId: string): void => {
  const {message} = parseError(error);
  const toast = useToast();

  toast.add({
    id: errorId,
    title: message,
    color: 'error',
    icon: 'i-heroicons-x-circle',
  });
};

/**
 * Enhanced error handler with status code awareness
 */
export const handleErrorEnhanced = (error: unknown, errorId: string): void => {
  const {message, statusCode} = parseError(error);
  const toast = useToast();

  // Use a status code message if available, otherwise use extracted message
  const finalMessage = getStatusCodeMessage(statusCode) || message;

  toast.add({
    id: errorId,
    title: finalMessage,
    color: 'error',
    icon: 'i-heroicons-x-circle',
  });
};

/**
 * Comprehensive error handler with full customization options
 */
export const handleErrorComprehensive = (
  error: unknown,
  errorId: string,
  options: ErrorHandlerOptions = {}
): ErrorInfo => {
  const {
    showToast = true,
    logError = true,
    customMessage,
    fallbackMessage = 'An unexpected error occurred',
    toastDuration,
    toastColor = 'error',
    toastIcon = 'i-heroicons-x-circle'
  } = options;

  const {message, statusCode, details} = parseError(error);
  const finalMessage = customMessage || getStatusCodeMessage(statusCode) || message || fallbackMessage;

  // Log error if enabled
  if (logError) {
    console.error(`Error [${errorId}]:`, {
      message: finalMessage,
      statusCode,
      originalError: error,
      details
    });
  }

  // Show toast if enabled
  if (showToast) {
    const toast = useToast();

    toast.add({
      id: errorId,
      title: finalMessage,
      color: toastColor,
      icon: toastIcon,
      ...(toastDuration && {timeout: toastDuration})
    });
  }

  // Return error info for further handling
  return {
    message: finalMessage,
    statusCode,
    originalError: error,
    details
  };
};

// ============================================
// Specialized Error Handlers
// ============================================

/**
 * Authentication error handler
 */
export const handleAuthError = (error: unknown, errorId: string): void => {
  const {statusCode} = parseError(error);
  const toast = useToast();

  let message = 'Authentication failed';

  if (statusCode === 401) {
    message = 'Your session has expired. Please log in again.';
  } else if (statusCode === 403) {
    message = 'Access denied. You don\'t have permission to access this resource.';
  }

  toast.add({
    id: errorId,
    title: message,
    color: 'error',
    icon: 'i-heroicons-shield-exclamation',
  });
};

/**
 * Validation error handler
 */
export const handleValidationError = (error: unknown, errorId: string): void => {
  const {message, details} = parseError(error);
  const toast = useToast();

  // Handle multiple validation errors
  let validationMessage = message;
  if (details?.errors && Array.isArray(details.errors)) {
    validationMessage = details.errors.join(', ');
  }

  toast.add({
    id: errorId,
    title: validationMessage || 'Validation failed. Please check your input.',
    color: 'warning',
    icon: 'i-heroicons-exclamation-triangle',
  });
};

/**
 * Network error handler
 */
export const handleNetworkError = (error: unknown, errorId: string): void => {
  const toast = useToast();

  toast.add({
    id: errorId,
    title: 'Network error. Please check your connection and try again.',
    color: 'error',
    icon: 'i-heroicons-wifi',
  });
};

// ============================================
// Error Handler Factory
// ============================================

/**
 * Creates a configured error handler function
 */
export const createErrorHandler = (defaultOptions: ErrorHandlerOptions = {}) => {
  return (error: unknown, errorId: string, overrideOptions: ErrorHandlerOptions = {}) => {
    const combinedOptions = {...defaultOptions, ...overrideOptions};
    return handleErrorComprehensive(error, errorId, combinedOptions);
  };
};

// ============================================
// Utility Functions
// ============================================

/**
 * Checks if the error is a specific type
 */
export const isErrorType = (error: unknown, type: 'network' | 'auth' | 'validation' | 'server'): boolean => {
  const {statusCode} = parseError(error);

  switch (type) {
    case 'network':
      return !statusCode || statusCode === 0;
    case 'auth':
      return statusCode === 401 || statusCode === 403;
    case 'validation':
      return statusCode === 400 || statusCode === 422;
    case 'server':
      return statusCode ? statusCode >= 500 : false;
    default:
      return false;
  }
};

/**
 * Gets an error message without showing toast
 */
export const getErrorMessage = (error: unknown): string => {
  const {message, statusCode} = parseError(error);
  return getStatusCodeMessage(statusCode) || message;
};

// ============================================
// Default Export
// ============================================

export default {
  handleError,
  handleErrorEnhanced,
  handleErrorComprehensive,
  handleAuthError,
  handleValidationError,
  handleNetworkError,
  createErrorHandler,
  isErrorType,
  getErrorMessage
};