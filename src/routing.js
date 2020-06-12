import React, { lazy, Suspense } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import ruRU from "antd/lib/locale-provider/ru_RU";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Loader } from './components/Loader';

const List = lazy(() => import('./components/List'));
const Cardinfo = lazy(() => import('./components/InfoCard'))

export const Routing = withRouter(({ data, location }) => {
    return (
        <Suspense fallback={<Loader />}>
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="slide" timeout={0.2}>
                    <Switch locale={ruRU} location={location}>
                        <Route exact path="/">
                            <List data={data} />
                        </Route>
                        <Route
                            path="/inf/:address/:fullname/:libraries/:employees/:funds/:subscribers/:visits/:vs/:bd/:br/:computers/:site">
                            <Cardinfo />
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Suspense>
    )
})