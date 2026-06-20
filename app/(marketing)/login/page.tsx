import { login } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0d12] p-4">
      <Card className="w-full max-w-md bg-[#11161d] border-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Aimers Portal Access</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your student credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                placeholder="student@example.com"
                className="bg-[#0a0d12] border-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                placeholder="••••••••"
                className="bg-[#0a0d12] border-gray-700"
              />
            </div>
            <Button formAction={login} className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
              Sign In Securely
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}