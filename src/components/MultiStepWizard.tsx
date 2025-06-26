import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface Step {
  name: string;
  component: React.ReactNode;
}

interface MultiStepWizardProps {
  steps: Step[];
  onFinish: () => void;
  title?: string;
  finishButtonText?: string;
}

const MultiStepWizard: React.FC<MultiStepWizardProps> = ({
  steps,
  onFinish,
  title = "RFP Submission Process",
  finishButtonText = "Finish Submission",
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  console.log('MultiStepWizard loaded');

  const handleNext = () => {
    // In a real application, you would add validation logic here
    // for the current step's form data before proceeding.
    // e.g., using react-hook-form's trigger()
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center mb-4">{title}</CardTitle>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            return (
              <React.Fragment key={step.name}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300',
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500',
                      isActive && 'bg-blue-600 text-white ring-4 ring-blue-200'
                    )}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : index + 1}
                  </div>
                  <p className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-blue-600' : 'text-gray-500',
                    isCompleted && 'text-gray-800'
                  )}>
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 transition-colors duration-300",
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  )} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="py-8 min-h-[250px]">
        {steps[currentStep].component}
      </CardContent>
      <Separator />
      <CardFooter className="flex justify-between p-6 bg-gray-50">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {isLastStep ? (
          <Button onClick={onFinish} className="bg-green-600 hover:bg-green-700">
            {finishButtonText}
            <Check className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MultiStepWizard;