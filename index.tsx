"use client"

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function PersonalPortfolio() {
  const [glowOpacity, setGlowOpacity] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = [useRef(null), useRef(null), useRef(null)]

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowOpacity((prev) => (prev === 0 ? 1 : 0))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 0 && currentSection < 2) {
        setCurrentSection(currentSection + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        setCurrentSection(currentSection - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection])

  useEffect(() => {
    sectionRefs[currentSection].current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSection])

  return (
    <div className="bg-black text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black bg-opacity-90 backdrop-blur-md">
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
        <div className="flex space-x-8 text-lg">
          {['关于我', '作品', '其他'].map((item, index) => (
            <a 
              key={item} 
              href="#" 
              className={`hover:text-gray-300 transition-colors ${currentSection === index ? 'text-purple-500' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setCurrentSection(index)
              }}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="w-8 h-8"></div> {/* Placeholder for symmetry */}
      </nav>

      {/* Main Content */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {/* About Me Section */}
        <section ref={sectionRefs[0]} className="h-screen flex flex-col items-center justify-center snap-start">
          <h1 className="text-6xl font-bold mb-8">关于我</h1>
          <p className="text-xl max-w-2xl text-center">
            我是一名充满激情的开发者，专注于创造引人入胜的用户体验。我热爱将创意转化为现实，并不断探索新的技术前沿。
          </p>
        </section>

        {/* Portfolio Section */}
        <section ref={sectionRefs[1]} className="h-screen flex flex-col items-center justify-center snap-start relative overflow-hidden">
          <h1 className="text-6xl font-bold mb-8">个人作品集</h1>
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 filter blur-3xl"
              style={{ opacity: glowOpacity }}
              animate={{ opacity: glowOpacity }}
              transition={{ duration: 1 }}
            />
            <div className="bg-white p-4 rounded-lg shadow-2xl relative z-10">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/03e5f5828b2d3ae4aa3638d8d437729b_origin-6KluB8ZZMyODtCqJudfGHqb5ExFOwD.png" 
                alt="WeChat QR Code" 
                className="w-64 h-64 object-contain"
              />
            </div>
            <motion.div
              className="absolute inset-0 text-9xl font-bold text-white opacity-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
            >
              作品
            </motion.div>
          </div>
          <div className="flex space-x-4 mt-8">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
              开始浏览
            </button>
            <button className="bg-gray-800 text-white px-8 py-3 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-105">
              联系我
            </button>
          </div>
        </section>

        {/* Other Section */}
        <section ref={sectionRefs[2]} className="h-screen flex flex-col items-center justify-center snap-start">
          <h1 className="text-6xl font-bold mb-8">其他</h1>
          <p className="text-xl max-w-2xl text-center">
            除了开发，我还热衷于摄影和旅行。这些爱好让我能够从不同的角度看待世界，激发我的创造力。
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-sm text-gray-400 bg-black bg-opacity-90 backdrop-blur-md">
        <p>版权 © 所属于张晓文</p>
        <p>联系方式: +8615116453605</p>
      </footer>
    </div>
  )
}