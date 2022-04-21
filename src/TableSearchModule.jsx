import React from 'react';

// const API_HOST = "http://localhost:3000";
// const INVENTORY_API_URL = `${API_HOST}/TestData/data.json`;
const IMDB_API_URL = "https://www.imdb.com/title/"
const INVENTORY_API_URL = "https://www.omdbapi.com/?apikey=1ac1214b"

class TableSearchModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], pageNumber: 1, totalCount: 0 };
    }

    // GET request function to your Mock API
    fetchInventory(newPage) {
        let textId = document.getElementById("textId").value.trim();
        let yearId = document.getElementById("yearId").value.trim();

        console.log(`fetchInventory called with text: '${textId}', year: '${yearId}', page: ${newPage}`);

        this.setState({ pageNumber: newPage });

        if (textId === "") {
            this.setState({ data: [] });
            document.getElementById('resultSectionId').className = "hideme";
            return;
        }
        let uri = "&s=" + textId;
        if (yearId !== "") {
            uri = uri + "&y=" + yearId;
        }
        if (newPage > 1) {
            uri = uri + "&page=" + newPage;
        }

        fetch(`${INVENTORY_API_URL}${uri}`)
            .then(res => res.json())
            .then(json => {

                this.setState({
                    totalCount: json.totalResults,
                    data: ((json.Search != null) ? json.Search : [])
                });

                if (json.totalResults > 0)
                    document.getElementById('resultSectionId').className = "";
                else
                    document.getElementById('resultSectionId').className = "hideme";
            })
            .catch(e => {
                console.error("error:" + e);
                document.getElementById('resultSectionId').className = "hideme";
                this.setState({ data: [] });
            });
    }

    goNextPage() {
        let newPage = this.state.pageNumber + 1;
        this.fetchInventory(newPage);
    }
    goPrevPage() {
        let newPage = ((this.state.pageNumber > 1) ? this.state.pageNumber - 1 : 1);
        this.fetchInventory(newPage);
    }
    goFirstPage() {
        this.fetchInventory(1);
    }

    openDetailsView = ((imdbID) => {
        console.log("open: " + imdbID);
    });

    render() {

        const columns = [
            { name: 'Poster', title: 'Poster' },
            { name: 'Title', title: 'Title' },
            { name: 'Year', title: 'Year' },
            { name: 'imdbID', title: 'imdbID' },
            { name: 'Type', title: 'Type' }
        ];
        const tableColumns = columns.map((info) => <th key={info.title}>{info.title}</th>);

        const tableRows = this.state.data.map((info) => {
            let st = IMDB_API_URL + info.imdbID;
            return (
                <tr key={info.imdbID} onClick={() => this.openDetailsView(info.imdbID)}>
                    <td><img alt="poster" src={info.Poster}></img></td>
                    <td>{info.Title} <button onClick={() => this.openDetailsView(info.imdbID)}>Search</button></td>
                    <td>{info.Year}</td>
                    <td><a href={st}>{info.imdbID}</a> </td>
                    <td>{info.Type}</td>
                </tr>
            )
        });

        return (
            <div className="tableBlock" >
                <label>Title:</label>
                <input placeholder="obligatory" type="text" id="textId"></input>
                &nbsp;&nbsp;
                <label> Year: </label >
                <input placeholder="optional" type="text" id="yearId"></input>
                &nbsp;&nbsp;
                <button onClick={() => this.goFirstPage()}>Search</button>
                <p></p>
                <div id='resultSectionId' className="hideme">
                    <p>Found: {this.state.totalCount} results. &nbsp;&nbsp;
                        <button onClick={() => this.goPrevPage()}>Previous page</button> &nbsp;&nbsp;
                        Displayed from {(this.state.pageNumber - 1) * 10 + 1} till {this.state.pageNumber * 10} &nbsp;&nbsp;
                        <button onClick={() => this.goNextPage()}>Next Page</button></p>
                    <div>
                        <table className="table table-stripped">
                            <thead>
                                <tr>{tableColumns}</tr>
                            </thead>
                            <tbody>{tableRows}</tbody>
                        </table>
                    </div>
                    <p>Found: {this.state.totalCount} results. &nbsp;&nbsp;
                        <button onClick={() => this.goPrevPage()}>Previous page</button> &nbsp;&nbsp;
                        Displayed from {(this.state.pageNumber - 1) * 10 + 1} till {this.state.pageNumber * 10} &nbsp;&nbsp;
                        <button onClick={() => this.goNextPage()}>Next Page</button></p>
                </div>
            </div >
        );
    }
}

export default TableSearchModule;
