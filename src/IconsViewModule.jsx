import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from 'react';
// import { NavLink, Routes, Route, Link, useLocation } from "react-router-dom";

// const API_HOST = "http://localhost:3000";
// const INVENTORY_API_URL = `${API_HOST}/TestData/data.json`;
const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

let pageNumber = 1;
let totalCount = 0;

function IconsViewModule() {
    const columns = [
        { name: 'Poster', title: 'Poster' },
        { name: 'Title', title: 'Title' },
        { name: 'Year', title: 'Year' },
        { name: 'imdbID', title: 'imdbID' },
        { name: 'Type', title: 'Type' }
    ];

    const navigate = useNavigate();
    const [data, setData] = useState([]);

    // GET request function to your Mock API
    function fetchInventory(requiredPage) {
        pageNumber = requiredPage;
        if (pageNumber < 1) pageNumber = 1;

        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();

        console.log(`fetchInventory called with text: '${textId}', year: '${yearId}', requiredPage: '${requiredPage}'`);

        if (textId === "") {
            setData([]);
            document.getElementById('resultSectionId').className = "hideme";
            return;
        }
        let uri = "&s=" + textId;
        if (yearId !== "") {
            uri = uri + "&y=" + yearId;
        }
        if (pageNumber > 0) {
            uri = uri + "&page=" + pageNumber;
        }

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => {
                totalCount = json.totalResults;
                if (totalCount > 0)
                    document.getElementById('resultSectionId').className = "";
                else
                    document.getElementById('resultSectionId').className = "hideme";
                setData((json.Search != null) ? json.Search : [])
            })
            .catch(e => {
                console.error("error:" + e);
                document.getElementById('resultSectionId').className = "hideme";
                setData([]);
            });
    }

    function openDetailsView(imdbID) {
        console.log("try to open: " + imdbID);
        navigate("/detailsViewModule", { state: { getImdbID: imdbID } });
    }

    const tableColumns = columns.map((info) => {
        return (
            <th key={info.title}>{info.title}</th>
        )
    });

    const tableRows = data.map((info) => {
        let st = IMDB_API_URL + info.imdbID;
        return (
            <>
            <img alt="poster" src={info.Poster} key={info.imdbID} onClick={() => openDetailsView(info.imdbID)} /><wbr />
            </>
        )
    });

    let nextPage = (pageNumber * 10 < totalCount) ? pageNumber + 1 : pageNumber;
    let prevPage = (pageNumber > 1) ? pageNumber - 1 : pageNumber;
    return (
        <div className="tableBlock">
            <label>Title:</label>
            <input placeholder="obligatory" type="text" id="textId"></input>
            &nbsp;&nbsp;
            <label>Year: </label>
            <input placeholder="optional" type="text" id="yearId"></input>
            &nbsp;&nbsp;
            <button onClick={() => fetchInventory(1)}>Search</button>
            <p />
            <div id='resultSectionId' className="hideme">
                <p>Found: {totalCount} results. &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(prevPage)}>Previous page</button> &nbsp;&nbsp;
                    Current page {pageNumber} &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(nextPage)}>Next Page</button></p>
                <div> {tableRows} </div>
                <hr />
                <p>Found: {totalCount} results. &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(prevPage)}>Previous page</button> &nbsp;&nbsp;
                    Current page {pageNumber} &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(nextPage)}>Next Page</button></p>
            </div>
        </div>
    );
}

export default IconsViewModule;
