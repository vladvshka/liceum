module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		express: {
			dev: {
				options: {
					script: './bin/www'
				}
			}
		},
		sass: {
			dist: {
				files: [{
					expand: true,
					flatten: true,
					cwd: 'frontend-src/',
					src: ['**/*.scss'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},
		watch: {
			options: {
				livereload: true
			},
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
			scripts: {
				files: ['routes/**/*.js', 'controllers/*.js', '*.js'],
				tasks: ['express:dev'],
				options: {
					livereload: true,
					spawn: false,
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('dev', ['express:dev', 'sass', 'watch']);
}