# 🚀 Scholax Quick Start Guide

Get Scholax running in 5 minutes!

## Step 1: Prerequisites
```bash
# Check Node.js version (should be 18+)
node --version
npm --version
```

## Step 2: Install & Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
# At minimum, add Supabase URL and key
```

## Step 3: Run Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

## Step 4: Test the App

### Create Account
1. Click "Create Account"
2. Enter: First Name, Last Name, Email, Password
3. Click "Create Account"
4. Should redirect to Dashboard

### Explore Pages
- **Dashboard** (`/dashboard`) - View tasks and earnings
- **Verify** (`/verify`) - Check device capabilities
- **Deposit** (`/deposit`) - Subscribe and make payments
- **Financials** (`/financials`) - View balance and transactions

## Step 5: Configure Services (Optional)

For full functionality, set up:

### Essential
1. **Supabase** - [Setup Guide](./docs/1-AUTHENTICATION.md)
   - Create project
   - Get API keys
   - Set up database tables

### Optional (for payments)
2. **Stripe** - [Payment Guide](./docs/4-PAYMENT_SETUP.md)
3. **M-Pesa** - [Payment Guide](./docs/4-PAYMENT_SETUP.md)

### Optional (for emails)
4. **Resend** - [Email Guide](./docs/3-RESEND_EMAIL_SETUP.md)

## Production Build
```bash
npm run build
npm run preview
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Port 3000 already in use | `npm run dev -- --port 3001` |
| Supabase connection error | Check VITE_SUPABASE_URL in .env.local |
| Tailwind styles not loading | Delete `dist/` and rebuild |
| Node version mismatch | Use Node 18+ (check `node --version`) |

## Next Steps

1. Read full [README.md](./README.md)
2. Follow detailed setup guides in `docs/`
3. Customize branding and colors
4. Deploy to production

## Support

- 📖 [Full Documentation](./docs/)
- 🎨 [Design System](./README.md#-design-system)
- 🔐 [Security Features](./README.md#-security-features)

---

Happy coding! 🎉
