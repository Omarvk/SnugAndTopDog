module.exports = function ( grunt ) {
 grunt.loadNpmTasks('grunt-contrib-jshint');
 var taskConfig = {
   jshint: {
   	src: ['src/**/*.js', '!**/build/app.js'],
 	gruntfile: ['Gruntfile.js'],
 	options: {
		curly:  true,
		immed:  true,
		newcap: true,
		noarg:  true,
		sub:    true,
		boss:   true,
		eqnull: true,
		node:   true,
		undef:  true,
		globals: {
		_:       false,
		jQuery:  false,
		angular: false,
		moment:  false,
		console: false,
		$:       false,
    	io:      false
	  	}
    }
   }
 };
grunt.initConfig(taskConfig);
	grunt.registerTask('default', ['jshint']);
};