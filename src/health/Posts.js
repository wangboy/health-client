/**
 * Created by wangbo on 22/04/2017.
 */import React from 'react';
import { List, Datagrid, TextField, ReferenceField } from 'admin-on-rest/lib/mui';

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField label="User" source="userId" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="body" />
    </Datagrid>
  </List>
);
