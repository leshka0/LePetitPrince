import THREE from 'three.js';
window.THREE = THREE
import * as flags from './flags';
import {gui} from './controllers/gui';
import Screen from './screen';
import * as c from './log';
import lights from './webgl/lights';
var $;
$ = require('jquery');

import {cameraDev, cameraUser} from './webgl/cameras';

const renderer = require('./webgl/renderer')
const scene = require('./webgl/scene');

// camera controls
var mouseX = 0
var mouseY = 0
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var dae = null
var sprite = null
var earth = null
var clouds = null
var prince = null
var skyvideo = null
var skyboxMesh
var counter = 0
var gravityspeed = 0.0008
var lensFlare = null
if( flags.debug ){
		var sunspeed = 0.02
	}
else {
	var sunspeed = 0.0013
}


function onDocumentMouseMove(event) {
	mouseX = ( event.clientX - windowHalfX ) * 1;
	mouseY = ( event.clientY - windowHalfY ) * 1;
}
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

//TWEENS
var TweenLite = require("gsap/src/minified/TweenLite.min.js");
require('gsap').CSSPlugin;
console.log (TweenLite)

const OrbitControls = require('three-orbit-controls')(THREE);
// AUDIO LOADER
require('./lib/three/audio/Audio.js') 
require('./lib/three/audio/AudioAnalyser.js') 
require('./lib/three/audio/AudioListener.js') 
require('./lib/three/audio/PositionalAudio.js') 
require('./lib/three/audio/AudioContext.js') 
require('./lib/three/audio/AudioLoader.js') 
//COLLADA LOADER
require('./lib/three/ColladaLoader.js')
require('./lib/three/Animation.js')
require('./lib/three/AnimationHandler.js')
require('./lib/three/KeyFrameAnimation.js')
require('./lib/three/Detector.js')
require('./lib/three/stats.min.js')



class App{

	constructor(){
		if( flags.debug ){
			$( ".fade" ).toggleClass("debug");
		} 
		$('.logo').click(function() {
			$( ".fade" ).toggleClass("fadeOut");
			$( ".interface" ).toggleClass("fadeOut");
		});
		//$('.fade').click(function() {
		//	$( ".fade" ).toggleClass("fadeOut");
		//	$( ".interface" ).toggleClass("fadeOut");
		//});
		$( ".fade" ).toggleClass("fadeOut");
		$( ".interface" ).toggleClass("fadeOut");


		c.enable = true;
<<<<<<< HEAD
		c.log('chapter16');
=======
		c.log('chapter12');
>>>>>>> parent of 0a816cb... chapter 7

		this.zoom( cameraDev, 100 );
		this.zoom( cameraUser, 100 );

		// Renderer
		document.body.appendChild( renderer.domElement )

		// Lights
		for( let id in lights ){
			scene.add(lights[id]);
		};
		

		// Helpers
		if( flags.showHelpers ){
			scene.add( new THREE.GridHelper( 50, 10 ) );
			scene.add( new THREE.AxisHelper( 10 ) );
		}

		// Controls
		this.controls = new OrbitControls( cameraDev, renderer.domElement );

		// Prince
		const texture = new THREE.VideoTexture(document.getElementById('video'))
		texture.minFilter = THREE.LinearFilter;
		texture.magFilter = THREE.LinearFilter;
		prince = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({
			map: texture,
			emissive: 0x000000,
			emissiveMap: texture,
			//side: THREE.DoubleSide,
			color: 0xFFFFFF,
			transparent: true,
			alphaTest: 0.25
		}))
		prince.position.set( 0, 17, 0 )
		prince.scale.set( 0.5, 0.5)
		//prince.rotation.set( 0, Math.PI/2, 0 )
		//scene.add(prince)

		// GUI
		let princeFolder = gui.addFolder('PRINCE')
		//lightFolder.open()
		princeFolder.add(prince.position, 'x', -100, 100).name('pos x')
		princeFolder.add(prince.position, 'y', -100, 100).name('pos y')
		princeFolder.add(prince.position, 'z', -100, 100).name('pos z')
	
		princeFolder.add(prince.scale, 'x', 0, 2).name('scale x')
		princeFolder.add(prince.scale, 'y', 0, 2).name('scale y')

		// Sky Video
		const textureskyvideo = new THREE.VideoTexture(document.getElementById('video-sky'))
		textureskyvideo.minFilter = THREE.LinearFilter;
		textureskyvideo.magFilter = THREE.LinearFilter;
		skyvideo = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({
			map: textureskyvideo,
			emissive: 0xffffff,
			emissiveMap: textureskyvideo,
			side: THREE.DoubleSide,
			color: 0xFFFFFF,
			transparent: true
		}))
