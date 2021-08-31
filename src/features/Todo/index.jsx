import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import ListPage from './pages/ListPage';
import DetailPage from './pages/PageDetail';

function TodoFeature(props) {
   const match = useRouteMatch();

   return (
      <div>
         <Switch>
            <Route path={match.path} component={ListPage} exact></Route>
            <Route path={`${match.path}/:todoId`} component={DetailPage} exact></Route>

            <Route component={NotFound} />
         </Switch>
      </div>
   );

}
export default TodoFeature;