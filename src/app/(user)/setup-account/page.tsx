'use client';

import Stepper, { Step } from '@/components/Stepper';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useState } from 'react';

function SetupAccount() {
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  return (
    <div>
      <Stepper
        initialStep={1}
        onStepChange={(newStep) => {
          setStep(newStep);
        }}
        onFinalStepCompleted={() => console.log('All steps completed!')}
        backButtonText="Previous"
        nextButtonText="Next"
        nextButtonProps={{
          disabled: !name && step === 3,
        }}
        stepCircleContainerClassName="border-border border-[1px]"
        disableStepIndicators
      >
        <Step>
          <FieldGroup className="py-4">
            <Field>
              <FieldLabel>Full Name</FieldLabel>
              <Input />
            </Field>
            <Field>
              <FieldLabel>Phone</FieldLabel>
              <PhoneInput />
            </Field>
          </FieldGroup>
        </Step>
        <Step>
          <h2>Step 2</h2>
          <img
            style={{
              height: '100px',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center -70px',
              borderRadius: '15px',
              marginTop: '1em',
            }}
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
          />
          <p>Custom step content!</p>
        </Step>
        <Step>
          <h2>How about an input?</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name?"
          />
        </Step>
        <Step>
          <h2>Final Step</h2>
          <p>You made it!</p>
        </Step>
      </Stepper>
    </div>
  );
}

export default SetupAccount;
