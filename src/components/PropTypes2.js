/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import { PropTypes } from 'react';
import Titon from '../Titon';
import collection from '../prop-types/collection';

/**
 * A prop type for a list of positions on the x and y axis.
 *
 * @returns {React.PropTypes.oneOf}
 */
export const axisPositions = PropTypes.oneOf(['top', 'bottom', 'left', 'right']);

/**
 * Common default props between input components.
 *
 * @type {Object}
 */
export const defaultInputProps = {
    defaultChecked: false,
    defaultValue: '',
    disabled: false,
    multiple: false,
    readOnly: false,
    required: false
};

/**
 * Common default props for supported sizes.
 *
 * @type {Object}
 */
export const defaultSizeProps = {
    large: false,
    small: false
};

/**
 * Common prop types between input components.
 *
 * @type {Object}
 */
export const inputPropTypes = {
    defaultChecked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChanged: collection.func,
    onChanging: collection.func,
    readOnly: PropTypes.bool,
    required: PropTypes.bool
};

/**
 * A prop type shape for an option within a select input list.
 *
 * @returns {React.PropTypes.shape}
 */
export const optionShape = PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
});

/**
 * A prop type shape for an optgroup within a select input list.
 *
 * @returns {React.PropTypes.shape}
 */
export const optionGroupShape = PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(optionShape).isRequired
});

/**
 * A prop type for a list of options.
 *
 * @returns {React.PropTypes.arrayOf}
 */
export const optionList = PropTypes.arrayOf(PropTypes.oneOfType([
    optionShape, optionGroupShape
]));

/**
 * A prop type for a list of positions in each direction.
 *
 * @returns {React.PropTypes.oneOf}
 */
export const positions = PropTypes.oneOf([
    'top-left', 'top', 'top-right',
    'left', 'right',
    'bottom-left', 'bottom', 'bottom-right'
]);

/**
 * Common prop types for show and hide events.
 *
 * @type {Object}
 */
export const showHidePropTypes = {
    onHidden: collection.func,
    onHiding: collection.func,
    onShowing: collection.func,
    onShown: collection.func
};

export const sizePropTypes = {
    large: PropTypes.bool,
    small: PropTypes.bool
};

/**
 * A prop type for a list of configurable states.
 *
 * @returns {React.PropTypes.oneOf}
 */
export const states = PropTypes.oneOf(Titon.options.states);