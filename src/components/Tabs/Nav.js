/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React from 'react';
import Component from '../Component';
import Tab from './Tab';
import children from '../../prop-types/children';
import CONTEXT_TYPES from './ContextTypes2';
import MODULE from './module';

export default class Nav extends Component {
    static module = MODULE;

    static contextTypes = CONTEXT_TYPES;

    static propTypes = {
        children: children(Tab)
    };

    /**
     * Render the tabs navigation list.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <nav
                id={this.formatID('tabs-nav')}
                className={this.formatChildClass('nav')}
                {...this.inheritNativeProps(props)}
            >
                <ol>
                    {props.children}
                </ol>
            </nav>
        );
    }
}