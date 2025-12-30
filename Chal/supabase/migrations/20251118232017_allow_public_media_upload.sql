/*
  # Allow Public Media Upload to Storage Bucket

  1. Changes
    - Add INSERT policy for public role to allow uploads to media bucket
    - This allows the anon key to upload files during initial setup
    
  2. Security
    - Public can upload to media bucket
    - Public can read from media bucket (already configured)
    - Only affects the 'media' bucket
    
  3. Notes
    - This is necessary for initial file uploads
    - In production, you may want to restrict this to authenticated users only
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can upload to media bucket'
  ) THEN
    CREATE POLICY "Public can upload to media bucket"
      ON storage.objects
      FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'media');
  END IF;
END $$;
