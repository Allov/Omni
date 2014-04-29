define(["virality", "components/heartbeat", "components/fps", "components/hexboard", "components/omni/board"],
    function(v, h, FpsCounter, Hexboard, Board) {
    
        // Starting Virality.
        v.config({ debug: true })
         .init(640, 480)
         .background("#fff")
         .start();
        
        // Creating a new entity that is also a component.
        var fps = new FpsCounter({color: "#000"});
        v.components(fps);

        var hexboard = new Hexboard({
            x: 40, 
            y: 40,
            size: 25
        });

        var board = new Board({}, hexboard);

        v.components(hexboard);
        v.components(board);
         
        // Handles pause and unpause.
        document.getElementById("pause")
                .onclick = function() {
                    v.pause();
                    if (v.isPaused) {
                        this.innerHTML = "Unpaused";
                    } else {    
                        this.innerHTML = "Pause";
                    }
                };
    
    });