require('shelljs/global');

ls('*').forEach(function(file) {
  if (Number(file) > 0) {
    exec('mv ' + file + ' img/' + file + '.jpg');
  }
});
