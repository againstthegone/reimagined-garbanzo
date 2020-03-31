class Chart extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <canvas id='${this.id}'></canvas>
        `;
    }
}

customElements.define('rg-chart', Chart);