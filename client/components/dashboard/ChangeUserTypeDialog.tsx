'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import Dialog from './Dialog'

interface User {
  id: string
  name: string
  type: 'regular' | 'subscriber' | 'vip'
}

interface ChangeUserTypeDialogProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onConfirm: (newType: User['type']) => void
}

export default function ChangeUserTypeDialog({
  isOpen,
  onClose,
  user,
  onConfirm,
}: ChangeUserTypeDialogProps) {
  const { t, isRTL } = useLanguage()
  const [newType, setNewType] = useState<User['type']>('regular')

  useEffect(() => {
    if (user) {
      setNewType(user.type)
    }
  }, [user])

  const handleConfirm = () => {
    onConfirm(newType)
    onClose()
  }

  if (!user) return null

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('dashboard.dialogs.changeUserType.title')}
      size="sm"
      footer={
        <>
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-2"
          >
            {t('dashboard.dialogs.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            className="btn-primary px-6 py-2"
          >
            {t('dashboard.dialogs.confirm')}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-accent">
          {t('dashboard.dialogs.changeUserType.message').replace('{{name}}', user.name)}
        </p>
        <div>
          <label className={`block text-sm font-medium text-base-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('dashboard.dialogs.changeUserType.newType')}
          </label>
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as User['type'])}
            className="w-full px-4 py-2 bg-primary-dark border border-accent rounded-lg text-base-white focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="regular">{t('dashboard.users.types.regular')}</option>
            <option value="subscriber">{t('dashboard.users.types.subscriber')}</option>
            <option value="vip">{t('dashboard.users.types.vip')}</option>
          </select>
        </div>
      </div>
    </Dialog>
  )
}

