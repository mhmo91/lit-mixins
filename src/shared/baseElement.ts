import type { Constructor } from './constructor'
import { LitElement } from 'lit'
import { Subject } from 'rxjs'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

export declare class IBaseMixin {
	disconnecting: Subject<boolean>
	classMap: typeof classMap
	styleMap: typeof styleMap
}

export const BaseElement = <T extends Constructor<LitElement>>(superClass: T) => {
	class BaseElement extends superClass {
		disconnecting = new Subject()
		classMap(classes: Record<string, boolean>) {
			const newClasses: Record<string, boolean> = {}
			Object.keys(classes).forEach(key => {
				key
					.trim()
					.split(' ')
					.filter(Boolean)
					.forEach(k => {
						newClasses[k] = classes[key]
					})
			})
			return classMap(newClasses)
		}

		styleMap(styles: Record<string, string | number>) {
			return styleMap(styles)
		}

		disconnectedCallback() {
			this.disconnecting.next(true)
			this.disconnecting.complete()
			super.disconnectedCallback()
		}
	}
	return BaseElement as Constructor<IBaseMixin> & T
}
