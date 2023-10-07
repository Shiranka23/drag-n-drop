let currentDroppable = null;
// item = document.getElementById('item');
item.onmousedown = function (event) {

    let shiftX = event.clientX - item.getBoundingClientRect().left;
    let shiftY = event.clientY - item.getBoundingClientRect().top;

    item.style.position = 'absolute';
    item.style.zIndex = 200;
    document.body.append(item)

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
        item.style.left = pageX - shiftX + 'px';
        item.style.top = pageY - shiftY + 'px';
    }
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        item.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        // console.log(elemBelow);
        item.hidden = false;

        if (!elemBelow) return;

        let droppableBelow = elemBelow.closest('.droppable')
        if (currentDroppable != droppableBelow) {
            if (currentDroppable) {
                leaveDroppable(droppableBelow)
            }
            currentDroppable = droppableBelow;
            if (currentDroppable) {
                enterDroppable(currentDroppable)
            }
        }
    }
    document.addEventListener('mousemove', onMouseMove);
    item.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        item.onmousedown = null;
    };

};

function enterDroppable(elem) {
    elem.style.background = 'black';
}
function leaveDroppable(elem) {
    elem.style.background = '';
}
item.ondragstart = function () {
    return false;
};