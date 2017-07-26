function displayBranches(){
  let branches = JSON.parse(this.responseText)
  branchesList = branches.map(branch=> `${branch.name}`)
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories(event,data){
  var repos = JSON.parse(this.responseText)
  ul = document.createElement('ul')
  repoList = repos.map(function(r){
    let a = (`<a href="#" data-repo=${r.name}  onclick="getCommits(this)">${r.html_url}</a>`)
    return `<li>${a}</li>`
  }).join('')
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo=' + r.name + ' onclick="getCommits(this)">'${r.html_url}'</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(){
  let commits = JSON.parse(this.responseText)
  let li = `${commits.map(commit => '<li><strong>' + commit.commit.author.name + " " + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}`
  let commitsList = `<ul>${li}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getRepositories(){
  // event.preventDefault()
  let username = document.getElementById("username").value
  let req = new XMLHttpRequest()
  req.addEventListener("load",displayRepositories);
  req.open("GET",'https://api.github.com/users/' + username + '/repos')
  req.send()

}

function getCommits(el){
  // event.preventDefault()

  let username = el.dataset.username
  let repo = el.dataset.repository
  let req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/commits')
  req.send()
}

function getBranches(el){
  let username = el.dataset.username
  let repo = el.dataset.repository
  let req = new XMLHttpRequest()
  req.addEventListener('load',displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + username + '/' + repo + '/branches')
  req.send()
}
