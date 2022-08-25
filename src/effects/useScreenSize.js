import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const useScreenSize = () => {
    const sizeScreen = Dimensions.get('screen');

    const [screenSize, setScreenSize] = useState({
        width: sizeScreen.width,
        height: sizeScreen.height,
      });
    useEffect(() => {
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
