var https = require('https');
var extend = require('extend');
var builder = require('xmlbuilder');
var parser = require('xml2json');
var moment = require('moment');

function FedEx(args) {
    var $scope = this,
    hosts = {
        sandbox: 'wsbeta.fedex.com',
        live: 'ws.fedex.com'
    },
    defaults = {
        imperial: true,
        currency: 'USD',
        language: 'en-US',
        environment: 'sandbox',
        key: 'MLLcAZhKFf1r5JcA',
        password: 'Ei4382061',
        account_number: '510087380',
        meter_number: '119205592',
        pretty: false,
        user_agent: 'uh-sem-blee, Co | typefoo',
        debug: false
    },
    default_services = {

    };

    $scope.options = defaults;

    function doBuildParams(data, options, resource) {
        var callBody = resource.f(data, options);
        var body = callBody;
        var params = {
            host: hosts[$scope.options.environment],
            path: resource.p,
            method: 'POST',
            headers: {
                'Content-Length': body.length,
                'Content-Type': 'text/xml',
                'User-Agent': $scope.options.user_agent
            }
        };

        return {
            body: body,
            params: params
        };
    }

    function doRequest(params, body, callback) {
        if (!callback) {
            callback = body;
            body = null;
        }

        if ($scope.options.debug) {
            //var json = parser.toJson(body); //returns a string containing the JSON structure by
            //console.log(JSON.stringify(json, undefined, 2));
            //console.log('Request: ');
            //console.log(params);
        }

        var req = https.request(params);

        req.write(body);
        req.on('error', function(e) {
            return callback(e, null);
        });
        req.on('response', function(res) {
            var responseData = '';

            res.on('data', function(data) {
                responseData += data.toString();
            });

            res.on('end', function() {
                try {
                    var jsonString = parser.toJson(responseData);
                    var json = JSON.parse(jsonString);
                } catch (e) {
                    return callback('Invalid JSON', null);
                }

                return callback(null, json);
            });
        });
        req.end();
    }


    function buildAddress(data) {
        var address = {
            "StreetLines": data.address_line_1 + " " + data.address_line_2 || '',
            "City": data.city || '',
            "StateOrProvinceCode": data.state_code || '',
            "PostalCode": data.postal_code || '',
            "CountryCode": data.country_code || ''
        };

        return address;
    }

    function buildShipmentAttributes(data) {
        var attributes = {
            'Dimensions': {
                'Length': data.dimensions.length,
                'Width': data.dimensions.width,
                'Height': data.dimensions.height,
                'Units': "IN"
            },
            'Weight': {
                'Units': "LB",
                'Value': data.weight
            }
        }
        return attributes;
    }

    function buildPaymentInformation(data, options) {
        var payment = {
            "PaymentType": "SENDER",
            "Payor": {
                "ResponsibleParty": {
                    "AccountNumber": data.shipper.shipper_number || '',
                    "Contact": {
                        "ContactId": data.shipper.company_name || '',
                        "PersonName": data.shipper.company_name || '',
                    }
                }
            }
        };

        return payment;
    }

    function buildLabelSpecification(data, options) {
        var label = {
            "LabelFormatType": "COMMON2D",
            "ImageType": "PNG",
            "LabelStockType": "PAPER_4X6"
        };

        return label;
    }



    function buildShipmentRate(data) {
        data.shipper = data.shipper || {address: {}};
        data.ship_to = data.ship_to || {address: {}};
        data.packages = data.packages || [
            {}
        ];
        data.currency = data.currency || $scope.options.currency;
      }
}
module.exports = FedEx;
