﻿/// <summary>
/// Node.js 용 exports 기능
/// </summary>
if (isNodejs == true) {
    var fs = require('fs');
    var path = require('path');
    var crypto = require('crypto');

    if (typeof localStorage === 'undefined' || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        globalThis.localStorage = new LocalStorage(process.env.QAF_LocalStoragePath);
    }

    var moduleLogDirectory = path.join(process.env.QAF_FileLogBasePath, qaf.Config.ApplicationID, qaf.Config.ProjectID);
    if (fs.existsSync(moduleLogDirectory) == false) {
        fs.mkdirSync(moduleLogDirectory, {
            recursive: true
        });
    }

    var options = {
        logDirectory: moduleLogDirectory,
        fileNamePattern: '{0}_{1}_<DATE>.log'.format(qaf.Config.ApplicationID, qaf.Config.ProjectID),
        dateFormat: 'YYYYMMDD'
    };

    var logger = require('simple-node-logger').createRollingFileLogger(options);
    logger.setLevel(process.env.QAF_LogMinimumLevel);
    globalThis.$logger = logger;

    if (qaf && !qaf.initializeModuleScript) {
        qaf.initializeModuleScript = function (moduleFileName, dataSourceMap) {
            var result = null;
            if (moduleFileName) {
                try {
                    var fileDirectory = path.dirname(moduleFileName);
                    var fileDirectoryName = fileDirectory.split(path.sep).pop();
                    var modulePaths = fileDirectory.split(path.sep)
                    var pathLength = modulePaths.length;
                    var moduleID = '{0}|{1}|{2}'.format(modulePaths[pathLength - 3], modulePaths[pathLength - 2], modulePaths[pathLength - 1]);
                    moduleID = crypto.createHash('sha1').update(moduleID).digest('hex');

                    var functionModule = qaf.functionModules[moduleID];
                    if (functionModule == undefined) {
                        var dataSource = null;
                        if (dataSourceMap) {
                            var dataSource = JSON.parse(dataSourceMap);
                        }

                        functionModule = {
                            path: fileDirectory,
                            config: eval('(' + fs.readFileSync(moduleFileName.replace('featureMain.js', 'featureMeta.json'), 'utf8') + ')').Header,
                            featureSQLPath: null,
                            dataSource: dataSource,
                            logger: null,
                        };

                        var featureSQLPath = path.join(fileDirectory, 'featureSQL.xml');
                        if (fs.existsSync(featureSQLPath) == true) {
                            functionModule.featureSQLPath = featureSQLPath;
                        }

                        var moduleLogDirectory = path.join(process.env.QAF_FileLogBasePath, functionModule.config.ApplicationID, functionModule.config.ProjectID, fileDirectoryName);
                        if (fs.existsSync(moduleLogDirectory) == false) {
                            fs.mkdirSync(moduleLogDirectory, {
                                recursive: true
                            });
                        }

                        var options = {
                            logDirectory: moduleLogDirectory,
                            fileNamePattern: '{0}_<DATE>.log'.format(fileDirectoryName),
                            dateFormat: 'YYYYMMDD'
                        };

                        var logger = require('simple-node-logger').createRollingFileLogger(options);
                        logger.setLevel(process.env.QAF_LogMinimumLevel);
                        functionModule.logger = logger;
                        qaf.functionModules[moduleID] = functionModule;

                        result = moduleID;
                    }
                    else {
                        result = moduleID;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                console.log(moduleFileName + ' 모듈 확인 필요');
            }

            return result;
        };
    }

    if (qaf && !qaf.getModuleLibrary) {
        qaf.getModuleLibrary = function (moduleID) {
            return qaf.functionModules[moduleID];
        };
    }

    globalThis.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
    qaf.functionModules = {};

    module.exports = qaf;
}