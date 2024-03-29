define(["virality"], function(v) {
    var hexBuffer,
        hexContext,
        hexWidth,
        hexHeight,
        selectedTile = null,
        updateHexes = true,
        grid = [];

    var options = {
        x: 30,
        y: 30,
        w: 10,
        h: 10,
        size: 20,
        lineColor: "#aaa",
        selectedColor: "#333"
    };

    var tiles = {
        1: "#eee",
        2: "#fa8",
        3: "#af8",
        4: "#8af"
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

            hexHeight = options.size * 2;
            hexWidth = Math.sqrt(3)/2 * hexHeight;

            hexBuffer.height = hexHeight * options.h + (hexHeight / 2) + 4;
            hexBuffer.width = hexWidth * options.w + (hexWidth / 2) + 4;

            initHexBoard();

            drawHexBoard(hexContext, options.w, options.h);
        }

        self.setGrid = function(g) {
            grid = g;
        }

        self.select = function(position) {
            for(var q in grid) {
                for(var r in grid[q]) {
                    var tile = grid[q][r];
                    tile.selected = false;
                }
            }
            
            selectedTile = null;

            var tile = getTile(position);
            selectedTile = tile;
            if (tile) {
                tile.selected = true;
                updateHexes = true;
            }
        }

        self.render = function(context, elapsed) {
            drawHexBoard(hexContext, hexBuffer.width, hexBuffer.height);
            context.drawImage(hexBuffer, 0, 0, hexBuffer.width, hexBuffer.height, options.x, options.y, hexBuffer.width, hexBuffer.height);
        };
        
        self.config(settings);
    };

    function getTile(position) {
        var q = (1/3 * Math.sqrt(3) * (position.x - options.x - (hexWidth / 2)) - 1/3 * (position.y - options.y - (hexHeight / 2))) / options.size;
        var r = 2/3 * (position.y - options.y - (hexHeight / 2)) / options.size;

        var x = q;
        var z = r;
        var y = -x-z;

        var cube = hexRound({x: x, y: y, z: z});

        q = cube.x;
        r = cube.z;

        var tile = grid[q][r];
        return tile;
    }

    function initHexBoard() {
        for(var i = 0; i < options.w; i++) {
            for(var j = 0; j < options.h; j++) {
                var x = 1 + (hexWidth / 2) + (i * hexWidth) + (j % 2 * (hexWidth / 2));
                var y = 1 + (hexHeight / 2) + j * (0.75 * hexHeight);

                var tile = getTile({x: x + options.x, y: y + options.y});

                tile.x = x;
                tile.y = y;
            }
        }
    }

    function hexRound(cube) {
        var rx = Math.round(cube.x);
        var ry = Math.round(cube.y);
        var rz = Math.round(cube.z);

        var x_diff = Math.abs(rx - cube.x);
        var y_diff = Math.abs(ry - cube.y);
        var z_diff = Math.abs(rz - cube.z);

        if (x_diff > y_diff && x_diff > z_diff) {
            rx = -ry-rz;
        } else if (y_diff > z_diff) {
            ry = -rx-rz;
        } else {
            rz = -rx-ry;
        }

        return {x: rx, y: ry, z: rz};
    }

    function drawHexBoard(context, w, h) {
        if (!updateHexes) {
            return;
        }
        
        context.clearRect(0, 0, w, h);

        for(var q in grid) {
            for(var r in grid[q]) {
                var tile = grid[q][r];
                
                if (!tile.selected) {
                    drawHex(context, tile, options.size);
                }
            }
        }

        if (selectedTile) {
            drawHex(context, selectedTile, options.size);
        }

        updateHexes = false;
    }

    function drawHex(context, tile, size) {
        context.beginPath();
        for(var i = 0; i <= 6; i++) {
            var angle = 2 * Math.PI / 6 * (i + 0.5);
            var x_i = tile.x + size * Math.cos(angle);
            var y_i = tile.y + size * Math.sin(angle);
            if (i == 0) {
                context.moveTo(x_i, y_i);
            } else {
                context.lineTo(x_i, y_i);
            }
        }
        context.strokeStyle = tile.selected ? options.selectedColor : options.lineColor;
        context.lineWidth = tile.selected ? 4 : 2;
        context.stroke();

        context.fillStyle = tiles[tile.type];
        context.fill();

        context.font = "8pt Courier New";
        context.fillStyle = '#48d';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(tile.q + "," + tile.r, tile.x, tile.y);

        context.imageSmoothingEnabled = true;
    }

    return hexBoard;
});