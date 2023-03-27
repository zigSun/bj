import React, { useState } from 'react';
import { Button, Input, Spacer, Text, useToasts } from '@geist-ui/core';

const TodoForm = () => {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  // const [_, setToast] = useToasts();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      // setToast({
      //   text: 'Please enter a valid email address.',
      //   type: 'error',
      // });
      return;
    }

    // Add the new todo item here

    setEmail('');
    setText('');

    // setToast({
    //   text: 'New todo item added successfully.',
    //   type: 'success',
    // });
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Text h3>Add a new todo item:</Text>
      <Spacer />
      <Input
        label="Email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Spacer />
      <Input
        label="Todo item text"
        placeholder="Enter the todo item text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Spacer />
      <Button type="success" auto>
        Add todo item
      </Button>
    </form>
  );
};

export default TodoForm;