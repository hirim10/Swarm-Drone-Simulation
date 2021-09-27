
const flock = [];
let flag1=0;
let flag2=0;
let flag3=0;
let flag4=0;

function setup() {
  createCanvas(1400,650);//creates screen

  for (let i = 0; i <50; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(51);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
    if(flag1==1){
      boid.targetForce(createVector(1000,150),1);
    }
    if(flag2==1){
      boid.targetForce(createVector(1200,50),2);
    }
    if(flag3==1){
      boid.targetForce(createVector(1300,500),3);
    }
    if(flag4==1){
      boid.targetForce(createVector(70,580),4);
    }
  }
}

function divideBoids(){
  for (let boid of flock) {
    boid.splitId(Math.floor(Math.random() * 3)+1);
  }
  flag1=1;
  setTimeout(targetOff1, 90000);
  flag2=1;
  setTimeout(targetOff2, 90000);
  flag3=1;
  setTimeout(targetOff3, 90000);
}

function mergeBoids(){
  for (let boid of flock) {
    boid.mergeId(0);
  }
  flag4=1;
  setTimeout(targetOff, 120000);
}

function targetOff(){
  for (let boid of flock){
    boid.targetForceNil(4);
  }
  flag1=0;
  flag2=0;
  flag3=0;
  flag4=0;
}

function targetOff1(){
  for (let boid of flock){
    boid.targetForceNil(1);
  }
  flag1=0;
}

function targetOff2(){
  for (let boid of flock){
    boid.targetForceNil(2);
  }
  flag2=0;
}

function targetOff3(){
  for (let boid of flock){
    boid.targetForceNil(3);
  }
  flag3=0;
}
