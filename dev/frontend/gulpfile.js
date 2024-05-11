
import gulp from 'gulp';
import {series, parallel} from 'gulp';
import path from 'path';
import fs from 'fs';
import {deleteAsync, deleteSync} from 'del';
import archiver from 'archiver';


const buildPath = normalizePath(path.resolve('../../build'));
const temporaryFolder = `${buildPath}/tmp`
const frontendDistPath = normalizePath(path.resolve('./dist/browser'));
const backendSrcPath = normalizePath(path.resolve('../backend'));
const zipFilename = `ovh-mail-manager.zip`;

function normalizePath(strPath) {
  return strPath.replaceAll('\\', '/');
}

function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', {zlib: {level: 9}});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}


const buildZip = () => {
  return zipDirectory(
    `${temporaryFolder}`,
    `${buildPath}/${zipFilename}`
  );
};

const cleanTmpFolder = () => {
  return deleteAsync([
    `${temporaryFolder}/**`,
    `${temporaryFolder}`,
  ], {force: true})
};

const copyBackendFolderTask1 = () => {
  return gulp.src([
    `${backendSrcPath}/config-sample.php`,
    `${backendSrcPath}/.htaccess`,
  ])
    .pipe(gulp.dest(`${temporaryFolder}/api`));
}

const copyBackendFolderTask2 = () => {
  return gulp
    .src([
      `${backendSrcPath}/**`,
      `!${backendSrcPath}/config.php`,
      `!${backendSrcPath}/config-*.php`,
      `!${backendSrcPath}/composer.*`,
    ])
    .pipe(gulp.dest(`${temporaryFolder}/api`));
}

const copyFrontendDistFolder = () => {
  return gulp
    .src([
      `${frontendDistPath}/**`,
      `!${frontendDistPath}/assets/config.json`
    ])
    .pipe(gulp.dest(`${temporaryFolder}`));
}

const cleanDistFolder = (cb) => {
  return deleteAsync(buildPath, {force: true});
}

const initConfigFiles = async (cb) => {

  // init front end config files
  fs.rename(
    `${temporaryFolder}/assets/config-sample.json`,
    `${temporaryFolder}/assets/config.json`,
    function (err) {
      if (err) console.log(err);
    }
  );

  // init backend config files
  fs.rename(
    `${temporaryFolder}/api/config-sample.php`,
    `${temporaryFolder}/api/config.php`,
    function (err) {
      if (err) console.log(err);
    }
  );

  cb();
}


const process = series(
  cleanDistFolder,
  copyFrontendDistFolder,
  copyBackendFolderTask1,
  copyBackendFolderTask2,
  initConfigFiles,
  buildZip,
  cleanTmpFolder
);

export default process;
