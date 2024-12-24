'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserPreferences() {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true)
  const [language, setLanguage] = useState('en')

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="newsletter-subscription">Newsletter Subscription</Label>
          <Switch
            id="newsletter-subscription"
            checked={newsletterSubscribed}
            onCheckedChange={setNewsletterSubscribed}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language-preference">Language Preference</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language-preference">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

