var ControlPanel = function () {
    var paused = false;
    return {
        isPaused: function () {
            return paused
        },
        addPauseButton: function () {
            var pauseButton = document.getElementById("pause");
            pauseButton.innerText = "Pause";
            pauseButton.onclick = function () {
                paused = !paused;
                pauseButton.innerText = paused ? "Resume" : "Pause";
            };
        }
    };
};