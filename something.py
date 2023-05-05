import requests
import json

url = "https://api-nba-v1.p.rapidapi.com/teams"

playerMap=[];
player={}

headers = {
	"content-type": "application/octet-stream",
	"X-RapidAPI-Key": "f5513e7d85msh4a88fc5c9f1ed74p1c6ca4jsn3faaeefc49c9",
	"X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com"
}

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
            player[j["firstname"]+" "+j["lastname"]]=j["id"]
            playerMap.append(player)
            player={}

json_data=json.dumps(playerMap)

with open('data.json', 'w') as f:
    f.write(json_data)