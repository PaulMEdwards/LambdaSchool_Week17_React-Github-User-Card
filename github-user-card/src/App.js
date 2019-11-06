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
  }

  componentDidMount() {
    let self = this;

    async function fetchData(returnBucket, remoteDataSourceUri) {
      await Axios.get(remoteDataSourceUri)
      .then(res => {
        let d = res.data;
        console.log(returnBucket+': ', d);
        self.setState({ [returnBucket]: d });
      })
      .catch(e => console.log("Error: ", e));
    }

    fetchData('myGitHubData', "https://api.github.com/users/PaulMEdwards");
    fetchData('myFollowers', "https://api.github.com/users/PaulMEdwards/followers");
    fetchData('myFollowing', "https://api.github.com/users/PaulMEdwards/following");
  }

  render() {
    async function returnCardData(remoteDataSourceUri) {
      await Axios.get(remoteDataSourceUri)
      .then(res => {
        let d = res.data;
        // return card(d);
        return d;
      })
      .catch(e => console.log("Error: ", e));
    }

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

    console.log('this.state: ', this.state);
    let data = this.state.myGitHubData;
    console.log('data: ', data);

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
            card(data)
          }

          <h2>Followers</h2>
          {
            this.state.myFollowers.map(data => {
              // let d = returnCardData("https://api.github.com/users/"+data.login);
              // console.log('d: ', d);
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
