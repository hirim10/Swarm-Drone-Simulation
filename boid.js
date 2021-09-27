
class Boid {
  constructor() {
    this.position = createVector(random(0,1*width/5), random(4*height/5,height));// gives starting position of drone in bottom left corner
    this.velocity =p5.Vector.random2D();//creates random 2 d  unit vector
    this.velocity.setMag(random(1,2));//setmag sets the magnitude of the vector to to that number
    this.acceleration = createVector();
    this.maxForce = 0.125;
    this.maxSpeed = 0.5;
    this.id = 0;
    this.targetPos=null;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = width-5;

    } else if (this.position.x < 0) {
      this.position.x = 5;
    }
    if (this.position.y > height) {
      this.position.y =height-5;
    } else if (this.position.y < 0) {
      this.position.y = 5;
    }
  }

  avoidWalls(){
    let steering = createVector(0,0);
    let distanceX=0;
    let distanceY=0;
    let wallforce=4;
    if(abs(this.position.y-height)> this.position.y){
      distanceY=this.position.y;
      steering.y=wallforce/distanceY;
    }
    else if (abs(this.position.y-height)< this.position.y){
      distanceY=abs(this.position.y-height);
      steering.y=-wallforce/distanceY;
    }
    if(abs(this.position.x-width)> this.position.x){
      distanceX=this.position.x;
      steering.x=wallforce/distanceX;
    }
    else if (abs(this.position.x-width)< this.position.x) {
      distanceX=abs(this.position.x-width);
      steering.x=-wallforce/distanceX;
    }
    return steering;
  }

  align(boids) {
    let perceptionRadius=200;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius && other.id == this.id) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(boids) {
    let perceptionRadius=200;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius && other.id == this.id) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d*d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(boids) {
    let perceptionRadius=200;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && other.id == this.id)  {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  vortex(boids) {
    let radius = 5;
    let steering = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < radius && other.id == this.id ) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(2.5);
    }
    return steering;
  }

  flock(boids) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let separation = this.separation(boids);
    let walls = this.avoidWalls();
    let vortex=this.vortex(boids);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
    this.acceleration.add(walls);
    this.acceleration.add(vortex);
    this.acceleration.add(this.targetPos);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show() {
    strokeWeight(3);//size of drone
    stroke(255);
    point(this.position.x, this.position.y);//maps the location of drones
  }

  splitId(droneId){
    if(this.id==0){
      this.id = droneId;
    }
  }

  mergeId(droneId){
    this.id = droneId;
  }

  targetForce(pos,droneId){
    if(this.id==droneId)
    {
      let d = dist(this.position.x,this.position.y,pos.x,pos.y);
      abs(d);
      if(d<50){
        this.targetPos=0;
      }
      else{
        pos.sub(this.position);
        pos.setMag(this.maxSpeed);
        //pos.sub(this.velocity);
        pos.limit(this.maxForce);
        this.targetPos=pos;
      }
    }
    else if (droneId==4) {
      let d = dist(this.position.x,this.position.y,pos.x,pos.y);
      abs(d);
      if(d<50){
        this.targetPos=0;
      }
      else{
        pos.sub(this.position);
        pos.setMag(this.maxSpeed);
        //pos.sub(this.velocity);
        pos.limit(this.maxForce);
        this.targetPos=pos;
      }
    }
  }

  targetForceNil(droneId){
    if(this.id==droneId)
    {
      this.targetPos=0;
    }
    else if (droneId==4) {
      this.targetPos=0;
    }
  }
}
