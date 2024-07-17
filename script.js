async function getMatchData() {
    try {
        const response = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=e92fd725-b22f-4662-94c4-240d823fada1");
        const data = await response.json();

        if (data.status !== "success") return;

        const matchesList = data.data;

        if (!matchesList) return [];

        const relevantData = matchesList.filter(match => match.matchType === "t20")
                                        .map(match => {
                                            const scores = match.score.map(score => `Inning: ${score.inning}, Runs: ${score.r}, Wickets: ${score.w}, Overs: ${score.o}`).join('<br>');
                                            return `Date: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; ${match.date}, <br> Match Name: &nbsp;&nbsp;&nbsp;&nbsp; ${match.name}, <br> Team 1: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ${match.teams[0]},  <br> Team 2: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; ${match.teams[1]}, <br> ${match.status}, <br> Ground Name: &nbsp;&nbsp;&nbsp;&nbsp; ${match.venue}, <br> ${scores} <br><br><br>`;
                                        });

        console.log({ relevantData });

        document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');

        return relevantData;

    } catch (e) {
        console.log(e);
    }
}

getMatchData();
