import Navbar from '@/components/Navbar'
import { UserButton } from '@clerk/nextjs'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen min-w-screen h-full relative bg-muted flex flex-col">
      <header className="border-b flex items-center justify-between bg-background px-6 py-4 shadow-sm">
        <Navbar />
        <UserButton />
      </header>
      <div className="h-full">{children}</div>
    </main>
  )
}

export default DashboardLayout
