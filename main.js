// query select ordered list
const list = document.querySelector("ol");



// api calls
let getArticleId = function () {

    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
        .then(function (httpResponse) {
            return httpResponse.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < 100; i++) {
                console.log(data[i]);
                let itemIdNumber = data[i];

                let getArticle = function () {
                    fetch("https://hacker-news.firebaseio.com/v0/item/" + itemIdNumber + ".json?print=pretty")
                        .then(function (httpResponse) {
                            return httpResponse.json();
                        })
                        .then(function (data) {
                            // create list item for ordered list
                            const article = document.createElement("li");
                            article.id = "article";
                            // create divs to add to list item
                            const articleTitle = document.createElement("div");
                            articleTitle.id = "article-title";
                            const url = document.createElement("a");
                            const points = document.createElement("div");
                            const author = document.createElement("div");
                            const time = document.createElement("div");
                            const comments = document.createElement("div");

                            // append divs to list item and then list item to ol
                            article.appendChild(articleTitle);
                            article.appendChild(url);
                            article.appendChild(points);
                            article.appendChild(author);
                            article.appendChild(time);
                            article.appendChild(comments);
                            list.appendChild(article);

                            articleTitle.innerHTML = data.title;

                            url.href = data.url;
                            url.innerText = "Read Article";
                            url.target = "_blank";

                            points.innerHTML = `${data.score} points`;
                            author.innerText = `by ${data.by}`;
                            // convert "time" into something readable
                            let milliseconds = data.time * 1000;
                            let dateObject = new Date(milliseconds);
                            let humanDate = dateObject.toLocaleString();
                            time.innerText = humanDate;
                            // might not be kids/comments, then will get "undefined" in the console
                            if (data.kids !== "") {
                                comments.innerHTML = `${data.kids.length} comments`;
                            }



                        })
                }
                getArticle();



            }
        })

}
getArticleId();







