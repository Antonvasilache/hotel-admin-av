import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuthentication";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account sucessfully created. Please verify the new account from the user's email address."
      );
    },
  });

  return { signUp, isLoading };
}
