//https://jsbin.com/cazuzad/3/edit?html,css,js,output

class ImgZoom {
    constructor(cont, img) {
        this.contData = {
            container: cont,
        };

        this.imgData = {
            img: img,
            scale: 1,
        };

        this.resetImgData();
        this.setContainerData();

        img.style.transformOrigin = 'top left';

        img.addEventListener('mousewheel', this);
        img.addEventListener('mousedown', this);
    }

    handleEvent(evt) {
        let type = evt.type;

        if (type === 'mousewheel') {
            this.mousewheel(evt);
        } else if (type === 'mousedown') {
            this.mousedown(evt);
        } else if (type === 'mouseup') {
            this.mouseup(evt);
        } else if (type === 'mousemove') {
            this.drag(evt);
        }
    }

    resetImgData() {
        let img = this.imgData.img;

        img.style.transform = '';

        this.imgData.x = 0;
        this.imgData.X = img.offsetWidth;
        this.imgData.y = 0;
        this.imgData.Y = img.offsetHeight;
    }

    setContainerData() {
        let cont = this.contData.container;
        let bbox = cont.getBoundingClientRect();

        this.contData.x = bbox.x;
        this.contData.X = bbox.x + bbox.width;
        this.contData.y = bbox.y;
        this.contData.Y = bbox.y + bbox.height;
    }

    zoom(scale, xPercent, yPercent) {
        let imgData = this.imgData;
        let img = imgData.img;
        let distX = imgData.X - imgData.x;
        let distY = imgData.Y - imgData.y;

        let _x = distX * xPercent * (1 - scale);
        let _y = distY * yPercent * (1 - scale);

        imgData.scale *= scale;

        imgData.x += _x;
        imgData.X = imgData.x + distX * scale;
        imgData.y += _y;
        imgData.Y = imgData.y + distY * scale;

        img.style.transition = '150ms transform ease';

        this.updateImgTransform();
    }

    mousedown(evt) {
        this.pnt = {x: evt.x, y: evt.y};

        evt.preventDefault();

        this.imgData.img.style.transition = '';

        document.body.addEventListener('mousemove', this);
        document.body.addEventListener('mouseup', this);
    }

    mouseup(evt) {
        document.body.removeEventListener('mousemove', this);
        document.body.removeEventListener('mouseup', this);
    }

    drag(evt) {
        let imgData = this.imgData;
        let difX = evt.x - this.pnt.x;
        let difY = evt.y - this.pnt.y;
        let img = imgData.img;

        this.pnt.x = evt.x;
        this.pnt.y = evt.y;

        imgData.x += difX;
        imgData.X += difX;
        imgData.y += difY;
        imgData.Y += difY;

        this.updateImgTransform();
    }

    updateImgTransform() {
        let imgData = this.imgData;
        imgData.img.style.transform = `translate(${imgData.x}px, ${imgData.y}px)
                                       scale(${imgData.scale})`;
    }

    pointPercentOnImg(x, y) {
        let contData = this.contData;
        let imgData = this.imgData;
        let tx = imgData.x + contData.x;
        let ty = imgData.y + contData.y;

        let _x = x - tx;
        let _y = y - ty;

        _x = _x / (imgData.X - imgData.x);
        _y = _y / (imgData.Y - imgData.y);

        return {x: _x, y: _y};
    }

    mousewheel(evt) {
        let dir = evt.wheelDelta > 0 ? 2 : 0.5;
        let pnt = this.pointPercentOnImg(evt.x, evt.y);
        this.zoom(dir, pnt.x, pnt.y);
    }
}




