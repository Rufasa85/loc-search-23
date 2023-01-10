var searchForm = document.querySelector("#search-form");
var searchTermInput = document.querySelector("#search-term");
var formatSelect = document.querySelector("#search-format");
var searchSpan = document.querySelector("#search-span");
var resultsContainer = document.querySelector("#results-container")

function searchLoc(format,term){
    fetch(`https://www.loc.gov/${format}/?q=${term}&fo=json`).then(function(res){
        return res.json();
    }).then(function(data){
        renderResults(data)
    })
}

function renderResults(resultData){
    resultsContainer.innerHTML= "";
    console.log("inside of renderResults")
    console.log(resultData.results);
    for (let i = 0; i < resultData.results.length; i++) {
        var newArticleDiv = document.createElement("article");
        var titleHeader = document.createElement("h3");
        var link = document.createElement("a");
        link.href = resultData.results[i].url;
        link.target = "_blank";
        link.textContent = resultData.results[i].title;
        titleHeader.append(link)
        newArticleDiv.append(titleHeader);

        var dateHeader = document.createElement("h4");
        dateHeader.textContent = `Date: ${resultData.results[i].date}`
        newArticleDiv.append(dateHeader);

        var descriptionP = document.createElement("p");
        descriptionP.textContent = resultData.results[i].description
        newArticleDiv.append(descriptionP);

        resultsContainer.append(newArticleDiv);
    }
}

searchForm.addEventListener("submit",function(e){
    e.preventDefault();
    var termToSearch = searchTermInput.value;
    var formatToSearch = formatSelect.value;
    searchLoc(formatToSearch,termToSearch);
    searchSpan.textContent = `${formatToSearch} of ${termToSearch}`
    searchTermInput.value="";
    formatSelect.value="maps";
})

