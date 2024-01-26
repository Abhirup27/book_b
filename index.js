import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import Stats from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/stats.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'https://unpkg.com/three@0.127.0/examples/jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js';

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
audio2.volume = 1;

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
        var myElement = document.getElementsByTagName('canvas');


        window.addEventListener('resize', setElementSize);

        function setElementSize() {
            myElement = document.getElementsByTagName('canvas');
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
    
            // Set the size of the element, you can adjust this logic as needed
            //var newSize = Math.min(screenWidth, screenHeight) * 0.8; // For example, 80% of the smaller dimension
            myElement[3].style.width = screenWidth + 'px';
            myElement[3].style.height = screenHeight + 'px';
        }

        let mixer;
        const clock = new THREE.Clock();
			const container = document.getElementById( 'container' );

			const stats = new Stats();
			container.appendChild( stats.dom );
        const pmremGenerator = new THREE.PMREMGenerator( renderer );


scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.001 ).texture;
scene.environment.envMapIntensity =0.0001
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
            // if(currAni!= undefined)
            // {
            //     console.log(currAni.time)
            

            //     if (currAni.time +delta >= currAni.getClip().duration) {
            //         console.log("running");
            //         currAni.paused = true;
            //         //currAni.stop();
            //       //  mixer.clipAction( anis[i] ).stop();
            //         // Additional code to handle the end of the animation
            //     }
            // }
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
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                document.addEventListener("touchstart", function(event) {
                    // 'event.key' contains the pressed key
                    console.log('Key pressed:', event.key);
                    var touchPoints = event.touches.length;
                    // You can check for a specific key
                
                    if(touchPoints=2)
                    {
                        currAni= mixer.clipAction( anis[i] );
                       currAni.setLoop(THREE.LoopOnce);
                       currAni.timeScale=1;
                       mixer.time=0;
                       currAni.paused =false;
                       currAni.time=0;
                       currAni.enable=true;
                       currAni.clampWhenFinished = true;
                      // currAni.enable=true;
                       mixer.timeScale=1;
                       currAni.play();
                    // mixer.clipAction( anis[i] ).play();
                        console.log('Enter key pressed!');
                        audio2.play();
                        i++;
                    }
                    if(touchPoints>2)
                    {
                        if(i!=0)
                        { 
                         i--;
                       currAni= mixer.clipAction( anis[i] );
                       currAni.setLoop(THREE.LoopOnce);
                         currAni.timeScale=-1;
                        currAni.clampWhenFinished = true;
                        currAni.time=currAni.getClip().duration;
                        currAni.paused =false;
                         currAni.enable=true;
                         
                         currAni.play();
                         //mixer.timeScale=-1;
                     //  mixer.clipAction( anis[i] ).play();
                          console.log('Enter key pressed!');
                          audio2.play();
                          
                         }
                    }
                });
                // true for mobile device
               // document.write("mobile device");
              }else{
                // false for not mobile device
                //document.write("not mobile device");
                document.addEventListener('keydown', function(event) {
                    // 'event.key' contains the pressed key
                    console.log('Key pressed:', event.key);
                
                    // You can check for a specific key
                    if (event.key === 'Enter') {
                       currAni= mixer.clipAction( anis[i] );
                       currAni.setLoop(THREE.LoopOnce);
                       currAni.timeScale=1;
                       mixer.time=0;
                       currAni.paused =false;
                       currAni.time=0;
                       currAni.enable=true;
                       currAni.clampWhenFinished = true;
                      // currAni.enable=true;
                       mixer.timeScale=1;
                       currAni.play();
                    // mixer.clipAction( anis[i] ).play();
                        console.log('Enter key pressed!');
                        audio2.play();
                        i++;
                    }
                    if (event.key === 'Backspace') {
                        if(i!=0)
                       { 
                        i--;
                      currAni= mixer.clipAction( anis[i] );
                      currAni.setLoop(THREE.LoopOnce);
                        currAni.timeScale=-1;
                       currAni.clampWhenFinished = true;
                       currAni.time=currAni.getClip().duration;
                       currAni.paused =false;
                        currAni.enable=true;
                        
                        currAni.play();
                        //mixer.timeScale=-1;
                    //  mixer.clipAction( anis[i] ).play();
                         console.log('Enter key pressed!');
                         audio2.play();
                         
                        }
                     }
                });
            };
              }
          

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
