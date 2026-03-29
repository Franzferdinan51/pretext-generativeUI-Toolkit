/**
 * DemoDataViz - Demo for DataChart and visualization components
 */
import React from 'react'
import { DataChart, DataTable } from '../../components'
import { VoteCard } from '../../components'

export function DemoDataViz() {
  const barData = {
    labels: ['React', 'Vue', 'Angular', 'Svelte'],
    values: [85, 72, 58, 45],
    title: 'Framework Popularity'
  }

  const pieData = {
    labels: ['Yes', 'No', 'Abstain'],
    values: [62, 28, 10],
    title: 'Vote Distribution'
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    values: [30, 45, 38, 62, 58],
    title: 'Monthly Growth'
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-400 mb-4">
        Data visualization components for charts and voting:
      </p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-black/50 rounded-lg p-4">
          <DataChart type="bar" data={barData} />
        </div>
        <div className="bg-black/50 rounded-lg p-4">
          <DataChart type="pie" data={pieData} />
        </div>
        <div className="bg-black/50 rounded-lg p-4">
          <DataChart type="line" data={lineData} />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Table Component</h4>
        <DataTable content={`| Name | Role | Score |
|------|------|-------|
| Alice | Engineer | 95 |
| Bob | Designer | 88 |
| Carol | Manager | 92 |`} />
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Vote Card Component</h4>
        <VoteCard 
          content="This proposal has passed with strong support" 
          yesVotes={62} 
          noVotes={28}
        />
      </div>
    </div>
  )
}

export default DemoDataViz
