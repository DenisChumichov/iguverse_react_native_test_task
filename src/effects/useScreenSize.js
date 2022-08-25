import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const sizeScreen = Dimensions.get('screen');
    setScreenSize({
    width: sizeScreen.width,
    height: sizeScreen.height,
  });

    const subscription = Dimensions.addEventListener('change', ({ screen }) =>
      setScreenSize({ width: screen.width, height: screen.height }),
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
