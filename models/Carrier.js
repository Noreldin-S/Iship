
const shipper = require('./shipper');
const {
  guessCarrier
} = shipper;
const {map} = require('underscore');

var CarrierFactory = (function() {
  let UPS = undefined;
  let FEDEX = undefined;
  CarrierFactory = class CarrierFactory {
    static initClass() {
      UPS = 0;
      FEDEX = 2;
  
      CARRIER = {
        0: "UPS",
        2: "FedEx",
      };
  
      CARRIER_URL = {
        "UPS": "http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=",
        "FedEx": "https://www.fedex.com/apps/fedextrack/?tracknumbers=",
      };
  
      UPS_CLIENT = shipper.upsClient;
      FEDEX_CLIENT = shipper.fedexClient;
  
      CARRIER_CLIENT = {
        'ups': UPS_CLIENT,
        'fedex': FEDEX_CLIENT,
      };
  
      CARRIER_ID = {
        'ups': UPS,
        'fedex': FEDEX,
      };
    }

    constructor() {
      this.CARRIER_BY_ID = {};
      this.CARRIER_BY_ID[UPS] = 'ups';
      this.CARRIER_BY_ID[FEDEX] = 'fedex';
    }

    getCarrier(carrier) {
      let client;
      return client = CARRIER_CLIENT[carrier];
    }

    getCarrierUrl(carrier_name, tracking_number) {
      const url = CARRIER_URL[carrier_name];
      if (url == null) { return null; }
      return `${url}${tracking_number}`;
    }

    getCarrierList() {
      return map(this.CARRIER_BY_ID, (name, id) => name);
    }

    getCarrierName(id) {
      let carrier;
      return carrier = this.CARRIER_BY_ID[id];
    }

    detectCarrier(trk) {
      const carriers = guessCarrier(trk);
      if (!(carriers != null ? carriers.length : undefined)) { return; }
      return map(carriers, c => CARRIER_ID[c]);
    }

    getCarrierId(carrier) {
      return CARRIER_ID[carrier];
    }

    getCarrierStringByName(name) {
      return this.getCarrierString(this.getCarrierId(name));
    }

    getCarrierString(id) {
      let str = CARRIER[id];
      return str != null ? str : (str = 'Unknown');
    }

    getRequestOptions(params) {
      if (params.carrier !== 'amazon') { return {trackingNumber: params.trackingNumber}; }
      const amazonFields = params.trackingNumber.split(':');
      const orderID = amazonFields[0];
      const orderingShipmentId = amazonFields[1];
      return {orderID, orderingShipmentId};
    }
  };
  CarrierFactory.initClass();
  return CarrierFactory;
})();


module.exports = {CarrierFactory};