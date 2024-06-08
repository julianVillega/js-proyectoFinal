const body = document.getElementsByTagName("body")[0];

export function build_base_html (){
    //building the header.
    build_header();
    build_map_div();
}

function build_header(){
    //building the header.    
    const header = document.createElement("header");
    header.classList.add("header");
    body.appendChild(header);

    const header__title = document.createElement("h1");
    header__title.innerText = "PubliPrecios"
    header__title.classList.add("header__title");
    header.appendChild(header__title);
}

function build_map_div(){
    const map = document.createElement("div");
    map.classList.add("map");
    map.id = 'map';
    body.appendChild(map);
}

