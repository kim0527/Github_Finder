const UserNameInput=document.getElementById('UserNameInput');
UserNameInput.addEventListener('keypress',async(event)=>{
    if(event.key=='Enter'){
        const username = UserNameInput.value;
        // User Profile 가져오기
        const response_profile = await fetch(`https://api.github.com/users/${username}`);
        const user_profile = await response_profile.json();
        // User repos 가져오기
        const response_repos = await fetch(`https://api.github.com/users/${username}/repos`);
        const user_repos = await response_repos.json();

        //Loacl storage에 저장
        localStorage.setItem('user_profile', JSON.stringify(user_profile));
        localStorage.setItem('user_repos', JSON.stringify(user_repos));

        displayProfile(user_profile)
        displayContribution(username)
        displayRepos(user_repos)
        }
})

function displayProfile(user_profile){

  const profile=document.querySelector('.UserInfo');
  
  const left_profile=document.createElement('div');
  left_profile.classList.add('left_profile');

  const right_profile=document.createElement('div');
  right_profile.classList.add('right_profile');

  const UserImage=document.createElement('img');
  UserImage.classList.add('UserImage');
  UserImage.src=user_profile.avatar_url;

  const ViewProfileButton = document.createElement('button');
  ViewProfileButton.classList.add('ViewProfileButton');
  ViewProfileButton.textContent=`view profile`;

  const status = document.createElement('div');
  status.classList.add('status');

  const PublicReposStatue = document.createElement('div');
  PublicReposStatue.classList.add('StatusRepos');
  PublicReposStatue.textContent = `Public Repos: ${user_profile.public_repos}`;

  const PublicGistsStatue = document.createElement('div');
  PublicGistsStatue.classList.add('StatusGists');
  PublicGistsStatue.textContent = `Public Gists: ${user_profile.public_gists}`;

  const PublicFollowersStatue = document.createElement('div');
  PublicFollowersStatue.classList.add('StatusFollowers');
  PublicFollowersStatue.textContent = `Followers: ${user_profile.followers}`;

  const PublicFollowingStatue = document.createElement('div');
  PublicFollowingStatue.classList.add('StatusFollowing');
  PublicFollowingStatue.textContent = `Following: ${user_profile.following}`;
  
  const InfoList = document.createElement('ul');
  InfoList.classList.add('InfoList');

  const CompanyName = document.createElement('li');
  if (user_profile.company) {
    CompanyName.textContent = `Company: ${user_profile.company}`;
  }else{
    CompanyName.textContent = `Company: Null`;
  }

  const WebSiteBlog = document.createElement('li');
  if (user_profile.blog) {
    WebSiteBlog.textContent = `Website/Blog: ${user_profile.blog}`;
  }else{
    WebSiteBlog.textContent = `Website/Blog: Null`;
  }

  const Location = document.createElement('li');
  if (user_profile.location) {
    Location.textContent = `Location: ${user_profile.location}`;
  }else{
    Location.textContent = `Location: Null`;
  }

  const Since = document.createElement('li');
  if (user_profile.created_at) {
    let date=String(user_profile.created_at)
    date=date.split('T')[0]
    Since.textContent = `Member Since: ${date}`;
  }else{
    Since.textContent = `Member Since: Null`;    
  }
  
  status.append(PublicReposStatue,PublicGistsStatue,PublicFollowersStatue,PublicFollowingStatue)
  InfoList.append(CompanyName,WebSiteBlog,Location,Since)
  left_profile.append(UserImage,ViewProfileButton);
  right_profile.append(status,InfoList);
  profile.append(left_profile,right_profile);

  const ViewButton=document.querySelector('.ViewProfileButton');
  ViewButton.addEventListener('click',()=>{
    window.open(user_profile.html_url);
  })
}

function displayContribution(username){
  const GitContribution = document.createElement('img');
  GitContribution.src = `https://ghchart.rshah.org/${username}`

  const displayContribution=document.querySelector('.UserContribution');
  if (displayContribution) {
    displayContribution.append(GitContribution);
  }
}

function displayRepos(user_repos){
  const repos=document.querySelector('.LatestRepos');

  const title=document.createElement('div')
  title.textContent='Latest Repos'
  title.classList.add('LatestReposTitle');
  repos.append(title);

  user_repos.forEach(repo=>{

    const RepoInfo=document.createElement('div');
    RepoInfo.classList.add('RepoInfo');

    const RepoName=document.createElement('a');
    RepoName.textContent=repo.name;
    RepoName.href=repo.html_url
    RepoName.classList.add('RepoName');

    const RepoInfoRight=document.createElement('div');
    RepoInfoRight.classList.add('RepoInfoRight');

    const RepoStars = document.createElement('div');
    RepoStars.textContent = `Stars: ${repo.stargazers_count}`;
    RepoStars.classList.add('RepoStars');

    const RepoWatchers = document.createElement('div');
    RepoWatchers.textContent = `Watchers: ${repo.watchers_count}`;
    RepoWatchers.classList.add('RepoWatchers');

    const RepoForks = document.createElement('div');
    RepoForks.textContent = `Forks: ${repo.forks_count}`;
    RepoForks.classList.add('RepoForks');

    RepoInfoRight.append(RepoStars,RepoWatchers,RepoForks);
    RepoInfo.append(RepoName,RepoInfoRight)
    repos.append(RepoInfo);
  })
}