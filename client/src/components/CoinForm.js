import React from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addCoin } from '../actions/coins';

class CoinForm extends React.Component {
  state = { coin: '' }

  handleChange = (e) => {
    const { value } = e.target;
    const coin = value.toLowerCase().replace(' ', '')
    this.setState({ coin })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props;
    const { coin } = this.state;
    dispatch(addCoin(coin))
    this.setState({ coin: '' })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label="Watch Coin"
          value={this.state.coin}
          onChange={this.handleChange}
          required
        />
        <Form.Button>Add Coin</Form.Button>
      </Form>
    )
  }
}

export default connect()(CoinForm);