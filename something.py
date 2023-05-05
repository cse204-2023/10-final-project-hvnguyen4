import requests
import json

url = "https://api-nba-v1.p.rapidapi.com/teams"

playerMap=[]

headers = {
	"content-type": "application/octet-stream",
	"X-RapidAPI-Key": "f5513e7d85msh4a88fc5c9f1ed74p1c6ca4jsn3faaeefc49c9",
	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
}


# Use a set to keep track of the keys already added to the dictionary
added_keys = set()

allTeams = (requests.get(url, headers=headers)).json()["response"]

count=0
for i in allTeams:
    if i["nbaFranchise"] and i["name"]!="Home Team Stephen A":
        count+=1
        url = "https://api-nba-v1.p.rapidapi.com/players"

        querystring = {"team":i["id"],"season":"2022"}

        headers = {
            "content-type": "application/octet-stream",
            "X-RapidAPI-Key": "f5513e7d85msh4a88fc5c9f1ed74p1c6ca4jsn3faaeefc49c9",
            "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
        }

        playersInTeam = (requests.get(url, headers=headers, params=querystring)).json()["response"]

        for j in playersInTeam:
             if j["id"] not in added_keys:
                player = {
                    "name": j["firstname"] + " " + j["lastname"],
                    "id": j["id"]
                }
                playerMap.append(player)
                added_keys.add(j["id"])  # Add the key to the set


json_data=json.dumps(playerMap)

with open('data.json', 'w') as f:
    f.write(json_data)