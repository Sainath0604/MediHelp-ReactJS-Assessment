import { Provider } from "react-redux";
import store from "./Store";
import PropTypes from "prop-types";

function StateProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

StateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateProvider;
