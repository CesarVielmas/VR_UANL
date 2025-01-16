const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = {
  transpileDependencies: true,
  chainWebpack: config => {
    // Configuración para archivos .gltf
    config.module
      .rule('gltf')
      .test(/\.(gltf)$/)
      .use('file-loader')
      .loader('file-loader')
      .end();

    // Configuración para archivos .bin
    config.module
      .rule('bin')
      .test(/\.(bin)$/)
      .use('file-loader')
      .loader('file-loader')
      .tap(options => ({
        outputPath: 'assets/'
      }))
      .end();

    // Configuración para etiquetas personalizadas de A-Frame
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions = {
          isCustomElement: tag => tag.startsWith('a-') // Permitir etiquetas como <a-entity>
        };
        return options;
      });
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'aframe': path.resolve(__dirname, 'node_modules/aframe'), // Asegura una única instancia de A-Frame
      }
    },
    plugins: [
      
        ]
  },    
  // Configuración opcional para el servidor de desarrollo
  // devServer: {
  //   host: '0.0.0.0', // Permite acceso desde cualquier IP
  //   https: true, // Habilita HTTPS para ngrok
  //   port: 8080, // O el puerto que prefieras
  //   proxy: {
  //     '/': {
  //       target: 'https://1fef-2806-267-3420-1378-c184-1c00-5fd4-b817.ngrok-free.app', // Cambia por la URL de ngrok
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   historyApiFallback: true, // Permite la navegación con rutas de Vue
  // },
};
