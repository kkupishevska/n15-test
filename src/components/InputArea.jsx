import React, { useState } from 'react';

const InputArea = ({ onGenerate }) => {
  const [requestValue, setRequestValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending to AI:', requestValue);
    onGenerate();
    setRequestValue('');
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
      <div className="flex items-center max-w-2xl mx-auto">
        <button className="px-3 py-2 border rounded-md text-gray-600 hover:bg-gray-200 mr-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
        </svg>
        </button>
        <form onSubmit={handleSubmit} className="flex-grow flex">
          <input
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={(e) => setRequestValue(e.target.value)}
            placeholder="Chat with Maistro"
            value={requestValue}
            type="text"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Ask Maistro
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputArea;
