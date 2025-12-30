/*
  # Create Media Storage Bucket

  1. Storage Bucket
    - Creates a public storage bucket named 'Media' for images and videos
    - Allows public access for reading files
    - Supports image and video mime types

  2. Security
    - Public bucket with SELECT access for all users
    - Allows unauthenticated users to view media files
    - File size limit of 50MB per file
*/

-- Create the media storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'Media',
  'Media',
  true,
  52428800,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'video/webm', 'font/otf', 'application/x-font-otf']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public Access for Media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update media" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete media" ON storage.objects;
  DROP POLICY IF EXISTS "Public can upload to media bucket" ON storage.objects;
END $$;

-- Create policy to allow public SELECT on media bucket
CREATE POLICY "Public Access for Media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'Media');

-- Create policy to allow public INSERT on media bucket (for uploads)
CREATE POLICY "Public can upload to media bucket"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'Media');

-- Create policy to allow authenticated users to update media
CREATE POLICY "Authenticated users can update media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'Media')
WITH CHECK (bucket_id = 'Media');

-- Create policy to allow authenticated users to delete media
CREATE POLICY "Authenticated users can delete media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'Media');