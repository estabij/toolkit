/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import tabIndex from '../../../ext/utility/tabIndex';
import CONTEXT_TYPES from './ContextTypes';

export default class Tab extends Component {
    /**
     * Handles clicking the tab buttons.
     */
    onClick() {
        this.context.showItem(this.props.index);
        this.emitEvent('click', [this.props.index]);
    }

    render() {
        let index = this.props.index,
            active = this.context.isItemActive(index);

        return (
            <li>
                <button
                    type="button" role="tab"
                    id={this.formatID('carousel-tab', index)}
                    className={this.formatClass(this.props.className, {
                        'is-active': active
                    })}
                    aria-controls={this.formatID('carousel-item', index)}
                    aria-selected={active}
                    aria-expanded={active}
                    tabIndex={tabIndex(this)}
                    onClick={this.onClick.bind(this)}>
                </button>
            </li>
        );
    }
}

Tab.contextTypes = CONTEXT_TYPES;

Tab.defaultProps = {
    index: -1,
    className: 'carousel-tab'
};

Tab.propTypes = {
    index: PropTypes.number.isRequired,
    className: PropTypes.string
};