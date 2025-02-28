export default function ProgressIndicator({ steps, currentStep }: { steps: string[], currentStep: number }) {
    return (
      <div className="mt-4 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className={`flex size-8 items-center justify-center rounded-full ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              {index + 1}
            </div>
            <span className="mt-1 text-sm">{step}</span>
          </div>
        ))}
      </div>
    )
  }
  
  