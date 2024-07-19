const path = require('path');
require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cxhwsktvngsmxnxfhyaj.supabase.co',
        pathname: '/storage/v1/object/public/post_files/**',
      },
      {
        protocol: 'https',
        hostname: 'fuzsghurorixbdxqenft.supabase.co',
        pathname: '/storage/v1/object/public/post_files/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};

module.exports = nextConfig;
