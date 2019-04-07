//https://jsbin.com/sotelitiqe/edit?html,css,js,output#J:L15

let worldExt = {
    x: 0,
    X: 0,
    y: 0,
    Y: 0,
};

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
    let distY = vExtent.Y - vExtent.y;

    let _x = distX * xPercent * (1 - scale);
    let _y = distY * yPercent * (1 - scale);

    vExtent.scale *= scale;

    vExtent.x += _x;
    vExtent.X = vExtent.x + distX * scale;
    vExtent.y += _y;
    vExtent.Y = vExtent.y + distY * scale;

    console.log('sdf', _x, _y, vExtent.x, vExtent.X);
    img.style.transform = `translate(${vExtent.x}px, ${vExtent.y}px)
                           scale(${vExtent.scale})`;
}

function pointOnImg(x, y) {
    let _x = x - vExtent.x;
    let _y = y - vExtent.y;
    console.log('hi', _x, [vExtent.x, vExtent.X], x);
    if (x > vExtent.x && x < vExtent.X) {
        _x = _x / (vExtent.X - vExtent.x);
        _y = _y / (vExtent.Y - vExtent.y);
        console.log('hi3', _x, vExtent.x, x);
        return {x: _x, y: _y};
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
        let difY = evt.y - pnt.y;
        pnt.x = evt.x;
        pnt.y = evt.y;

        vExtent.x += difX;
        vExtent.X += difX;
        vExtent.y += difY;
        vExtent.Y += difY;
        img.style.transform = `translate(${vExtent.x}px, ${vExtent.y}px)
                           scale(${vExtent.scale})`;
    }
}

cont.addEventListener('mousewheel', function(evt) {
    console.log(evt);

    let pnt = pointOnImg(evt.x - 9, evt.y - 9);

    if (!isNaN(pnt.x)) {
        let dir = evt.wheelDelta > 0 ? 2 : 0.5;
        chngExt(dir, pnt.x, pnt.y);
    }
});

//let pnt = pointOnImg(100,0);
//console.log(pnt)
//chngExt(0.5, pnt.x, 0);
//pnt = pointOnImg(10,0);
//chngExt(0.5, pnt.x, 0);
