import * as THREE from 'https://unpkg.com/three@0.149.0/build/three.module.js';
import Stats from 'https://unpkg.com/three@0.149.0/examples/jsm/libs/stats.module.js';
import {OrbitControls} from 'https://unpkg.com/three@0.149.0/examples/jsm/controls/OrbitControls.js'
import { RoomEnvironment } from 'https://unpkg.com/three@0.149.0/examples/jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.149.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.149.0/examples/jsm/loaders/DRACOLoader.js';

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


document.getElementsByTagName("body")[0].style.marginTop=0;
var raycaster;

    var mouse = new THREE.Vector2();

// Start playing the audio

        // Set up a camera
        var i=0;

        // Create a renderer
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        var myElement = document.getElementsByTagName('canvas');
        var myTextElement1 = document.getElementById('head');
        var myTextElement2 = document.getElementById('head2');
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
      myTextElement1.style.marginTop=0;
        if(isMobile())
{
        var textSize1 = Math.min(screenWidth, screenHeight) * 0.04; // Adjust this factor as needed
        var textSize2 = Math.min(screenWidth, screenHeight) * 0.03; 
        myTextElement1.style.fontSize = textSize1 + 'px';
        myTextElement2.style.fontSize = textSize2 + 'px';

        }
        else
        {
            if(screenWidth>1920 && screenHeight>1080)
        {

            var textSize1 = Math.min(screenWidth, screenHeight) * 0.02; // Adjust this factor as needed
        var textSize2 = Math.min(screenWidth, screenHeight) * 0.01; 
        myTextElement1.style.fontSize = textSize1 + 'px';
        myTextElement2.style.fontSize = textSize2 + 'px';
        }
        else
        {
            var textSize1 = Math.min(screenWidth, screenHeight) * 0.04; // Adjust this factor as needed
            var textSize2 = Math.min(screenWidth, screenHeight) * 0.02; 
            myTextElement1.style.fontSize = textSize1 + 'px';
            myTextElement2.style.fontSize = textSize2 + 'px';
        }
        }

    // Set the font size of the text element
     
        window.addEventListener('resize', setElementSize);

        function setElementSize() {
            myElement = document.getElementsByTagName('canvas');
            var screenWidth = window.innerWidth;
            var screenHeight = window.innerHeight;
            if(isMobile())
{
            var textSize1 = Math.min(screenWidth, screenHeight) * 0.04; // Adjust this factor as needed
            var textSize2 = Math.min(screenWidth, screenHeight) * 0.03; 
            }
            else
            if(screenWidth>1920 && screenHeight>1080)
            {
    
                var textSize1 = Math.min(screenWidth, screenHeight) * 0.02; // Adjust this factor as needed
            var textSize2 = Math.min(screenWidth, screenHeight) * 0.01; 
            myTextElement1.style.fontSize = textSize1 + 'px';
            myTextElement2.style.fontSize = textSize2 + 'px';
            }
            else
            {
                var textSize1 = Math.min(screenWidth, screenHeight) * 0.04; // Adjust this factor as needed
                var textSize2 = Math.min(screenWidth, screenHeight) * 0.02; 
                myTextElement1.style.fontSize = textSize1 + 'px';
                myTextElement2.style.fontSize = textSize2 + 'px';
            }

        // Set the font size of the text element
             myTextElement1.style.fontSize = textSize1 + 'px';
             myTextElement2.style.fontSize = textSize2 + 'px';
            // Set the size of the element, you can adjust this logic as needed
            //var newSize = Math.min(screenWidth, screenHeight) * 0.8; // For example, 80% of the smaller dimension
           // myElement[3].style.width = screenWidth + 'px';
         //   myElement[3].style.height = screenHeight + 'px';

            camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // Update the renderer size to match the new window dimensions
        renderer.setSize(window.innerWidth, window.innerHeight);
        }

        let mixer;
        const clock = new THREE.Clock();
			const container = document.getElementById( 'container' );

			// const stats = new Stats();
			// container.appendChild( stats.dom );
        const pmremGenerator = new THREE.PMREMGenerator( renderer );


scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.001 ).texture;
scene.environment.envMapIntensity =0.0001
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 7, 5, 8 );

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
           // centerCameraOnObject(model)
            mixer = new THREE.AnimationMixer( model );
            anis=gltf.animations;
            raycaster = new THREE.Raycaster();
            raycaster.params.Far = 100000.0;
            raycaster.far= 100000.0;
           // setElementSize()
            // Event listener for mouse movement
            document.addEventListener('mousedown', onMouseDown, false);
    
            document.addEventListener('touchstart', onMouseDown, false);
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

            //stats.update();
            renderer.render(scene, camera);
            
        }
        //animate();

        function isMobile() {
            var check = false;
            (function(a){
              if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
                check = true;
            })(navigator.userAgent||navigator.vendor||window.opera);
            return check;
          };
        window.onload = function() {
            console.log(isMobile())
            
            // Code to run when all resources have been loaded
            console.log("All resources have been loaded!");
            // Your initialization code here
            if(isMobile()){
                console.log(navigator.userAgent)
                document.addEventListener("touchend", function(event) {
                    // 'event.key' contains the pressed key
                   // console.log('Key pressed:', event.key);
                    var touchPoints = event.touches.length;
                    // You can check for a specific key
                    console.log('touches:', touchPoints);
                    if(touchPoints==3)
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
                    if(touchPoints>3)
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
                    if (event.key === 'e') {
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
                    if (event.key === 'q') {
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


              function onMouseDown(event) {
              
                // Check if it's a left mouse click (button code 0)
                if (event.button === 0) {
                    
                    // Calculate normalized device coordinates (NDC) for the mouse pointer
                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
                    // Update the picking ray with the camera and mouse position
                  
                    raycaster.setFromCamera(mouse, camera);

        
                    // Perform raycast to find intersected objects
                    var intersects = raycaster.intersectObjects(scene.children, true);
        
                    if (intersects.length > 0) {
                        console.log("rrr")
                        // Get the first intersected object
                        var intersectedObject = intersects[0].point;
                        console.log(intersectedObject)
        
                        // Center the camera on the intersected object
                        centerCameraOnObject(intersectedObject);
                    }
                }
            }

            function centerCameraOnObject(object) {
                // Set the camera position to center on the object
               // camera.position.copy(object.position);
                // Optionally, adjust the camera position or rotation as needed
        
                // Look at the object
                controls.target.copy(object)
               // camera.lookAt(object);
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
