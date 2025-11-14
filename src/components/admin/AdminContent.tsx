import React from 'react'

interface AdminContentProps {
  title: string
  children: React.ReactNode
}

const AdminContent: React.FC<AdminContentProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      {children}
    </div>
  )
}

export default AdminContent
