const isProduction = process.env.NODE_ENV === "production";
const repositoryName = "pouya-portfolio";
const productionPath = `/${repositoryName}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProduction ? productionPath : "",
  assetPrefix: isProduction ? `${productionPath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProduction ? productionPath : ""
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
};

export default nextConfig;
