import { Component } from 'react';
import { Form, Header, Button, ButtonLabel, Input } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  onInputChange = e => {
    this.setState({ query: e.target.value });
  };

  onSearchSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;

    if (!this.state.query.trim()) {
      return;
    }
    onSubmit(this.state.query);
  };

  render() {
    return (
      <>
        <Header>
          <Form onSubmit={this.onSearchSubmit}>
            <Button type="submit">
              <ButtonLabel>Search</ButtonLabel>
            </Button>

            <Input
              name="search"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.onInputChange}
            />
          </Form>
        </Header>
      </>
    );
  }
}
