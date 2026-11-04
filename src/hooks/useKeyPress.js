import { useEffect } from "react";


export function useKeyPress(codes, handler) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.repeat || !codes.includes(event.code)) return;
      event.preventDefault();
      handler(event);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [codes, handler]);
}
