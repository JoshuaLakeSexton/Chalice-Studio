/*
  # Allow Public Contact Form Submissions

  1. Changes
    - Drop existing insert policy that requires authentication
    - Create new policy allowing anonymous users to insert contacts
    - Keep SELECT and UPDATE policies for authenticated users only

  2. Security
    - Public users can only INSERT new contact submissions
    - Only authenticated users can view and update contacts
    - This allows the contact form to work without authentication
    - Admin dashboard still requires authentication to view submissions
*/

DROP POLICY IF EXISTS "Authenticated users can insert contacts" ON contacts;

CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
