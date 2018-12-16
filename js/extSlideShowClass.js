let obj = [
    {
        "title": "Image 1",
        "imgPath": "./img/image-1.jpg",
    },
    {
        "title": "Image 2",
        "imgPath": "./img/image-2.jpg",
    },
    {
        "title": "Image 3",
        "imgPath": "./img/image-3.jpg",
    }
]

"use strict"
class extSlideShow  {
    constructor(target,obj){
        this.target = target;
        this.obj = obj;
        this.current = 0;
        this.userInterface();
    }

    userInterface(){
        let element = document.querySelector(this.target);

        // Image Content
        let imgEl = document.createElement("img");
        imgEl.setAttribute("id", "view");
        let standard = this.obj[this.current].images.standard_resolution;
        console.log(standard);
        imgEl.setAttribute("src", standard.url);
        element.appendChild(imgEl);


        //Button
        let leftBtn = document.createElement("button");
        leftBtn.setAttribute("id", "leftBtn");
        leftBtn.innerHTML = '&#x2039;';

        let rightBtn = document.createElement("button");
        rightBtn.setAttribute("id", "rightBtn");
        rightBtn.innerHTML = '&#x203a;';

        element.appendChild(leftBtn);
        element.appendChild(rightBtn);


        // ES6
        rightBtn.addEventListener('click', () => this.nextClick());
        leftBtn.addEventListener('click', () => this.prevClick());
    }

    renderImage(){
        let element = document.getElementById("view");
        let standard = this.obj[this.current].images.standard_resolution;
        element.setAttribute("src", standard.url);
    }

    nextClick(){
        if(this.current < this.obj.length -1){
            this.current++;
        }else {
            this.current = 0;
        }
        this.renderImage(this.current);
    }

    prevClick() {
        if (this.current == 0) {
            this.current = this.obj.length -1;
        } else {
            this.current--;
        }
        this.renderImage(this.current);
    }
}



let request = new XMLHttpRequest();
request.open('GET','https://api.instagram.com/v1/users/self/media/recent/?access_token=');
request.responseType = 'json';
request.onload = () => {
    let status = request.status;
    if (status === 200) {
        let data = request.response.data;
        let slide = new extSlideShow("#extSlideShow",data);
    } else {
        console.log(status);
        return;
    }
};
request.send();