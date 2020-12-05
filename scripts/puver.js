// Obligatory comment line for no reason at all

//shoot effect for puver
const puverShoot = new Effect(30, e => {
  Draw.color(Color.valueOf("0A01b7"), Color.valueOf("56D7CA"), e.fslope());
  Draw.alpha(0.5);
  Fill.circle(e.x, e.y, e.fslope() * 5);
  Draw.color(Color.blue, Color.valueOf("0A01b7"), Color.valueOf("0A01b7"), e.fin());
  Angles.randLenVectors(e.id, 8, e.finpow() * 25, e.rotation, 10, (x, y) => {
    Fill.circle(e.x + x, e.y + y, 0.65 + e.fout() * 1.5);
  })
});



//Charge effect for puver
/*
const puverCharge = new Effect(30, e => {
  Draw.color(Color.black, Color.white, e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 10);
});
*/

//trail effect for the shot
const shotTrail = new Effect(10, e => {
  Draw.color(Color.valueOf("#4499he"), Color.white, e.fin());
  Lines.stroke(e.fout() * 2);
  Lines.circle(e.x, e.y, e.fin() * 4);
});

//effect when bullet breaks
const shotHit = new Effect(40, e => {
  Draw.color(Color.white, Color.valueOf("#3eabe6"), e.fin());
  Lines.stroke(e.fout() * 2);
  Fill.circle(e.x, e.y, e.fin() * 7);
});

//frag effect
const blast = new Effect(25, e => {
  Draw.color(Color.valueOf("#4499he"), Color.valueOf("#3eabe6"), e.fin());
  Lines.stroke(e.fin() * 2);
  Lines.circle(e.x, e.y, e.fout() * 2);
});


//makes the shot of puver
const shot = extend(MissileBulletType, {
    update(b){
        if(Mathf.random(1) < 0.85){
            shotTrail.at(b.x, b.y);
            blastShot.create(b.owner, b.team, b.x, b.y, Mathf.random(360), Mathf.random(1));
        }
    }
});

//makes frag bullets
const blastShot = extend(BasicBulletType, {});


const ionisedStatusFX = new Effect(24, e => {
Draw.color(Color.white, Color.black, e.fin());
Lines.stroke(e.fin() * 1);
Lines.circle(e.x, e.y, e.fslope() * 5);
});

const ionisedStatus = extendContent(StatusEffect, "ionisedStatus", {});

ionisedStatus.speedMultiplier = 0.5;
ionisedStatus.armorMultiplier = 0.5;
ionisedStatus.damage = .2;
ionisedStatus.effect = ionisedStatusFX;
ionisedStatus.color  = Color.white;

//extends off the puver hjson file
const puver = extendContent(PowerTurret, "electricTurret3b1", {
  icons(){
    return [
      Core.atlas.find("block-2"),
      Core.atlas.find("pixelcraft-electricTurret3b1")
    ];
  }
});

//givving things stats

//givving puver it's stats (Some are predefined in the puver.hjson file
puver.recoil = 1;
puver.restitution = 0.015;
puver.shootType = shot;
//chargeTime = 30;
//chargeEffects = 5;
//chargeMaxDelay = 10;
//chargeEffect = puverCharge;
//chargeBeginEffect = Fx.none;

//stats of bullet shot by puver
shot.damage = 25;
shot.splashDamage = 15;
shot.splashDamageRadius = 24;
shot.speed = 3;
shot.lifetime = 35;
shot.knockback = 5;
shot.pierce = true;
shot.width = 0;
shot.height = 0;
shot.hitSize = 4
shot.collides = true;
shot.collidesTiles = true;
shot.hitEffect = shotHit;
shot.despawnEffect = Fx.none;
shot.shootEffect = puverShoot;
//shot.smokeEffect = puverSmoke;

//now stats of frag bullet
blastShot.damage = 1;
blastShot.speed = 3;
blastShot.lifetime = 5;
blastShot.knockback = 2;
blastShot.pierce = true;
blastShot.width = 0;
blastShot.height = 0;
blastShot.hitSize = 4;
blastShot.collides = true;
blastShot.collidesTiles = false;
blastShot.hitEffect = blast;
blastShot.despawnEffect = blast;
blastShot.shootEffect = puverShoot;
blastShot.smokeEffect = Fx.smokeCloud;
blastShot.status = ionisedStatus;
