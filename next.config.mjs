/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        gistId: "99d784fa160c1d40f29c64a9e36b50a3"
    },
    serverRuntimeConfig: {
        githubToken: process.env.GITHUB_TOKEN
    }
};

export default nextConfig;
