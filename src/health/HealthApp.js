/**
 * Created by wangbo on 22/04/2017.
 */
// in src/App.js
import React from 'react';

import { jsonServerRestClient, Admin, Resource } from 'admin-on-rest';

import { PostList } from './Posts';
import {UserList} from './User'

const App = () => (
  <Admin restClient={jsonServerRestClient('http://jsonplaceholder.typicode.com')}>
    <Resource name="posts" list={PostList} />
    <Resource name="users" list={UserList} />
  </Admin>
);

export default App;

//TODO error https://github.com/marmelab/admin-on-rest/pull/27