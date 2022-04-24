import React from 'react';
import TableSearchModule from "./TableSearchModule";
import DetailsViewModule from "./DetailsViewModule";
import { Routes, Route } from "react-router-dom";

// function Home(props) {
//     const location = useLocation();

//     return (
//         <div>
//             <h1>HOME:</h1>
//             <h2>comeFrom: {(location.state != null && location.state.comeFrom != null) ? location.state.comeFrom : ""}</h2>
//             <h2>Props: {(props.propsColor != null) ? props.propsColor : ""}</h2>
//             <nav>
//                 <NavLink to="/"
//                     state={{ comeFrom: 'Home' }}
//                     style={isActive => ({ color: isActive ? "green" : "blue" })}>
//                     Home</NavLink> &nbsp;
//                 <NavLink to="/dashboard" state={{ comeFrom: 'Home' }}>Dashboard</NavLink> &nbsp;
//                 <NavLink to="/invoices" state={{ comeFrom: 'Home' }}>Invoices</NavLink> &nbsp;
//                 <NavLink to="/team" state={{ comeFrom: 'Home' }}>Team</NavLink> &nbsp;
//             </nav>
//             <hr />
//         </div>
//     );
// }

// function Dashboard(props) {
//     const location = useLocation();

//     return (
//         <div>
//             <h1>Dashboard:</h1>
//             <h2>comeFrom: {(location.state != null && location.state.comeFrom != null) ? location.state.comeFrom : ""}</h2>
//             <h2>Props: {(props.propsColor != null) ? props.propsColor : ""}</h2>
//             <nav>
//                 <Link to="/" state={{ comeFrom: 'Dashboard' }}>Home</Link> &nbsp;
//                 <Link to="/dashboard" state={{ comeFrom: 'Dashboard' }} >Dashboard</Link> &nbsp;
//                 <Link to="/invoices" state={{ comeFrom: 'Dashboard' }} >Invoices</Link> &nbsp;
//                 <Link to="/team" state={{ comeFrom: 'Dashboard' }} >Team</Link> &nbsp;
//             </nav>
//             <hr />
//         </div>
//     );
// }

// function Invoices(props) {
//     const location = useLocation();

//     return (
//         <div>
//             <h1>INVOICES:</h1>
//             <h2>comeFrom: {(location.state != null && location.state.comeFrom != null) ? location.state.comeFrom : ""}</h2>
//             <h2>Props: {(props.propsColor != null) ? props.propsColor : ""}</h2>
//             <nav>
//                 <Link to="/" state={{ comeFrom: 'Invoices' }}>Home</Link> &nbsp;
//                 <Link to="/dashboard" state={{ comeFrom: 'Invoices' }}>Dashboard</Link> &nbsp;
//                 <Link to="/invoices" state={{ comeFrom: 'Invoices' }}>Invoices</Link> &nbsp;
//                 <Link to="/team" state={{ comeFrom: 'Invoices' }}>Team</Link> &nbsp;
//             </nav>
//             <hr />
//         </div>
//     );
// }

// function Team(props) {
//     const location = useLocation();

//     return (
//         <div>
//             <h1>TEAM:</h1>
//             <h2>comeFrom: {(location.state != null && location.state.comeFrom != null) ? location.state.comeFrom : ""}</h2>
//             <h2>Props: {(props.propsColor != null) ? props.propsColor : ""}</h2>
//             <nav>
//                 <Link to="/" state={{ comeFrom: 'Team' }}>Home</Link> &nbsp;
//                 <Link to="/dashboard" state={{ comeFrom: 'Team' }}>Dashboard</Link> &nbsp;
//                 <Link to="/invoices" state={{ comeFrom: 'Team' }}>Invoices</Link> &nbsp;
//                 <Link to="/team" state={{ comeFrom: 'Team' }}>Team</Link> &nbsp;
//             </nav>
//             <hr />
//         </div>
//     );
// }

function App() {
    return (
        <Routes>
            <Route path="/" element={<TableSearchModule />} />
            <Route path="*" element={<TableSearchModule />} />
            <Route path="/detailsViewModule" element={<DetailsViewModule />} />
        </Routes>
    );
}

export default App;
