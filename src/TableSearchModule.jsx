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

function TableSearchModule() {
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

        console.log('fetchInventory called');
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();

        console.log(`fetchInventory called with text: '${textId}', year: '${yearId}'`);

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
        navigate("/detailsViewModule", { state: {getImdbID: imdbID }});
    }

    // // Calling the function on component mount
    // useEffect(() => {
    //     console.log('useEffect called');
    //     fetchInventory();
    // }, []);

    const tableColumns = columns.map((info) => {
        return (
            <th key={info.title}>{info.title}</th>
        )
    });

    const tableRows = data.map((info) => {
        let st = IMDB_API_URL + info.imdbID;
        return (
            // <NavLink to="/detailsViewModule" state={{ imdbid: info.imdbID }}>
            <tr key={info.imdbID} onClick={() => openDetailsView(info.imdbID)}>
            {/* <tr key={info.imdbID} > */}
                <td><img alt="poster" src={info.Poster}></img></td>
                <td>{info.Title}</td>
                <td>{info.Year}</td>
                <td><a href={st}>{info.imdbID}</a> </td>
                <td>{info.Type}</td>
            </tr>
            // </NavLink>
        )
    });

    return (
        <div className="tableBlock">
            <label>Title:</label>
            <input placeholder="obligatory" type="text" id="textId"></input>
            &nbsp;&nbsp;
            <label>Year: </label>
            <input placeholder="optional" type="text" id="yearId"></input>
            &nbsp;&nbsp;
            <button onClick={() => fetchInventory(1)}>Search</button>
            <p></p>
            <div id='resultSectionId' className="hideme">
                <p>Found: {totalCount} results. &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(pageNumber - 1)}>Previous page</button> &nbsp;&nbsp;
                    Displayed from {(pageNumber - 1) * 10 + 1} till {pageNumber * 10} &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(pageNumber + 1)}>Next Page</button></p>
                <div>
                    <table className="table table-stripped">
                        <thead>
                            <tr>{tableColumns}</tr>
                        </thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
                <p>Found: {totalCount} results. &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(pageNumber - 1)}>Previous page</button> &nbsp;&nbsp;
                    Displayed from {(pageNumber - 1) * 10 + 1} till {pageNumber * 10} &nbsp;&nbsp;
                    <button onClick={() => fetchInventory(pageNumber + 1)}>Next Page</button></p>
            </div>
        </div>
    );
}

export default TableSearchModule;
