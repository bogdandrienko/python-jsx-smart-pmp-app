import { useState } from "react";

export const useFetching = (callback, sort) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};
