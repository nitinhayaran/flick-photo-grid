import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";

const backendURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

console.log(process.env.REACT_APP_API_URL)
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  dataFormatter(json) {
    const photos = json.data.items;
    return photos.map(photo => {
      return {
        src: `${photo.media.m.split('_m')[0]}.jpg`,
        width: 4,
        height: 3
      }
    })
  }

  async componentDidMount() {
    const response = await fetch(`${backendURL}/photos`);
    const myJson = await response.json();
    this.setState({photos: this.dataFormatter(myJson), loading: false});
  }

  render () {
    // const {photos, loading} = this.state;

    return (
      <div>
        {this.state.loading === true && <p>Loading</p>}
        {this.state.loading === false && <Gallery photos={this.state.photos} />}
      </div>
    );
  }
}

export default App;
