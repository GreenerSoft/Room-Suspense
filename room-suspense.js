/*! RoomSuspense v1.0.0 | (c) GreenerSoft | https://roomjs.fr | MIT License */


import {append} from "Room";


export function Suspense({fallback}, ...children) {
	if (!(fallback instanceof Element)) {
		fallback = new Text(fallback || "");
	}
	Promise.all(children).then(r => fallback.replaceWith(append(document.createDocumentFragment(), r))).catch(() => {});
	return fallback;
}
