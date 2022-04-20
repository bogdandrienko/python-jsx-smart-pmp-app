import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useEffect, useRef, useState, useMemo } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// @ts-ignore
export const useFetching = (callback, sort) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // @ts-ignore
  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (error) {
      // @ts-ignore
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error];
};

// @ts-ignore
export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();
  useEffect(() => {
    if (isLoading) return;
    // @ts-ignore
    if (observer.current) observer.current.disconnect();
    // @ts-ignore
    var cb = function (entries, observer) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };
    // @ts-ignore
    observer.current = new IntersectionObserver(cb);
    // @ts-ignore
    observer.current.observe(ref.current);
  }, [isLoading]);
};

// @ts-ignore
export const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    }
    return posts;
  }, [sort, posts]);
  return sortedPosts;
};

// @ts-ignore
export const usePosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    // @ts-ignore
    return sortedPosts.filter((post) =>
      post.name.toLowerCase().includes(query)
    );
  }, [query, sortedPosts]);

  // @ts-ignore
  return sortedAndSearchedPosts;
};
