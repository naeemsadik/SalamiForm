/**
 * API/Database error handler with user-friendly messages
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Supabase errors
    if (error.message.includes("unique violation")) {
      return "This entry already exists. Try something different! 🤔";
    }
    if (error.message.includes("constraint")) {
      return "One of your answers didn't match requirements. Check again! 👀";
    }
    if (error.message.includes("auth")) {
      return "Authentication error. Please refresh and try again.";
    }

    return error.message;
  }

  return "Oops! Something unexpected happened. 😅";
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

/**
 * Format duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Debounce function for optimizing repeated operations
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
