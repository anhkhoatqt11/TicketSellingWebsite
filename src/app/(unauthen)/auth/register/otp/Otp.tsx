'use client';
import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';

export const Otp = ({ email }) => {
  console.log(email);
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { onSendAgain, onVerifyOtp, onFirstSend } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { update, data: session } = useSession();
  useEffect(() => {
    let timer;
    if (counter > 0 && !canResend) {
      timer = setTimeout(() => setCounter(counter - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [counter, canResend]);
  useEffect(() => {
    onFirstSend(email);
  }, []);
  const handleResend = () => {
    setCanResend(false);
    setCounter(30);
    onSendAgain(email);
    // handle resend OTP here
  };
  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="w-full h-full flex flex-col gap-y-10 mt-10 justify-center items-center">
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<div className="w-1 lg:w-3" />}
        renderInput={(props) => <input {...props} />}
        inputStyle={{
          width: '2.5rem',
          height: '2.5rem',
          margin: '0 0.5rem',
          fontSize: '1.0rem',
          borderRadius: '8px',
          border: '1px solid rgba(0,0,0,0.6)',
        }}
      />
      <div className="w-full items-center justify-center flex flex-wrap gap-x-3">
        <div className="font-semibold">Didn't receive your code?</div>
        <button
          onClick={handleResend}
          disabled={!canResend}
          className={`font-bold underline ${!canResend ? 'text-gray-400' : ''}`}
        >
          Send Again ({counter}s)
        </button>
      </div>
      <Button
        onClick={() => {
          setIsLoading(true);
          onVerifyOtp(
            email,
            otp,
            () => {
              setIsLoading(false);
            },
            async () => {
              await update({
                ...session,
                user: {
                  ...session.user,
                  isEmailVerified: true,
                },
              });
            }
          );
        }}
        className="w-[100px]"
      >
        Verify
      </Button>
    </div>
  );
};
