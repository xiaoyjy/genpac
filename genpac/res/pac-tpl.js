/**
 * genpac __VERSION__ https://github.com/xiaoyjy/genpac
 * Generated: __GENERATED__
 * GFWList Last-Modified: __MODIFIED__
 * GFWList From: __GFWLIST_FROM__
 */

var proxy = '__PROXY__';
var rules = __RULES__;

var lastRule = '';

var regExpMatch = function(url, pattern) {
	try {
		return new RegExp(pattern).test(url); 
	} catch(ex) {
		return false; 
	}
};

var testURL = function(url, packs) {
	for (var i = 0; i < packs.length; i++) {
		for (var j = 0; j < packs[i].length; j++) {
			lastRule = packs[i][j];
			if ( (i % 2 == 0 && regExpMatch(url, lastRule)) 
					|| (i % 2 != 0 && shExpMatch(url, lastRule)))
				return (i <= 1) ? 'DIRECT' : proxy;
		}
	}
	lastRule = '';
};

var testDomain = function (target, domains, cnRootIncluded) {
	var idxA = target.lastIndexOf('.');
	var idxB = target.lastIndexOf('.', idxA - 1);
	var hasOwnProperty = Object.hasOwnProperty;
	var suffix = cnRootIncluded ? target.substring(idxA + 1) : '';
	if (suffix === 'cn') {
		return true;
	}
	while (true) {
		if (idxB === -1) {
			if (hasOwnProperty.call(domains, target)) {
				return true;
			} else {
				return false;
			}
		}
		suffix = target.substring(idxB + 1);
		if (hasOwnProperty.call(domains, suffix)) {
			return true;
		}
		idxB = target.lastIndexOf('.', idxB - 1);
	}
}

function FindProxyForURL(url, host) {
	for (var i = 0; i < rules.length; i++) {
		var ret = testURL(url, rules[i]);
		if (ret !== undefined)
			return ret;
	}

	var taobaoDomains = {
		'tbsite.com' : 1,
	};

	var fuckITDomains = 
	{
		'pan.baidu.com' : 1,
		'vdisk.weibo.com' : 1,
	}

	if (testDomain(host, taobaoDomains)) {
		return 'PROXY proxy.simba.tbsite.net:8000';
	}

	if (testDomain(host, fuckITDomains)) {
		return 'SOCKS5 127.0.0.1:8965; SOCKS 127.0.0.1:8965; DIRECT';
	}

	return 'DIRECT';
}
