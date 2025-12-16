'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import EditUserDialog from './EditUserDialog'
import DeleteUserDialog from './DeleteUserDialog'
import ChangeUserTypeDialog from './ChangeUserTypeDialog'
import UserActionsMenu from './UserActionsMenu'

type UserType = 'all' | 'regular' | 'subscriber' | 'vip'

interface User {
  id: string
  name: string
  email: string
  type: 'regular' | 'subscriber' | 'vip'
  joinedDate: string
  status: 'active' | 'inactive'
}

export default function UserList() {
  const { t, isRTL } = useLanguage()
  const [filter, setFilter] = useState<UserType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [changeTypeDialogOpen, setChangeTypeDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Mock data - replace with API call
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      type: 'vip',
      joinedDate: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      type: 'subscriber',
      joinedDate: '2024-02-20',
      status: 'active',
    },
    {
      id: '3',
      name: 'Ahmed Ali',
      email: 'ahmed@example.com',
      type: 'regular',
      joinedDate: '2024-03-10',
      status: 'active',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'vip',
      joinedDate: '2024-01-05',
      status: 'inactive',
    },
    {
      id: '5',
      name: 'Mohammed Hassan',
      email: 'mohammed@example.com',
      type: 'subscriber',
      joinedDate: '2024-03-01',
      status: 'active',
    },
  ]

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesType = filter === 'all' || user.type === filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const getTypeBadgeColor = (type: User['type']) => {
    switch (type) {
      case 'vip':
        return 'bg-yellow-500 bg-opacity-20 text-yellow-400 border-yellow-500 border-opacity-30'
      case 'subscriber':
        return 'bg-blue-500 bg-opacity-20 text-blue-400 border-blue-500 border-opacity-30'
      default:
        return 'bg-gray-500 bg-opacity-20 text-gray-400 border-gray-500 border-opacity-30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder={t('dashboard.users.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-secondary-surface border border-accent rounded-lg text-base-white placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
            }`}
          >
            {t('dashboard.users.filters.all')}
          </button>
          <button
            onClick={() => setFilter('regular')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'regular'
                ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
            }`}
          >
            {t('dashboard.users.filters.regular')}
          </button>
          <button
            onClick={() => setFilter('subscriber')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'subscriber'
                ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
            }`}
          >
            {t('dashboard.users.filters.subscriber')}
          </button>
          <button
            onClick={() => setFilter('vip')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'vip'
                ? 'bg-accent bg-opacity-20 text-base-white border border-accent'
                : 'bg-secondary-surface text-accent hover:bg-opacity-70 border border-accent border-opacity-30'
            }`}
          >
            {t('dashboard.users.filters.vip')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.users.stats.total')}</div>
          <div className="text-2xl font-bold text-base-white">{users.length}</div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.users.stats.vip')}</div>
          <div className="text-2xl font-bold text-base-white">
            {users.filter((u) => u.type === 'vip').length}
          </div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.users.stats.subscribers')}</div>
          <div className="text-2xl font-bold text-base-white">
            {users.filter((u) => u.type === 'subscriber').length}
          </div>
        </div>
        <div className="bg-secondary-surface border border-accent rounded-lg p-4">
          <div className="text-accent text-sm mb-1">{t('dashboard.users.stats.regular')}</div>
          <div className="text-2xl font-bold text-base-white">
            {users.filter((u) => u.type === 'regular').length}
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-secondary-surface border border-accent rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-dark border-b border-accent">
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.name')}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.email')}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.type')}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.joinedDate')}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.status')}
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('dashboard.users.table.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent divide-opacity-20">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary-dark transition-colors">
                  <td className={`px-6 py-4 text-base-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {user.name}
                  </td>
                  <td className={`px-6 py-4 text-accent ${isRTL ? 'text-right' : 'text-left'}`}>
                    {user.email}
                  </td>
                  <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getTypeBadgeColor(user.type)}`}
                    >
                      {t(`dashboard.users.types.${user.type}`)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-accent ${isRTL ? 'text-right' : 'text-left'}`}>
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </td>
                  <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        user.status === 'active'
                          ? 'bg-green-500 bg-opacity-20 text-green-400'
                          : 'bg-red-500 bg-opacity-20 text-red-400'
                      }`}
                    >
                      {t(`dashboard.users.status.${user.status}`)}
                    </span>
                  </td>
                  <td className={`px-6 py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <UserActionsMenu
                      user={user}
                      onEdit={() => {
                        setSelectedUser(user)
                        setEditDialogOpen(true)
                      }}
                      onChangeType={() => {
                        setSelectedUser(user)
                        setChangeTypeDialogOpen(true)
                      }}
                      onDelete={() => {
                        setSelectedUser(user)
                        setDeleteDialogOpen(true)
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-8 text-center text-accent">
            {t('dashboard.users.noUsers')}
          </div>
        )}
      </div>

      {/* Dialogs */}
      <EditUserDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onSave={(userData) => {
          // TODO: Implement API call to update user
          console.log('Update user:', selectedUser?.id, userData)
          // Refresh users list after update
        }}
      />

      <DeleteUserDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onConfirm={() => {
          // TODO: Implement API call to delete user
          console.log('Delete user:', selectedUser?.id)
          // Refresh users list after delete
        }}
      />

      <ChangeUserTypeDialog
        isOpen={changeTypeDialogOpen}
        onClose={() => {
          setChangeTypeDialogOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onConfirm={(newType) => {
          // TODO: Implement API call to change user type
          console.log('Change user type:', selectedUser?.id, newType)
          // Refresh users list after update
        }}
      />
    </div>
  )
}

