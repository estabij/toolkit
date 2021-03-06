/**
 * @copyright   2010-2016, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import React, { PropTypes } from 'react';
import Component from '../../Component';
import bind from '../../decorators/bind';
import collectionOf from '../../prop-types/collectionOf';
import invariant from '../../utility/invariant';
import CONTEXT_TYPES from './contextTypes';
import MODULE from './module';
import 'core-js/modules/es6.array.find';

import Fade from '../../motions/Fade';

export default class Gate extends Component {
    static module = MODULE;

    static contextTypes = CONTEXT_TYPES;

    static defaultProps = {
        motion: 'fade'
    };

    static propTypes = {
        contract: PropTypes.func.isRequired,
        motion: PropTypes.string,
        name: PropTypes.string.isRequired,
        onEntered: collectionOf.func,
        onEntering: collectionOf.func,
        onLeaving: collectionOf.func,
        onLeft: collectionOf.func
    };

    state = {
        children: [],
        enteringElement: null,
        leavingElement: null
    };

    /**
     * Register the gate on instantiation.
     *
     * @param {Object} props
     * @param {Object} context
     */
    constructor(props, context) {
        super();

        // The `contextKey` can be overwritten by child components
        // So force it to the gateways context key
        context[MODULE.contextKey]
            .registerGate(props.name, this.handleOnWarpIn, this.handleOnWarpOut);
    }

    /**
     * Trigger `entering` and `leaving` events when an element is warped.
     *
     * @param {Object} nextProps
     * @param {Object} nextState
     */
    componentWillUpdate(nextProps, nextState) {
        if (nextState.enteringElement) {
            this.emitEvent('entering', nextState.enteringElement);
        }

        if (nextState.leavingElement) {
            this.emitEvent('leaving', nextState.leavingElement);
        }
    }

    /**
     * Trigger `entered` and `left` events when an element is warped.
     */
    componentDidUpdate() {
        let { enteringElement, leavingElement } = this.state;

        if (enteringElement) {
            this.emitEvent('entered', enteringElement);
        }

        if (leavingElement) {
            this.emitEvent('left', leavingElement);
        }
    }

    /**
     * Handles the adding of elements from the gateway.
     *
     * @param {ReactElement} element
     */
    @bind
    handleOnWarpIn(element) {
        let { children } = this.state;

        if (this.isValidElement(element) && !this.hasElement(element)) {
            this.setState({
                children: children.concat([{ key: element.key, element }]),
                enteringElement: element,
                leavingElement: null
            });
        }
    }

    /**
     * Handles the removing of elements from the gateway.
     *
     * @param {ReactElement} element
     */
    @bind
    handleOnWarpOut(element) {
        let { children } = this.state;

        if (this.isValidElement(element) && this.hasElement(element)) {
            this.setState({
                children: children.filter(child => child.key !== element.key),
                enteringElement: null,
                leavingElement: element
            });
        }
    }

    /**
     * Returns true if the element by key currently exists in the gate.
     *
     * @param {ReactElement} element
     * @returns {Boolean}
     */
    hasElement(element) {
        return !!this.state.children.find(child => child.key === element.key);
    }

    /**
     * Validate that a value is in fact a React element and that it matches the contract.
     *
     * @param {ReactElement} element
     * @returns {Boolean}
     */
    isValidElement(element) {
        let { contract, name } = this.props;

        invariant(React.isValidElement(element) && element.type === contract,
            'Value passed to "%s" `Gate` must be an instance of the `%s` component.',
            name, contract.name);

        return true;
    }

    /**
     * Method for rendering the children within the gate.
     * This allows for sub-classes to implement custom functionality.
     *
     * @param {ReactElement[]} children
     * @returns {ReactElement[]}
     */
    renderChildren(children) {
        return (
            <Fade.Group>
                {children.map(child => child.element)}
            </Fade.Group>
        );
    }

    /**
     * Render the gateway and its children.
     *
     * @returns {ReactElement}
     */
    render() {
        let props = this.props;

        return (
            <div
                className={this.formatChildClass('gate')}
                {...this.inheritNativeProps(props)}
            >
                {this.renderChildren(this.state.children)}
            </div>
        );
    }
}
