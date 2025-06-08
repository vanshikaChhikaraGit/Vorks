/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  typescript:{
        ignoreBuildErrors:true
    },
    eslint:{
        ignoreDuringBuilds:true
    },
   productionBrowserSourceMaps: true, // For production
  webpack: (config) => {
    config.devtool = 'eval-source-map' // For development

  },
   images:{
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dg881ug7n/**',
        search: '',
      },
    ],
  },
   };

export default config;
