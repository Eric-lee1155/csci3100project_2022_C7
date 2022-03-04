class Character {
    constructor(hp, team){
        this.hp = hp;
        this.team = team;
    }
    hurt(damage){
        if(this.hp <= damage){
            this.hp = 0;
        }
        else{
            this.hp -= damage;
        }
    }
}
