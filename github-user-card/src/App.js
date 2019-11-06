import React from 'react';
import Axios from 'axios';
import Emoji from 'a11y-react-emoji';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      myGitHubData: {},
      myFollowers: [],
      myFollowing: []
    };
    // this.fetchData = this.fetchData.bind(this);
  }
  
  componentDidMount() {
    let self = this;
    
    async function fetchData(returnBucket, userData) {
      await Axios.get("https://api.github.com/users/"+userData)
      .then(res => {
        let d = res.data;
        console.log(returnBucket+': ', d);
        self.setState({ [returnBucket]: d });
      })
      .catch(e => console.log("Error: ", e));
    }
    
    fetchData('myGitHubData', "PaulMEdwards");

    fetchData('myFollowers', "PaulMEdwards/followers");
    fetchData('myFollowing', "PaulMEdwards/following");

    async function populateFollowersData() {
      console.log('populateFollowersData():');
      console.log('self.state.myFollowers.length: ', self.state.myFollowers.length);
      for (let Fers = 0; Fers < self.state.myFollowers.length; Fers++) {
        console.log('myFollowers['+Fers+']');
        await fetchData('myFollowers['+Fers+']', self.state.myFollowers[Fers].login);
      }
    }
    populateFollowersData();
  }

  render() {
    console.log('this.state: ', this.state);

    function card(data) {
      return (
        <div className="card" key={data.id}>
          <img src={data.avatar_url} alt="Avatar" />
          <div>
            <h3 className="name">{data.name != null ? data.name : data.login}</h3>
            <p className="username">{data.login}</p>
            <p>{data.location != null ? `Location: ${data.location}` : null}</p>
            <p>Profile: <a href={data.html_url}>{data.html_url}</a></p>
            <p>Followers: <a href={data.html_url+"?tab=followers"}>{data.followers}</a></p>
            <p>Following: <a href={data.html_url+"?tab=following"}>{data.following}</a></p>
            <p>{data.bio != null ? `Bio: ${data.bio}` : null}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="header">
          <img src="./assets/lambdalogo.png" alt="Lambda Logo"/>
          <p><Emoji symbol="❤️" label="love" />'s</p>
          <img src="./assets/githublogo.png" alt="GitHub Logo" />
        </div>
        <div className="cards">
          <h2>Me</h2>
          {
            card(this.state.myGitHubData)
          }

          <h2>Followers</h2>
          {
            this.state.myFollowers.map(data => {
              return (
                card(data)
              );
            })
          }

          <h2>Following</h2>
          {
            this.state.myFollowing.map(data => {
              return (
                card(data)
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
