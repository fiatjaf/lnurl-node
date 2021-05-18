const _ = require('underscore');
const generatePaymentRequest = require('../generatePaymentRequest');
const generateRandomByteString = require('../generateRandomByteString');
const LightningBackend = require('../LightningBackend');

class Backend extends LightningBackend {

	constructor(options) {
		super('dummy', options, {
			defaultOptions: {
				alwaysFail: false,
				nodeUri: 'PUBKEY@127.0.0.1:9735',
			},
			requiredOptions: [],
		});
		this.requestCounters = {};
	}

	resetRequestCounters() {
		return this.requestCounters = {};
	}

	getRequestCount(method) {
		return this.requestCounters[method] || 0;
	}

	incrementRequestCounter(method) {
		if (_.isUndefined(this.requestCounters[method])) {
			this.requestCounters[method] = 0;
		}
		this.requestCounters[method]++;
	}

	getNodeUri() {
		this.incrementRequestCounter('getNodeUri');
		if (this.options.alwaysFail) {
			return Promise.reject(new Error('getNodeUri failure'));
		}
		return Promise.resolve(this.options.nodeUri);
	}

	openChannel(remoteId, localAmt, pushAmt, makePrivate) {
		this.incrementRequestCounter('openChannel');
		if (this.options.alwaysFail) {
			return Promise.reject(new Error('openChannel failure'));
		}
		return Promise.resolve();
	}

	payInvoice(invoice) {
		this.incrementRequestCounter('payInvoice');
		if (this.options.alwaysFail) {
			return Promise.reject(new Error('payInvoice failure'));
		}
		const preimage = generateRandomByteString();
		return Promise.resolve(preimage);
	}

	addInvoice(amount, extra) {
		this.incrementRequestCounter('addInvoice');
		if (this.options.alwaysFail) {
			return Promise.reject(new Error('addInvoice failure'));
		}
		const invoice = generatePaymentRequest(amount, extra);
		return Promise.resolve(invoice);
	}

	getInvoiceStatus(paymentHash) {
		this.incrementRequestCounter('getInvoiceStatus');
		if (this.options.alwaysFail) {
			return Promise.reject(new Error('getInvoiceStatus failure'));
		}
		const preimage = generateRandomByteString();
		return Promise.resolve({
			preimage,
			settled: true,
		});
	}
}

module.exports = Backend;