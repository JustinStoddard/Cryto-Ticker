import React from 'react';
import { connect } from 'react-redux';
import { 
  Table, 
  Header, 
  Divider,
  Button,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { getCoins } from '../actions/coins';

class CoinList extends React.Component {
  state = { filter: 'priceSort', asc: 1 }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCoins())
    this.ticker = setInterval( () => {
      dispatch(getCoins())
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.ticker)
  }

  changeFilter = (filter) => {
    const { asc } = this.state;
    if (filter === this.state.filter)
      this.setState({ filter, asc: -asc })
    else
      this.setState({ filter });
  }

  priceSort = (x,y) => {
    const { asc } = this.state
    if (x.price < y.price )
      return asc
    if (x.price > y.price )
      return - asc
    return 0
  }

  nameSort = (x,y) => {
    const { asc } = this.state
    if (x.name < y.name )
      return asc
    if (x.name > y.name )
      return - asc
    return 0
  }

  symbSort = (x,y) => {
    const { asc } = this.state
    if (x.symbol < y.symbol )
      return asc
    if (x.symbol > y.symbol )
      return - asc
    return 0
  }

  getSort = () => {
    return this[this.state.filter]
  }

  render() {
    const { coins } = this.props;
    return (
      <div>
        <Divider />
        <Button onClick={ () => this.changeFilter('priceSort') }>
          Price
        </Button>
        <Button onClick={ () => this.changeFilter('nameSort') }>
          Name
        </Button>
        <Button onClick={ () => this.changeFilter('symbSort') }>
          Symbol
        </Button>
        <Table celled striped>
          <Table.Header>
            { ['Symbol', 'Name', 'Price']
                .map( h =>
                  <Table.HeaderCell key={h}>
                    {h}
                  </Table.HeaderCell>
                )
            }
          </Table.Header>
          <Table.Body>
            { coins.sort(this.getSort()).map( coin => {
                const { price, name, symbol, id, cmc_id } = coin
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <Link to={`/coins/${cmc_id}`}>
                        { symbol }
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      { name }
                    </Table.Cell>
                    <Table.Cell>
                      ${ price }
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { coins: state.coins }
}

export default connect(mapStateToProps)(CoinList);