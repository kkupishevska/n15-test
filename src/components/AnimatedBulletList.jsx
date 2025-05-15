import React, { useEffect, useState } from 'react';
import Typewriter from './Typewriter';

const AnimatedBulletList = ({ items, start, onDone }) => {
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    if (start) {
      setCurrentItem(0);
    }
  }, [start]);

  const handleItemDone = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem((prev) => prev + 1);
    } else if (onDone) {
      onDone();
    }
  };

  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => {
        if (index > currentItem) return null;
        return (
          <li key={index}>
            <Typewriter
              text={item}
              onDone={index === currentItem ? handleItemDone : undefined}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default AnimatedBulletList;
