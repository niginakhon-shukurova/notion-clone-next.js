'use client'

import { ReactNode } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth as useClerkAuth } from '@clerk/nextjs'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
 
  const { getToken, ...rest } = useClerkAuth()

  const authWrapper = {
    ...rest,
    getToken: (opts?: Parameters<typeof getToken>[0]) => getToken({ ...opts, template: 'convex' }),
  }

  return (
    <ConvexProviderWithClerk
      client={convex}
      useAuth={() => authWrapper} 
    >
      {children}
    </ConvexProviderWithClerk>
  )
}
