import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

const defaultValue = {
    "Title": "-",
    "Year": "-",
    "Rated": "-",
    "Released": "-",
    "Runtime": "-",
    "Genre": "-",
    "Director": "-",
    "Writer": "-",
    "Actors": "-",
    "Plot": "-",
    "Language": "-",
    "Country": "-",
    "Awards": "-",
    "Poster": "-",
    "Ratings": [],
    "Metascore": "-",
    "imdbRating": "-",
    "imdbVotes": "-",
    "imdbID": "-",
    "Type": "-",
    "DVD": "-",
    "BoxOffice": "-",
    "Production": "-",
    "Website": "-",
    "Response": "-"
};

function ModalViewModule(props) {

    const [data, setData] = useState(defaultValue);
    const location = useLocation();

    function fetchInventory(imdbId) {

        console.log(`ModalViewModule:fetchInventory called with imdbId: '${imdbId}'`);

        if (imdbId === "") {
            return;
        }
        let uri = "&i=" + imdbId;

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => setData(json))
            .catch(e => {
                console.error("error:" + e);
                this.setData(defaultValue);
            });
    }

    useEffect(() => {
        console.log('ModalViewModule:useEffect called');

        const imdbID = props.imdbID

        if (imdbID == null || imdbID === "")
            return;

        fetchInventory(imdbID);

    }, [location.search, props]);

    const st = IMDB_API_URL + data.imdbID;

    const showHideClassName = props.show ? 'modal-main display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
        <span className="close">&times;</span>
        <table><tbody><tr>
                <td><img alt="poster" src={data.Poster}></img></td>
                <td>
                    <li>Title: {data.Title}</li>
                    <li>Year: {data.Year}</li>
                    <li>Rated: {data.Rated}</li>
                    <li>Released: {data.Released}</li>
                    <li>Runtime: {data.Runtime}</li>
                    <li>Genre: {data.Genre}</li>
                    <li>Director: {data.Director}</li>
                    <li>Writer: {data.Writer}</li>
                    <li>Actors: {data.Actors}</li>
                    <li>Plot: {data.Plot}</li>
                    <li>Language: {data.Language}</li>
                    <li>Country: {data.Country}</li>
                    <li>Awards: {data.Awards}</li>
                    <li>imdb rating: {data.imdbRating} votes: {data.imdbVotes}</li>
                    <li><a href={st}>IMDB Link</a></li>
                    <li>Type: {data.Type}</li>
                    <li>BoxOffice: {data.BoxOffice}</li>
                </td></tr></tbody>
        </table>
        </div>
    );
}

export default ModalViewModule;
