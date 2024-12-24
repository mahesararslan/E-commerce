'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, Mail, Camera } from 'lucide-react'

export function UserProfile({firstName, lastName, email, image}: {firstName:string, lastName:string, email:string, image?:string}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={image} alt="User avatar" />
            <AvatarFallback>{`${firstName[0]}${lastName[0]}`}</AvatarFallback>
          </Avatar>
        </div>
          <>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{`${firstName} ${lastName}`}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{email}</span>
            </div>
            
          </>
      </CardContent>
    </Card>
  )
}

