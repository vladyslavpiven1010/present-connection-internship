interface ErrorBannerProps {
  className?: string;
  message: string;
}

export function ErrorBanner({ className = "", message }: ErrorBannerProps) {
  return (
    <div className={`rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800 ${className}`}>
      {message}
    </div>
  );
}
