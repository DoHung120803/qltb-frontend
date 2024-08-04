import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import { privateRoutes } from "~/routes";
import DefaultLayout from "~/layouts";
import { Fragment, useEffect } from "react";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Routes>
            {privateRoutes.map((route, index) => {
                const Page = route.component;

                let Layout = DefaultLayout;

                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}
        </Routes>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
