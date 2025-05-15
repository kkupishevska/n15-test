import React, { useState, useEffect, useCallback } from 'react';
import AnimatedBulletList from './AnimatedBulletList';
import Typewriter from './Typewriter';

const ContentBlock = ({ content }) => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);

  const handleBlockDone = useCallback(() => {
    setCurrentBlockIndex((prevIndex) => prevIndex + 1);
  }, []);

  // Reset currentBlockIndex when content prop changes
  useEffect(() => {
    setCurrentBlockIndex(0);
  }, [content]);

  return (
    <div className='p-4 space-y-4 text-base leading-relaxed text-gray-800'>
      {content.map((block, index) => {
        // Only render blocks up to and including the current one
        if (index > currentBlockIndex) {
          return null;
        }

        const isAnimating = index === currentBlockIndex;

        switch (block.type) {
          case 'paragraph':
            return (
              <p key={index} className='text-gray-800'>
                {isAnimating ? (
                  <Typewriter text={block.text} onDone={handleBlockDone} speed={20} />
                ) : (
                  block.text
                )}
              </p>
            );

          case 'bullets':
            return (
              <AnimatedBulletList
                key={index}
                items={block.items}
                // Start animation only if it's the current animating block
                start={isAnimating}
                onDone={isAnimating ? handleBlockDone : undefined}
              />
            );

          case 'code':
            return (
              <pre
                key={index}
                className='bg-gray-100 text-sm text-gray-700 rounded-md p-4 overflow-x-auto font-mono'
              >
                <code>
                  {isAnimating ? (
                    <Typewriter text={block.code} onDone={handleBlockDone} />
                  ) : (
                    block.code
                  )}
                </code>
              </pre>
            );

          default:
            console.warn('Unknown content block type:', block.type);
            return null;
        }
      })}
    </div>
  );
};

export default ContentBlock;
