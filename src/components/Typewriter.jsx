import React, { useEffect, useState } from 'react';

const Typewriter = ({ text, speed = 40, onDone }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
      if (onDone) onDone();
    }
  }, [index, text, speed]);

  return (
    <span>
      {text.slice(0, index)}
      {!isFinished && <span className="animate-blink">▍</span>}
    </span>
  );
};

export default Typewriter;
