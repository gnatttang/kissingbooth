/**
 * 
 * @param {Object} (optional) position, velocity, diameter properties
 */
function Cell({position, velocity, diameter, life}) {
 
    //--------------------------------------------------------
    //--Begin internal class variables------------------------
    //--------------------------------------------------------
    
    //
    // Note: internal variables that aren't for public use often start with '_'
    //        like '_position'
  
    // set the position if it's passed in
  
  // handle position
    if (position === undefined) { // if it wasn't passed in
        // create default vector
        this._position = createVector(0,0,0);
    }
    else this._position = position; // use object property passed in
    
  
    //----------------------------------------------------------
    // Exercise:
    // Do the same for:
    if (velocity === undefined){
        this._velocity = createVector(0,0);
    }
    else this._velocity = velocity;
    
    if (diameter === undefined){
        this._diameter = 1;
    }
    else this._diameter = diameter;
    
    if (life === undefined){
        this._life = 100;
    }
    else this._life = life;
    
    // 1. this._velocity
    // 2. this._diameter
    // 3. this._life
    //
    // Example default values:
    // -----------------------
    // this._position = createVector(0,0); // global position
    // this.diameter = 1; // diameter of sphere in world units (pixels)
    // this represents how much "life" this cell has (0 is "dead")
    //  this._life = 100;
    //------------------------------------------------------
  

    //-----Other internal properties------------------------

    // current instantaneous acceleration
    this._acceleration = createVector(0,0,0);
  
    
    //---------------------------------------------------
    //--Begin class functions----------------------------
    //---------------------------------------------------
    
  
    /**
     * 
     * @param {p5.Vector, Array, or Number} force Force (3D) to apply to this object.
     */
    this.applyForce = function(force) {
      if (force !== undefined)
      {
        this._acceleration.add(force);
      }
    }
  
  
    /**
     * Internal use only. Apply current acceleration.
     */
    this._accelerate = function()
    {
      this._velocity.add(this._acceleration);
      this._acceleration.mult(0); // remove acceleration
    }
  
    /**
     * This function actually updates the position by accelerating and applying the velocity.
     */
    this.update = function() {
      // EXERCISE: finish this (2 lines of code):

      // 1. call internal accelerate function to apply acceleration
      this._accelerate();
      // 2. add the velocity to the position to "move" the cell
      this._position.add(this._velocity);
      this.life -= 1;
    }
  
  
    /**
     * This function returns the position. Often "getter" function like this
     * are used to get private data without directly giving access to it
     * so it can't be changed outside the class.
     */
  
  
    /**
     * Get diameter safely.
     */
  
    this.getDiameter = function()
    {
      return this._diameter;
    }
    this.getPosition = function()
    {
        return this._position;
    };
    
  
  
    /**
     * ------------------------------------------------------------------
     * EXERCISE: This function should take a Vector representing the centre coordinate 
     * of the sphere world (worldCenterPos) and the diameter of the sphere.
     * It should make sure that this cell's position (taking into account diameter)
     * is inside that sphere world. This function will reverse the direction of the velocity of 
     * the cell when it moves outside the boundaries of the sphere container.
     * It will also move the cell's position to completely back inside the 
     * sphere container to make sure it doesn't get stuck in the border. 
  
     * @param {p5.Vector} worldCenterPos centre coordinate of world as a p5.Vector
     * @param {Number} worldDiameter diameter of world as a number
     */
    this.constrainToSphere = function(worldCenterPos, worldDiameter)
    {
      if (this._position.dist(worldCenterPos) > worldDiameter/2)
      {
        // find point on world sphere in direction of (this._position - worldCenterPos)
        let positionDirection = p5.Vector.sub(this._position,worldCenterPos).normalize();
        
        // new magnitude is inside world sphere accounting for this cell's radius 
        let newMagnitude = worldDiameter/2 - this._diameter;
        this._position = p5.Vector.mult(positionDirection,newMagnitude); // position is magnitude * direction 
  
        this._velocity = positionDirection.mult(-this._velocity.mag()*0.5); // opposite direction, slower!
  
        // this also is interesting and more realistic
        //this.applyForce(positionDirection.mult(-1.2*this._velocity.mag())); // opposite direction, slower!
      }
    }
    //---------------------------------------------------------------
  
  
    //---------------------------------------------------------------
    //--End class functions------------------------------------------
    //---------------------------------------------------------------
  }