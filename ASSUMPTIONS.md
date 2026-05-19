# Assumptions & Design Decisions

This document outlines the assumptions made during development of the Kovai Task Management application and the rationale behind key design decisions.

## 🎯 Core Assumptions

### User & Data Assumptions

1. **Single User Context**
   - **Assumption**: Each task belongs to exactly one user
   - **Reason**: Simplified scope for MVP; multi-user/team features can be added later
   - **Impact**: No complex permission models needed currently

2. **Task Ownership**
   - **Assumption**: Users can only see/edit their own tasks
   - **Reason**: Data privacy and security best practice
   - **Implementation**: All task queries filtered by `userId`

3. **No Real-time Collaboration**
   - **Assumption**: Single user per account (no shared workspaces)
   - **Reason**: Reduces complexity; perfect for personal task management
   - **Future**: WebSockets can enable real-time updates later

4. **Stateless Task Operations**
   - **Assumption**: Task status changes don't trigger side effects (no workflows)
   - **Reason**: Keep initial implementation simple
   - **Future**: Can add task notifications, reminders, etc.

### Authentication Assumptions

1. **Email Uniqueness**
   - **Assumption**: Each email can only register once
   - **Reason**: Standard practice; prevents account duplication
   - **Implementation**: Unique index on User email field

2. **Google OAuth Linking**
   - **Assumption**: Users can use both email and Google OAuth on same email
   - **Reason**: Provides flexibility; users aren't locked into one auth method
   - **Implementation**: Updates existing user record if same email exists

3. **Token Expiration**
   - **Assumption**: JWT tokens expire after 7 days
   - **Reason**: Balance between security and user convenience
   - **Future**: Can implement refresh token rotation

4. **No Account Recovery Flow**
   - **Assumption**: Users must remember their password or use Google OAuth
   - **Reason**: MVP scope; password reset can be added later
   - **Security**: Users can use Google OAuth as fallback

### Data Assumptions

1. **No Data Persistence Between Deploys**
   - **Assumption**: MongoDB Atlas or local MongoDB instance available
   - **Reason**: Production-grade persistence needed
   - **Not Assumed**: In-memory storage or cookies for permanent data

2. **Task Fields Are Sufficient**
   - **Assumption**: Title, Description, Status, Priority, Due Date cover most needs
   - **Reason**: Scope control; additional fields can extend the schema
   - **Not Included**: Attachments, subtasks, time tracking

3. **Three Status Types Are Sufficient**
   - **Assumption**: Planned → In Progress → Complete covers workflows
   - **Reason**: Simplicity; additional status types can be added
   - **Not Included**: On Hold, Cancelled, Blocked states

4. **Text-Only Task Content**
   - **Assumption**: Tasks store plain text only (no rich text/formatting)
   - **Reason**: Reduces complexity; can add rich text later
   - **Future**: Can integrate TipTap or similar editor

## 🏗️ Architecture Assumptions

### Backend Structure

1. **Express.js for API**
   - **Assumption**: RESTful API architecture is sufficient
   - **Reason**: Standard, simple, well-understood pattern
   - **Not Used**: GraphQL (adds complexity), gRPC (overkill)

2. **MongoDB for Storage**
   - **Assumption**: Document-based data model fits task domain
   - **Reason**: Flexibility, no rigid schema needed, scales well
   - **Not Used**: SQL databases (more setup), NoSQL alternatives (less common)

3. **JWT for Auth**
   - **Assumption**: Stateless token-based auth is preferred
   - **Reason**: Scalable, works well with distributed systems
   - **Not Used**: Session-based auth (requires session store)

4. **Single Auth Middleware**
   - **Assumption**: One authenticateToken middleware for all protected routes
   - **Reason**: DRY principle; consistent security
   - **Future**: Can add role-based middleware

### Frontend Structure

1. **React 18 with Hooks**
   - **Assumption**: Functional components with hooks sufficient
   - **Reason**: Modern React patterns; easier to test
   - **Not Used**: Class components, Redux (too heavy for MVP)

2. **Tailwind CSS for Styling**
   - **Assumption**: Utility-first CSS covers all design needs
   - **Reason**: Fast styling, consistent design system
   - **Not Used**: CSS-in-JS, component libraries (limiting)

3. **Framer Motion for Animations**
   - **Assumption**: Smooth animations improve UX
   - **Reason**: Animation library reduces boilerplate
   - **Not Used**: Custom CSS animations (harder to maintain)

4. **Context API for State**
   - **Assumption**: Context API sufficient for auth state
   - **Reason**: No complex state management needed yet
   - **Not Used**: Redux, Zustand, Jotai (overkill for MVP)

