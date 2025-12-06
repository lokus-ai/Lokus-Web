import Link from 'next/link'

export default function AuthCodeError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
            <p className="mb-8">There was an error signing you in. Please try again.</p>
            <Link href="/login" className="text-blue-500 hover:underline">
                Back to Login
            </Link>
        </div>
    )
}
