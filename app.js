(function () {
  // listens to the subscribe button
  // when clicked, calls addSubredditToList();
  function listenToSubscribeButton() {
    const subredditInput = document.getElementById("subredditInput");
    const subscribeButton = document.getElementById("subscribe");
    subscribeButton.addEventListener("click", (event) => {
      addSubredditToList(subredditInput.value);
    });
  }
  listenToSubscribeButton();

  // actually adds the subreddit name to the <ul>
  function addSubredditToList(name) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = name;
    a.setAttribute("data-name", name);
    a.setAttribute("href", "#");
    li.append(a);
    const subreddit = document.getElementById("subreddits");
    subreddit.append(li);
  }

  // listens for a click on the subreddit list
  // when one is clicked, calls loadSubreddit with the name
  function listenToSubredditsClick() {
    const subreddit = document.getElementById("subreddits");
    subreddit.addEventListener("click", (event) => {
      loadSubreddit(event.target.getAttribute("data-name"));
    });
  }
  listenToSubredditsClick();

  // called when a subreddit is clicked from the list
  // should call fetch here
  function loadSubreddit(name) {
    fetch(`https://www.reddit.com/r/${name}/.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clearExistingList();
        saveSubredditsToLocalStorage();
        for (let i = 0; i < data.data.children.length; i++) {
          const newElement = createPostElement(
            data.data.children[i].data.title,
            data.data.children[i].data.url
          );
          const posts = document.getElementById("posts");
          posts.append(newElement);
        }
      });
  }

  function createPostElement(title, url) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = title;
    a.setAttribute("href", url);
    li.append(a);
    return li;
  }

  // clear the existing list of posts
  function clearExistingList() {
    document.getElementById("posts").innerHTML = posts;
    posts.innerText = " ";
  }

  // save the users subreddits to localstorage
  function saveSubredditsToLocalStorage() {
    const subredditInput = document.getElementById("subredditInput");
    //const list = document.getElementById("posts");
    localStorage.setItem("list", JSON.stringify(subredditInput.value));
  }

  // read the users subreddits from localstorage
  function readSubredditsFromLocalStorage() {}
})();
