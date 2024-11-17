Here’s the full content wrapped within Markdown formatting:

# TailwindElement Mixin

**TailwindElement** is a mixin that combines the power of **LitElement** with **Tailwind CSS** for scoped, maintainable styling and adds enhanced lifecycle management via `this.disconnecting`.

---

## Why Use TailwindElement?

1. **LitElement + Tailwind CSS**: Combines LitElement’s declarative and reactive capabilities with Tailwind’s utility-first CSS.
2. **Scoped Styling**: Avoid global style conflicts by scoping Tailwind to your component.
3. **Lifecycle Utilities**: Use `this.disconnecting` for automatic cleanup of subscriptions, listeners, or resources.

---

## How to Use

### Import and Extend

Here’s how to create a simple component using `TailwindElement`:

```typescript
import { TailwindElement } from '@mhmo91/lit-mixins/src'
import { html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { interval } from 'rxjs'
import { takeUntil } from 'rxjs'

@customElement('example-component')
export class ExampleComponent extends TailwindElement(
	css`
		:host {
			display: block;
		}
		.container {
			@apply p-4 rounded-lg text-white;
		}
		.active {
			@apply bg-green-500;
		}
		.inactive {
			@apply bg-red-500;
		}
	`,
) {
	@state() active: boolean = false

	connectedCallback() {
		super.connectedCallback()

		// Example: Toggle active state every second, automatically clean up on disconnect
		interval(1000)
			.pipe(takeUntil(this.disconnecting))
			.subscribe(() => {
				this.active = !this.active
			})
	}

	render() {
		return html`
			<div class="container ${this.active ? 'active' : 'inactive'}">
				<p class="font-bold">${this.active ? 'Active' : 'Inactive'}</p>
			</div>
		`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'example-component': ExampleComponent
	}
}
```

## Features

1. LitElement + Tailwind CSS

   • Write LitElement components while enjoying the utility-first CSS of Tailwind.
   • Combine css and Tailwind for fully reactive, scoped styles.

Example:

```css
css`  :host {
    display: block;
  }
  .container {
    @apply p-4 bg-gray-100 rounded-lg;
  }`;
```

2. this.disconnecting for Lifecycle Management

   • Automatically clean up RxJS subscriptions, event listeners, or other resources during disconnectedCallback.

Example: Auto-Cleanup with RxJS

```js
connectedCallback() {
super.connectedCallback();

someObservable.pipe(takeUntil(this.disconnecting)).subscribe(value => {
console.log('Received value:', value);
});
}
```

## Installation

```bash
npm install @mhmo91/lit-mixins
```
