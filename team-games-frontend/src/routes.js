import React from 'react';
import { Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import {
  Home, 
  MovingMotivators, MovingMotivatorsCreate, MovingMotivatorsPlay, MovingMotivatorsRoom, 
  DelegationPoker, DelegationPokerCreate, DelegationPokerPlay, DelegationPokerRoom
} from './containers/pages';

const Routes = props => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/movingmotivators" exact component={MovingMotivators} />
    <Route path="/movingmotivators/create" exact component={MovingMotivatorsCreate} />
    <Route path="/movingmotivators/play" exact component={MovingMotivatorsPlay} />
    <Route path="/movingmotivators/room" exact component={MovingMotivatorsRoom} />
    <Route path="/delegationpoker" exact component={DelegationPoker} />
    <Route path="/delegationpoker/create" exact component={DelegationPokerCreate} />
    <Route path="/delegationpoker/play" exact component={DelegationPokerPlay} />
    <Route path="/delegationpoker/play" exact component={DelegationPokerPlay} />
    <Route path="/delegationpoker/room" exact component={DelegationPokerRoom} />
    <Route path="*">
      <Redirect to={{
        pathname: '/pageNotFound',
        state: {referrer: window && window.location.href, message: '404'}
      }}
      />
    </Route>
  </Switch>
);

export default Routes;
