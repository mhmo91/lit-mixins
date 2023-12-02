import { CSSResult, LitElement } from 'lit'
import { BaseElement, Constructor, IBaseMixin } from '..'
import TailwindElement from '../tailwind/tailwind.mixin'

export const $LitElement = <T extends CSSResult>(componentStyle?: T) => {
	class TailwindMixinClass extends BaseElement(TailwindElement(componentStyle)) {
		disconnectedCallback = () => {
			super.disconnectedCallback()
		}
	}
	return TailwindMixinClass as CustomElementConstructor &
		Constructor<LitElement> &
		Constructor<IBaseMixin> /* see "typing the subclass" below */
}
