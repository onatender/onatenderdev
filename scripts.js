function scrollfx() {
    if (!document.getElementsByClassName("navbar-item")[parseInt(window.scrollY / window.innerHeight)].classList.contains('highlight')) {

        for (let element of document.getElementsByClassName("navbar-item")) {
            element.classList.remove('highlight');
        }

        document.getElementsByClassName("navbar-item")[parseInt(window.scrollY / window.innerHeight)].classList.add('highlight');
    }

    if (window.scrollY > 0) {
        document.querySelector('.navbar').classList.add('navbar-scroll');
    }
    else {
        document.querySelector('.navbar').classList.remove('navbar-scroll');
        document.getElementsByClassName("navbar-item")[0].classList.remove('highlight');
    }
}

function listen1() {
    for (let element of document.getElementsByClassName('list-item')) {
        element.addEventListener('click', function () {

            for (let element of document.getElementsByClassName('list-item')) {
                element.classList.remove('list-selected');
            }

            element.classList.add('list-selected');
        })
    }
}


window.addEventListener('scroll', scrollfx);
scrollfx();

function fetchJSONData() {
    return fetch("./certificates.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .catch((error) => console.error("Unable to fetch data:", error));
}


function fillthetable(obj) {
    for (let item of obj["diller"]) {
        var element = document.createElement("div");
        element.innerText = item["name"];
        console.log(item["name"]);
        element.classList.add('list-item');
        document.querySelector(".box-left .tablo").append(element);
    }
}
var obj = null;

function listen2() {
    for (let element of document.querySelectorAll('.box-left .tablo .list-item')) {
        element.addEventListener('click', listele);
    };
}

fetchJSONData()
    .then((data) => {
        obj = data;
        console.log(data);
        fillthetable(data);
        listen1();
        listen2();
    });

const listele = () => {
    const parentElement = document.querySelector('.box-right .tablo');

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }

    for (let element of document.querySelectorAll(".box-left .tablo .list-item")) {
        console.log(element.innerText);
        if (element.classList.contains('list-selected')) {
            console.log(element.innerText);
            for (let item of obj["diller"]) {
                console.log(item);
                if (item["name"] == element.innerText) {
                    for (let certificate of item["certificates"]) {
                        console.log("certificate");
                        let newelement = document.createElement("div");
                        newelement.classList.add("list-item");
                        newelement.innerText = certificate;
                        document.querySelector(".box-right .tablo").append(newelement);
                    }
                }
            }
        }
    }
};
