import React, { useState } from 'react';
import ModalViewModule from "./ModalViewModule";
import SingleIconViewModule from './SingleIconViewModule';
import AuthenticationPage from './AuthenticationPageViewModule';

const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

function IconsViewModule() {

    const [state, setState] = useState({ show: false, imdbID: '' });
    const [data, setData] = useState({
        title: "",
        year: "",
        page: 1,
        totalResults: 0,
        result: []
    });

    function fetchInventory(searchTitle, searchYear, searchPage) {

        console.log(`IconsViewModule:fetchInventory called with text: '${searchTitle}', year: '${searchYear}', requiredPage: '${searchPage}'`);

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
                    setData((prevData) => ({
                        title: searchTitle,
                        year: searchYear,
                        page: searchPage,
                        totalResults: json.totalResults,
                        result: ((searchPage > 1) ? (prevData.result.concat(json.Search)) : json.Search)
                    }));
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
        console.log('IconsViewModule:updateCurrentView called');

        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();

        fetchInventory(textId, yearId, 1);
    }

    function showModal(item, imdbID) {
        console.log('IconsViewModule:showModal called');

        item.stopPropagation();
        setState({
            show: !state.show,
            imdbID: imdbID
        });
    };

    function closeModal(item) {
        console.log('IconsViewModule:closeModal called');
        if (state.show) {
            setState({
                show: false,
                imdbID: ""
            });
        }
    };

    function loadMoreResults() {
        console.log("IconsViewModule:load more results");
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();
        let nextPageNum = ((parseInt(data.page) * 10) > parseInt(data.totalResults)) ? parseInt(data.page) : (parseInt(data.page) + 1);
        fetchInventory(textId, yearId, nextPageNum);
    };

    const tableRows = data.result.map((info) => {
        return (
            <div key={info.imdbID} className="icon-box-image" onClick={e => { showModal(e, info.imdbID); }} >
                <SingleIconViewModule info={info} />
            </div>
        )
    });

    return (
        <div onClick={closeModal} >
                <AuthenticationPage />
                <ModalViewModule show={state.show} imdbID={state.imdbID} />
            <div class="wrapper">


                <div class="side-menu"></div>

                <div class="root">
                    <label>Title:</label>
                    <input className="line-input" placeholder="obligatory" type="text" id="textId" defaultValue={data.title}></input>
                    &nbsp;&nbsp;
                    <label>Year: </label>
                    <input className="line-input" placeholder="optional" type="text" id="yearId" defaultValue={data.year}></input>
                    &nbsp;&nbsp;
                    <button className="line-button" onClick={() => updateCurrentView()}>Search</button>
                    &nbsp;&nbsp;
                    Found: {data.totalResults} results.
                    &nbsp;&nbsp;
                    <hr />
                    <div id='resultSectionId'>{tableRows}</div>
                    <hr />
                    <button className="line-button" onClick={() => loadMoreResults()}>Load More Results</button>
                </div>

                <div class="banners"></div>

            </div>
        </div>
    );
}

export default IconsViewModule;
