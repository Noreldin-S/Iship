var fedexAPI = require('./index');
var util = require('util');

var fedex = new fedexAPI({
  environment: 'sandbox',
  key: 'MLLcAZhKFf1r5JcA',
  password: 'Noreldin1234',
  account_number: '510087380',
  meter_number: '119205592',
  imperial: true
});