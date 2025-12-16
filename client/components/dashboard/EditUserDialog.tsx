'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Dialog from './Dialog'

interface User {
  id: string
  name: string
  email: string
  type: 'regular' | 'subscriber' | 'vip'
  status: 'active' | 'inactive'
}

interface EditUserDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onSave: (userData: Partial<User>) => void
}

export default function EditUserDialog({
  isOpen,
  onClose,
  user,
  onSave,
}: EditUserDialogProps) {
  const { t, isRTL } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'regular' as User['type'],
    status: 'active' as User['status'],
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        type: user.type,
        status: user.status,
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!user) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('dashboard.dialogs.editUser.title')}
      size="md"
      footer={
        <>
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-2"
          >
            {t('dashboard.dialogs.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary px-6 py-2"
          >
            {t('dashboard.dialogs.save')}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className={`block text-sm font-medium text-base-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.dialogs.editUser.name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-primary-dark border border-accent rounded-lg text-base-white placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className={`block text-sm font-medium text-base-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.dialogs.editUser.email')}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-primary-dark border border-accent rounded-lg text-base-white placeholder-accent focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </div>

        {/* User Type */}
        <div>
          <label className={`block text-sm font-medium text-base-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.dialogs.editUser.type')}
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as User['type'] })}
            className="w-full px-4 py-2 bg-primary-dark border border-accent rounded-lg text-base-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="regular">{t('dashboard.users.types.regular')}</option>
            <option value="subscriber">{t('dashboard.users.types.subscriber')}</option>
            <option value="vip">{t('dashboard.users.types.vip')}</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className={`block text-sm font-medium text-base-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.dialogs.editUser.status')}
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as User['status'] })}
            className="w-full px-4 py-2 bg-primary-dark border border-accent rounded-lg text-base-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="active">{t('dashboard.users.status.active')}</option>
            <option value="inactive">{t('dashboard.users.status.inactive')}</option>
          </select>
        </div>
      </form>
    </Dialog>
  )
}

