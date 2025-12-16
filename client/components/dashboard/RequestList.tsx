'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import RequestActionDialog from './RequestActionDialog'

type RequestType = 'all' | 'password' | 'leverage' | 'withdraw' | 'deposit'
type RequestStatus = 'all' | 'pending' | 'approved' | 'rejected'

interface Request {
  id: string
  userId: string
  userName: string
  userEmail: string
  type: 'password' | 'leverage' | 'withdraw' | 'deposit'
  status: 'pending' | 'approved' | 'rejected'
  details: string
  amount?: number
  newLeverage?: number
  createdAt: string
}

export default function RequestList() {
  const { t, isRTL } = useLanguage()
  const [typeFilter, setTypeFilter] = useState<RequestType>('all')
  const [statusFilter, setStatusFilter] = useState<RequestStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'pending'>('approve')

  // Mock data - replace with API call
  const requests: Request[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      type: 'password',
      status: 'pending',
      details: 'Password change request',
      createdAt: '2024-03-15T10:30:00',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      type: 'leverage',
      status: 'pending',
      details: 'Change leverage to 200x',
      newLeverage: 200,
      createdAt: '2024-03-15T11:15:00',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Ahmed Ali',
      userEmail: 'ahmed@example.com',
      type: 'withdraw',
      status: 'pending',
      details: 'Withdrawal request',
      amount: 5000,
      createdAt: '2024-03-15T12:00:00',
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Johnson',
      userEmail: 'sarah@example.com',
      type: 'deposit',
      status: 'approved',
      details: 'Deposit request',
      amount: 10000,
      createdAt: '2024-03-14T09:20:00',
    },
    {
      id: '5',
      userId: '5',
      userName: 'Mohammed Hassan',
      userEmail: 'mohammed@example.com',
      type: 'leverage',
      status: 'rejected',
      details: 'Change leverage to 500x',
      newLeverage: 500,
      createdAt: '2024-03-13T14:45:00',
    },
  ]

  // Filter requests
  const filteredRequests = requests.filter((request) => {
    const matchesType = typeFilter === 'all' || request.type === typeFilter
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesSearch =
      request.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.details.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const getTypeColor = (type: Request['type']) => {
    switch (type) {
      case 'password':
        return 'bg-purple-500 bg-opacity-20 text-purple-400 border-purple-500 border-opacity-30'
      case 'leverage':
        return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500 border-opacity-30'
      case 'withdraw':
        return 'bg-red-500 bg-opacity-20 text-red-400 border-red-500 border-opacity-30'
      case 'deposit':
        return 'bg-green-500 bg-opacity-20 text-green-400 border-green-500 border-opacity-30'
    }
  }

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 bg-opacity-20 text-yellow-400'
      case 'approved':
        return 'bg-green-500 bg-opacity-20 text-green-400'
      case 'rejected':
        return 'bg-red-500 bg-opacity-20 text-red-400'
    }
  }

  const handleAction = (request: Request, action: 'approve' | 'reject' | 'pending') => {
    setSelectedRequest(request)
    setActionType(action)
    setActionDialogOpen(true)
  }

  const handleConfirmAction = (action: 'approve' | 'reject' | 'pending', notes?: string) => {
    // TODO: Implement API call to update request status
    console.log('Update request:', selectedRequest?.id, action, notes)
    // Refresh requests list after update
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder={t('dashboard.requests.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-secondary-surface border border-accent rounded-lg text-base-white placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Filters */}
        <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-accent text-sm mb-2">
              {t('dashboard.requests.filters.type')}
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'password', 'leverage', 'withdraw', 'deposit'] as RequestType[]).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                      typeFilter === type
                        ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                        : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
                    }`}
                  >
                    {t(`dashboard.requests.types.${type}`)}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-accent text-sm mb-2">
              {t('dashboard.requests.filters.status')}
            </label>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'pending', 'approved', 'rejected'] as RequestStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                    statusFilter === status
                      ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                      : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
                  }`}
                >
                  {t(`dashboard.requests.status.${status}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.requests.stats.total')}</div>
          <div className="text-2xl font-bold text-base-white">{requests.length}</div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.requests.stats.pending')}</div>
          <div className="text-2xl font-bold text-yellow-400">
            {requests.filter((r) => r.status === 'pending').length}
          </div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.requests.stats.approved')}</div>
          <div className="text-2xl font-bold text-green-400">
            {requests.filter((r) => r.status === 'approved').length}
          </div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.requests.stats.rejected')}</div>
          <div className="text-2xl font-bold text-red-400">
            {requests.filter((r) => r.status === 'rejected').length}
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-secondary-surface border border-accent rounded-xl p-6 hover:bg-opacity-80 transition-all"
          >
            <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} justify-between items-start gap-4`}>
              {/* Left Side - Request Info */}
              <div className="flex-1 space-y-3">
                <div className={`flex flex-wrap items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(request.type)}`}
                  >
                    {t(`dashboard.requests.types.${request.type}`)}
                  </span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                  >
                    {t(`dashboard.requests.status.${request.status}`)}
                  </span>
                </div>

                <div>
                  <div className="text-base-white font-semibold mb-1">{request.userName}</div>
                  <div className="text-accent text-sm">{request.userEmail}</div>
                </div>

                <div className="text-accent text-sm">
                  {request.details}
                  {request.amount && (
                    <span className="text-base-white font-semibold ml-2">
                      ${request.amount.toLocaleString()}
                    </span>
                  )}
                  {request.newLeverage && (
                    <span className="text-base-white font-semibold ml-2">
                      {request.newLeverage}x
                    </span>
                  )}
                </div>

                <div className="text-accent text-xs">
                  {new Date(request.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Right Side - Actions */}
              <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                {request.status !== 'approved' && (
                  <button
                    onClick={() => handleAction(request, 'approve')}
                    className="px-4 py-2 bg-green-500 bg-opacity-20 text-green-400 rounded-lg hover:bg-opacity-30 transition-colors font-medium text-sm border border-green-500 border-opacity-30"
                  >
                    {t('dashboard.requests.approve')}
                  </button>
                )}
                {request.status !== 'rejected' && (
                  <button
                    onClick={() => handleAction(request, 'reject')}
                    className="px-4 py-2 bg-red-500 bg-opacity-20 text-red-400 rounded-lg hover:bg-opacity-30 transition-colors font-medium text-sm border border-red-500 border-opacity-30"
                  >
                    {t('dashboard.requests.reject')}
                  </button>
                )}
                {request.status !== 'pending' && (
                  <button
                    onClick={() => handleAction(request, 'pending')}
                    className="px-4 py-2 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-lg hover:bg-opacity-30 transition-colors font-medium text-sm border border-yellow-500 border-opacity-30"
                  >
                    {t('dashboard.requests.setPending')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="bg-secondary-surface border border-accent rounded-xl p-8 text-center text-accent">
            {t('dashboard.requests.noRequests')}
          </div>
        )}
      </div>

      {/* Action Dialog */}
      <RequestActionDialog
        isOpen={actionDialogOpen}
        onClose={() => {
          setActionDialogOpen(false)
          setSelectedRequest(null)
        }}
        request={selectedRequest}
        action={actionType}
        onConfirm={handleConfirmAction}
      />
    </div>
  )
}

