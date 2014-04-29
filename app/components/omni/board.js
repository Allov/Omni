define(["virality"], function(v) {
    var options = {

    };

    var _hexBoard;

    var board = function(settings, hexBoard) {
        var self = this;
        _hexBoard = hexBoard;
    
        self.name = "hexBoard";
        self.config = function(settings) {
            for(var i in settings) {
                options[i] = settings[i];
            }
        };

        v.getCanvas().addEventListener("click", function(evt) {
            var pos = getMousePos(v.getCanvas(), evt);
            _hexBoard.select(pos);
        });

        v.getCanvas().addEventListener("mousemove", function(evt) {
        });
    };

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    return board;
});