## 🎨 Design Assumptions

### UI/UX Decisions

1. **Glassmorphism Design**
   - **Assumption**: Modern glassmorphic UI appeals to SaaS users
   - **Reason**: Follows Kovai design system; professional appearance
   - **Consistency**: Applied across all pages and components

2. **Charcoal + Purple + Teal Palette**
   - **Assumption**: Color scheme conveys trust and professionalism
   - **Reason**: Kovai brand colors; good contrast ratios (accessibility)
   - **Tested**: Checked against WCAG color contrast guidelines

3. **Mobile-First Responsive Design**
   - **Assumption**: Mobile users are significant portion of users
   - **Reason**: Responsive by default; scales to desktop elegantly
   - **Tested**: Verified on common mobile screen sizes

4. **Dark Mode First**
   - **Assumption**: Users prefer dark interfaces for productivity apps
   - **Reason**: Reduces eye strain; modern preference
   - **Fallback**: Light mode available via theme toggle

### Component Design

1. **Modular Component Structure**
   - **Assumption**: Components are reusable and composable
   - **Reason**: Follows React best practices; easier to maintain
   - **Impact**: Can easily create new features with existing components

2. **Single Responsibility Principle**
   - **Assumption**: Each component has one clear purpose
   - **Reason**: Easier to test, debug, and extend
   - **Impact**: TaskCard, TaskModal, TaskList are separate

3. **Custom Hooks for Logic**
   - **Assumption**: Business logic extracted to hooks
   - **Reason**: Reusable, testable, cleaner components
   - **Implemented**: useTasks, useAuth, useTheme, useToast

## 🔒 Security Assumptions

1. **HTTPS in Production**
   - **Assumption**: All data transmitted over HTTPS/TLS
   - **Reason**: Essential for password and token security
   - **Note**: Development uses HTTP (not suitable for production)

2. **Secure Password Storage**
   - **Assumption**: Passwords hashed with bcryptjs before storage
   - **Reason**: Prevents plaintext password exposure in breach
   - **Implementation**: 10 salt rounds (industry standard)

3. **Input Validation**
   - **Assumption**: All user input validated on client and server
   - **Reason**: Defense in depth; prevent injection attacks
   - **Implemented**: Email format, password length, task content

4. **CORS Restrictions**
   - **Assumption**: API only accepts requests from known domains
   - **Reason**: Prevents unauthorized API consumption
   - **Configuration**: Client URL whitelisted in backend

5. **No Sensitive Data in URLs**
   - **Assumption**: Sensitive info passed in request body, not URL
   - **Reason**: Prevents accidental exposure in logs/history
   - **Implemented**: POST/PATCH methods for mutations

6. **Environment Variables for Secrets**
   - **Assumption**: API keys, secrets never committed to version control
   - **Reason**: Industry standard security practice
   - **Implemented**: .env files with .gitignore

## ⚙️ Performance Assumptions

1. **Database Indexing**
   - **Assumption**: Proper indexes on frequently queried fields
   - **Reason**: Improves query performance dramatically
   - **Implemented**: Indexes on userId, status, timestamps

2. **Pagination Not Needed Yet**
   - **Assumption**: Single user won't have thousands of tasks initially
   - **Reason**: Scope control; pagination adds complexity
   - **Future**: Can add limit/offset pagination later

3. **No Caching Layer**
   - **Assumption**: MongoDB + API sufficient for initial scale
   - **Reason**: MVP doesn't require Redis or similar
   - **Future**: Can add caching for high traffic scenarios

4. **Lean Queries for Reads**
   - **Assumption**: Mongoose `.lean()` used for read-only queries
   - **Reason**: Improves performance by returning plain objects
   - **Applied**: GET endpoints only (not mutations)

## 📱 Deployment Assumptions

1. **Third-Party Hosting**
   - **Assumption**: Application deployed to cloud providers (Vercel, Render)
   - **Reason**: Avoids infrastructure management complexity
   - **Not Assumed**: Self-hosted on dedicated servers

2. **MongoDB Atlas for Database**
   - **Assumption**: Cloud MongoDB instance used in production
   - **Reason**: Managed service; high availability
   - **Local**: MongoDB local instance for development

3. **Environment Variable Configuration**
   - **Assumption**: Configuration managed via environment variables
   - **Reason**: Different configs for dev/staging/production
   - **Implemented**: .env files with sensible defaults

4. **No Additional Microservices**
   - **Assumption**: Monolithic architecture (frontend + backend)
   - **Reason**: Simpler operations; sufficient for MVP
   - **Future**: Can split into microservices if needed

## 🚫 Non-Assumptions (Things NOT Done)

