
import '@fluentui/web-components/radio-group.js';
import '@fluentui/web-components/radio.js';
import '@fluentui/web-components/field.js';

import {
  html,
  repeat,
  customElement,
  FASTElement,
  observable,
  Updates,
} from '@microsoft/fast-element';

import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';
setTheme(webLightTheme);

const template = html<MyComponent>`
  <fluent-radio-group orientation="vertical">
    ${repeat(
      (x) => x.radios,
      html`
      <fluent-field
        label-position="after"
      >
        <label slot="label">
          <span>${(x) => x.label}</span>
        </label>
        <fluent-radio
          ?disabled=${(x) => !!x.disabled}
          slot="input"
          value=${(x) => x.value}
          checked=${(x, c) => x.value === c.parent.currentValue}
        ></fluent-radio>
      </fluent-field>
      `
    )}
  </fluent-radio-group>

  <button @click="${(x) => x.updateData()}">Update data</button>
`;

const defaultData = [
  { label: 'Apple', value: 'apple', disabled: false },
  { label: 'Banana', value: 'banana', disabled: false },
  { label: 'Orange', value: 'orange', disabled: false },
];

@customElement({
  name: 'my-comp',
  template: template,
})
export class MyComponent extends FASTElement {
  @observable
  radios = defaultData;

  @observable
  currentValue = 'banana';

  updateData = async () => {
    this.radios = [
      { label: 'Apple', value: 'apple', disabled: false },
      { label: 'Banana', value: 'banana', disabled: true }, // change is here
      { label: 'Orange', value: 'orange', disabled: false },
    ]
    await Updates.next();
    this.radios = defaultData;
  }
}
