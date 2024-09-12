import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const loader = new GLTFLoader();

const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
scene.receiveShadow = true;

loader.load("/assets/fanta_can/scene.gltf", function(gltf){
    const can = gltf.scene;
    can.position.set(0, -1.5, 0);
    can.rotateX(-0.3);

    window.addEventListener("scroll", function(){
        can.rotation.y = window.scrollY * -0.007;
        can.rotation.z = window.scrollY * 0.0001;
    })

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pg-two",
            start: "0% 95%",
            end: "40% 50%",
            // markers: true,
            scrub: true,
        }
    })
    tl.to(".pg-one #slice",{
        x: "-69%",
        y: "440%",
        ease: Power1.easeOut,
    }, "saath");

    tl.to(canvas, {
        x: "-75%",
        y: "100%",
    }, 'saath')

    tl.to(can.rotation,{
        x: can.rotation.x + 0.1,
        ease: Power1.easeOut,
    },'saath');
    scene.add(can);
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + "% loaded");
}, function(error){
    console.log("an error occured: " +error);
});

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(-30, 100, 10);
light.castShadow = true;
scene.add(light);

const alight = new THREE.AmbientLight(0xffffff, 90);
scene.add(alight);

//constants
const sizes = {
    width: canvas.width,
    height: canvas.height
}

const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width/sizes.height,
    0.1,
    1000
)
camera.position.set(0, 1, 2.5);
camera.lookAt(0, 0, 0);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    alpha:true,
    antialias:true,
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);

// const controls = new OrbitControls(camera, renderer.domElement);

function action(){
    // controls.update();
    
    requestAnimationFrame(action);
    renderer.render(scene, camera);
}

window.addEventListener('resize',function(){
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(sizes.width, sizes.height);
})

action();




var tl2 = gsap.timeline({
    scrollTrigger:{
        trigger: ".pg-three",
        start: "0% 95%",
        end: "40% 50%",
        scrub: true,
    }
})
tl2.from(".pg-three .card #img-1", {
    rotate: "-50deg",
    x: -220,
    ease: Power1.easeOut,
}, "together")
tl2.from(".pg-three .card #img-3", {
    rotate: "50deg",
    x: 220,
    ease: Power1.easeOut,
}, "together")

