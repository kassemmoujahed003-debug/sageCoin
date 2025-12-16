'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'ar'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation files
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.login': 'Login',
    'nav.dashboard': 'Dashboard',
    
    // Hero
    'hero.headline': 'Master the Markets with Institutional Precision.',
    'hero.description': 'SageCoin provides expert analysis and exclusive trading strategies for the serious investor.',
    'hero.ctaButton': 'View Trading Courses',
    'hero.visualLabel': 'Abstract 3D Financial Illustration',
    
    // User Dashboard
    'dashboard.settings': 'Settings',
    'dashboard.changePassword': 'Change Password',
    'dashboard.changeLeverage': 'Change Leverage',
    'dashboard.current': 'Current:',
    'dashboard.changeLotSize': 'Change Lot/Loot Size',
    'dashboard.marketAnalysis': 'Market Analysis',
    'dashboard.marketAnalysisItem': 'Market Analysis',
    'dashboard.analysisDescription': 'Expert market insights and detailed analysis to help you make informed trading decisions based on current market conditions and trends.',
    
    // Courses
    'courses.title': 'Exclusive Training Courses',
    'courses.patreonPlaceholder': 'Patreon Course Content Embed',
    'courses.courseVideos': 'Course videos and materials will be displayed here',
    'courses.unlockTitle': 'Unlock Exclusive Trading Courses',
    'courses.unlockDescription': 'Subscribe now to access our comprehensive library of trading courses, expert tutorials, and exclusive content designed to elevate your trading skills.',
    'courses.subscribeNow': 'Subscribe Now to Access Courses',
    'courses.expertLessons': 'Expert Lessons',
    'courses.learnFromPro': 'Learn from professional traders',
    'courses.regularUpdates': 'Regular Updates',
    'courses.newContentWeekly': 'New content added weekly',
    'courses.lifetimeAccess': 'Lifetime Access',
    'courses.accessAnytime': 'Access all courses anytime',
    
    // VIP Trading
    'vip.title': 'VIP Trading',
    'vip.activeTrades': 'Active VIP Trades',
    'vip.symbol': 'Symbol',
    'vip.type': 'Type',
    'vip.entryPrice': 'Entry Price',
    'vip.currentPrice': 'Current Price',
    'vip.pnl': 'P/L',
    'vip.pnlPercent': 'P/L %',
    'vip.time': 'Time',
    'vip.buy': 'BUY',
    'vip.sell': 'SELL',
    'vip.unlockTitle': 'Unlock VIP Trading Access',
    'vip.unlockDescription': 'Join our VIP program to gain access to real-time trade signals, exclusive market analysis, and direct access to our expert trading team. Get the edge you need to maximize your trading potential.',
    'vip.subscribe': 'Subscribe to VIP',
    'vip.liveSignals': 'Live Trade Signals',
    'vip.realTimeSignals': 'Real-time entry and exit signals',
    'vip.expertAnalysis': 'Expert Analysis',
    'vip.dailyInsights': 'In-depth market insights daily',
    'vip.directAccess': 'Direct Access',
    'vip.connectWithExperts': 'Connect with expert traders',
    
    // Public CTA
    'cta.title': 'Ready to Start Your Trading Journey?',
    'cta.description': 'Join thousands of successful traders who trust SageCoin for expert market analysis and proven trading strategies. Take the first step towards mastering the markets today.',
    'cta.joinUs': 'Join Us',
    'cta.openAccount': 'Open Live Account',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',
    
    // Dashboard
    'dashboard.title': 'Admin Dashboard',
    'dashboard.subtitle': 'Manage users and requests',
    'dashboard.tabs.users': 'Users',
    'dashboard.tabs.requests': 'Requests',
    
    // Dashboard - Users
    'dashboard.users.searchPlaceholder': 'Search by name or email...',
    'dashboard.users.filters.all': 'All',
    'dashboard.users.filters.regular': 'Regular',
    'dashboard.users.filters.subscriber': 'Subscriber',
    'dashboard.users.filters.vip': 'VIP',
    'dashboard.users.stats.total': 'Total Users',
    'dashboard.users.stats.vip': 'VIP Users',
    'dashboard.users.stats.subscribers': 'Subscribers',
    'dashboard.users.stats.regular': 'Regular Users',
    'dashboard.users.table.name': 'Name',
    'dashboard.users.table.email': 'Email',
    'dashboard.users.table.type': 'Type',
    'dashboard.users.table.joinedDate': 'Joined Date',
    'dashboard.users.table.status': 'Status',
    'dashboard.users.table.actions': 'Actions',
    'dashboard.users.table.view': 'View',
    'dashboard.users.types.regular': 'Regular',
    'dashboard.users.types.subscriber': 'Subscriber',
    'dashboard.users.types.vip': 'VIP',
    'dashboard.users.status.active': 'Active',
    'dashboard.users.status.inactive': 'Inactive',
    'dashboard.users.noUsers': 'No users found',
    'dashboard.users.actions.edit': 'Edit',
    'dashboard.users.actions.changeType': 'Change Type',
    'dashboard.users.actions.type': 'Type',
    'dashboard.users.actions.delete': 'Delete',
    
    // Dashboard - Requests
    'dashboard.requests.searchPlaceholder': 'Search requests...',
    'dashboard.requests.filters.type': 'Filter by Type',
    'dashboard.requests.filters.status': 'Filter by Status',
    'dashboard.requests.types.all': 'All Types',
    'dashboard.requests.types.password': 'Password Change',
    'dashboard.requests.types.leverage': 'Change Leverage',
    'dashboard.requests.types.withdraw': 'Withdraw',
    'dashboard.requests.types.deposit': 'Deposit',
    'dashboard.requests.status.all': 'All Statuses',
    'dashboard.requests.status.pending': 'Pending',
    'dashboard.requests.status.approved': 'Approved',
    'dashboard.requests.status.rejected': 'Rejected',
    'dashboard.requests.stats.total': 'Total Requests',
    'dashboard.requests.stats.pending': 'Pending',
    'dashboard.requests.stats.approved': 'Approved',
    'dashboard.requests.stats.rejected': 'Rejected',
    'dashboard.requests.approve': 'Approve',
    'dashboard.requests.reject': 'Reject',
    'dashboard.requests.setPending': 'Set Pending',
    'dashboard.requests.noRequests': 'No requests found',
    
    // Dashboard - Dialogs
    'dashboard.dialogs.cancel': 'Cancel',
    'dashboard.dialogs.save': 'Save',
    'dashboard.dialogs.delete': 'Delete',
    'dashboard.dialogs.confirm': 'Confirm',
    
    // Edit User Dialog
    'dashboard.dialogs.editUser.title': 'Edit User',
    'dashboard.dialogs.editUser.name': 'Name',
    'dashboard.dialogs.editUser.email': 'Email',
    'dashboard.dialogs.editUser.type': 'User Type',
    'dashboard.dialogs.editUser.status': 'Status',
    
    // Delete User Dialog
    'dashboard.dialogs.deleteUser.title': 'Delete User',
    'dashboard.dialogs.deleteUser.message': 'Are you sure you want to delete user {{name}} ({{email}})? This action cannot be undone.',
    
    // Change User Type Dialog
    'dashboard.dialogs.changeUserType.title': 'Change User Type',
    'dashboard.dialogs.changeUserType.message': 'Change user type for {{name}}',
    'dashboard.dialogs.changeUserType.newType': 'New User Type',
    
    // Request Action Dialog
    'dashboard.dialogs.requestAction.approve': 'Approve Request',
    'dashboard.dialogs.requestAction.reject': 'Reject Request',
    'dashboard.dialogs.requestAction.setPending': 'Set Request as Pending',
    'dashboard.dialogs.requestAction.user': 'User',
    'dashboard.dialogs.requestAction.type': 'Request Type',
    'dashboard.dialogs.requestAction.details': 'Details',
    'dashboard.dialogs.requestAction.notes': 'Notes',
    'dashboard.dialogs.requestAction.optional': 'Optional',
    'dashboard.dialogs.requestAction.notesPlaceholder': 'Add any notes about this action...',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.login': 'تسجيل الدخول',
    'nav.dashboard': 'لوحة التحكم',
    
    // Hero
    'hero.headline': 'أتقن الأسواق بدقة المؤسسات المالية.',
    'hero.description': 'يوفر SageCoin تحليلات خبيرة واستراتيجيات تداول حصرية للمستثمر الجاد.',
    'hero.ctaButton': 'عرض دورات التداول',
    'hero.visualLabel': 'رسم توضيحي مالي ثلاثي الأبعاد',
    
    // User Dashboard
    'dashboard.settings': 'الإعدادات',
    'dashboard.changePassword': 'تغيير كلمة المرور',
    'dashboard.changeLeverage': 'تغيير الرافعة المالية',
    'dashboard.current': 'الحالي:',
    'dashboard.changeLotSize': 'تغيير حجم اللوت/الغنيمة',
    'dashboard.marketAnalysis': 'تحليل السوق',
    'dashboard.marketAnalysisItem': 'تحليل السوق',
    'dashboard.analysisDescription': 'رؤى السوق الخبيرة والتحليل التفصيلي لمساعدتك على اتخاذ قرارات تداول مستنيرة بناءً على ظروف السوق الحالية والاتجاهات.',
    
    // Courses
    'courses.title': 'دورات التدريب الحصرية',
    'courses.patreonPlaceholder': 'محتوى دورة Patreon',
    'courses.courseVideos': 'سيتم عرض مقاطع الفيديو والمواد التعليمية هنا',
    'courses.unlockTitle': 'افتح دورات التداول الحصرية',
    'courses.unlockDescription': 'اشترك الآن للوصول إلى مكتبتنا الشاملة لدورات التداول والبرامج التعليمية الخبيرة والمحتوى الحصري المصمم لتعزيز مهاراتك في التداول.',
    'courses.subscribeNow': 'اشترك الآن للوصول إلى الدورات',
    'courses.expertLessons': 'دروس خبيرة',
    'courses.learnFromPro': 'تعلم من المتداولين المحترفين',
    'courses.regularUpdates': 'تحديثات منتظمة',
    'courses.newContentWeekly': 'محتوى جديد يضاف أسبوعياً',
    'courses.lifetimeAccess': 'وصول مدى الحياة',
    'courses.accessAnytime': 'الوصول إلى جميع الدورات في أي وقت',
    
    // VIP Trading
    'vip.title': 'تداول VIP',
    'vip.activeTrades': 'صفقات VIP النشطة',
    'vip.symbol': 'الرمز',
    'vip.type': 'النوع',
    'vip.entryPrice': 'سعر الدخول',
    'vip.currentPrice': 'السعر الحالي',
    'vip.pnl': 'الربح/الخسارة',
    'vip.pnlPercent': 'الربح/الخسارة %',
    'vip.time': 'الوقت',
    'vip.buy': 'شراء',
    'vip.sell': 'بيع',
    'vip.unlockTitle': 'افتح وصول تداول VIP',
    'vip.unlockDescription': 'انضم إلى برنامج VIP الخاص بنا للوصول إلى إشارات التداول في الوقت الفعلي وتحليل السوق الحصري والوصول المباشر إلى فريق التداول الخبير لدينا. احصل على الميزة التي تحتاجها لتعظيم إمكانات التداول الخاصة بك.',
    'vip.subscribe': 'اشترك في VIP',
    'vip.liveSignals': 'إشارات التداول المباشرة',
    'vip.realTimeSignals': 'إشارات الدخول والخروج في الوقت الفعلي',
    'vip.expertAnalysis': 'تحليل خبير',
    'vip.dailyInsights': 'رؤى السوق المتعمقة يومياً',
    'vip.directAccess': 'وصول مباشر',
    'vip.connectWithExperts': 'تواصل مع المتداولين الخبراء',
    
    // Public CTA
    'cta.title': 'هل أنت مستعد لبدء رحلتك في التداول؟',
    'cta.description': 'انضم إلى آلاف المتداولين الناجحين الذين يثقون في SageCoin للحصول على تحليل السوق الخبير واستراتيجيات التداول المثبتة. اتخذ الخطوة الأولى نحو إتقان الأسواق اليوم.',
    'cta.joinUs': 'انضم إلينا',
    'cta.openAccount': 'فتح حساب حقيقي',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط',
    'footer.contact': 'اتصل بنا',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم الإدارية',
    'dashboard.subtitle': 'إدارة المستخدمين والطلبات',
    'dashboard.tabs.users': 'المستخدمون',
    'dashboard.tabs.requests': 'الطلبات',
    
    // Dashboard - Users
    'dashboard.users.searchPlaceholder': 'البحث بالاسم أو البريد الإلكتروني...',
    'dashboard.users.filters.all': 'الكل',
    'dashboard.users.filters.regular': 'عادي',
    'dashboard.users.filters.subscriber': 'مشترك',
    'dashboard.users.filters.vip': 'VIP',
    'dashboard.users.stats.total': 'إجمالي المستخدمين',
    'dashboard.users.stats.vip': 'مستخدمي VIP',
    'dashboard.users.stats.subscribers': 'المشتركين',
    'dashboard.users.stats.regular': 'المستخدمين العاديين',
    'dashboard.users.table.name': 'الاسم',
    'dashboard.users.table.email': 'البريد الإلكتروني',
    'dashboard.users.table.type': 'النوع',
    'dashboard.users.table.joinedDate': 'تاريخ الانضمام',
    'dashboard.users.table.status': 'الحالة',
    'dashboard.users.table.actions': 'الإجراءات',
    'dashboard.users.table.view': 'عرض',
    'dashboard.users.types.regular': 'عادي',
    'dashboard.users.types.subscriber': 'مشترك',
    'dashboard.users.types.vip': 'VIP',
    'dashboard.users.status.active': 'نشط',
    'dashboard.users.status.inactive': 'غير نشط',
    'dashboard.users.noUsers': 'لا يوجد مستخدمون',
    'dashboard.users.actions.edit': 'تعديل',
    'dashboard.users.actions.changeType': 'تغيير النوع',
    'dashboard.users.actions.type': 'النوع',
    'dashboard.users.actions.delete': 'حذف',
    
    // Dashboard - Requests
    'dashboard.requests.searchPlaceholder': 'البحث في الطلبات...',
    'dashboard.requests.filters.type': 'التصفية حسب النوع',
    'dashboard.requests.filters.status': 'التصفية حسب الحالة',
    'dashboard.requests.types.all': 'جميع الأنواع',
    'dashboard.requests.types.password': 'تغيير كلمة المرور',
    'dashboard.requests.types.leverage': 'تغيير الرافعة المالية',
    'dashboard.requests.types.withdraw': 'سحب',
    'dashboard.requests.types.deposit': 'إيداع',
    'dashboard.requests.status.all': 'جميع الحالات',
    'dashboard.requests.status.pending': 'قيد الانتظار',
    'dashboard.requests.status.approved': 'موافق عليه',
    'dashboard.requests.status.rejected': 'مرفوض',
    'dashboard.requests.stats.total': 'إجمالي الطلبات',
    'dashboard.requests.stats.pending': 'قيد الانتظار',
    'dashboard.requests.stats.approved': 'موافق عليه',
    'dashboard.requests.stats.rejected': 'مرفوض',
    'dashboard.requests.approve': 'موافقة',
    'dashboard.requests.reject': 'رفض',
    'dashboard.requests.setPending': 'تعيين كقيد الانتظار',
    'dashboard.requests.noRequests': 'لا توجد طلبات',
    
    // Dashboard - Dialogs
    'dashboard.dialogs.cancel': 'إلغاء',
    'dashboard.dialogs.save': 'حفظ',
    'dashboard.dialogs.delete': 'حذف',
    'dashboard.dialogs.confirm': 'تأكيد',
    
    // Edit User Dialog
    'dashboard.dialogs.editUser.title': 'تعديل المستخدم',
    'dashboard.dialogs.editUser.name': 'الاسم',
    'dashboard.dialogs.editUser.email': 'البريد الإلكتروني',
    'dashboard.dialogs.editUser.type': 'نوع المستخدم',
    'dashboard.dialogs.editUser.status': 'الحالة',
    
    // Delete User Dialog
    'dashboard.dialogs.deleteUser.title': 'حذف المستخدم',
    'dashboard.dialogs.deleteUser.message': 'هل أنت متأكد من حذف المستخدم {{name}} ({{email}})? لا يمكن التراجع عن هذا الإجراء.',
    
    // Change User Type Dialog
    'dashboard.dialogs.changeUserType.title': 'تغيير نوع المستخدم',
    'dashboard.dialogs.changeUserType.message': 'تغيير نوع المستخدم لـ {{name}}',
    'dashboard.dialogs.changeUserType.newType': 'نوع المستخدم الجديد',
    
    // Request Action Dialog
    'dashboard.dialogs.requestAction.approve': 'الموافقة على الطلب',
    'dashboard.dialogs.requestAction.reject': 'رفض الطلب',
    'dashboard.dialogs.requestAction.setPending': 'تعيين الطلب كقيد الانتظار',
    'dashboard.dialogs.requestAction.user': 'المستخدم',
    'dashboard.dialogs.requestAction.type': 'نوع الطلب',
    'dashboard.dialogs.requestAction.details': 'التفاصيل',
    'dashboard.dialogs.requestAction.notes': 'ملاحظات',
    'dashboard.dialogs.requestAction.optional': 'اختياري',
    'dashboard.dialogs.requestAction.notesPlaceholder': 'أضف أي ملاحظات حول هذا الإجراء...',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Save language to localStorage and update document direction
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const isRTL = language === 'ar'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

