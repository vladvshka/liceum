// HOW TO USE:
// node generator.js generate 'rt-periods.json'
const generator = require('commander');

const { generateAPI } = require('./app/app');

generator
  .version('1.0.0')
  .description('ct.lyceum.by API generator');

generator
  .command('generate <filename>')
  .alias('g')
  .description('Generate API for model schema')
  .action((filename) => {
    generateAPI(filename);
  });

generator.parse(process.argv);