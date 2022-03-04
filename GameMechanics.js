class Character {
    constructor(hp, team){
        this.hp = hp;
        this.team = team;
    }
    hurt(damage){
        return this.hp - damage;
    }
}
