import React, { useState, useCallback } from 'react';

import ContentBlock from './components/ContentBlock';
import Typewriter from './components/Typewriter';
import InputArea from './components/InputArea';
import Sidebar from './components/Sidebar';

const GENERATED_CONTENT = {
  heading: 'Auto Generated Block Heading',
  summary: 'Summary about this block and content generated below.',
  content: [
    { type: 'paragraph', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales non augue sed sodales. Aliquam vitae gravida magna. Etiam elementum ac risus dignissim aliquam. Cras a tellus at odio mattis eleifend.' },
    {
      type: 'bullets',
      items: [
        'Install dependencies',
        'Run the development server',
        'Check the browser',
      ],
    },
    {
      type: 'code',
      code: `npm install\nnpm run dev`,
    },
  ],
};

const README_GENERATED_CONTENT = {
  heading: 'How the Animation Works Step by Step:',
  summary: 'Here is very short explanation how this app works.',
  content: [
    {
      type: 'bullets',
      items: [
        'The main part (App) gets the text/code it needs to show.',
        'The App sends this text/code to the part that shows the content (ContentBlock)',
        'ContentBlock starts showing the first part of the text (the first paragraph or list). It uses Typewriter component to make it look like it\'s being typed or added one by one.',
        'When the first part finishes showing, ContentBlock tells itself to show the next part.',
        'ContentBlock then starts showing the second part, and so on, until everything is shown.',
        'If a part is a a bullet list, the AnimatedBulletList shows each item in the list one by one, like typing. When the whole list is done, it tells ContentBlock to move to the next part.'
      ],
    },
    { type: 'paragraph', text: 'Each component has its own job, making the code easier to understand and manage.' },
    { type: 'paragraph', text: 'Tailwind CSS was chosen for styling because it helps to apply and configure styles quickly by using lots of small, ready-made CSS classes. This saves time compared to writing all the CSS.' },
  ],
};

const App = () => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleHeadingDone = useCallback(() => {
    setShowSummary(true);
  }, []);

  const handleSummaryDone = useCallback(() => {
    setShowContent(true);
  }, []);

  // Simulate content generation
  const generateContent = useCallback((content = README_GENERATED_CONTENT) => {
    setIsGenerating(true);
    setGeneratedContent(null);
    setShowSummary(false);
    setShowContent(false);

    setTimeout(() => {
      setGeneratedContent(content);
      setIsGenerating(false);
    }, 2000);
  }, []);

  const renderInitialState = () => (
    <div className='flex items-center h-full'>
      <h2>
        <Typewriter text='Hello! How can I help you today?' speed={30} />
      </h2>
    </div>
  );

  const renderGeneratingState = () => (
    <h2 className='animate-pulse'>...</h2>
  );

  const renderGeneratedContent = () => (
    <>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>
          <Typewriter
            text={generatedContent?.heading}
            onDone={handleHeadingDone}
          />
        </h2>
        <div>
          {/* Action buttons for generated content */}
          <button className='text-gray-500 hover:text-gray-700 mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              stroke='currentColor'
              viewBox='0 0 24 24'
              className='size-6'
              strokeWidth={1.5}
              fill='none'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
          </button>
          <button className='text-gray-500 hover:text-gray-700'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              stroke='currentColor'
              className='size-6'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              fill='none'
            >
              <path
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
                strokeLinejoin='round'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
      </div>

      {showSummary && (
        <p className='text-gray-600 mb-4'>
          <Typewriter
            text={generatedContent?.summary}
            onDone={handleSummaryDone}
            speed={25}
          />
        </p>
      )}

      {showContent && generatedContent?.content && (
        <div className='space-y-2'>
          <ContentBlock content={generatedContent.content} />
        </div>
      )}

      <div className='flex items-center mt-4 space-x-4'>
        <button
          className='flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500'
          onClick={() => generateContent(GENERATED_CONTENT)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            stroke='currentColor'
            viewBox='0 0 24 24'
            className='size-6'
            strokeWidth={1.5}
            fill='none'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
          Regenerate
        </button>

        <button className='px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-200'>
          &#x2398;
        </button>
      </div>
    </>
  );

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex flex-col flex-grow p-8 grid grid-cols-1 grid-rows-1 pattern-grid'>
        <div className='bg-white rounded-lg shadow-md p-6 mb-16 w-2/3 mx-auto'>
          {!isGenerating && !generatedContent && renderInitialState()}
          {isGenerating && !generatedContent && renderGeneratingState()}
          {!isGenerating && generatedContent && renderGeneratedContent()}
        </div>
        <InputArea onGenerate={generateContent} />
      </div>
    </div>
  );
};

export default App;
