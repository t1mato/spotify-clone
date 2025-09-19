import { useSignIn } from '@clerk/clerk-react';
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
    const {signIn, isLoaded} = useSignIn()
  
    if(!isLoaded) {
        return null
    }

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google", // Use Google's OAuth service
            redirectUrl: "/sso-callback", // where Google sends users during auth process
            redirectUrlComplete: "/auth-callback", // Where users land after successful
        })
    }
  
    return <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
        Continue with Google
    </Button>
  
}

export default SignInOAuthButtons