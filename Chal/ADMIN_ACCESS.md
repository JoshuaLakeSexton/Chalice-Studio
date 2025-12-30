# Admin Dashboard Access

Your website now has a fully functional admin dashboard to view and manage all contact form submissions.

## First-Time Setup

Before you can access the admin dashboard, you need to create an admin user account in Supabase:

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Users**
4. Click **Add User** → **Create new user**
5. Enter your admin email (e.g., `admin@chalice.studio`)
6. Create a secure password
7. Click **Create user**

## Accessing the Admin Dashboard

1. Navigate to: `/admin` (e.g., `https://yourwebsite.com/admin`)
2. Enter your admin email and password
3. You'll be logged in and can view all submissions

## Features

- **View All Submissions**: See all contact form submissions in a clean, organized interface
- **Status Management**: Update submission status (New, Contacted, In Progress, Completed)
- **Detailed View**: Click on any submission to view full details
- **Real-time Updates**: Refresh button to load latest submissions
- **Secure Authentication**: Uses Supabase Auth for secure access

## Contact Status Options

- **New**: Just submitted, not yet reviewed
- **Contacted**: Initial contact has been made
- **In Progress**: Actively working on the project
- **Completed**: Project finished or inquiry resolved

## Technical Details

- All submissions are stored in Supabase database
- The contact form on the main website automatically saves to the database
- Admin access is session-based (logged out when browser closes)
- Database table: `contacts`
