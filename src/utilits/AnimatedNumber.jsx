import React, { useEffect, useState } from "react";

const AnimatedNumber = ({ value = 0, duration = 500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;

    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      // smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{count}</>;
};

export default AnimatedNumber;