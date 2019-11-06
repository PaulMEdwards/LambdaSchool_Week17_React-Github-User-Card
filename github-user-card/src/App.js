import React from 'react';
import Axios from 'axios';
import Emoji from 'a11y-react-emoji';
// import update from 'immutability-helper';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      myGitHubData: {},
      myFollowers: [],
      myFollowing: [],
      populateFollowers: false,
      populateFollowing: false
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchDataToState = this.fetchDataToState.bind(this);
    this.populateFollowersData = this.populateFollowersData.bind(this);
  }

  async fetchData(userData) {
    await Axios.get("https://api.github.com/users/"+userData)
    .then(res => {
      let d = res.data;
      console.log('fetchData: ', d);
      return d;
    })
    .catch(e => console.log("Error: ", e));
  }

  async fetchDataToState(returnBucket, userData) {
    await Axios.get("https://api.github.com/users/"+userData)
    .then(res => {
      let d = res.data;
      console.log(returnBucket+': ', d);
      this.setState({ [returnBucket]: d });
    })
    .catch(e => console.log("Error: ", e));
  }

  populateFollowersData() {
    console.log('populateFollowersData():');
    console.log('this.state.myFollowers.length: ', this.state.myFollowers.length);
    // let followers = {...this.state.myFollowers}; //deep copy
    // let followers = this.state.myFollowers.slice(); //clone
    let followers = Array.from(this.state.myFollowers); //array from
    console.log('followers before: ', followers);
    for (let Fers = 0; Fers < followers.length; Fers++) {
      if (this.state.populateFollowers === true) {
        if (typeof followers[Fers].bio === "undefined") {
          followers[Fers] = this.fetchData(followers[Fers].login);
        }
      }
    }
    console.log('followers after: ', followers);
    this.setState({ populateFollowers: false });
    this.setState({ myFollowers: followers });
  }
  
  componentDidMount() {
    let self = this;

    self.fetchDataToState('myGitHubData', "PaulMEdwards");

    self.fetchDataToState('myFollowers', "PaulMEdwards/followers");
    self.fetchDataToState('myFollowing', "PaulMEdwards/following");
  }

  componentDidUpdate(prevProps, prevState) {
    let self = this;

    if (self.state.myFollowers.length > 0 && self.state.populateFollowers === true) {
      self.populateFollowersData();
    }
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
