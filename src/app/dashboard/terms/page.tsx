'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Check } from 'lucide-react'

export default function TermsConditionsPage() {
  const [content, setContent] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Use this section to write or update the Terms and Conditions for your website. These terms will be displayed to users within the website and must be reviewed during registration or major updates.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <Check size={20} className="text-green-600" />
            <span className="text-green-700">Your Terms & Conditions have been successfully updated and will now appear in the Website</span>
          </div>
        )}

        {/* Editor Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">Terms & Conditions Editor</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write or paste your Terms & Conditions here..."
            className="w-full h-96 p-4 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />

          {/* Last Updated */}
          <div className="mt-6 text-sm text-muted-foreground mb-6">
            Last Updated On: January 15, 2024
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-[#764BA2] hover:bg-[#764ba2e1]  text-white py-4 rounded-lg font-medium"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
