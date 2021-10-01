//api.nytimes.com/svc/topstories/v2/world.json?api-key=etmZFf8gf2uOGx1N61a5mlY8Hs3aT1UG

let container1st = document.createElement("div");
container1st.setAttribute("class", "container");
document.getElementById("title").appendChild(container1st);
//Date Container
let rowContainer = document.createElement("row");
rowContainer.setAttribute("class", "row");
container1st.appendChild(rowContainer);

let navCol = document.createElement("div");
navCol.setAttribute("class", "col-12");
rowContainer.appendChild(navCol);

let container2st = document.createElement("div");
container2st.setAttribute("class", "container");
navCol.appendChild(container2st);

let spinner = document.createElement("div");
spinner.setAttribute("class", "sk-cube-grid")
spinner.innerHTML = `
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
`
container2st.appendChild(spinner);

let dates = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];
let day = days[dates.getDay()];
let month = months[dates.getMonth()];
let date = dates.getDate();
let years = dates.getFullYear();

//new york times...
let header = document.createElement("div");
header.setAttribute("class", "col-12 col-lg-3 text-center font-weight-bold headerDate");
header.innerHTML = day + " " + month + " " + date + " " + years;
rowContainer.appendChild(header);

let navbar = document.createElement("nav");
navbar.setAttribute("class", "navbar navbar-expand-lg navbar-light bg-light")
container1st.appendChild(navbar);

//button
let navbutton = document.createElement("button");
navbutton.setAttribute("type", "button");
navbutton.setAttribute("class", "navbar-toggler");
navbutton.setAttribute("data-bs-toggle", "collapse");
navbutton.setAttribute("data-bs-target", "#navbarSupportedContent");
navbutton.setAttribute("aria-controls", "navbarSupportedContent");
navbutton.setAttribute("aria-expanded", "false");
navbutton.setAttribute("aria-label", "Toggle navigation");
navbar.appendChild(navbutton);

let navbarToggler = document.createElement("span");
navbarToggler.setAttribute("class", "navbar-toggler-icon");
navbutton.appendChild(navbarToggler);
//button anchor..
let anchorButton = document.createElement("a");
anchorButton.setAttribute("class", "navbar-brand titleNav");
anchorButton.innerText = "New York Times";
navbar.appendChild(anchorButton);
// navbar collapse..
let collapseNavbar = document.createElement("div");
collapseNavbar.setAttribute("class", " collapse navbar-collapse");
collapseNavbar.setAttribute("id", "navbarSupportedContent");
navbar.appendChild(collapseNavbar);
//ulNav..
let navbarUl = document.createElement("ul");
navbarUl.setAttribute("class", "navbar-nav");
collapseNavbar.appendChild(navbarUl);

//li nav..
navbarUl.innerHTML = `<li class="nav-item"><a class="nav-link text-uppercase active"  href="#" id="home">home</a></li>
<li class="nav-item"><a class="nav-link text-uppercase" href="#" id="world">world</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="politics">politics</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="magazine">magazine</a></li>
<li class="nav-item"><a class="nav-link text-uppercase" href="#"  id="technology">technology</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="science">science</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="health">health</a></li>
<li class="nav-item"><a class="nav-link text-uppercase" href="#"  id="sports">sports</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="arts">arts</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="fashion">fashion</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="food">food</a></li>
<li class="nav-item"><a class="nav-link text-uppercase"  href="#" id="travel">travel</a></li>`


let container3rd = document.createElement("div");
container3rd.setAttribute("class", "container");
document.getElementById("title").appendChild(container3rd);

let container3rd_dow = document.createElement("div");
container3rd_dow.setAttribute("class", "col-12");
container3rd.appendChild(container3rd_dow);

let navLink = document.querySelectorAll(".nav-link");
apiCalls("home");

navLink.forEach((value) => {
    value.addEventListener('click', function() {
        collapseNavbar.setAttribute("class", "collapse navbar-collapse");
        let newsContainer = document.querySelectorAll(".card");
        newsContainer.forEach(function(e) {
            e.remove();
            // card.classList.add("hidden");
        });
        apiCalls(value.innerHTML);
    })
})

// const arr = Array.from(data);
// arr.forEach(function(valueTitle) {
//     valueTitle.remove();
// });


async function apiCalls(valueTitle) {
    let url = `https://api.nytimes.com/svc/topstories/v2/${valueTitle}.json?api-key=zdRRHgR00x4dWGVHHNxRxIGwTCCRbmbl`
    spinner.style.display = "block"
    fetch(url)
        .then((data) => {
            spinner.style.display = "none"
            return data.json();
        })
        .then((data) => {
            console.log(data);
            for (let i = 0; i < data.results.length; i++) {

                let card = document.createElement("div");
                card.setAttribute("class", "card");
                container3rd_dow.appendChild(card);

                let cardRow = document.createElement("row");
                cardRow.setAttribute("class", "row");
                card.appendChild(cardRow);

                let cardCol = document.createElement("div");
                cardCol.setAttribute("class", "col-md-8 col-12 newscard ");
                cardRow.appendChild(cardCol);

                let card_body = document.createElement("div");
                card_body.setAttribute("class", " container HomeContent")
                cardCol.appendChild(card_body);
                //
                let mainHead = document.createElement("h4");
                mainHead.setAttribute("class", "mainHead text-uppercase");
                mainHead.innerText = data.section;
                card_body.appendChild(mainHead);

                let subhead = document.createElement("h6");
                subhead.setAttribute("class", "subHead");
                subhead.innerHTML = data.results[i].title
                card_body.appendChild(subhead);

                let dateHead = document.createElement("h5");
                dateHead.setAttribute("class", "dateHead");
                card_body.appendChild(dateHead);

                let pera = document.createElement("p");
                pera.setAttribute("class", "pera");
                pera.innerHTML = data.results[i].abstract;
                card_body.appendChild(pera);

                let linkContinue = document.createElement("a");
                linkContinue.setAttribute("class", "linkContinue")
                linkContinue.setAttribute("target", "_blank")
                linkContinue.innerText = "Continue Reading";
                linkContinue.setAttribute("href", data.results[i].url);
                card_body.appendChild(linkContinue);

                let cardCol2 = document.createElement("div");
                cardCol2.setAttribute("class", "col-md-4 col-12");

                let img = document.createElement("img");
                img.setAttribute("class", "img-thumbnail");
                img.setAttribute("src", data.results[i].multimedia ? data.results[i].multimedia[0].url : "noImage");
                img.setAttribute("alt", "No Images");
                cardCol2.appendChild(img);

                cardRow.appendChild(cardCol2);
                (function() {
                    const dates = new Date();
                    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
                        "September", "October", "November", "December"
                    ];
                    let date = document.querySelector(".dateHead");
                    date.setAttribute("class", "text-bold  text-success")
                    date.innerText = months[dates.getMonth()] + " " + dates.getDate();
                    let get = new Date(data.results[0].published_date);
                    let newdate = get.toDateString()
                })();
            }
        })
        .catch((err) => {
            console.error(err);

        })
};