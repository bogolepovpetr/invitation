/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/invitation";

const nextConfig = {
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  poweredByHeader: false,
};

export default nextConfig;
