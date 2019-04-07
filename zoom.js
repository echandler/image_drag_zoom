

//https://jsbin.com/sotelitiqe/edit?html,css,js,output#J:L15


let vExtent = {
    x: 0,
    X: 660,
    y: 0,
    Y: 120,
    scale: 1,
};

let img = document.getElementById('img');
let cont = document.getElementById('cont');
img.style.transformOrigin = 'top left';

function chngExt(scale, xPercent, yPercent) {
    let distX = vExtent.X - vExtent.x;
    let _x = distX * xPercent * (1 - scale);
    let _y = (vExtent.Y - vExtent.y) * yPercent * scale;

    vExtent.scale *= scale;

    vExtent.x += _x;
    vExtent.X = vExtent.x + distX * scale;

    console.log('sdf', _x, _y, vExtent.x, vExtent.X);
    img.style.transform = `translate(${vExtent.x}px, ${_y}px)
                                   scale(${vExtent.scale})`;
}

function pointOnImg(x, y) {
    let _x = x - vExtent.x;
    let _y = 0;
    console.log('hi', _x, [vExtent.x, vExtent.X], x);
    if (x > vExtent.x && x < vExtent.X) {
        _x = _x / (vExtent.X - vExtent.x);
        console.log('hi3', _x, vExtent.x, x);
        return {x: _x, y: 0};
    }
    return {x: NaN, y: NaN};
}

cont.addEventListener('mousedown', mousedown);

function mousedown(evt) {
    let pnt = {x: evt.x, y: evt.y};
    evt.preventDefault();

    if (evt.x > vExtent.x && evt.x < vExtent.X) {
        cont.removeEventListener('mousedown', mousedown);
        document.body.addEventListener('mousemove', mousemove);
        document.body.addEventListener('mouseup', mouseup);
    }

    function mouseup(evt) {
        cont.addEventListener('mousedown', mousedown);
        document.body.removeEventListener('mousemove', mousemove);
        document.body.removeEventListener('mouseup', mouseup);
    }

    function mousemove(evt) {
        let difX = evt.x - pnt.x;
        pnt.x = evt.x;
        vExtent.x += difX;
        vExtent.X += difX;
        img.style.transform = `translate(${vExtent.x}px, 0px)`;
    }
}

cont.addEventListener('mousewheel', function(evt) {
    let pnt = pointOnImg(evt.x - 9, 0);
    if (!isNaN(pnt.x)) {
        chngExt(2, pnt.x, 0);
    }
});
