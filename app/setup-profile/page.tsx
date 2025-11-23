'use client'

import { useUser } from '@/hooks/use-user'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SetupProfilePage() {
    const { user, loading } = useUser()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    if (loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Setup Business Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Sign out
                    </button>
                </div>

                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">Complete your profile</h3>
                        <div className="mt-2 max-w-xl text-sm text-gray-500">
                            <p>This is where you will define your business context (Feature 2).</p>
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Skip to Dashboard (Dev Only)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
