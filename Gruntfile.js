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
					cwd: 'public/stylesheets',
					src: ['*.scss'],
					dest: 'public/stylesheets',
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
				files: ['**/*.js'],
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