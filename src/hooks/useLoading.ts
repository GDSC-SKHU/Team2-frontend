import { useState } from 'react';

interface Props {
  initialValue?: boolean;
}

function useLoading({ initialValue = true }: Props) {
  const [isLoading, setIsLoading] = useState(initialValue);

  function loadingEnd() {
    setIsLoading(false);
  }

  return { isLoading, loadingEnd };
}

export default useLoading;
