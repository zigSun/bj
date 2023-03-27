import React from 'react';
import { Card, Checkbox, Spacer, Text } from "@geist-ui/core";

function TodoItem({ data, onCheckboxChange }) {
  // const isAdmin = useAuth();
  return (
    <Card >
      <Text h4>{data.text}</Text>
      <Spacer/>
      <Text small>{data.email}</Text>
      <Spacer/>
      <Checkbox checked={data.completed} onChange={onCheckboxChange}>
        Mark completed
      </Checkbox>
    </Card>
  );
}

export default TodoItem;