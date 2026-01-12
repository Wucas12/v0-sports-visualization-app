"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authDefaultTab, setAuthDefaultTab] = useState<"signin" | "signup">("signin")

  const openSignIn = () => {
    setAuthDefaultTab("signin")
    setAuthModalOpen(true)
  }

  const openSignUp = () => {
    setAuthDefaultTab("signup")
    setAuthModalOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">MindPlay</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="#create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Create Session
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </Link>
              <Link href="#library" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Library
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={openSignIn}>
                Sign In
              </Button>
              <Button size="sm" onClick={openSignUp}>
                Get Started
              </Button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border">
            <nav className="flex flex-col px-4 py-4 gap-4">
              <Link href="#create" className="text-sm text-muted-foreground hover:text-foreground">
                Create Session
              </Link>
              <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link href="#library" className="text-sm text-muted-foreground hover:text-foreground">
                Library
              </Link>
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" className="flex-1" onClick={openSignIn}>
                  Sign In
                </Button>
                <Button size="sm" className="flex-1" onClick={openSignUp}>
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultTab={authDefaultTab} />
    </>
  )
}
