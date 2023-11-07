import Loader from '@/components/Loader';
import React from 'react';

function loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
}

export default loading;
