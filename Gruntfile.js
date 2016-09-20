module.exports = function(grunt){
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('build', ['clean', 'concat:ipushpull', 'concat:ipushpull_standalone', 'concat:definition', 'uglify:ipushpull', 'uglify:ipushpull_standalone']);
    grunt.registerTask('release', ['build', 'bump']);

    grunt.initConfig({
        clean: {
            build: ['build']
        },

        concat: {
            options: {
                separator: '\r\n'
            },
            ipushpull: {
                dest: 'build/ng-ipushpull.js',
                src: [
                    'bower_components/eventEmitter/EventEmitter.min.js',
                    'src/ipushpull.ts.js',
                    'src/**/*.ts.js',
                ]
            },
            ipushpull_standalone: {
                dest: 'build/ng-ipushpull-standalone.js',
                src: [
                    'bower_components/forge/js/forge.min.js',
                    'bower_components/socket.io-client/socket.io.js',
                    'src/ipushpull.ts.js',
                    'src/**/*.ts.js',
                ]
            },
            definition: {
                dest: 'build/index.d.ts',
                src: [
                    'typings/globals/wolfy87-eventemitter/index.d.ts',
                    'typings/globals/socket.io-client/index.d.ts',
                    'src/**/*.d.ts',
                ]
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            ipushpull: {
                src: "build/ng-ipushpull.js",
                dest: "build/ng-ipushpull.min.js",
            },
            ipushpull_standalone: {
                src: "build/ng-ipushpull-standalone.js",
                dest: "build/ng-ipushpull-standalone.min.js",
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ["-a"],
            }
        }
    });
};
