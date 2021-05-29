/// <reference path='qaf.core.js' />

/// <summary>
/// AP Node.js 전용 라이브러리
/// </summary>
(function (context) {
    var $system = $system || new baseCore();

    $system.extend({
        version: "1.0",

        getDataSource: function (moduleID, dataSourceID, callback) {
            if (!callback) {
                throw new Error('callback 함수 정의 필요');
            }

            try {
                var moduleLibrary = qaf.getModuleLibrary(moduleID);
                if (moduleLibrary) {
                    var moduleConfig = moduleLibrary.config;

                    var fs = require('fs');
                    var xml2js = require('xml2js');
                    if (fs.existsSync(qaf.Config.DataSourceFilePath) == true) {
                        var parser = new xml2js.Parser({ explicitArray: false });
                        fs.readFile(qaf.Config.DataSourceFilePath, function (err, data) {
                            parser.parseString(data, function (error, result) {
                                if (error) {
                                    callback(error, null);
                                }
                                else {
                                    var dataSource = result.NewDataSet.DataSource;
                                    if ($ref.isArray(dataSource) == false) {
                                        if (dataSource.DataSourceID === dataSourceID && dataSource.ApplicationID === moduleConfig.ApplicationID && dataSource.ProjectID.split(',').indexOf(moduleConfig.ProjectID) > -1) {
                                            callback(null, {
                                                connectionString: dataSource.ConnectionString,
                                                provider: dataSource.DataProvider
                                            });
                                        }
                                    }
                                    else {
                                        var findDataSource = dataSource.find(function (item) { return item.DataSourceID == dataSourceID && item.ApplicationID === moduleConfig.ApplicationID && item.ProjectID.split(',').indexOf(moduleConfig.ProjectID) > -1; });
                                        if (findDataSource) {
                                            callback(null, {
                                                connectionString: findDataSource.ConnectionString,
                                                provider: findDataSource.DataProvider
                                            });
                                        }
                                    }
                                }
                            });
                        });
                    }
                    else {
                        callback('DataSource 설정 파일 경로 확인 필요', null);
                    }
                }
                else {
                    callback('ModuleID 확인 필요', null);
                }
            } catch (error) {
                callback(error, null);
            }
        },

        getStatement: function (moduleID, statementID, parameters) {
            var result = null;

            var moduleLibrary = qaf.getModuleLibrary(moduleID);
            if (moduleLibrary) {
                try {
                    var featureSQLPath = moduleLibrary.featureSQLPath;

                    if (featureSQLPath && fs.existsSync(featureSQLPath) == true) {
                        var mybatisMapper = require('mybatis-mapper');
                        mybatisMapper.createMapper([featureSQLPath]);
                        mybatisMapper.featureSQLPath = featureSQLPath;
                        result = mybatisMapper.getStatement('feature', statementID, parameters);
                    }
                    else {
                        $l.eventLog('getStatement', 'featureSQLPath - {0} 확인 필요'.format(featureSQLPath), 'Fatal');
                        throw new Error('featureSQLPath 확인 필요');
                    }
                } catch (error) {
                    $l.eventLog('getStatement', error, 'Fatal');
                    throw error;
                }
            }
            else {
                throw new Error('ModuleID 확인 필요');
            }

            return result;
        },

        executeQuery: function (moduleID, statementID, parameters, callback) {
            var moduleLibrary = qaf.getModuleLibrary(moduleID);
            if (moduleLibrary) {
                var moduleConfig = moduleLibrary.config;
                $s.getDataSource(moduleID, moduleConfig.DataSourceID, function (error, dataSource) {
                    if (error) {
                        if (callback) {
                            callback(error, null);
                        }
                    }
                    else {
                        // dataSource.provider에 따른 mssql, oracle, mysql 분기 처리 필요
                        var db = require('mssql');
                        db.connect(dataSource.connectionString, function (error) {
                            if (error) {
                                if (callback) {
                                    callback(error, null);
                                }
                            }
                            else {
                                var sql = '';

                                try {
                                    sql = $s.getStatement(moduleID, statementID, parameters);
                                    sql = sql.replace(/\\\"/g, '"');
                                } catch (error) {
                                    callback(error, null);
                                    return;
                                }

                                if (callback) {
                                    db.query(sql, function (error, result) {
                                        if (error) {
                                            callback(error, null);
                                        }
                                        else {
                                            callback(null, result);
                                        }
                                    });
                                }
                                else {
                                    db.query(sql);
                                }
                            }
                        });
                    }
                });
            }
            else {
                callback('ModuleID 확인 필요', null);
            }
        }
    });
    context.$system = context.$s = qaf.$s = context.$system || $system;
})(globalThis);