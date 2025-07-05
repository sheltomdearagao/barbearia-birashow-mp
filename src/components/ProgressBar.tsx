import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressStep {
  id: number;
  title: string;
  completed: boolean;
  current: boolean;
}

interface ProgressBarProps {
  steps: ProgressStep[];
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                step.completed
                  ? 'bg-barbershop-copper text-barbershop-cream'
                  : step.current
                  ? 'copper-gradient text-barbershop-cream'
                  : 'bg-barbershop-steel text-barbershop-cream/60'
              }`}
            >
              {step.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.id
              )}
            </div>
            <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${
              step.current ? 'text-barbershop-copper' : 'text-barbershop-cream/60'
            }`}>
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 transition-colors duration-300 ${
              step.completed ? 'bg-barbershop-copper' : 'bg-barbershop-steel'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar; 