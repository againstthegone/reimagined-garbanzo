class Chart extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <canvas id='${this.id}' style='width:100%;height:100%'></canvas>
        `;
    }
}

export const TAG: string = 'rg-chart';
customElements.define(TAG, Chart);