/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',

    // DOCKER: If you're developing using a Docker container, uncomment the following 
    // lines to enable hot-reloading. Hot-reloading also works with this configueration
    // when using Node locally, but changes show up faster without it.
    // !WARN! Make sure to not commit this file if you choose to uncomment.
    
    //     webpack: config => {
    //         config.watchOptions = {
    //             poll: 1000,
    //             aggregateTimeout: 300,
    //         }
    //         return config
    //     }
};

export default nextConfig;
