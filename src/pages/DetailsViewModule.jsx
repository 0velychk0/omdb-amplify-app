import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

const defaultValue = {
    "Title": "Live Free or Die Hard",
    "Year": "2007",
    "Rated": "PG-13",
    "Released": "27 Jun 2007",
    "Runtime": "128 min",
    "Genre": "Action, Thriller",
    "Director": "Len Wiseman",
    "Writer": "John Carlin, Roderick Thorp, Mark Bomback",
    "Actors": "Bruce Willis, Justin Long, Timothy Olyphant",
    "Plot": "John McClane and a young hacker join forces to take down master cyber-terrorist Thomas Gabriel in Washington D.C.",
    "Language": "English, Italian, French",
    "Country": "United States, United Kingdom",
    "Awards": "3 wins & 16 nominations",
    "Poster": "n/a",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "7.1/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "82%"
        },
        {
            "Source": "Metacritic",
            "Value": "69/100"
        }
    ],
    "Metascore": "69",
    "imdbRating": "7.1",
    "imdbVotes": "402,268",
    "imdbID": "tt0337978",
    "Type": "movie",
    "DVD": "20 Nov 2007",
    "BoxOffice": "$134,529,403",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
};

function DetailsViewModule(props) {

    const [data, setData] = useState(defaultValue);
    const location = useLocation();

    function fetchInventory(imdbId) {

        console.log(`fetchInventory called with imdbId: '${imdbId}'`);

        if (imdbId === "") {
            setData({});
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
        console.log('useEffect called');

        const params = new URLSearchParams(location.search);
        const imdbID = params.get('imdbID');

        fetchInventory(imdbID);
    }, [location.search]);

    const st = IMDB_API_URL + data.imdbID;

    return (
        <table>
            <tr>
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
                </td>
            </tr>
        </table>
    );
}

export default DetailsViewModule;
