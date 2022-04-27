import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useLocation } from "react-router-dom";

const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

function IconsViewModule() {

    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        year: "",
        page: 1,
        totalResults: 0,
        result: []
    });

    useEffect(() => {
        console.log('useEffect called');
        const params = new URLSearchParams(location.search);
        const searchTitle = params.get('title');
        const searchYear = params.get('year');
        const searchPage = params.get('page');

        fetchInventory(searchTitle, searchYear, searchPage);
    }, [location.search]);

    // GET request function to your Mock API
    function fetchInventory(searchTitle, searchYear, searchPage) {

        console.log(`fetchInventory called with text: '${searchTitle}', year: '${searchYear}', requiredPage: '${searchPage}'`);

        if (searchTitle == null || searchTitle === "") {
            setData({
                title: searchTitle,
                year: searchYear,
                page: searchPage,
                totalResults: 0,
                result: []
            });
            return;
        }

        let uri = "&s=" + searchTitle;
        if (searchYear !== "") {
            uri = uri + "&y=" + searchYear;
        }
        if (searchPage > 0) {
            uri = uri + "&page=" + searchPage;
        }

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => {
                if (json.Response && json.Search != null) {
                    setData({
                        title: searchTitle,
                        year: searchYear,
                        page: searchPage,
                        totalResults: json.totalResults,
                        result: json.Search
                    });
                } else {
                    setData({
                        title: searchTitle,
                        year: searchYear,
                        page: searchPage,
                        totalResults: 0,
                        result: []
                    });
                }
            })
            .catch(e => {
                console.error("error:" + e);
                setData({
                    title: searchTitle,
                    year: searchYear,
                    page: searchPage,
                    totalResults: 0,
                    result: []
                });
            });
    }

    function updateCurrentView() {
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();

        navigate({
            pathname: "/",
            search: createSearchParams({
                title: textId,
                year: yearId,
                page: 1
            }).toString()
        });
        fetchInventory(textId, yearId, 1);
    }

    function openDetailsView(imdbID) {
        console.log("try to open: " + imdbID);

        navigate({
            pathname: "/detailsViewModule",
            search: createSearchParams({
                imdbID: imdbID
            }).toString(),
            refresh: true
        });
    }

    function goNextPage() {
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();
        let nextPageNum = ((parseInt(data.page) * 10) > parseInt(data.totalResults)) ? parseInt(data.page) : (parseInt(data.page) + 1);

        navigate({
            pathname: "/",
            search: createSearchParams({
                title: textId,
                year: yearId,
                page: nextPageNum
            }).toString()
        });
        fetchInventory(textId, yearId, nextPageNum);
    }

    function goPrevPage() {
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();
        let prevPageNum = (parseInt(data.page) > 1) ? (parseInt(data.page) - 1) : 1;

        navigate({
            pathname: "/",
            search: createSearchParams({
                title: textId,
                year: yearId,
                page: prevPageNum
            }).toString()
        });
        fetchInventory(textId, yearId, prevPageNum);
    }

    const tableRows = data.result.map((info) => {
        return (
            <div
                key={info.imdbID}
                className="icon-box-image"
                onClick={() => openDetailsView(info.imdbID)}>

                {(() => {
                    if (info.Poster != null && info.Poster.startsWith('http')) {
                        return (
                            <img
                                key={info.imdbID}
                                alt="poster"
                                className="icon-image"
                                src={info.Poster}
                            />
                        )
                    } else {
                        return (
                            <>
                                <li>Title: {info.Title}</li>
                                <li>Year: {info.Year}</li>
                                <li>Type: {info.Type}</li>
                            </>
                        )
                    }
                })()}

            </div>
        )
    });

    return (
        <div className="tableBlock">
            <label>Title:</label>
            <input placeholder="obligatory" type="text" id="textId" defaultValue={data.title}></input>
            &nbsp;&nbsp;
            <label>Year: </label>
            <input placeholder="optional" type="text" id="yearId" defaultValue={data.year}></input>
            &nbsp;&nbsp;
            <button onClick={() => updateCurrentView()}>Search</button>
            &nbsp;&nbsp;
            Found: {data.totalResults} results.
            &nbsp;&nbsp;
            <button onClick={() => goPrevPage()}>Previous page</button>
            &nbsp;&nbsp;
            Current page {data.page}
            &nbsp;&nbsp;
            <button onClick={() => goNextPage()}>Next Page</button>
            <hr />
            <div id='resultSectionId'>{tableRows}</div>
        </div>
    );
}

export default IconsViewModule;
