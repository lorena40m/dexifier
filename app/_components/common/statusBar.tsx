import React from 'react';

interface StatusBarProps {
  steps: string[];
  currentStep: number;
}

const StatusBar: React.FC<StatusBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full opaciry-10 p-2 rounded-lg">
      {steps.map((step, index) => (
        <div key={index} className="relative flex-1 mx-1">
          {/* Step Container */}
          <div
            className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-500 
              ${index <= currentStep ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-400'}`}
          >
            <div>
              {index < currentStep && <span className="text-primary pr-2">✔</span>}
              <span className="relative z-10">{step}</span>
            </div>
            {/* Expanding Bar */}
            {index === currentStep && (
              <div
                className="absolute left-0 top-0 h-full bg-primary opacity-50 rounded-lg"
                style={{
                  animation: 'expandWidth 3s infinite', // Repeats indefinitely
                }}
              ></div>
            )}
          </div>
        </div>
      ))}
      <style jsx>{`
        @keyframes expandWidth {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default StatusBar;
