/*! RoomSuspense-nm v1.0.0 | (c) GreenerSoft | https://roomjs.fr | MIT License */


var RoomSuspense = (() => {
	"use strict";

	const {append} = Room;

	function Suspense({fallback}, ...children) {
		if (!(fallback instanceof Element)) {
			fallback = new Text(fallback || "");
		}	
		Promise.all(children).then(r => fallback.replaceWith(append(document.createDocumentFragment(), r))).catch(() => {});
		return fallback;
	}

	return {Suspense};

})();
