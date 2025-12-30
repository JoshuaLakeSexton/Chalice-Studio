# Chalice Studio - Netlify Deployment Guide

This guide will help you deploy your Chalice Studio website to Netlify with full functionality.

## Prerequisites

- A Netlify account (sign up at https://netlify.com)
- Access to your Supabase project dashboard
- Your project code in a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Repository

1. Commit all your project files to your Git repository
2. Push your changes to your remote repository (GitHub/GitLab/Bitbucket)

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

## Step 2: Connect to Netlify

1. Log in to your Netlify account at https://app.netlify.com
2. Click "Add new site" > "Import an existing project"
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select the Chalice Studio repository

## Step 3: Configure Build Settings

Netlify will automatically detect the build settings from your `netlify.toml` file. Verify these settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

These are already configured in your `netlify.toml` file, so you shouldn't need to change anything.

## Step 4: Add Environment Variables

In the Netlify dashboard for your site:

1. Go to "Site configuration" > "Environment variables"
2. Click "Add a variable" and add the following:

**Variable 1:**
- Key: `VITE_SUPABASE_URL`
- Value: `https://ljuvddzwlesviuikmwys.supabase.co`

**Variable 2:**
- Key: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXZkZHp3bGVzdml1aWttd3lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MDI0OTMsImV4cCI6MjA3OTA3ODQ5M30.KnmKbccXBD4qwbGd8ZrVO795ojanJLqHapcBvj9s_Cw`

3. Click "Save" for each variable

## Step 5: Deploy

1. Click "Deploy site" or "Deploy [your-site-name]"
2. Netlify will build and deploy your site
3. Watch the deploy logs to ensure everything builds successfully
4. Once complete, you'll get a live URL like: `https://your-site-name.netlify.app`

## Step 6: Test Your Live Site

After deployment, test the following:

### 1. Page Load and Media
- Visit your site URL
- Verify all images load from Supabase storage
- Check that videos play correctly
- Test smooth scrolling functionality

### 2. Contact Form
- Scroll to the contact form
- Fill in all required fields:
  - Name
  - Email
  - Company (optional)
  - Service (select from dropdown)
  - Project Duration (select from dropdown)
  - Message
- Click "Send Message"
- You should see a success message: "Thank you! We'll be in touch soon."

### 3. Verify Form Submissions in Supabase
1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Click "Table Editor" in the left sidebar
4. Select the "contacts" table
5. You should see your test submission with all the form data

### 4. Navigation and Interactions
- Test the "Begin Your Quest" button (should scroll to contact form)
- Test the "Start Your Project" button (should scroll to contact form)
- Check that the image carousel works (previous/next buttons)
- Verify all external links work (LinkedIn, Bento)
- Test hover effects on portfolio items

### 5. Mobile Responsiveness
- Open the site on your phone or use browser dev tools
- Test all features work on mobile viewport
- Verify the layout looks correct on different screen sizes

## Step 7: Configure Custom Domain (Optional)

If you have a custom domain:

1. In Netlify dashboard, go to "Domain management"
2. Click "Add a domain"
3. Enter your custom domain (e.g., `chalice.studio`)
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)
6. Netlify will automatically provision an SSL certificate

## Backend Status

Your Supabase backend is fully configured:

- ✅ **Media Storage Bucket**: Created and configured for public access
- ✅ **Contacts Table**: Created with proper schema and indexes
- ✅ **Edge Function**: Deployed and active at `https://ljuvddzwlesviuikmwys.supabase.co/functions/v1/submit-contact`
- ✅ **Row Level Security**: Configured on all tables
- ✅ **CORS**: Properly configured for cross-origin requests

## Troubleshooting

### Build Fails
- Check the build logs in Netlify for error messages
- Verify environment variables are set correctly
- Ensure all dependencies are in package.json

### Images/Videos Don't Load
- Check the browser console for 404 errors
- Verify the Supabase URL is correct in environment variables
- Confirm files are uploaded to the Media bucket in Supabase

### Contact Form Doesn't Submit
- Open browser console and check for errors
- Verify the edge function is deployed in Supabase
- Check that environment variables are set correctly
- Ensure the Supabase anon key has proper permissions

### Form Submits But Data Doesn't Save
- Check the edge function logs in Supabase dashboard
- Verify the contacts table exists in Supabase
- Check RLS policies are configured correctly

## Continuous Deployment

Once connected, Netlify will automatically:
- Deploy when you push to your main branch
- Run builds on pull requests for preview
- Provide unique URLs for each deploy

## Support Resources

- Netlify Documentation: https://docs.netlify.com
- Supabase Documentation: https://supabase.com/docs
- Your Supabase Dashboard: https://supabase.com/dashboard/project/ljuvddzwlesviuikmwys

## Next Steps

1. Upload all your media files to the Supabase Media bucket if not already done
2. Test the contact form and verify submissions appear in Supabase
3. Share your live site URL
4. Monitor form submissions in your Supabase dashboard

---

**Your site is ready to go live!** 🎉

Simply follow the steps above to deploy to Netlify. All backend infrastructure is configured and ready.
