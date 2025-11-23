interface Step1Props {
    formData: any
    updateFormData: (data: any) => void
    onNext: () => void
}

export default function WizardStep1({ formData, updateFormData, onNext }: Step1Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateFormData({ [e.target.name]: e.target.value })
    }

    const isValid = formData.industry && formData.target_audience && formData.tone

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">
                    Industry
                </label>
                <div className="mt-2">
                    <select
                        id="industry"
                        name="industry"
                        autoComplete="industry-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={formData.industry || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select an industry</option>
                        <option value="Technology">Technology</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Education">Education</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="target_audience" className="block text-sm font-medium leading-6 text-gray-900">
                    Target Audience
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="target_audience"
                        id="target_audience"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                        placeholder="e.g. Small Business Owners, CTOs, Fitness Enthusiasts"
                        value={formData.target_audience || ''}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="tone" className="block text-sm font-medium leading-6 text-gray-900">
                    Brand Tone
                </label>
                <div className="mt-2">
                    <select
                        id="tone"
                        name="tone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={formData.tone || ''}
                        onChange={handleChange}
                    >
                        <option value="">Select a tone</option>
                        <option value="Professional">Professional</option>
                        <option value="Casual">Casual</option>
                        <option value="Friendly">Friendly</option>
                        <option value="Authoritative">Authoritative</option>
                        <option value="Witty">Witty</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    disabled={!isValid}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
