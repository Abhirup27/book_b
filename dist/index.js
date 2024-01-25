import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

var scene = new THREE.Scene();

var audio = document.getElementById('myAudio');

// Optional: You can set other audio properties here, such as volume, playback speed, etc.
audio.volume = 0.5;

// Event listener to restart the audio when it ends
audio.addEventListener('ended', function() {
    audio.currentTime = 0; // Reset the playback to the beginning
    audio.play(); // Restart the audio
});

var audio2 = document.getElementById('myAudio2');

// Optional: You can set other audio properties here, such as volume, playback speed, etc.
audio2.volume = 0.5;

// Event listener to restart the audio when it ends
audio2.addEventListener('ended', function() {
    audio2.currentTime = 0; // Reset the playback to the beginning
 // Restart the audio
});


// Start playing the audio

        // Set up a camera
        var i=0;

        // Create a renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        let mixer;
        const clock = new THREE.Clock();
			const container = document.getElementById( 'container' );

			const stats = new Stats();
			container.appendChild( stats.dom );
        const pmremGenerator = new THREE.PMREMGenerator( renderer );


scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.00001 ).texture;
scene.environment.envMapIntensity =0.000001
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.update();
controls.enablePan = false;
controls.enableDamping = true;


        // Load a 3D model
        var loader = new GLTFLoader();

        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        let anis;
        let currAni;
        loader.setDRACOLoader(dracoLoader);
        loader.load('book.glb', function (gltf) {
            const model = gltf.scene;
            model.position.set( 1, 1, 0 );
            model.scale.set( 10, 10, 10 );
            scene.add( model );
            mixer = new THREE.AnimationMixer( model );
            anis=gltf.animations;
				//mixer.clipAction( gltf.animations[ 3 ] ).play();


				animate();
        });

        // Set up lights (Optional)
        var light = new THREE.AmbientLight(0x404040); // soft white light
       // scene.add(light);

    
           audio.play();
    

        // Animate the scene (Optional)
        function animate() {

            if(audio.currentTime==0)
            {
                audio.play();
            }
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            mixer.update( delta );
            if(currAni!= undefined)
            {
                console.log(currAni.time)
            

                if (currAni.time +delta >= currAni.getClip().duration) {
                    console.log("running");
                    currAni.paused = true;
                    //currAni.stop();
                  //  mixer.clipAction( anis[i] ).stop();
                    // Additional code to handle the end of the animation
                }
            }
            // Update any animations or interactions here
           

            controls.update();

            stats.update();
            renderer.render(scene, camera);
        }
        //animate();

        window.onload = function() {
            
            // Code to run when all resources have been loaded
            console.log("All resources have been loaded!");
            // Your initialization code here
            document.addEventListener('keydown', function(event) {
                // 'event.key' contains the pressed key
                console.log('Key pressed:', event.key);
            
                // You can check for a specific key
                if (event.key === 'Enter') {
                   currAni= mixer.clipAction( anis[i] );
                   mixer.clipAction( anis[i] ).play();
                    console.log('Enter key pressed!');
                    audio2.play();
                    i++;
                }
            });
        };

//         const model = gltf.scene;
//     //model.position.set( 1, 1, 0 );
//     //model.scale.set( 0.01, 0.01, 0.01 );
//     scene.add( model );

//     mixer = new THREE.AnimationMixer( model );
//     //mixer.clipAction( gltf.animations[ 0 ] ).play();

//     animate();

// }, undefined, function ( e ) {

//     console.error( e );

// } );


// window.onresize = function () {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// };


// function animate() {

//     requestAnimationFrame( animate );

//     const delta = clock.getDelta();

//     mixer.update( delta );

//     controls.update();

//     stats.update();

//     renderer.render( scene, camera );

// }