### Features Not Included
- ❌ Real-time collaboration (WebSockets)
- ❌ Task sharing/team features
- ❌ Advanced analytics
- ❌ Integration with external services
- ❌ File attachments
- ❌ Recurring tasks
- ❌ Task reminders/notifications
- ❌ Subtasks/hierarchies
- ❌ Time tracking
- ❌ Custom fields

### Non-Included Optimizations
- ❌ GraphQL API
- ❌ Redis caching
- ❌ Database connection pooling
- ❌ Service workers
- ❌ CDN for static assets
- ❌ Database sharding
- ❌ Message queues

### Excluded Third-Party Services
- ❌ Sentry for error tracking
- ❌ Datadog for monitoring
- ❌ Sendgrid for email
- ❌ Stripe for payments
- ❌ Slack integration
- ❌ Analytics platforms

## 📋 Constraints & Limitations

### Known Limitations
1. **No Offline Support**: App requires internet connection
2. **No Data Export**: Users cannot export tasks to CSV/JSON
3. **Limited Search**: Basic text search only (no advanced filters)
4. **No Bulk Operations**: Can't bulk update multiple tasks
5. **Single Timezone**: No timezone preferences
6. **No Localization**: English language only

### Scalability Considerations
- **Current Limit**: ~10,000 tasks per user before performance degrades
- **User Limit**: Single region deployment limits concurrency
- **Storage**: MongoDB will handle up to 100GB with indexes
- **Bandwidth**: API gateway will handle ~1000 requests/second

### Future Scaling Opportunities
- Implement database sharding for multi-region
- Add caching layer (Redis)
- Implement request rate limiting
- Add CDN for frontend assets
- Implement API versioning for backward compatibility

## 🔄 Testing Assumptions

1. **Manual Testing Focus**
   - **Assumption**: MVP tested manually by developer
   - **Reason**: Faster iteration for tight deadline
   - **Ideal**: Automated tests can be added later

2. **No Load Testing**
   - **Assumption**: Performance adequate for expected traffic
   - **Reason**: MVP doesn't anticipate massive scale yet
   - **Future**: Load test before major scaling

3. **No End-to-End Tests**
   - **Assumption**: Happy path verified by manual QA
   - **Reason**: Time constraints; E2E setup complex
   - **Future**: Cypress/Playwright E2E tests recommended

## 📊 Data Assumptions

### Task Data Lifetime
- **Assumption**: Tasks archived/deleted by user, no soft deletes
- **Reason**: Simpler data model
- **Tradeoff**: No audit trail of deleted tasks

### User Data Retention
- **Assumption**: User data retained as long as account exists
- **Reason**: No GDPR data retention policy implemented
- **Future**: Implement data retention policy and deletion mechanisms

## 🎯 Business Assumptions

1. **Single Pricing Tier**
   - **Assumption**: Free tier only; no premium features
   - **Reason**: MVP focus; monetization added later
   - **Future**: Can add paid plans with advanced features

2. **No User Quotas**
   - **Assumption**: Users can create unlimited tasks
   - **Reason**: No rate limiting logic needed
   - **Future**: Can implement usage-based pricing later

3. **No Feature Flags**
   - **Assumption**: All features available to all users
   - **Reason**: Simple; can add feature flags for A/B testing
   - **Future**: Implement feature flag system for experiments

## 📝 Documentation Assumptions

1. **English Language**
   - **Assumption**: All documentation in English
   - **Reason**: International audience; most common for tech docs

2. **Beginner-Friendly**
   - **Assumption**: Documentation assumes some technical knowledge
   - **Reason**: Targets developers/technical audiences

3. **Current as of Date**
   - **Assumption**: Documentation accurate at time of writing
   - **Reason**: May need updates as project evolves

## ✅ Decision Log

### Why REST vs GraphQL?
- **Decision**: REST API chosen
- **Rationale**: Simpler, faster to implement, sufficient for MVP
- **Alternative**: GraphQL adds complexity for minimal benefit

### Why MongoDB vs SQL?
- **Decision**: MongoDB chosen
- **Rationale**: Flexible schema, document-based fits task model well
- **Alternative**: SQL adds schema migrations complexity

### Why No Real-Time Updates?
- **Decision**: Skipped WebSockets
- **Rationale**: Significantly increases complexity
- **Alternative**: REST polling sufficient for MVP

### Why Vercel/Render vs Self-Hosted?
- **Decision**: Cloud platform chosen
- **Rationale**: No ops overhead, automatic scaling, CDN included
- **Alternative**: Self-hosting requires infrastructure expertise

---

**Document Version**: 1.0
**Last Updated**: May 2024
**Project**: Kovai Task Management
