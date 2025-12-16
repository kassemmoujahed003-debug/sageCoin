# Server-Side Implementation Recommendations

## 📦 Required Packages

### Core Dependencies
```bash
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
npm install @prisma/client bcrypt class-validator class-transformer
npm install @nestjs/i18n i18next
npm install helmet
```

### Dev Dependencies
```bash
npm install -D prisma @types/passport-jwt @types/bcrypt
```

## 🗄️ Database Schema (Prisma)

### Recommended Schema Structure

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql", "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id                    String   @id @default(cuid())
  email                 String   @unique
  password              String
  language              String   @default("en") // "en" | "ar"
  subscribedToCourses   Boolean  @default(false)
  joinedVip             Boolean  @default(false)
  currentLeverage       Int      @default(100)
  currentLotSize        Float    @default(0.1)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  trades                Trade[]
}

model Course {
  id          String   @id @default(cuid())
  titleEn     String
  titleAr     String
  descriptionEn String
  descriptionAr String
  contentUrl  String?  // Patreon embed URL
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Trade {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  symbol       String
  type         String   // "BUY" | "SELL"
  entryPrice   Float
  currentPrice Float
  pnl          Float
  pnlPercent   Float
  status       String   @default("OPEN") // "OPEN" | "CLOSED"
  timestamp    DateTime @default(now())
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 🏗️ Module Structure

```
server/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   └── dto/
│       ├── login.dto.ts
│       └── register.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       └── update-user.dto.ts
├── courses/
│   ├── courses.module.ts
│   ├── courses.controller.ts
│   └── courses.service.ts
├── trades/
│   ├── trades.module.ts
│   ├── trades.controller.ts
│   └── trades.service.ts
├── settings/
│   ├── settings.module.ts
│   ├── settings.controller.ts
│   └── settings.service.ts
├── i18n/
│   ├── i18n.module.ts
│   └── i18n.service.ts
├── common/
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   └── language.decorator.ts
│   └── interceptors/
│       └── transform.interceptor.ts
└── app.module.ts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/change-password` - Change password (protected)
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PATCH /api/users/profile` - Update user profile (protected)
- `PATCH /api/users/language` - Update language preference (protected)

### Settings
- `GET /api/settings` - Get user settings (protected)
- `PATCH /api/settings/leverage` - Update leverage (protected)
- `PATCH /api/settings/lot-size` - Update lot size (protected)

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course details (public)
- `GET /api/courses/my-courses` - Get user's accessible courses (protected)

### Trades (VIP)
- `GET /api/trades` - Get active trades (VIP only, protected)
- `GET /api/trades/:id` - Get trade details (VIP only, protected)

## 🌐 i18n Implementation

### Setup NestJS i18n
1. Install `@nestjs/i18n`
2. Configure language detection from:
   - Request headers (`Accept-Language`)
   - Query parameter (`?lang=en`)
   - User preference (from database)

### Translation Files Structure
```
src/i18n/
├── en/
│   └── messages.json
└── ar/
    └── messages.json
```

## 🔐 Security Recommendations

1. **JWT Strategy**: Use refresh tokens + access tokens
2. **Password Hashing**: Use bcrypt with salt rounds (10-12)
3. **Rate Limiting**: Implement for auth endpoints
4. **Helmet**: Enable security headers
5. **CORS**: Already configured, keep it secure
6. **Validation**: Use DTOs with class-validator

## 📝 Implementation Priority

### Phase 1: Foundation
1. ✅ Setup Prisma + Database
2. ✅ Configure i18n module
3. ✅ Setup authentication (JWT)
4. ✅ Create User model and basic CRUD

### Phase 2: Core Features
1. ✅ User settings endpoints (leverage, lot size)
2. ✅ Language preference storage
3. ✅ Password change functionality
4. ✅ Course access control

### Phase 3: Advanced Features
1. ✅ VIP trades system
2. ✅ Subscription management
3. ✅ Market analysis data
4. ✅ Real-time updates (WebSockets - optional)

## 🚀 Quick Start Commands

```bash
# Install Prisma
npx prisma init

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Install all packages
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt @prisma/client bcrypt class-validator class-transformer @nestjs/i18n helmet
npm install -D prisma @types/passport-jwt @types/bcrypt
```

## 🔄 Frontend-Backend Integration

### Language Preference Flow
1. User selects language on frontend
2. Frontend stores in localStorage (already done)
3. On login/register, send language preference to backend
4. Backend stores in User.language field
5. API responses can be localized based on user preference

### Authentication Flow
1. User logs in → Backend returns JWT token
2. Frontend stores token in localStorage/sessionStorage
3. Include token in Authorization header for protected routes
4. Backend validates token and extracts user info

### Settings Sync
1. User changes leverage/lot size on frontend
2. Frontend calls `PATCH /api/settings/leverage`
3. Backend updates database
4. Frontend updates local state

## 📊 Environment Variables

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/sagecoin"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="1d"
REFRESH_TOKEN_SECRET="your-refresh-token-secret"
REFRESH_TOKEN_EXPIRES_IN="7d"
PORT=3000
NODE_ENV=development
```

## 🎯 Next Steps

1. **Choose Database**: PostgreSQL (recommended) or MySQL
2. **Setup Prisma**: Initialize and create schema
3. **Implement Auth Module**: JWT-based authentication
4. **Add i18n Support**: Configure NestJS i18n
5. **Create User Module**: Basic CRUD operations
6. **Build Settings Module**: Leverage and lot size management
7. **Implement Course Module**: With access control
8. **Add VIP Trades Module**: Protected routes for VIP users

Would you like me to start implementing any of these modules?

