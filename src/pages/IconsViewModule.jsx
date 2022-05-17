import React, { useState } from 'react';
import ModalViewModule from "./ModalViewModule";
import SingleIconViewModule from './SingleIconViewModule';
import AuthenticationPageViewModule from './AuthenticationPageViewModule';

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

    const showHideClassName = (data.totalResults && data.totalResults > 0) ? '' : 'display-none';

    return (
        <div onClick={closeModal} >
            <AuthenticationPageViewModule />

            <ModalViewModule show={state.show} imdbID={state.imdbID} />
            <div className="wrapper">

                <div className="side-menu"></div>

                <div className="middle">
                    <div className="row">

                        <div className="input-field col s6">
                            <input id="textId" type="text" className="validate" />
                            <label for="textId">Title (obligatory)</label>
                        </div>

                        <div className="input-field col s6">
                            <input id="yearId" type="text" className="validate" />
                            <label for="yearId">Year (optional)</label>
                        </div>

                        <div className="input-field col s6">
                            <a className="waves-effect waves-light btn" onClick={() => updateCurrentView()}>Search</a>
                        </div>

                        <div className="input-field col s6">
                            Found: {data.totalResults} results.
                        </div>

                    </div>
                    <div className={showHideClassName}>
                        <hr />
                        <div id='resultSectionId'>{tableRows}</div>
                        <hr />
                        <div className="center-align">
                            <a className="waves-effect waves-light btn" onClick={() => loadMoreResults()}>Load More Results</a>
                        </div>
                        <hr />
                    </div>
                </div>

                <div className="banners"></div>

            </div>
        </div>
    );
}

export default IconsViewModule;
