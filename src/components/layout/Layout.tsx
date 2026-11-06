import React from 'react'
import Header from './Header'
import Footer from './Footer'
import BackToTop from '../common/BackToTop'
import ScrollToTop from '../common/ScrollToTop'
import MobileTabBar from './MobileTabBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer />
      <MobileTabBar />
      <BackToTop />
    </div>
  )
}
