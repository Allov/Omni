define(["virality"], function(v) {
    var options = {
        w: 10,
        h: 10
    };

    var _hexBoard,
        _grid = [];

    var board = function(settings, hexBoard) {
        var self = this;
        _hexBoard = hexBoard;
    
        self.name = "hexBoard";

        self.init = function() {
            initBoard(options.w, options.h);

            if (self.loaded) {
                self.loaded(_grid);
            }
        }

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

        self.config(settings);
    };

    function initBoard(w, h) {
        for(var i = 0; i < w; i++) {
            for(var j = 0; j < h; j++) {
                var r = j;
                var q = i - Math.floor(j / 2);

                if (!_grid[q]) {
                    _grid[q] = [];
                }

                _grid[q][r] = {
                    q: q,
                    r: r,
                    type: Math.floor((Math.random() * 4) + 1),
                    selected: false
                };
            }
        }
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    
    return board;
});