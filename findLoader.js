module.exports = (webpackConfig) => {
    let loaderToOverride;

    webpackConfig.module.rules.forEach(rule => {
        if (!Reflect.has(rule, 'oneOf')) {
            return false;
        }

        rule.oneOf.forEach(loader => {
            if (!Reflect.has(loader, 'test')) {
                return false;
            }

            if (!loader.test.toString().includes('(js|mjs|jsx|ts|tsx)')) {
                return false;
            }

            if (!loader.loader.includes('node_modules/babel-loader') && !loader.loader.includes('node_modules/ts-loader')) {
                return false;
            }

            loaderToOverride = loader;
        });
    });

    return loaderToOverride;
};
