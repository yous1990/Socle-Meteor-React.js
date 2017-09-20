//
// var gulp = require('gulp');
// var bump = require('gulp-bump');
// var shell = require('gulp-shell');
// var runSequence = require('run-sequence');
// var pckg = require('./package.json');
// var util = require('gulp-util');
//
//
// //Bumping version
// function incrementVersion(importance) {
//   // get all the files to bump version in
//   return gulp.src(['./package.json', './sonar-project.properties'])
//   // bump the version number in those files
//     .pipe(bump({type: importance}))
//     // save it back to filesystem
//     .pipe(gulp.dest('./'));
// }
// gulp.task('patch', function () {
//   return incrementVersion('patch');
// })
// gulp.task('feature', function () {
//   return incrementVersion('minor');
// });
// gulp.task('prerelease', function () {
//   return incrementVersion('prerelease');
// });
// gulp.task('release', function () {
//   return incrementVersion('major');
// });
//
//
// //compression projet
// function zipProject() {
//   return gulp.src(['./'])
//     .pipe(shell(['zip -r socle-meteor.zip .']))
//     .pipe(gulp.dest('./'));
// }
//
// gulp.task('build', function () {
//   return zipProject();
// });
//
// // gulp.task('build', function (done) {
// //   runSequence('dist', 'reports', 'preparePackage',
// //     function (err) {
// //       //if any error happened in the previous tasks, exit with a code > 0
// //       if (err) {
// //         var exitCode = 2;
// //         console.log('[ERROR] build  gulp  task failed', err);
// //         console.log('[FAIL] build  task failed - exiting with code ' + exitCode);
// //         return process.exit(exitCode);
// //       }
// //     })
// // });
//
//
// //suppression de l'archive socle-meteor.zip
// function deleteCompressedProject() {
//   return gulp.src(['./'])
//     .pipe(shell(['rm -f socle-meteor.zip']))
//     .pipe(gulp.dest('./'));
// }
//
// gulp.task('deleteCompressedProject', function () {
//   return deleteCompressedProject();
// });
//
// gulp.task('injectEnvVariable', shell.task([
//   'echo RELEASE_VERSION= ' + pckg.version + ' > envVars.properties',
// ]));
//
//
//
//
//
// //git tasks
// function prepare(branch) {
//   // get all the files to bump version in
//   return gulp.src(['./'])
//   // bump the version number in those files
//     .pipe(shell(['git config --local credential.helper store', 'git checkout ' + branch]))
//     // save it back to filesystem
//     .pipe(gulp.dest('./'));
// }
// gulp.task('gitPrepare', function () {
//   return prepare(util.env.branch);
// });
//
// gulp.task('gitAdd', shell.task([
//     'git add  -A'
// ]));
//
// function pushToGit(remote, branch) {
//   // get all the files to bump version in
//   return gulp.src(['./'])
//   // bump the version number in those files
//     .pipe(shell('git push ' + remote + ' ' + branch))
//     // save it back to filesystem
//     .pipe(gulp.dest('./'));
// }
//
// gulp.task('gitCommitWithMessage', function () {
//   return gitCommit(util.env.message);
// });
//
// function gitCommit(message) {
//   return gulp.src(['./'])
//     .pipe(shell(['git commit -m "' + message + '"']))
//     .pipe(gulp.dest('./'));
// }
//
// gulp.task('gitUpdateRepository', function (callback) {
//   runSequence('gitAdd',
//     'gitCommitWithMessage',
//     function (err) {
//       //if any error happened in the previous tasks, exit with a code > 0
//       if (err) {
//         var exitCode = 2;
//         console.log('[ERROR] gulp build task failed', err);
//         console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
//         return process.exit(exitCode);
//       }
//       else {
//         return pushToGit(util.env.remote, util.env.branch);
//       }
//     }
//   );
// });
