import React from "react";
import { Route, Switch } from "react-router-dom";

// import our views
import BaseView from "./views/BaseView";

const App = (): JSX.Element => {
    return (
        <div>
            <Switch>
                {/* add more routes here, path is the url you want on the frontend component is the view to be rendered */}
                <Route path="/" component={BaseView} />
            </Switch>
        </div>
    );
};

export default App;
