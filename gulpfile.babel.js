//gulp 自动化构建 js,css等文件的压缩 自动合并引用到文件
import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import gutil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from './webpack.config.babel';
import WebpackDevServer from 'webpack-dev-server';
import jshint from 'gulp-jshint';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
//  gulp 外挂 编译Sass 
//参数一 命令名称  参数二是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数   参数三 任务函数
gulp.task('default', ['webpack']);

const $ = gulpLoadPlugins();
  
// Lint JavaScript
gulp.task('lint', () =>
  gulp.src(['src/**/*.js','!node_modules/**'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    
);
//检查js代码 语法 
gulp.task('check', function () {
    gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter()); // 输出检查结果
});

//babel 转换成 commonjs 到 target文件夹下
gulp.task('babel', () => {
  return gulp.src('src/**/*.js')//
    .pipe(babel())//pipe ,因为gulp 借鉴了Unix操作系统的管道（pipe）思想,它可以把上一次的结果自动处理为下一次函数的输入参数.
    .pipe(gulp.dest('target'));//gulp.dest('target') 放到target目录下
});
 
//gulp-mocha  验证代码 运行相关测试
gulp.task('test', ['babel'], () => {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .on('error', () => {
      gulp.emit('end');
    });
});

 // gulp.task('watch:models', ()=>{
 //     var watcher = gulp.watch([
 //      'common/**/*.js',
 //      'common/**/*.json',
 //      'test/**/*.test.js'
 //     ], ['']);

 //    watcher.on('change', (e)=>{
 //      var filename = e.path.substr(e.path.lastIndexOf('/')+1).split('.')[0];
 //      gulp.src(`test/**/${filename}.test.js`, {read: false})
 //      .pipe(mocha({reporter: 'spec'}));
 //    });

 //  })可以让gulp指定去监视一个文件或者多个文件,当文件发生变化时,执行处理函数
 //gulp.watch(['test/*.js'], ['mocha']);
gulp.task('watch-test', () => {
  return gulp.watch(['src/**', 'test/**'], ['test']);
});

//
gulp.task('webpack',['test'],  function(callback) {
  var myConfig = Object.create(webpackConfig);
  // myConfig.plugins = [
		// new webpack.optimize.DedupePlugin(),
		// new webpack.optimize.UglifyJsPlugin()
  // ];

  // run webpack
  webpack(myConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      colors: true,
      progress: true
    }));
    callback();
  });
});

gulp.task('server', ['webpack'], function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval';
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: myConfig.output.publicPath,
		stats: {
			colors: true
		},
		hot: true
	}).listen(8888, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8888/public/index.html');
	});
});