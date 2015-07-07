/**
 * @copyright   2010-2015, The Titon Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 * @link        http://titon.io
 */

import Toolkit from 'Toolkit';
import Plugin from 'Plugin';

let componentAttrNameProp = Symbol('attributeName'),
    componentCssNameProp = Symbol('cssClassName');

export default class Component extends Plugin {

    /**
     * {@inheritdoc}
     */
    setupProperties() {
        this.name = 'Component';
    }

    /**
     * Generate a unique HTML ID based on the passed parameters.
     *
     * @returns {string}
     */
    buildID(...params) {
        params.unshift('toolkit', this.getCssClassName(), this.uid);

        return params.join('-');
    }

    /**
     * Return the plugin name as a valid HTML attribute name.
     *
     * @returns {string}
     */
    getAttributeName() {
        return this[componentAttrNameProp] || (this[componentAttrNameProp] = this.name.toLowerCase());
    }

    /**
     * Return the plugin name as a valid CSS class name.
     * Will convert upper case characters to lower case dashes.
     *
     * @returns {string}
     */
    getCssClassName() {
        return this[componentCssNameProp] || (this[componentCssNameProp] = this.name.replace(/[A-Z]/g, function(match) {
            return ('-' + match.charAt(0).toLowerCase());
        }).slice(1));
    }

}

Toolkit.Component = Component;
