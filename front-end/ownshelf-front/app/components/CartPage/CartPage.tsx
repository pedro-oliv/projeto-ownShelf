import { useState } from "react";

export default function CartPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
{/*       <ProgressBar step={step} />

      {step === 1 && (
        <CartStep onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <ShippingStep
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <PaymentStep
          onBack={() => setStep(2)}
        />
      )} */}
    </div>
  );
}