<<<<<<< HEAD
		skyvideo.position.set( 4, -195, -122 )
		skyvideo.scale.set( 11.6, 7 )
		//sky.rotation.set( 0, Math.PI/2, 0 )
=======
		skyvideo.position.set( -14, -90, -331 )
		//skyvideo.rotation.set( Math.PI/2, 0, 0 )
		//skyvideo.scale.set( 8, 8 )
		skyvideo.scale.set( 9, 9 )
>>>>>>> parent of 0a816cb... chapter 7
		scene.add(skyvideo)

		// GUI
		let skyVideoFolder = gui.addFolder('SKY-VIDEO')
		//lightFolder.open()
		skyVideoFolder.add(skyvideo.position, 'x', -1000, 1000).name('pos x')
		skyVideoFolder.add(skyvideo.position, 'y', -1000, 1000).name('pos y')
		skyVideoFolder.add(skyvideo.position, 'z', -1000, 1000).name('pos z')
	
		skyVideoFolder.add(skyvideo.scale, 'x', 0, 20).name('scale x')
		skyVideoFolder.add(skyvideo.scale, 'y', 0, 20).name('scale y')

		//SKYBOX
<<<<<<< HEAD
=======
		//var path = "img/skybox/";
>>>>>>> parent of 0a816cb... chapter 7
		var path = "img/skybox12/";
		var format = '.jpg';
		var urls = [
				path + 'px' + format, path + 'nx' + format,
				path + 'py' + format, path + 'ny' + format,
				path + 'pz' + format, path + 'nz' + format
			];
		var materialArray = [];

		for (var i = 0; i < 6; i++)
			materialArray.push( new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture( urls[i] ),
				side: THREE.BackSide
			}));
		var skyMaterial = new THREE.MeshFaceMaterial( materialArray );

		var reflectionCube = new THREE.CubeTextureLoader().load( urls );
		reflectionCube.format = THREE.RGBFormat;
		var refractionCube = new THREE.CubeTextureLoader().load( urls );
		refractionCube.mapping = THREE.CubeRefractionMapping;
		refractionCube.format = THREE.RGBFormat;
		//var cubeMaterial3 = new THREE.MeshPhongMaterial( { color: 0x000000, specular:0xaa0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );
		var cubeMaterial3 = new THREE.MeshLambertMaterial( { color: 0xff6600, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.3 } );
		var cubeMaterial2 = new THREE.MeshLambertMaterial( { color: 0xffee00, envMap: refractionCube, refractionRatio: 0.95 } );
		var cubeMaterial1 = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: reflectionCube } );
		// Skybox
		var shader = THREE.ShaderLib[ "cube" ];
		shader.uniforms[ "tCube" ].value = reflectionCube;
		skyboxMesh = new THREE.Mesh( new THREE.BoxGeometry( 1000, 1000, 1000 ), skyMaterial ); 
		scene.add(skyboxMesh); 
		// GUI
		let skyFolder = gui.addFolder('SKY')
		//lightFolder.open()
		skyFolder.add(skyboxMesh.rotation, 'x', -1, 1).name('rotation x')
		skyFolder.add(skyboxMesh.rotation, 'y', -1, 1).name('rotation y')
		skyFolder.add(skyboxMesh.rotation, 'z', -1, 1).name('rotation z')

		// FLARE
				
		//LensFlare(texture, size, distance, blending, color);
		

		// VIDEO SUN
		var sunvideo = document.createElement( 'video' );
		sunvideo.src = "textures/lensflare/chapter12/lensflare0.mp4";
		sunvideo.loop = true; // must call after setting/changing source
		sunvideo.play();
		var videoImage = document.createElement( 'canvas' );
		videoImage.width = 512;
		videoImage.height = 512;
	
		var videoImageContext = videoImage.getContext( '2d' );
	
		var textureFlare0 = new THREE.Texture( videoImage );

		TweenLite.ticker.addEventListener("tick", function(){
			videoImageContext.drawImage(sunvideo, 0, 0, 512, 512);
			textureFlare0.needsUpdate = true;
		});
		//var textureFlare0 = THREE.ImageUtils.loadTexture( "textures/lensflare/lensflare0.mp4" );

		var textureFlare1 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare1.png" );
		var textureFlare2 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare2.png" );
		var textureFlare3 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare3.png" );
		var textureFlare4 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare4.png" );
		var textureFlare5 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare5.png" );
		var textureFlare7 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare7.png" );
		var textureFlare8 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare8.png" );
		var textureFlare9 = THREE.ImageUtils.loadTexture( "textures/lensflare/chapter12/lensflare9.png" );
		var flareColor = new THREE.Color( 0xFFFF88 );
		
		var blendMode = 2;
		lensFlare = new THREE.LensFlare( textureFlare0, 248, 0.0, THREE.AdditiveBlending, flareColor );
		
		//lensFlare.add( textureFlare2, 712, 0.01, THREE.AdditiveBlending, flareColor );
		//lensFlare.add( textureFlare5, 350, 0.02, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare8, 60, 0.4, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare5, 80, 0.6, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare8, 90, 0.7, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare3, 320, 0.13, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare4, 900, 1.0, THREE.AdditiveBlending, flareColor );
		lensFlare.add( textureFlare9, 52, 0.3, THREE.AdditiveBlending, flareColor );
		lensFlare.position.set(0, 150, 0);
		//scene.add( lensFlare );


		// SPHERE
		var textureLoader = new THREE.TextureLoader();

		var mapA = new THREE.VideoTexture(document.getElementById('video'))
		mapA.minFilter = THREE.LinearFilter;
		mapA.magFilter = THREE.LinearFilter;
		//var mapA = textureLoader.load( "textures/chapter16/earth.jpg" );
		mapA.wrapS = mapA.wrapT = THREE.RepeatWrapping;
		mapA.repeat.set( 1.6, 2 );
		
		var geometry = new THREE.SphereGeometry( 100, 128, 128 )
		var material = new THREE.MeshPhongMaterial( {
			color: 0xffffff, 
			map: mapA,
			emissive: mapA,
    		combine: THREE.MixOperation,
			reflectivity: 0.05, 
			shading: THREE.SmoothShading, 
			wireframe:false} )
		earth = new THREE.Mesh( geometry, material )
		earth.castShadow = false
		earth.receiveShadow = false
		
		earth.position.set( 4, -90, -48 )
		earth.scale.set( 1, 1.4, 1.7 )
		earth.rotation.set( 6.6, 11, 2 )

		scene.add( earth )


		// SPHERE
		var textureLoader = new THREE.TextureLoader();

		var mapA = new THREE.VideoTexture(document.getElementById('video'))
		mapA.minFilter = THREE.LinearFilter;
		mapA.magFilter = THREE.LinearFilter;
		//var mapA = textureLoader.load( "textures/chapter16/earth.jpg" );
		mapA.wrapS = mapA.wrapT = THREE.RepeatWrapping;
		mapA.repeat.set( 1.6, 2 );
		
		var geometry = new THREE.SphereGeometry( 102, 128, 128 )
		var material = new THREE.MeshPhongMaterial( {
			color: 0xffffff, 
			transparent: true,
			alphaMap: mapA,
			emissive: mapA,
    		combine: THREE.MixOperation,
			reflectivity: 0.05, 
			shading: THREE.SmoothShading, 
			wireframe:false} )
		clouds = new THREE.Mesh( geometry, material )
		clouds.castShadow = false
		clouds.receiveShadow = false
		
		clouds.position.set( 4, -90, -48 )
		clouds.scale.set( 1, 1.4, 1.7 )
		clouds.rotation.set( 6.6, 11, 2 )

		scene.add( clouds )

		// GUI
			let objectFolder = gui.addFolder('Object')
			objectFolder.add(earth.position, 'x', -1000, 1000).name('pos x')
			objectFolder.add(earth.position, 'y', -1000, 1000).name('pos y')
			objectFolder.add(earth.position, 'z', -1000, 1000).name('pos z')
			
			objectFolder.add(mapA.repeat, 'x', -2, 20).name('reap x')
			objectFolder.add(mapA.repeat, 'y', -2, 20).name('reap y')
			
			objectFolder.add(mapA.offset, 'x', -100, 100).name('offset x')
			objectFolder.add(mapA.offset, 'y', -100, 100).name('offset y')

			objectFolder.add(earth.rotation, 'x', 0, 20).name('rotation x')
			objectFolder.add(earth.rotation, 'y', 0, 20).name('rotation y')
			objectFolder.add(earth.rotation, 'z', 0, 20).name('rotation z')

			objectFolder.add(earth.scale, 'x', 0, 20).name('scale x')
			objectFolder.add(earth.scale, 'y', 0, 20).name('scale y')
			objectFolder.add(earth.scale, 'z', 0, 20).name('scale z')

		// SPRITE - DELETED
		var textureLoader = new THREE.TextureLoader();
		var mapA = textureLoader.load( "textures/sunparticle.png", createHUDSprites );

		function createHUDSprites ( texture ) {

				var material = new THREE.SpriteMaterial( { 
					map: texture,
					color: 0xffffff
				} );

				sprite = new THREE.Sprite( material );
				sprite.scale.set( 100, 100, 1 );
				//scene.add( sprite );

			}

		// AUDIO
		var audioFile = 'audio/loop/chapter12.mp3';
		var audioListener = new THREE.AudioListener();
		cameraUser.add( audioListener );
		var oceanAmbientSound = new THREE.Audio( audioListener );
		scene.add( oceanAmbientSound );
		var loader = new THREE.AudioLoader();
		loader.load(
			// resource URL
			audioFile,
			// Function when resource is loaded
			function ( audioBuffer ) {
				// set the audio object buffer to the loaded object
				oceanAmbientSound.setBuffer( audioBuffer );
				// play the audio
				if (flags.soundActive == true){
					oceanAmbientSound.play();
				}
				oceanAmbientSound.source.loop = true;
			},
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			}
		);
		//AUDIO voice 
		var audioFile = 'audio/voice/chapter12.mp3';
		var audioListener = new THREE.AudioListener();
		cameraUser.add( audioListener );
		var voiceSound = new THREE.Audio( audioListener );
		scene.add( voiceSound );
		var loader = new THREE.AudioLoader();
		loader.load(
			// resource URL
			audioFile,
			// Function when resource is loaded
			function ( audioBuffer ) {
				// set the audio object buffer to the loaded object
				voiceSound.setBuffer( audioBuffer );
				
				// play the audio
				if (flags.soundActive == true){
					voiceSound.play();
				}
			},
			// Function called when download progresses
			function ( xhr ) {
				console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
			},
			// Function called when download errors
			function ( xhr ) {
				console.log( 'An error happened' );
			}
		);

		//OBJECT LOADER
		var dae_geometry;
		var dae_material;
		var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( 'models/chapter12/planet.dae', function ( collada ) {
			
			console.log("object loaded");
			dae = collada.scene;

			dae_material = new THREE.MeshPhongMaterial( { 

				opacity:0.5, 
				transparent:true, 
				refractionRatio:0.95, 
				color: 0xff0000, 
				reflectivity: 10,
				castShadow: true,
				receiveShadow: true,
				fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
					 } );

			var bmap =  THREE.ImageUtils.loadTexture("models/chapter12/tex/soilBump.jpg", {}, function(){});
			var smap =  THREE.ImageUtils.loadTexture("models/chapter12/tex/soil.jpg", {}, function(){});
			var rmap =  THREE.ImageUtils.loadTexture("models/chapter12/tex/soilShine.jpg", {}, function(){});

			var bump_material = new THREE.MeshPhongMaterial( { 

				specular: 0xcaac83,
				shininess: 35,
				specularMap:  rmap,
 				bumpMap    :  bmap,
				map        :  smap,
				bumpScale  :  -0.1
					 } );



			for (var k = 0; k < dae.children.length; k++) {
				
				

				if (dae.children[k].name == "WINE") {
					for (var i = 0; i < dae.children[k].children.length; i++) {
						dae.children[k].children[i].material = dae_material;
					}
				}
				else {
					for (var i = 0; i < dae.children[k].children.length; i++) {
						dae.children[k].children[i].material = bump_material;		
					}
				}
				console.log(dae.children[k].children.length)

				//if (dae.children[k].children.length != 0) {
				//for (var z = 0; z < dae.children[k].children.length; z++) {
				//		dae.children[k].children[z].castShadow = true;
				//		dae.children[k].children[z].receiveShadow = true;
				//}
				//}
			}

			dae.scale.x = dae.scale.y = dae.scale.z = .3;
			//dae.position.y = -50;
			dae.position.y = -60;
			dae.updateMatrix();
		
			//scene.add( dae );
			
			
			
		} );
		
		

		// Bind
		this.bind()
		this.update();
		this.initscene();
	}
	initscene(){
<<<<<<< HEAD
		TweenMax.to(lights.directional, 15, {intensity:1})
		TweenMax.to(lights.point, 15, {intensity:1})
=======
		TweenMax.to(lights.directional, 15, {intensity:2})
		TweenMax.to(lights.point, 15, {intensity:1})

		prince.material.needsUpdate = true;
		prince.material.emissive.r = 0;
		prince.material.emissive.g = 0;
		prince.material.emissive.b = 0;
		TweenMax.to(prince.material.emissive, 15, {r: 1, g:1, b:1})
>>>>>>> parent of 0a816cb... chapter 7

	}

	bind() {
		Screen.on('resize', this.resize.bind(this));
	}

	zoom( camera, zoom ){
		//cameraUser.position.set( 0, -28, 119 );
		cameraUser.position.set( 0, -128, 119 );
		cameraDev.position.set( 0, -28, 119 );
		//camera.lookAt( new THREE.Vector3() );
	}

	update(){

		requestAnimationFrame( this.update.bind(this) );
		if( flags.debug ){
			this.render( cameraDev,  0, 0, 1, 1 );
			this.render( cameraUser,  0, 0, 0.25, 0.25 );
		} else {
			this.render( cameraDev,  0, 0, 0.25, 0.25 );
			this.render( cameraUser,  0, 0, 1, 1 );
		}
	}
	

	render( camera, left, bottom, width, height ){

		left   *= Screen.width;
		bottom *= Screen.height;
		width  *= Screen.width;
		height *= Screen.height;

		cameraDev.updateProjectionMatrix();
		cameraUser.updateProjectionMatrix();

		renderer.setViewport( left, bottom, width, height );
		renderer.setScissor( left, bottom, width, height );
		renderer.enableScissorTest( true );
		renderer.setClearColor( 0x121212 );

<<<<<<< HEAD
		if( !flags.debug ){
			cameraUser.position.x += ( (mouseX)/100 - cameraUser.position.x ) * .004;
			cameraUser.position.y += ( ( mouseY)/20 - cameraUser.position.y ) * .004;
		} 
=======
		//if( !flags.debug ){
			//cameraUser.position.x += ( (mouseX)/20 - cameraUser.position.x ) * .002;
			cameraUser.position.x += ( (mouseX)/5 - cameraUser.position.x ) * .002;
			
			//cameraUser.position.y += ( ( mouseY)/100 - cameraUser.position.y ) * .004;
			cameraUser.position.y += ( - ( mouseY)/2 - cameraUser.position.y ) * .004;
		//} 
>>>>>>> parent of 0a816cb... chapter 7
		
		if (prince != undefined){
			prince.rotation.y += (( ( mouseX)/2000 - prince.rotation.y ) + Math.sin(counter)*100) * .002;
		}
		//scene.rotation.z = Math.sin((counter)-0.5 )*0.2;
		//scene.rotation.y = Math.sin(counter)*0.1;
		//scene.rotation.x += 0.0005;
		if (dae){
		dae.rotation.z = Math.sin((counter)-0.5 )*0.2;
		dae.rotation.y += 0.001;
		//dae.rotation.x += 0.0005;
		}

		if (skyboxMesh){
			//skyboxMesh.rotation.x += 0.0001;
			skyboxMesh.rotation.z += 0.001;
			skyboxMesh.rotation.y += 0.0001;
		}
		
<<<<<<< HEAD
=======
		lights.directional.position.y = -cameraUser.position.y
		lights.directional.position.x = -cameraUser.position.x
		lights.directional.position.z = -cameraUser.position.z

		lights.point.position.y = cameraUser.position.y *2
		lights.point.position.x = cameraUser.position.x *2
		lights.point.position.z = cameraUser.position.z /2


		//lights.directional.color.setRGB( (Math.sin((counter2) +1)/2)/2+0.5, Math.sin((counter2) +1)/2, Math.sin((counter2)+1)/8.5 );

>>>>>>> parent of 0a816cb... chapter 7
		if (lensFlare){
			lensFlare.position.x = lights.directional.position.x*2;
			lensFlare.position.y = lights.directional.position.y/2;
			lensFlare.position.z = lights.directional.position.z/2;

		}
  		counter += gravityspeed;
		camera.lookAt( scene.position );

		renderer.render( scene, camera );
	}

	resize( ){

		cameraDev.aspect  = Screen.width / Screen.height;
		cameraUser.aspect = Screen.width / Screen.height;

		cameraDev.updateProjectionMatrix()
		cameraUser.updateProjectionMatrix()

		renderer.setSize( Screen.width, Screen.height );
	}
}

export default new App();
