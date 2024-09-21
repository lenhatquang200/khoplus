import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const useIsFocuseHook = () => {
  const isFocused = useIsFocused();
  const [focused, setFocused] = useState(isFocused);

  useEffect(() => {
    setFocused(isFocused);
  }, [isFocused]);

  return focused;
};

export default useIsFocuseHook;