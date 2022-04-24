import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

// const API_HOST = "http://localhost:3000";
// const INVENTORY_API_URL = `${API_HOST}/TestData/data.json`;
// const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

const defaultValue = {
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Poster: "",
};

function DetailsViewModule(props) {

    // let navigate = useNavigate();

    const [data, setData] = useState(defaultValue);
    const location = useLocation();
    let imdbId = '';

    function fetchInventory() {
        imdbId = (location != null && location.state != null && location.state.getImdbID != null)
            ? location.state.getImdbID : "";
        console.log(`fetchInventory called with imdbId: '${imdbId}'`);

        if (imdbId === "") {
            setData({});
            // document.getElementById('resultSectionId').className = "hideme";
            return;
        }
        let uri = "&i=" + imdbId;

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(e => {
                console.error("error:" + e);
                // document.getElementById('resultSectionId').className = "hideme";
                this.setData(defaultValue);
            });
    }

    useEffect(() => {
        console.log('useEffect called');
        fetchInventory();
    }, []);

    return (
        <div>
            <img alt="poster" src={data.Poster}></img>
            <li>Title: {data.Title}</li>
            <li>Year: {data.Year}</li>
            <li>Rated: {data.Rated}</li>
            <li>Released: {data.Released}</li>
            <li>Runtime: {data.Runtime}</li>
        </div>
    );
}

export default DetailsViewModule;
