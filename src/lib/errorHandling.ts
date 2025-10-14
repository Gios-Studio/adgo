import { toast } from 'react-hot-toast';

// Simple error handling utility for Supabase operations
export interface ErrorContext {
  operation: string;
  table?: string;
  userId?: string;
  timestamp: string;
}

// Error logging utility
class ErrorLogger {
  private static instance: ErrorLogger;
  
  public static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  public logError(error: any, context?: ErrorContext) {
    const errorData = {
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      context: context || {},
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    };

    console.error('🚨 Application Error:', errorData);

    // In production, send to error logging service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      // Sentry.captureException(error, { extra: errorData });
    }

    return errorData;
  }
}

// Simple async operation wrapper with error handling
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context: ErrorContext,
  options: {
    showToast?: boolean;
    throwOnError?: boolean;
    fallbackValue?: T;
    userMessage?: string;
  } = {}
): Promise<T | null> {
  const { 
    showToast = true, 
    throwOnError = false, 
    fallbackValue = null,
    userMessage 
  } = options;
  
  try {
    return await operation();
  } catch (error: any) {
    // Log the error
    ErrorLogger.getInstance().logError(error, context);

    // Show user-friendly toast
    if (showToast) {
      const message = userMessage || getUserFriendlyErrorMessage(error);
      toast.error(message);
    }

    if (throwOnError) {
      throw error;
    }

    return fallbackValue;
  }
}

// Convert technical errors to user-friendly messages
function getUserFriendlyErrorMessage(error: any): string {
  const message = error?.message || 'An unexpected error occurred';
  const code = error?.code;

  // Authentication errors
  if (message.includes('Invalid login credentials')) {
    return 'Invalid email or password. Please try again.';
  }
  
  if (message.includes('User not found')) {
    return 'Account not found. Please check your email or sign up.';
  }

  if (message.includes('Email rate limit exceeded')) {
    return 'Too many requests. Please wait a few minutes and try again.';
  }

  // Database errors
  if (code === '23505' || message.includes('duplicate key')) {
    return 'This item already exists. Please try a different value.';
  }

  if (code === '23503' || message.includes('foreign key')) {
    return 'Cannot complete this action due to related data constraints.';
  }

  if (code === '42501' || message.includes('permission denied')) {
    return 'You do not have permission to perform this action.';
  }

  // Network errors
  if (message.includes('fetch') || message.includes('network')) {
    return 'Network error. Please check your connection and try again.';
  }

  // Storage errors
  if (message.includes('storage') || message.includes('bucket')) {
    return 'File upload error. Please try again.';
  }

  // Generic fallback
  if (message.length > 100) {
    return 'An error occurred while processing your request. Please try again.';
  }

  return message;
}

// Supabase-specific error handler
export async function handleSupabaseOperation<T>(
  operation: () => Promise<{ data: T; error: any }>,
  context: ErrorContext,
  options?: {
    showToast?: boolean;
    userMessage?: string;
  }
): Promise<{ data: T | null; success: boolean; error?: any }> {
  try {
    const result = await operation();
    
    if (result.error) {
      // Log the error
      ErrorLogger.getInstance().logError(result.error, context);

      // Show user-friendly toast
      if (options?.showToast !== false) {
        const message = options?.userMessage || getUserFriendlyErrorMessage(result.error);
        toast.error(message);
      }

      return { data: null, success: false, error: result.error };
    }

    return { data: result.data, success: true };
  } catch (error: any) {
    // Log the error
    ErrorLogger.getInstance().logError(error, context);

    // Show user-friendly toast
    if (options?.showToast !== false) {
      const message = options?.userMessage || getUserFriendlyErrorMessage(error);
      toast.error(message);
    }

    return { data: null, success: false, error };
  }
}

// Export error logger instance
export const errorLogger = ErrorLogger.getInstance();