module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= grunt.template.today("yyyy-mm-dd") %> */',
                mangle: true,
                compress: true
            },
            build: {
                src: 'wwwroot/build/qaf.js',
                dest: 'wwwroot/build/qaf.min.js'
            },
            nodejs: {
                src: 'wwwroot/build/index.js',
                dest: 'wwwroot/build/index.min.js'
            }
        },
        concat: {
            basic: {
                src: [
                    'wwwroot/src/qaf.core.js',
                    'wwwroot/src/qaf.exception.js',
                    'wwwroot/src/qaf.resource.js',
                    'wwwroot/src/qaf.browser.js',
                    'wwwroot/src/qaf.manipulation.js',
                    'wwwroot/src/qaf.dimension.js',
                    'wwwroot/src/qaf.reflection.js',
                    'wwwroot/src/qaf.crytography.js',
                    'wwwroot/src/qaf.stringbuilder.js',
                    'wwwroot/src/qaf.keyboard.js',
                    'wwwroot/src/qaf.vaildation.js',
                    'wwwroot/src/qaf.extension.js',
                    'wwwroot/src/qaf.library.js',
                    'wwwroot/src/qaf.request.js',
                    'wwwroot/src/qaf.channel.js',
                    'wwwroot/src/qaf.webform.js',
                    'wwwroot/src/extends/qaf.webform.ajax.js',
                    'wwwroot/src/extends/qaf.webform.data.js',
                    'wwwroot/src/lang/qaf.resource.ko-KR.js',
                ],
                dest: 'wwwroot/build/qaf.js'
            },
            nodejs: {
                src: [
                    'wwwroot/src/qaf.core.js',
                    'wwwroot/src/qaf.resource.js',
                    'wwwroot/src/qaf.reflection.js',
                    'wwwroot/src/qaf.crytography.js',
                    'wwwroot/src/qaf.stringbuilder.js',
                    'wwwroot/src/qaf.extension.js',
                    'wwwroot/src/qaf.library.js',
                    'wwwroot/src/qaf.webform.js',
                    'wwwroot/src/qaf.request.js',
                    'wwwroot/src/extends/qaf.webform.ajax.js',
                    'wwwroot/src/lang/qaf.resource.ko-KR.js',
                    'wwwroot/src/qaf.system.js',
                    'wwwroot/src/qaf.exports.js',
                ],
                dest: 'wwwroot/build/index.js'
            }
        },
        watch: {
            js: {
                files: [
                    '<%= concat.basic.src %>',
                ],
                tasks: ['browser', 'nodejs']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('nodejs', ['concat:nodejs', 'uglify:nodejs']);
};