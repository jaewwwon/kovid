import { useState, useCallback } from "react";

const useCheck = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const onChange = useCallback((e) => {
    setter(e.target.checked);
  }, []);
  return [value, onChange];
};

export default useCheck;
