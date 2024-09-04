

import { useState, useEffect } from 'react';

const useKeyboardControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'w') setControls((prev) => ({ ...prev, forward: true }));
      if (event.key === 's') setControls((prev) => ({ ...prev, backward: true }));
    };

    const handleKeyUp = (event) => {
      if (event.key === 'w') setControls((prev) => ({ ...prev, forward: false }));
      if (event.key === 's') setControls((prev) => ({ ...prev, backward: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
};

export default useKeyboardControls;
