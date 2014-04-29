define(["virality"], function(v) {
    var hexBuffer,
        hexContext,
        grid = [];

    var options = {
        x: 30,
        y: 30,
        width: 10,
        height: 10,
        size: 20,
        lineColor: "#aaa"
    };

    var hexBoard = function(settings) {
        var self = this;
    
        self.name = "hexBoard";
        self.config = function(settings) {
            for(var i in settings) {
                options[i] = settings[i];
            }
        };

        self.init = function() {
            hexBuffer = document.createElement("canvas");
            hexContext = hexBuffer.getContext("2d");

            var hexHeight = options.size * 2;
            var hexWidth = Math.sqrt(3)/2 * hexHeight;

            hexBuffer.height = hexHeight * options.height + (hexHeight / 2) + 4;
            hexBuffer.width = hexWidth * options.width + (hexWidth / 2) + 4;

            drawHexBoard(hexContext, hexWidth, hexHeight, options.width, options.height);
        }

        self.select = function(position) {
        }

        self.render = function(context, elapsed) {
            context.drawImage(hexBuffer, 0, 0, hexBuffer.width, hexBuffer.height, options.x, options.y, hexBuffer.width, hexBuffer.height);
        };
        
        self.config(settings);
    };

    function drawHexBoard(context, hexWidth, hexHeight, w, h) {
        context.clearRect(0, 0, w, h);
        for(var i = 0; i < w; i++) {
            for(var j = 0; j < h; j++) {
                var x = 1 + (hexWidth / 2) + (i*hexWidth) + (j % 2 * (hexWidth/2));
                var y = 1 + (hexHeight / 2) + j * (0.75 * hexHeight);

                drawHex(context, x, y, options.size);
                context.font = "8pt Courier New";
                context.fillStyle = '#48d';
                context.textAlign = "center";
                context.textBaseline = "middle";
                var r = j; 
                var q = i - Math.floor(j/2);

                if (!grid[q]) {
                    grid[q] = [];
                }

                grid[q][r] = {q: q, r: r, x: x, y: y};

                context.fillText(q + "," + r, x, y);
            }
        }
    }

    function drawHex(context, x, y, size) {
        context.beginPath();
        for(var i = 0; i <= 6; i++) {
            var angle = 2 * Math.PI / 6 * (i + 0.5);
            var x_i = x + size * Math.cos(angle);
            var y_i = y + size * Math.sin(angle);
            if (i == 0) {
                context.moveTo(x_i, y_i);
            } else {
                context.lineTo(x_i, y_i);
            }
        }
        context.strokeStyle = options.lineColor;
        context.lineWidth = 2;
        context.stroke();

        context.fillStyle = "#eee";
        context.fill();

        context.imageSmoothingEnabled = true;
    }

    return hexBoard;
});