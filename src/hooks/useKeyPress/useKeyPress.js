import { useEffect } from "react";

const useKeyPress = (targetKey, callback) => {
  useEffect(() => {
    const handleKeyPress = ({ key }) => {
      if (key === targetKey) {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [callback, targetKey]);
};

export { useKeyPress };