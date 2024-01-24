/**
 * start global loader
 */
const startLoader = () => global.props.startLoader();

/**
 * stop global loader
 */
const stopLoader = () => global.props.stopLoader();

/**
 * return wether global loader is start or not
 * @returns {Boolean}
 */
const isLoading = () => global.props.isLoading();

export default {startLoader, stopLoader, isLoading};
