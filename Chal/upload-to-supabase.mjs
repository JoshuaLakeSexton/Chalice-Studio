import { createClient } from '@supabase/supabase-js';
import { readFileSync, readdirSync } from 'fs';
import { join, extname } from 'path';

const loadEnv = () => {
  const envContent = readFileSync('.env', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  return env;
};

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const getMimeType = (filename) => {
  const ext = extname(filename).toLowerCase();
  const mimeTypes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.otf': 'font/otf'
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

const uploadFile = async (localPath, storagePath, contentType) => {
  try {
    const fileBuffer = readFileSync(localPath);

    const { data, error } = await supabase.storage
      .from('media')
      .upload(storagePath, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`❌ Error uploading ${storagePath}:`, error.message);
      return false;
    }

    console.log(`✅ Uploaded: ${storagePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to upload ${storagePath}:`, err.message);
    return false;
  }
};

const uploadDirectory = async (localDir, storagePrefix) => {
  const files = readdirSync(localDir);
  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const localPath = join(localDir, file);
    const storagePath = `${storagePrefix}/${file}`;
    const contentType = getMimeType(file);

    const success = await uploadFile(localPath, storagePath, contentType);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  return { successCount, failCount };
};

const main = async () => {
  console.log('🚀 Starting upload to Supabase Storage...\n');

  const directories = [
    { local: './Public/Images', storage: 'Images' },
    { local: './Public/Work', storage: 'Work' },
    { local: './Public/video', storage: 'video' }
  ];

  let totalSuccess = 0;
  let totalFail = 0;

  for (const dir of directories) {
    console.log(`\n📁 Uploading ${dir.storage} folder...`);
    const { successCount, failCount } = await uploadDirectory(dir.local, dir.storage);
    totalSuccess += successCount;
    totalFail += failCount;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully uploaded: ${totalSuccess} files`);
  if (totalFail > 0) {
    console.log(`❌ Failed uploads: ${totalFail} files`);
  }
  console.log('='.repeat(50));

  if (totalFail === 0) {
    console.log('\n🎉 All files uploaded successfully!');
  }
};

main().catch(console.error);
