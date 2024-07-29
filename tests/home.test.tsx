import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomePage from '../app/page'
import { ClerkProvider } from '@clerk/nextjs'

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () =>
      new Promise((resolve) => resolve({ userId: 'user_123123123123' })),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_123123123123',
        fullName: 'Me',
      },
    }),
  }
})

test('Home', async () => {
  render(HomePage())

  expect(screen.getByText('get started')).toBeTruthy()
})
