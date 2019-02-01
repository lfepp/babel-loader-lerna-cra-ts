const path = require('path');
const glob = require('glob');

const findLoader = require(path.join(__dirname, 'findLoader'));
const lernaRoot = require(path.join(__dirname, 'getLernaRoot'))();
const lernaPackageJson = require(path.join(lernaRoot, 'package.json'));

module.exports = (configDir, configFile) => {
    const reactAppSrcDir = path.resolve(configDir, '..', '..', '..', 'src');
    const backupConfig = path.join(configDir, `backup.${path.parse(configFile).base}`);

    const settings = lernaPackageJson['babel-loader-lerna-cra-ts'];
    const appsGlob = path.join(lernaRoot, settings.apps);
    const importsGlob = path.join(lernaRoot, settings.imports);

    const config = {
        apps: glob.sync(appsGlob),
        imports: glob.sync(importsGlob)
    };

    console.log('srcDir', reactAppSrcDir);
    console.log('config', config);

    const webpackConfig = require(backupConfig);
    const loaderToOverride = findLoader(webpackConfig, reactAppSrcDir);

    loaderToOverride.include = [...config.imports, reactAppSrcDir];

    return webpackConfig;
};
