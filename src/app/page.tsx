"use client";

import Image from 'next/image'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { Inter } from 'next/font/google'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [screenInfo, setScreenInfo] = useState('Loading')

  useEffect(() => {
      setScreenInfo(`${window.screen.width} x ${window.screen.height}, Page: ${document.body.clientWidth} x ${document.body.clientHeight}, Window: ${window.innerWidth} x ${window.innerHeight}`);
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Navbar />
      <Sidebar />
      <a href="/" className="flex items-center justify-center">
        Reload
      </a>
      <div>
      ScreenInfo: {screenInfo}
      </div>
    </main>
  )
  
}