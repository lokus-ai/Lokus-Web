"use client"

export default function TestPage() {
  const testAppRedirect = () => {
    const url = `/login?redirect=lokus://auth-callback`
    window.location.href = url
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Lokus Auth Test</h1>
        <p className="text-gray-400 mb-6">
          Test the authentication flow between web and app
        </p>
        
        <div className="space-y-4">
          <button
            onClick={testAppRedirect}
            className="block w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Test App Auth Flow
          </button>
          
          <a
            href="/login"
            className="block w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Normal Web Login
          </a>
          
          <a
            href="/signup"
            className="block w-full py-3 px-6 bg-green-600 hover:bg-green-700 rounded transition-colors"
          >
            Create Account
          </a>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Auth flows implemented:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Email/Password login</li>
            <li>Google OAuth</li>
            <li>App redirect handling</li>
            <li>Token exchange</li>
          </ul>
        </div>
      </div>
    </div>
  )
}