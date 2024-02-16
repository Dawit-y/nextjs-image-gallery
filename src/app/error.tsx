"use client";

interface errorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: errorProps) => {
  return (
    <div>
      <h1>Error</h1>
      <h1>Something went wrong</h1>
      <button type="reset" onClick={reset}>
        Try again
      </button>
    </div>
  );
};

export default Error;
