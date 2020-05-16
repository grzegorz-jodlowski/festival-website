import { connect } from 'react-redux';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';
import { getWorkshops, loadWorkshopsRequest } from '../../../redux/workshopsRedux';
import Prices from './PricesPage';

const mapStateToProps = state => ({
  concerts: getConcerts(state),
  request: getRequest(state),
  workshops: getWorkshops(state),
});

const mapDispatchToProps = dispatch => ({
  loadConcerts: () => dispatch(loadConcertsRequest()),
  loadWorkshops: () => dispatch(loadWorkshopsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prices);