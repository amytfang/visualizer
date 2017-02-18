import Scene from './scene';

document.addEventListener('DOMContentLoaded', () => {
  const scene = new Scene(window.innerWidth, window.innerHeight);
  scene.setUpSceneAll();
  scene.addGrid();
  // scene.render();
  scene.animate();
  window.addEventListener( 'resize', scene.onWindowResize.bind(scene), false );


})
