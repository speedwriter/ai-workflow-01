'use server'

import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const profileSchema = z.object({
    industry: z.string().min(1, 'Industry is required'),
    target_audience: z.string().min(1, 'Target audience is required'),
    tone: z.string().min(1, 'Tone is required'),
    short_bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    sample_content: z.string().optional(),
})

export async function createProfile(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { message: 'Unauthorized' }
    }

    const rawData = {
        industry: formData.get('industry'),
        target_audience: formData.get('target_audience'),
        tone: formData.get('tone'),
        short_bio: formData.get('short_bio'),
        sample_content: formData.get('sample_content'),
    }

    const validatedFields = profileSchema.safeParse(rawData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Profile.',
        }
    }

    const { error } = await supabase
        .from('business_profiles')
        .insert({
            user_id: user.id,
            ...validatedFields.data,
        })

    if (error) {
        console.error('Supabase Error:', error)
        return { message: `Database Error: ${error.message} (${error.code})` }
    }

    redirect('/dashboard')
}
