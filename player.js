const searchParams=new URLSearchParams(window.location.search);
const playerID=searchParams.get('id');
let playerInfo;
let playerUrl;

// Function that retrieves information about NBA Player
function playerByID()
{
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            playerInfo=(JSON.parse(this.responseText)).response[0];
            let playerName=playerInfo.firstname+" "+playerInfo.lastname;

            // Get image than display image and information of player
            // If player image is not found on wikipedia...a blank profile image will be set instead
            getPlayerImage(playerName)
            .then(url =>{
                playerUrl=url;
                displayPlayer();
            })
            .catch(error => {
                playerUrl="images/blank.png";
                displayPlayer();
            });
        }
    });

    xhr.open('GET', 'https://api-nba-v1.p.rapidapi.com/players?id='+playerID);
    xhr.setRequestHeader('content-type', 'application/octet-stream');
    xhr.setRequestHeader('X-RapidAPI-Key', 'f5513e7d85msh4a88fc5c9f1ed74p1c6ca4jsn3faaeefc49c9');
    xhr.setRequestHeader('X-RapidAPI-Host', 'api-nba-v1.p.rapidapi.com');

    xhr.send(data);
}

// Function that retrieves image of NBA Player
function getPlayerImage(name)
{
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=500&origin=*`;

    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const imageUrl = pages[pageId].thumbnail.source;
        return imageUrl;
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
}

// Function that edits the DOM of HTML and displays all NBA player information
function displayPlayer()
{
    let name=playerInfo.firstname+" "+playerInfo.lastname;
    let birthDate=playerInfo.birth.date;
    let birthCountry=playerInfo.birth.country;
    let nbaDebut=playerInfo.nba.start;
    let numOfYears=playerInfo.nba.pro;
    let height=playerInfo.height.feets+" ft. "+playerInfo.height.inches+" inchs.";
    let weight=playerInfo.weight.pounds+" lbs.";
    let school=playerInfo.college;
    let jerseyNum=playerInfo.leagues.standard.jersey;
    let position;
    
    if(playerInfo.leagues.standard.pos=="G")
    {
        position="Guard";
    }
    else if(playerInfo.leagues.standard.pos=="F")
    {
        position="Forward";
    }
    else
    {
        position="Center";
    }

    if(jerseyNum==null)
    {
        jerseyNum=0;
    }

    const playerImage=document.getElementById("player-img");
    playerImage.src=playerUrl;

    Div=document.createElement("div");
    Div.setAttribute("id","player-details");
    Div.innerHTML="<h1>"+name+"</h1><h2>Birth Date: "+birthDate+"</h2><h2>Birth Country: "+birthCountry+"</h2><h2>NBA Debut: "+nbaDebut+"</h2><h2>Number of Years in NBA: "+numOfYears+"</h2><h2>Height: "+height+"</h2><h2>Weight: "+weight+"</h2><h2>School: "+school+"</h2><h2>Jersey Number: "+jerseyNum+"</h2><h2>Position: "+position+"</h2>";
    
    container=document.getElementById("player-details-container");
    container.appendChild(Div);
}