"use strict";
const container = Array.from(document.getElementsByClassName("toolbar-container"));
const toolbarToggle = Array.from(document.getElementsByClassName("toolbar-item"));
const buildItems = Array.from(document.getElementsByClassName("build-menu-item"));
const buildMenu = document.getElementById("build-menu");
const buildList = new Map([
    ["transport", document.getElementById("transport")],
    ["extraction", document.getElementById("extraction")],
]);
var scrollFactor = 0;
container.forEach((cont) => {
    cont.addEventListener("wheel", (e) => {
        if (!(scrollFactor - (e.deltaY || e.deltaX) >= 0) &&
            !(scrollFactor - (e.deltaY || e.deltaX) <= (cont.scrollWidth - cont.offsetWidth) * -1)) {
            console.log(e.deltaY, e.deltaX);
            scrollFactor -= e.deltaY || e.deltaX;
        }
        else if (scrollFactor - (e.deltaY || e.deltaX) >= 0)
            scrollFactor = 0;
        else
            scrollFactor = (cont.scrollWidth - cont.offsetWidth) * -1;
        cont.style.setProperty("--toolbar-item-scroll", `${scrollFactor}px`);
    });
});
function toggleBuildList(toggle) {
    if (toggle.classList.contains("toggle-active")) {
        toggle.classList.remove("toggle-active");
        buildMenu.style.display = "none";
    }
    else {
        toolbarToggle.forEach((elem) => {
            elem.classList.remove("toggle-active");
        });
        buildList.forEach((elem) => {
            elem.style.display = "none";
        });
        menuInfo.innerText = toggle.dataset.menu[0].toUpperCase() + toggle.dataset.menu.slice(1);
        menuInfo.style.setProperty("--info-icon", `url(/graphics/icons/${toggle.dataset.menu}.svg)`);
        buildList.get(toggle.dataset.menu).style.display = "flex";
        toggle.classList.add("toggle-active");
        buildMenu.style.display = "block";
    }
}
const menuInfo = document.getElementById("build-menu-info");
toolbarToggle.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
        toggleBuildList(toggle);
    });
});
const cursorIcon = document.getElementById("cursor-icon");
function cursorIdleMode() {
    console.log("Cursor clicked, idling");
}
var cursorStatus = "idle";
var cursorMode = cursorIdleMode;
cursor.addEventListener("click", (e) => {
    cursorMode();
});
buildItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        cursorStatus = "build";
        var buildingSize = {
            x: gameData.buildings[item.dataset.type.split(".")[0]][item.dataset.type.split(".")[1]].size[0],
            y: gameData.buildings[item.dataset.type.split(".")[0]][item.dataset.type.split(".")[1]].size[1]
        };
        var offset = {
            x: buildingSize.x > 1 ? Math.floor(buildingSize.x / 2) : 0,
            y: buildingSize.x > 1 ? Math.floor(buildingSize.y / 2) : 0
        };
        cursorIcon.innerHTML = "";
        cursorIcon.style.width = buildingSize.x * gridSize + "px";
        cursorIcon.style.height = buildingSize.y * gridSize + "px";
        cursorIcon.style.transform = `translate(-${offset.x * gridSize}px, -${offset.y * gridSize}px)`;
        cursorIcon.appendChild(new Texture(item.dataset.type + ".active").element);
        cursorMode = () => {
            new Building(item.dataset.type, new Coordinate({
                tile: playerCoords.x.tile,
                grid: playerCoords.x.grid - offset.x
            }, {
                tile: playerCoords.y.tile,
                grid: playerCoords.y.grid - offset.y
            }));
        };
    });
});
//# sourceMappingURL=hud.js.map