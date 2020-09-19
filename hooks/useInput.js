import { useState, useCallback } from "react";

const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const onChange = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, onChange];
};

export default useInput;
