let previousScrollY = 0;


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

function sayfayaGit(i) {
    window.scrollTo(0, window.innerHeight * i);
}


// onscrollend = (event) => {
//     let tamkisim = parseInt(window.scrollY / window.innerHeight);
//     let artan = window.scrollY - tamkisim * window.innerHeight;
//     if (artan > window.innerHeight / 2) {
//         sayfayaGit(tamkisim + 1);
//     }
//     else {
//         sayfayaGit(tamkisim);
//     };

// }
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
            element.classList.add('list-item');
            let elementspan = document.createElement('span');
            elementspan.innerText = item["name"];
            let img = document.createElement('img');
            img.src = item["icon"];
            element.append(img);
            element.append(elementspan);
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
            if (element.classList.contains('list-selected')) {
                for (let item of obj["diller"]) {
                    if (item["name"] == element.innerText) {
                        for (let certificate of item["certificates"]) {
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



    function renkDegistir() {

        let i = 0;
        let darken = false;
        setInterval(function () {
            let text = `2px 0px 222px rgb(${i}, ${i}, ${i})`;
            document.querySelector('.resim-container img').style.boxShadow = text;
            if (darken) {
                i--;
            }
            else {
                i++;
            }
            if (i == 166) darken = true;
            if (i == 0) darken = false;
        }, 50);
    }

    function boyutDegistir() {

        let i = 1;
        let largen = true;
        setInterval(function () {
            document.querySelector('.resim-container img').style.scale = `${i}`;
            if (largen) {
                i += 0.0005;
            }
            else {
                i -= 0.0005;
            }
            if (i > 1.1) largen = false;
            if (i < 1) largen = true;
        }, 30);
    }

    renkDegistir();
    boyutDegistir();
