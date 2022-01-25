import React from 'react';

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return <div>{message ? message : 'Loading...'}</div>;
}
