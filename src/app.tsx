import systemRoutes from '#/routes';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

function App() {
    return (
        <Router>
            <Switch>
                {systemRoutes.map((item, key) => {
                    return(
                        <Route path={item.path} exact={item.exact} key={key}>
                            <item.page />
                        </Route>
                    )
                })}
            </Switch>
        </Router>
    );
}

export default App;