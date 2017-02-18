import * as THREE from 'three';

class Scene {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.layer = 1;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, width / height, 1, 10000 );
    this.light = new THREE.AmbientLight( 0xffffff, 1 );
    this.renderer = new THREE.WebGLRenderer();
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    // this.plane = new Plane( 100, 100 );
    // this.controls = new THREE.TrackballControls( this.camera );
    // this.grid = new Grid( 100, 100, lifeTracker );
    // this.rollOverMaterial = new THREE.MeshBasicMaterial( { color: "#ffffff", opacity: 0.5, transparent: true } );
    this.boxGeo = new THREE.BoxBufferGeometry(10, 10, 10);
    this.normalMaterial = new THREE.MeshNormalMaterial({
      opacity: 1,
      transparent: true,
    });
    this.box = new THREE.Mesh( this.boxGeo, this.normalMaterial );

    this.animate = this.animate.bind(this);


    this.ctx = new AudioContext();
    this.audio = document.getElementById('song');
    this.audioSrc = this.ctx.createMediaElementSource(this.audio);
    this.analyser = this.ctx.createAnalyser();

    this.audioSrc.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.analyser.fftSize = 64;

    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
  }

  _createRenderer() {
    this.renderer.setClearColor( "#ffffff", 1 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.width, this.height );
    document.body.append( this.renderer.domElement );
  }

  _setPositions() {
    this.camera.position.set( 0, 300, 300 );
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
  }

  _addLightToScene() {
    this.scene.add( this.light );
  }

  setUpSceneAll (objects) {
    this._createRenderer();
    this._setPositions();
    this._addLightToScene();
    // this._renderControls();
  }

  render() {
    this.renderer.render( this.scene, this.camera );
  }

  animate() {
    this.analyser.getByteFrequencyData(this.frequencyData);
    // frequencyData.forEach((value, i) => {
    //   ctxCanvas.fillRect(i*2, 300-value, 1, 1);
    // });
    this.box.position.z = this.frequencyData[15] * -1;
    requestAnimationFrame( this.animate );
    this.render();
  }

  add() {
    this.scene.add(this.box);
  }

  remove(object) {
    this.scene.remove(object);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }


  // _addGeneration() {
  //   this.scene.add(this.grid.cells);
  // }

  // _cameraFollowGrowth() {
  //   this.camera.position.set(this.camera.position.x, this.camera.position.y + 2, this.camera.position.z + 7);
  // }



  // _addPlane(objects) {
  //   objects.push( this.plane.plane );
  //   this.scene.add( this.plane.plane );
  //   this.scene.add( this.plane.grid );
  // }

  // _createRollOver() {
  //   this.scene.add( this.rollOverMesh );
  // }



  // _renderControls() {
  //   this.controls.addEventListener( "change", this.render.bind(this) );
  // }


  // removeRollOver() {
  //   this.scene.remove( this.rollOverMesh );
  // }

  // makeGrid() {
  //   this.grid.makeGrid();
  // }
  //
  // addBlocks() {
  //   for ( let i = 0; i < this.grid.cells.length; i++ ) {
  //     this.scene.add( this.grid.cells[i] );
  //   }
  // }



  // getIntersectObjects(objectArray) {
  //   return this.raycaster.intersectObjects(objectArray);
  // }

  // step() {
  //   this.grid.step(this.layer);
  //   this._cameraFollowGrowth();
  //   this._addGeneration();
  //   this.layer += 1;
  // }

  // setRollOverMesh(intersectPoint) {
  //   this.rollOverMesh.position.copy( intersectPoint );
  //   this.rollOverMesh.position.divideScalar( 10 ).floor().multiplyScalar( 10 ).addScalar( 5 );
  //   this.rollOverMesh.position.z = 5;
  //   if ( this.rollOverMesh.position.x < -500 ) this.rollOverMesh.position.x = -500;
  //   if ( this.rollOverMesh.position.y < -500 ) this.rollOverMesh.position.y = -500;
  // }

  // setMouse(x, y) {
  //   this.mouse.set(x, y);
  // }

  // setRayfromCamera() {
  //   this.raycaster.setFromCamera( this.mouse, this.camera );
  // }

  // clearPrevious() {
  //   this.grid.cells.forEach(( cell ) => {
  //     this.scene.remove( cell );
  //   });
  //   this.grid.cells = [];
  // }

  // createBox( x = this.rollOverMesh.position.x, y = this.rollOverMesh.position.y ) {
  //   const gridY = ( y - 5 + 500 ) / 10,
  //     gridX = ( x - 5 + 500 ) / 10,
  //     box = new THREE.Mesh( this.rollOverGeo,
  //                           this.normalMaterial
  //                         );
  //   box.position.set( x, y, 5 );
  //   // this.grid.cells.push(box);
  //   this.scene.add(box);
  //   return box;
  // }

  // rollOverXPos() {
  //   return ( this.rollOverMesh.position.x - 5 + 500 ) / 10;
  // }
  //
  // rollOverYPos() {
  //   return ( this.rollOverMesh.position.y - 5 + 500 ) / 10;
  // }



}

export default Scene;
