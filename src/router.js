/* eslint no-underscore-dangle: 0 */

import React from 'react';
import { Router } from 'dva/router';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
};

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/login/index').default);
          cb(null, require('./routes/login/login'));
        });
      },
    },
    {
      path: '/main',
      name: 'main',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/main/index').default);
          cb(null, require('./routes/main/main'))
        })
      }
    }
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
