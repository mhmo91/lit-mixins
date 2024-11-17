import { CSSResult, LitElement, unsafeCSS } from 'lit'

import style from './tailwind.css?inline'
import { Constructor } from '../'

export const tailwindStyles = unsafeCSS(style)

export const TailwindElement = <T extends CSSResult>(componentStyle?: T) => {
	class TailwindMixinClass extends LitElement {
		static styles = [unsafeCSS(componentStyle), tailwindStyles]
	}
	return TailwindMixinClass as Constructor<LitElement> /* see "typing the subclass" below */
}
