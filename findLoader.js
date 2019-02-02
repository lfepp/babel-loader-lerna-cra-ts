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

            if (!loader.loader.includes('node_modules/ts-loader') && !loader.loader.use) {
                return false;
            }

            if (loader.loader.includes('node_modules/ts-loader')) {
                console.log('ts loader');
                loaderToOverride = loader;                
            } else {
                loader.loader.use.forEach(useLoader => {
                    console.log('has use');
                    if (!useLoader.loader) {
                        return false;
                    }

                    if (!useLoader.loader.includes('node_modules/ts-loader')) {
                        return false;
                    }

                    console.log('useLoader', useLoader);
                    loaderToOverride = useLoader;
                });
            }

            loaderToOverride = loader;
        });
    });

    return loaderToOverride;
};
