import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RPGMe extends DDDSuper(I18NMixin(LitElement)) {
    static get tag() {
        return "rpg-me";
}
constructor() {
    super();
    this.title = "Design an RPG Character to Your Liking!";
    this.characterSettings = {
        seed: "00000000",
        base: 0,
        face: 0,
        faceitem: 0,
        hair: 0,
        pants: 0,
        shirt: 0,
        skin: 0,
        size: 300,
        name: "",
        fire: false,
        walking: false,
        hatColor: 0,
        glasses: false,
    };
    this._applySeedToSettings(); 

}

static get properties() {
    return {
        ...super.properties,
        characterSettings: { type: Object },
    };
}

static get styles() {
    return [
        super.styles,
        css`
            :host {
                display: block;
                color: var(--ddd-theme-primary);
                font-family: var(--ddd-font-navigation);
            }
            .container { 
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                align-items: flex-start;        
                padding: 20px;
            }
            .character-preview {
                flex: 1;
                min-width: 300px;
                text-align: center;
                position: relative;
            }
            .character-preview > rpg-character {
                height: var(--rpg-character-size, 200px);  
                width: var(--rpg-character-size, 200px);
                transition: transform 0.3s ease-in-out;
            }
            .seed-display {
                position: absolute;
                top: -50px;
                left: 50%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 0.9rem;
                font-weight: bold;
                pointer-events: none;
            }
            .controls {
            flex: 1;
            min-width: 300px;
            text-align: left;
            }
            wired-input,
            wired-checkbox,
            wired-slider {
            display: block;
            margin-bottom: 15px;
            max-width: 300px;
            }
            label {
            display: block;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
            }
            button {
            margin-top: 10px;
            padding: 10px 20px;
            cursor: pointer;
            background-color: #007bff;
            color: white;
            border: 1px solid #0056b3;
            border-radius: 4px;
            font-size: 16px;
            transition: background-color 0.3s ease, border-color 0.3s ease;
            }
            button:hover {
            background-color: #0056b3;
            border-color: #004085;
            }
            .character-name {
            font-size: 1.5rem;
            margin-bottom: 10px;
            }
            .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 14px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
            z-index: 1000;
            }
            .notification.show {
            opacity: 1;
            }
        `,
        ];
    }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
        <div class="seed-display">Seed: ${this.characterSettings.seed}</div>
          <div class="character-name">${this.characterSettings.name}</div>
          <rpg-character
            base="${this.characterSettings.base}"
            face="${this.characterSettings.face}"
            faceitem="${this.characterSettings.faceitem}"
            hair="${this.characterSettings.hair}"
            pants="${this.characterSettings.pants}"
            shirt="${this.characterSettings.shirt}"
            skin="${this.characterSettings.skin}"
            hatColor="${this.characterSettings.hatColor}"
            .fire="${this.characterSettings.fire}"
            .walking="${this.characterSettings.walking}"
            style="
              --character-size: ${this.characterSettings.size}px;
              --hat-color: hsl(${this.characterSettings.hatColor}, 100%, 50%);
            "
          ></rpg-character>
          </div>

          <div class="controls">
          <label for="characterNameInput">Character Name:</label>
          <wired-input
            id="characterNameInput"
            type="text"
            placeholder="Enter character name"
            @input="${(e) => this._updateSetting('name', e.target.value)}"
          ></wired-input>

          <label for="hairToggle">Hair:</label>
          <wired-checkbox
            id="hairToggle"
            ?checked="${this.characterSettings.base === 1}"
            @change="${(e) =>
              this._updateSetting('base', e.target.checked ? 1 : 0)}"
            >Has Hair</wired-checkbox
          >

          <label for="size">Character Size:</label>
          <wired-slider
            id="size"
            value="${this.characterSettings.size}"
            min="100"
            max="600"
            @change="${(e) => this._updateSetting('size', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="face">Face:</label>
          <wired-slider
            id="face"
            value="${this.characterSettings.face}"
            min="0"
            max="5"
            @change="${(e) => this._updateSetting('face', parseInt(e.detail.value))}"
          ></wired-slider>
          
          <label for="faceitem">Face Item:</label>
          <wired-slider
            id="faceitem"
            value="${this.characterSettings.faceitem}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('faceitem', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="hair">Hair Style:</label>
          <wired-slider
            id="hair"
            value="${this.characterSettings.hair}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('hair', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="pants">Pants Style:</label>
          <wired-slider
            id="pants"
            value="${this.characterSettings.pants}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('pants', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="shirt">Shirt Style:</label>
          <wired-slider
            id="shirt"
            value="${this.characterSettings.shirt}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('shirt', parseInt(e.detail.value))}"
          ></wired-slider>

          <label for="skin">Skin Tone:</label>
          <wired-slider
            id="skin"
            value="${this.characterSettings.skin}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('skin', parseInt(e.detail.value))}"
          ></wired-slider>


          <label for="hatColor">Hat Color:</label>
          <wired-slider
            id="hatColor"
            value="${this.characterSettings.hatColor}"
            min="0"
            max="9"
            @change="${(e) => this._updateSetting('hatColor', parseInt(e.detail.value))}"
          ></wired-slider>

          <wired-checkbox
            ?checked="${this.characterSettings.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >On Fire</wired-checkbox>

          <wired-checkbox
            ?checked="${this.characterSettings.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          >Walking</wired-checkbox>

          <button @click="${this._generateShareLink}">
            Generate Share Link
          </button>
        </div>
      </div>
      
    `;
  }

  _applySeedToSettings() {
    const seed = this.characterSettings.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));
  
    [
      this.characterSettings.base,
      this.characterSettings.face,
      this.characterSettings.faceitem,
      this.characterSettings.hair,
      this.characterSettings.pants,
      this.characterSettings.shirt,
      this.characterSettings.skin,
      this.characterSettings.hatColor,
    ] = values;
  
    this.requestUpdate(); // Ensure UI updates after applying settings
};

    _generateSeed() {
        const { base, face, faceitem, hair, pants, shirt, skin, hatColor } = this.characterSettings;
        this.characterSettings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${hatColor}`;
      }
    
      _updateSetting(key, value) {
        this.characterSettings = { ...this.characterSettings, [key]: value };
        this._generateSeed();
        this.requestUpdate();
      }
    

      }
    
customElements.define(RPGMe.tag, RPGMe);
