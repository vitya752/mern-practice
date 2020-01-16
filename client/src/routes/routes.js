import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LinksPage from './../pages/LinksPage';
import AuthPage from './../pages/AuthPage';
import DetailPage from './../pages/DetailPage';
import CreatePage from './../pages/CreatePage';

const useRoutes = isAuth => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )     
    }
}

export default useRoutes;