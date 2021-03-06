export class NumeneraNPCActor extends Actor {
  static defaultInfo() {
    return `<h2>${game.i18n.localize("NUMENERA.npc.motive")}</h2><p>...</p>
    <h2>${game.i18n.localize("NUMENERA.npc.combat")}</h2><p>...</p>
    <h2>${game.i18n.localize("NUMENERA.npc.interaction")}</h2><p>...</p>
    <h2>${game.i18n.localize("NUMENERA.npc.use")}</h2><p>...</p>
    <h2>${game.i18n.localize("NUMENERA.npc.loot")}</h2><p>...</p>
    <h2>${game.i18n.localize("NUMENERA.npc.gmIntrusion")}</h2><p>...</p>`;
  }

  constructor(...args) {
    super(...args);

    this.data.data.info = this.data.data.info || NumeneraNPCActor.defaultInfo();
  }

  getInitiativeFormula() {   
    /* TODO: improve this
    The init system expects a formula for initiative: fixed values don't seem to work.
    I needed a workaround but "0d20+6" does not even parse. However, "1d1-1" works.
    The "0.1" part is to make it impossible to get ties on init rolls.
    */
    
    return "1d1-1.1+" + 3 * this.data.data.level;
  }

  async update(data, options) {
    //This is the rule of thumb proposed in the manual, so it makes sense as a default value
    if ("data.level" in data && data["data.level"] !== this.data.data.level) {
      data["data.health.max"] = 3 * data["data.level"];
    }

    //Update current health with max, this way tokens created from the NPC will have full health on creation
    if ("data.health.max" in data && data["data.health.max"] !== this.data.data.health.max) {
      data["data.health.value"] = data["data.health.max"];
    }

    return super.update(data, options);
  }
}
