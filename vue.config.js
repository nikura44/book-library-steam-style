const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const { isProduction } = args[0];
      args[0].__VUE_PROD_DEVTOOLS__ = !isProduction;
      args[0].__VUE_PROD_HIDE_INTERNAL_FRAMES__ = isProduction;
      args[0].__VUE_PROD_HOT_RELAXED_MAP__ = isProduction;
      args[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = isProduction;
      return args;
    });
  },
})
