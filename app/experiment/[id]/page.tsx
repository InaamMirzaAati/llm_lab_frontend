'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getExperiment } from '@/lib/api'
import ComparisonChart from '@/components/ComparisonChart'
import { formatDate } from '../../../utils/formatters'
import { motion } from 'framer-motion'

export default function ExperimentDetail() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params?.id)
  const [exp, setExp] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    getExperiment(id).then((res) => setExp(res.data))
  }, [id])

  if (!exp)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0f0f0f] text-gray-400">
        <div className="animate-pulse text-sm">Loading experiment...</div>
      </div>
    )

  return (
    <main className="max-h-screen w-full text-gray-100 px-0 py-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl mx-auto bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-2xl p-5"
      >
         {/* Back Button */}
        <button
          onClick={() => router.back()} 
          className="text-indigo-600 hover:text-indigo-400 text-lg mb-1"
        >
          &larr; Back to Chat
        </button>
        {/* Header */}
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-white mb-0">
            Experiment #{exp.id}
          </h1>
          <p className="text-sm text-gray-500">{formatDate(exp.createdAt)}</p>
        </header>

        {/* Prompt Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Prompt
          </h2>
          <div className="bg-[#222] border border-gray-700 rounded-lg p-2 text-sm text-gray-200 whitespace-pre-line">
            {exp.prompt}
          </div>
        </section>

        {/* Response Section */}
        <section className="mb-6">
          <h2 className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">
            Response
          </h2>
          <div className="bg-[#222] border border-gray-700 rounded-lg p-2 text-sm text-gray-100 whitespace-pre-line h-20 overflow-y-auto">
            {exp.response}
          </div>
        </section>

        {/* Metrics Section */}
        <section>
          <h2 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wide">
            Metrics
          </h2>
          <div className="bg-[#181818] border border-gray-700 rounded-xl p-4">
            <ComparisonChart metrics={exp.metrics} />
          </div>
        </section>
      </motion.div>
    </main>
  )
}
