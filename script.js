const playerCardTemp=document.querySelector("[data-player-temp]");
const playerCards=document.querySelector("[data-player-cards]");
// const searchInput=document.querySelector("[data-search]");

let players=[];

// searchInput.addEventListener("input",(event)=>{
//     const searchValue=event.target.value;
//     console.log(players);
// })

function loadPlayers()
{
    fetch('https://raw.githubusercontent.com/cse204-2023/10-final-project-hvnguyen4/main/data.json')
        .then(response => response.json())
        .then(data => {
            players=data.map(player => {
                // const card=playerCardTemp.content.cloneNode(true).children[0];
                // const name=card.querySelector("[data-name]")

                // name.textContent=
                console.log(player);
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

loadPlayers();

function playerByID(ID)
{
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            let something=(JSON.parse(this.responseText)).response;
            console.log(something);
        }
    });

    xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?id='+ID);
    xhr.setRequestHeader('content-type', 'application/octet-stream');
    xhr.setRequestHeader('X-RapidAPI-Key', 'f5513e7d85msh4a88fc5c9f1ed74p1c6ca4jsn3faaeefc49c9');
    xhr.setRequestHeader('X-RapidAPI-Host', 'api-nba-v1.p.rapidapi.com');

    xhr.send(data);
}

function getPlayerImage(name)
{
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=500`;

    fetch(`https://cors-anywhere.herokuapp.com/${apiUrl}`)
    .then(response => response.json())
    .then(data => {
        // Extract the image URL from the API response
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const imageUrl = pages[pageId].thumbnail.source;

        // Use the image URL as needed (e.g., to display the image on a webpage)
        console.log(imageUrl);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

