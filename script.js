const playerCardTemp=document.querySelector("[data-player-temp]");
const playerCards=document.querySelector("[data-player-cards]");
const searchInput=document.querySelector("[data-search]");

let players=[];

// Determines which player divs should appear and not appear based on what is being typed in search bar
searchInput.addEventListener("input",(event)=>{
    const searchValue=event.target.value.toLowerCase();

    if (searchValue) {
        // If the search value is not empty, show the cards that match the search value
        players.forEach(player => {
            const visible=player.name.toLowerCase().includes(searchValue);
            player.element.classList.toggle("hide",!visible);
        })
        playerCards.classList.remove("hide");
    }
    else {
        // If the search value is empty, hide all the player cards
        players.forEach(player => {
            player.element.classList.add("hide");
        })
        playerCards.classList.add("hide");
    }
})

// Function that loads all the players from JSON File
function loadPlayers()
{
    fetch('https://raw.githubusercontent.com/cse204-2023/10-final-project-hvnguyen4/main/data.json')
        .then(response => response.json())
        .then(data => {
            players=data.map(player => {
                const card=playerCardTemp.content.cloneNode(true).children[0];
                const name=card.querySelector("[data-name]");

                name.textContent=player.name;
                playerCards.append(card);

                card.addEventListener("click", () => {
                    window.location.href = "player.html?id="+player.id;
                });

                return{name:player.name, element:card};
           })
           players.forEach(player => player.element.classList.add("hide"));
        })
        .catch(error => {
            console.error('Error:', error);
        });
}