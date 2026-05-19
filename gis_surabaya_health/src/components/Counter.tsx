import React, { useEffect, useState } from 'react';

export const useCounter = (value: number, duration: number = 1000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const end = value;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    window.requestAnimationFrame(step);
    return () => { startTimestamp = null; };
  }, [value, duration]);

  return count;
};

interface CounterProps {
  value: number;
  duration?: number;
  formatter?: (val: number) => string;
}

const Counter: React.FC<CounterProps> = ({ value, duration = 1000, formatter = (val) => Math.floor(val).toString() }) => {
  const count = useCounter(value, duration);
  return <span>{formatter(count)}</span>;
};

export default Counter;

