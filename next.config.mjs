import MillionLint from '@million/lint';
// next.config.mjs
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);