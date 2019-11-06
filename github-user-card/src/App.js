import React from 'react';
import Axios from "axios";

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      github_data: []
    };
  }

  componentDidMount() {
    let self = this;
    async function fetchGitHubData() {
      await Axios.get("https://api.github.com/users/PaulMEdwards")
      .then(res => {
        let r = res.data;
        console.log('res: ', r);
        self.setState({ github_data: r });
      })
      .catch(err => console.log("Error: ", err));
    }
    fetchGitHubData();
  }
  render() {
    console.log('this.state: ', this.state);
    let data = this.state.github_data;
    console.log('data: ', data);

    return (
      <div className="container">
        <div className="header">
          <img src="./assets/lambdalogo.png" alt="Lambda Logo"/>
          <p><span role="img" area-label="loves">❤️'s</span></p>
          <img src="./assets/githublogo.png" alt="GitHub Logo" />
        </div>
        <div className="cards">
          {
            // this.state.github_data.map(d => <img src={d.avatar_url} key={d.node_id} alt="avatar" />)

            // this.state.github_data.map(data => {
              <div className="card">
                <img src={data.avatar_url} key={data.node_id} />
                <div>
                  <h3 className="name">{data.name != null ? data.name : data.login}</h3>
                  <p className="username">{data.login}</p>
                  <p>{data.location != null ? `Location: ${data.location}` : null}</p>
                  <p>Profile: <a href="">{data.html_url}</a></p>
                  <p>Followers: <a href={data.html_url+"?tab=followers"}>{data.followers}</a></p>
                  <p>Following: <a href={data.html_url+"?tab=following"}>{data.following}</a></p>
                  <p>{data.bio != null ? `Bio: ${data.bio}` : null}</p>
                </div>
              </div>
            // })
          }
        </div>
      </div>
    );
  }
}

export default App;
