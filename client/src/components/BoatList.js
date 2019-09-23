import React from 'react';
import API from '../utils/API';
import BoatTable from './BoatTable';
import FilterDialog from './FilterDialog';
import DetailsDialog from './DetailsDialog';

const pageLengthOptions = [10, 25, 50, 100];

class BoatList extends React.Component {
  state = {
    boatList: [],
    locationList: [],
    boatTypeList: [],
    ratingOptions: [],
    lengthOptions: [],
    guestsNumberOptions: [],
    count: 0,
    dialogIsOpen: false,
    filters: {
      minLength: null,
      maxLength: null,
      minGuests: null,
      maxGuests: null,
      minRating: null,
      maxRating: null,
      type: [],
      location: [],
      page: 0,
      rowsPerPage: pageLengthOptions[0],
    },
    detailsDialogIsOpen: false,
    selectedBoat: {},
  };

  componentDidMount = () => {
    this.fetchBoatList();
    this.fetchFiltersOptions();
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filters.rowsPerPage !== this.state.filters.rowsPerPage ||
      prevState.filters.page !== this.state.filters.page ||
      prevState.filters !== this.state.filters
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

  fetchFiltersOptions = async () => {
    try {
      const response = await API.fetchFiltersOptions();
      const locationList = await response.data.locationList;
      const boatTypeList = await response.data.boatTypeList;
      const ratingOptions = await response.data.ratingOptions;
      const lengthOptions = await response.data.lengthOptions;
      const guestsNumberOptions = await response.data.guestsNumberOptions;

      this.setState({
        locationList: locationList,
        boatTypeList: boatTypeList,
        ratingOptions: ratingOptions,
        lengthOptions: lengthOptions,
        guestsNumberOptions: guestsNumberOptions,
      });
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

  handleFiltersChange = filters => {
    this.setState({
      dialogIsOpen: false,
      filters: {
        ...this.state.filters,
        type: filters.type,
        location: filters.location,
        minLength: filters.minLength,
        maxLength: filters.maxLength,
        minGuests: filters.minGuests,
        maxGuests: filters.maxGuests,
        minRating: filters.minRating,
        maxRating: filters.maxRating,
      },
    });
  };

  openDialog = () => {
    this.setState({
      dialogIsOpen: true,
    });
  };

  openDetailsDialog = boat => {
    this.setState({
      detailsDialogIsOpen: true,
      selectedBoat: boat,
    });
  };

  closeDialog = () => {
    this.setState({ dialogIsOpen: false });
  };

  closeDetailsDialog = () => {
    this.setState({ detailsDialogIsOpen: false, selectedBoat: {} });
  };

  render() {
    const {
      boatList,
      count,
      dialogIsOpen,
      locationList,
      boatTypeList,
      ratingOptions,
      lengthOptions,
      guestsNumberOptions,
      filters,
      detailsDialogIsOpen,
      selectedBoat,
    } = this.state;
    const rowsPerPage = this.state.filters.rowsPerPage;
    const page = this.state.filters.page;

    return (
      <div>
        <h1>Zizoo Boats code challenge - Hugo Cattelain </h1>
        {boatList && (
          <BoatTable
            boatList={boatList}
            handleChangerowsPerPage={this.handleChangerowsPerPage}
            handleChangepage={this.handleChangepage}
            page={page}
            rowsPerPage={rowsPerPage}
            count={count}
            pageLengthOptions={pageLengthOptions}
            openDialog={this.openDialog}
            openDetailsDialog={this.openDetailsDialog}
          />
        )}
        <FilterDialog
          dialogIsOpen={dialogIsOpen}
          closeDialog={this.closeDialog}
          handleFiltersChange={this.handleFiltersChange}
          locationList={locationList}
          boatTypeList={boatTypeList}
          ratingOptions={ratingOptions}
          lengthOptions={lengthOptions}
          guestsNumberOptions={guestsNumberOptions}
          filterValues={filters}
        />
        <DetailsDialog
          boat={selectedBoat}
          closeDialog={this.closeDetailsDialog}
          open={detailsDialogIsOpen}
        />
      </div>
    );
  }
}

export default BoatList;
