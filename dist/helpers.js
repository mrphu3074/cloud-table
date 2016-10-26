"use strict";
exports.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.scrollbarSize = function (recalc) {
    var size;
    if (!size || recalc) {
        if (exports.canUseDOM) {
            var scrollDiv = document.createElement('div');
            scrollDiv.style.position = 'absolute';
            scrollDiv.style.top = '-9999px';
            scrollDiv.style.width = '50px';
            scrollDiv.style.height = '50px';
            scrollDiv.style.overflow = 'scroll';
            document.body.appendChild(scrollDiv);
            size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
    }
    return size;
};
