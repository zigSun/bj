import React, { useState } from 'react';
import { Input, Button, Text, Spacer } from '@geist-ui/core';

function AuthPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate login and password here
    if (login === '' || password === '') {
      setError('Please enter both login and password');
    } else if (login !== 'validUser' || password !== 'validPassword') {
      setError('Invalid login or password');
    } else {
      setError('');
      // Handle successful login here
    }
  };

  return (
    <div>
      <Text h1>Вход:</Text>
      {error && <Text small type="error">{error}</Text>}
      <form onSubmit={handleSubmit}>
        <Spacer y={1} />
        <Input
          placeholder="Login"
          value={login}
          required
          onChange={handleLoginChange}
        />
        <Spacer y={0.5} />
        <Input.Password
          placeholder="Password"
          value={password}
          required
          onChange={handlePasswordChange}
        />
        <Spacer y={1} />
        <Button type="secondary" htmlType="submit">
          Войти
        </Button>
      </form>
    </div>
  );
}

export default AuthPage;