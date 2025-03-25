import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for development
  env: {
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoibW9oYW5uaWxtYW4iLCJhIjoiY2xwZ3N1cGRiMWQwMjNlbXgzOHZnbDZsZyJ9.kfSKWwSB5-Qdmrw8oZkeJg', // Hardcoded Mapbox token
  },
  webpack(config: any) {
    // Custom Webpack configuration to make sure Mapbox GL JS works
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': require.resolve('mapbox-gl'), // Resolve Mapbox GL
    };
    return config;
  },
};

export default nextConfig;
