import React from 'react';
import API from '../utils/API';
import BoatTable from './BoatTable';

const pageLengthOptions = [10, 25, 50, 100];
const boatType = {
  id: '283f2e37-d7b4-4ca7-a5df-bbf0a9822e21',
  name: 'Ransell',
  age: 11,
  bathrooms: 10,
  cabins: 13,
  data_quality: 17,
  length: 14.71,
  mmk: false,
  nr_guests: 29,
  rating: 3,
  review_count: 50,
  review_rating: 3.91,
  type: 'catamaran',
  year: 1991,
  location: 'Ciudad Darío',
};
class BoatList extends React.Component {
  state = {
    boatList: [],
    count: 0,
    filters: {
      age: null,
      bathrooms: null,
      cabins: null,
      length: null,
      nr_guests: null,
      rating: null,
      review_rating: null,
      type: 'all',
      year: null,
      page: 0,
      rowsPerPage: pageLengthOptions[0],
    },
  };

  componentDidMount = () => {
    this.fetchBoatList();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filters.rowsPerPage !== this.state.filters.rowsPerPage ||
      prevState.filters.page !== this.state.filters.page
    ) {
      this.fetchBoatList();
    }
  }

  fetchBoatList = async () => {
    const { filters } = this.state;
    try {
      const response = await API.fetchBoatList(filters);
      const boatList = await response.data.boatList;
      const count = await response.data.count;
      this.setState({ boatList: boatList, count: count });
    } catch (err) {
      console.log(err);
    }
  };

  handleChangerowsPerPage = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        rowsPerPage: event.target.value,
        page: 0,
      },
    });
  };

  handleChangepage = newPage => {
    this.setState({ filters: { ...this.state.filters, page: newPage } });
  };

  render() {
    const { boatList, count } = this.state;
    const rowsPerPage = this.state.filters.rowsPerPage;
    const page = this.state.filters.page;

    return (
      <div>
        <h1>Zizoo Boats code challenge - Hugo Cattelain</h1>
        {boatList && (
          <BoatTable
            boatList={boatList}
            handleChangerowsPerPage={this.handleChangerowsPerPage}
            handleChangepage={this.handleChangepage}
            page={page}
            rowsPerPage={rowsPerPage}
            count={count}
            pageLengthOptions={pageLengthOptions}
          />
        )}
      </div>
    );
  }
}

export default BoatList;
