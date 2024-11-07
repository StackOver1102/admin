import { useMutation } from "@tanstack/react-query";

// Define a generic mutation hook
export const useMutationHooks = (fnCallback, options = {}) => {
  const mutation = useMutation({
    mutationFn: fnCallback,
    ...options,
  });

  return mutation;
};
