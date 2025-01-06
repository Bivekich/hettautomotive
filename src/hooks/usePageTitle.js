import { useEffect } from "react";

export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Hett Automotive`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
