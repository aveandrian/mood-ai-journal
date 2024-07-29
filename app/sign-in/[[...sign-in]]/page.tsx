import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <SignIn />
    </main>
  )
}

export default SignInPage
