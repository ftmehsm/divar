import Header from "./Header";

function Layout({children}) {
    return (
        <div>
            <Header/>
            <div className="container m-3">{children}</div>
        </div>
    );
}

export default Layout;