import { useState } from 'react';
import { Form, Header, Button, ButtonLabel, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState(' ');

  const onInputChange = e => {
    setQuery(e.target.value);
  };

  const onSearchSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }
    onSubmit(query);
  };

  return (
    <>
      <Header>
        <Form onSubmit={onSearchSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={onInputChange}
          />
        </Form>
      </Header>
    </>
  );
};
