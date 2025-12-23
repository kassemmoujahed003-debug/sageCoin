# Form Submission Setup

This document describes the setup for the Change Password, Withdrawal, and Deposit forms.

## Environment Variables

Add the following to your `.env.local` file:

```env
RESEND_API_KEY=re_eWPETkhr_D9ZTPHLGDR4B2MfW2DAKYgbd
```

## Database Setup

Run the SQL script to create the transactions table:

1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase/create_transactions_table.sql`
3. Run the script

This will create:
- `transactions` table for logging form submissions
- Appropriate indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

## Email Configuration

All form submissions are sent to: **sagecoincom12@gmail.com**

The email "from" address is currently set to `SageCoin <onboarding@resend.dev>`. 

**Note:** If you want to use a custom domain for the "from" address:
1. Verify your domain in the Resend dashboard
2. Update the `from` field in `app/actions/form-actions.ts` to use your verified domain

## Forms

Three forms have been implemented:

1. **Change Password Form**
   - Fields: Current Password, New Password, Account Number
   - All fields are required

2. **Withdrawal Form**
   - Fields: Amount (numbers only), Account Number, Password, Note (optional)
   - Amount, Account Number, and Password are required

3. **Deposit Form**
   - Fields: Amount (numbers only), Password, Account Number, Note (optional)
   - Amount, Password, and Account Number are required

## Features

- ✅ Email notifications sent to sagecoincom12@gmail.com
- ✅ Form validation (required fields, numeric amounts)
- ✅ Success/error messages displayed to users
- ✅ Optional transaction logging to Supabase
- ✅ Responsive UI with RTL support
- ✅ Modal dialogs for form submission

## Usage

The forms are accessible from the User Dashboard:
- Click "Change Password" to open the password change form
- Click "Withdrawal" to open the withdrawal request form
- Click "Deposit" to open the deposit request form

After successful submission, a success message is displayed and the form closes automatically after 2 seconds.

