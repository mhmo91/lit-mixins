import { CSSResult, LitElement, unsafeCSS } from 'lit'

import style from './tailwind.css?inline'
import { BaseElement, Constructor, IBaseMixin } from '../'

export declare class ITailwindElementMixin {
	styles: (typeof CSSResult)[]
}

export const tailwindStyles = unsafeCSS(style)

const TailwindElementBase = <T extends CSSResult>(componentStyle?: T) => {
	class TailwindMixinClass extends LitElement {
		static styles = [unsafeCSS(componentStyle), tailwindStyles]
	}
	return TailwindMixinClass as Constructor<LitElement> /* see "typing the subclass" below */
}

export const TailwindElement = <T extends CSSResult>(componentStyle?: T) => {
	class TailwindMixinClass extends BaseElement(TailwindElementBase(componentStyle)) {
		disconnectedCallback = () => {
			super.disconnectedCallback()
		}
	}
	return TailwindMixinClass as Constructor<CustomElementConstructor> &
		Constructor<ITailwindElementMixin> &
		Constructor<LitElement> &
		Constructor<IBaseMixin>
}
