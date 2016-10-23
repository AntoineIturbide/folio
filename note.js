// JavaScript source code

window.addEventListener("load", RenderAllNotes, false);

var canvasBuffer1 = document.createElement('canvas');
var canvasBuffer2 = document.createElement('canvas');

function RenderAllNotes() {
    var notes = document.querySelectorAll('[class=projectnote_container]');
    var note;
    for (var i = 0; i < notes.length; ++i) {
        // Select note
        note = notes[i];
        // Debug
        // Bind rendering
        addResizeListener(note, function () { RenderNote(note); });
        RenderNote(note);
    }
}

function RenderNote(note) {
    // Recalculate canvas buffers size
    canvasBuffer1.width = note.clientWidth;
    canvasBuffer1.height = note.clientHeight;
    canvasBuffer2.width = note.clientWidth;
    canvasBuffer2.height = note.clientHeight;
    // Contexts
    var context1 = canvasBuffer1.getContext('2d');
    var context2 = canvasBuffer2.getContext('2d');

    // Clear buffers
    context1.clearRect(0, 0, canvasBuffer1.width, canvasBuffer1.height);
    context2.clearRect(0, 0, canvasBuffer2.width, canvasBuffer2.height);

    // Render note
    var x = 32;
    var y = 16;
    var w = canvasBuffer1.width - x - 16;
    var h = canvasBuffer1.height - y - 16;
    context1.fillStyle = 'rgba(255,255,255,1)';
    context1.fillRect(x, y, w, h);

    context1.strokeStyle = 'rgba(255,255,255,1)';
    context1.lineWidth = 22;
    context1.beginPath();
    context1.moveTo(24, 40); context1.lineTo(40, 56);
    context1.stroke();

    context2.shadowColor = "rgba(0,0,0,0.25)";
    context2.shadowBlur = 2;
    context2.shadowOffsetY = 4;

    context2.globalAlpha = 0.9
    context2.drawImage(canvasBuffer1, 0, 0);

    var notedata = canvasBuffer2.toDataURL();
    note.style.backgroundImage = 'url(' + notedata + ')';
}

// Cross-Browser, Event-based, Element Resize Detection
// http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
(function () {
    var attachEvent = document.attachEvent;
    var isIE = navigator.userAgent.match(/Trident/);
    console.log(isIE);
    var requestFrame = (function () {
        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
            function (fn) { return window.setTimeout(fn, 20); };
        return function (fn) { return raf(fn); };
    })();

    var cancelFrame = (function () {
        var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
               window.clearTimeout;
        return function (id) { return cancel(id); };
    })();

    function resizeListener(e) {
        var win = e.target || e.srcElement;
        if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
        win.__resizeRAF__ = requestFrame(function () {
            var trigger = win.__resizeTrigger__;
            trigger.__resizeListeners__.forEach(function (fn) {
                fn.call(trigger, e);
            });
        });
    }

    function objectLoad(e) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', resizeListener);
    }

    window.addResizeListener = function (element, fn) {
        if (!element.__resizeListeners__) {
            element.__resizeListeners__ = [];
            if (attachEvent) {
                element.__resizeTrigger__ = element;
                element.attachEvent('onresize', resizeListener);
            }
            else {
                if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
                var obj = element.__resizeTrigger__ = document.createElement('object');
                obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
                obj.__resizeElement__ = element;
                obj.onload = objectLoad;
                obj.type = 'text/html';
                if (isIE) element.appendChild(obj);
                obj.data = 'about:blank';
                if (!isIE) element.appendChild(obj);
            }
        }
        element.__resizeListeners__.push(fn);
    };

    window.removeResizeListener = function (element, fn) {
        element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
        if (!element.__resizeListeners__.length) {
            if (attachEvent) element.detachEvent('onresize', resizeListener);
            else {
                element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
                element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
            }
        }
    }
})();