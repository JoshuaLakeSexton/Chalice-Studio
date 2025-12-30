/*
  # Create Contacts Table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact submission
      - `name` (text, required) - Full name of the person submitting the form
      - `email` (text, required) - Email address of the person
      - `company` (text, optional) - Company name if provided
      - `service` (text, required) - The service they are interested in
      - `duration` (text, required) - Expected project duration
      - `message` (text, required) - Message describing their project
      - `created_at` (timestamptz) - Timestamp of when the form was submitted
      - `status` (text) - Status of the inquiry (defaults to 'new')

  2. Security
    - Enable RLS on `contacts` table
    - Add policy for authenticated users to insert new contacts
    - Add policy for authenticated users to read all contacts
    - Public users cannot read contacts directly (forms submit through edge function)

  3. Important Notes
    - Contact form submissions will be handled via the submit-contact edge function
    - The edge function will use the service role key to insert records
    - Status field helps track inquiry lifecycle: new, contacted, in-progress, completed
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text DEFAULT '',
  service text NOT NULL,
  duration text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can insert contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);