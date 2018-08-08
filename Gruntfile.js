module.exports = function(grunt) {

  /**
   * Initialize grunt
   */
  grunt.initConfig({

    /**
     * Read package.json
     */
    pkg: grunt.file.readJSON('package.json'),


    /**
     * Set banner
     */
    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',


    /**
     * Set directory paths
     */
    dir: {
      js: 'js',
      css: 'css',
      sass: 'css/sass',
      img: 'img',
      html: 'html',
    },


    /**
     * Minify .svg
     * @github.com/sindresorhus/grunt-svgmin
     */
    svgmin: {
      options: {
        plugins: [{
            // Prevent removing the viewBox attr. Previously caused issues in IE9+.
            removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: ['**/*.svg'], // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },


    /**
     * Compress .jpg/.png
     * @github.com/gruntjs/grunt-contrib-imagemin
     */
    imagemin: {
      dist: {
        options: {
            optimizationLevel: 3,
            progressive: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: '{,*/}*.{png,jpg,jpeg}', // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },


    /**
     * Convert .svg to .png
     * @github.com/dbushell/grunt-svg2png
     */
    svg2png: {
      dist: {
        files: [{
          src: ['<%= dir.img %>/**/*.svg'],
        }],
      }
    },


    /**
     * JSHint
     * @github.com/gruntjs/grunt-contrib-jshint
     */
    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    /**
     * Concatenate
     * @github.com/gruntjs/grunt-contrib-concat
     */
    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= jshint.files %>',
        dest: '<%= dir.js %>/<%= pkg.name %>.js'
      },
    },


    /**
     * Sass compiling
     * @github.com/gruntjs/grunt-contrib-sass
     */
    sass: {

      // Development options
      dev: {
        options: {
          style: 'expanded',
          //sourcemap: true,
          trace: true,
          debugInfo: false
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      },

      // Distribution options
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      }
    },


    /**
     * Minify
     * @github.com/gruntjs/grunt-contrib-uglify
     */
    uglify: {

      // Uglify options
      options: {
        banner: '<%= banner %>'
      },

      // Minify js files in js/src/
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= dir.js %>/<%= pkg.name %>.min.js'
      },
    },


    htmlbuild: {
      dist: {
        src: '<%= dir.html %>/index.html',
        dest: './index.html',
        options: {
          beautify: true,
          relative: true,
          basePath: false,
          scripts: {
            main: '<%= dir.js %>/<%= pkg.name %>.min.js'
          },
          styles: {
            main: [
              '<%= dir.css %>/<%= pkg.name %>.css',
            ],
          },
          sections: {
            sidemenu: '<%= dir.html %>/templates/sidemenu.html',
            header: '<%= dir.html %>/templates/header.html',
            home: '<%= dir.html %>/templates/home.html',
            about: '<%= dir.html %>/templates/about.html',
            portfolio: '<%= dir.html %>/templates/portfolio.html',
            process: '<%= dir.html %>/templates/process.html',
            contact: '<%= dir.html %>/templates/contact.html',
          },
        }
      }
    },


    /**
    * Html minify
    *
    */
    minifyHtml: {
      options: {
        cdata: true
      },
      dist: {
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: '', // Src matches are relative to this path.
            src: ['index.html'], // Actual pattern(s) to match.
            dest: '', // Destination path prefix.
          },
        ],
      },
    },


    /**
     * Clean files
     * @github.com/gruntjs/grunt-contrib-clean
     */
    clean: {
      // Nothing yet!
    },


    /**
     * Watch
     * @github.com/gruntjs/grunt-contrib-watch
     */
    watch: {

      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      // Compile Sass dev on change
      sass: {
        files: '<%= dir.sass %>/**/*',
        tasks: ['sass:dev'],
      },

      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify'],
      },

      html: {
        files: '<%= dir.html %>/**/*',
        tasks: ['htmlbuild:dist'],
      },

      // Live reload files
      liveReload: {
        options: { liveReload: true },
        files: [
          '<%= dir.css %>/**/*.css',  // all .css files in css/ dir
          '<%= dir.js %>/**/*.js',    // all .js files in js/ dir
          '<%= dir.html %>/**/*.html', // all .html files in templates/ dir
          './index.html',          // all .html + .php files
          '<%= dir.img %>/**/*.{png,jpg,jpeg,gif,svg}'  // img files in img/ dir
        ]
      }
    }
  });


  /**
   * Default Task
   * run `grunt`
   */
  grunt.registerTask('default', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dev',         // Compile Sass with dev settings
    'htmlbuild',        // Build HTML templates into index.html
  ]);


  /**
   * Production task, use for deploying
   * run `grunt production`
   */
  grunt.registerTask('production', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dist',        // Compile Sass with distribution settings
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
    'htmlbuild',        // Build HTML templates into index.html
    'minifyHtml',       // Minify HTML
  ]);


  /**
   * Image Tasks
   * run `grunt images`
   */
  grunt.registerTask('images', [
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
  ]);


  /**
   * Load the plugins specified in `package.json`
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-minify-html');
};
