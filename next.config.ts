import withPWA from 'next-pwa';

const nextConfig = {
  images: {
    domains: ["utfs.io"]
  }
};

export default withPWA({
  dest: 'public',
  disable: false,
  register: true,
  skipWaiting: true,
})(nextConfig);
