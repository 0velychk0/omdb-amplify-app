import React from 'react';

// const API_HOST = "http://localhost:3000";
// const INVENTORY_API_URL = `${API_HOST}/TestData/data.json`;
// const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"
const defaultValue = {
    Title: "TEST",
    Year: "1981",
    Rated: "PG",
    Released: "12 Jun 1981",
    Runtime: "115 min",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDQxMDE1OTg4NV5BMl5BanBnXkFtZTcwMTMzOTQzMw@@._V1_SX300.jpg",
};

class DetailsViewModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = { resData: defaultValue, imdbId: 'tt0337978' };
    }

    // GET request function to your Mock API
    fetchInventory() {

        console.log(`fetchInventory called with imdbId: '${this.state.imdbId}'`);

        if (this.state.imdbId === "") {
            this.setState({ resData: defaultValue });
            // document.getElementById('resultSectionId').className = "hideme";
            return;
        }
        let uri = "&i=" + this.state.imdbId;

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => this.setState({ resData: json }))
            .catch(e => {
                console.error("error:" + e);
                // document.getElementById('resultSectionId').className = "hideme";
                this.setState({ resData: defaultValue });
            });
    }

    componentDidMount() {
        console.log('useEffect called');
        this.fetchInventory();
    }

    render() {
        return (
            <div>
                <img alt="poster" src={this.state.resData.Poster}></img>
                <li>Title: {this.state.resData.Title}</li>
                <li>Year: {this.state.resData.Year}</li>
                <li>Rated: {this.state.resData.Rated}</li>
                <li>Released: {this.state.resData.Released}</li>
                <li>Runtime: {this.state.resData.Runtime}</li>
            </div>
        );
    }
}

export default DetailsViewModule;
