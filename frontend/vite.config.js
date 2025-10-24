import { resolve } from 'path'

export default {
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        register: resolve(__dirname, 'src/pages/register.html'),
        otp: resolve(__dirname, 'src/pages/otp.html'),
        resetPassword: resolve(__dirname, 'src/pages/resetPassword.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
      },
    },
  },
  server: {
    port: 5178
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
     preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'import',
            'mixed-decls',
            'color-functions',
            'global-builtin',
          ],
        },
     },
  },
}