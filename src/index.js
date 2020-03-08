/** @format */

import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import {
    Canvas,
    useLoader,
    useFrame,
    extend,
    useThree
} from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Text from './Text'
import './styles.css'
import Phoenix from './Phoenix'
import Phoenix2 from './Phoenix2'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

const Jumbo = () => {
    const ref = useRef()
    useFrame(
        ({ clock }) =>
            (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z =
                Math.sin(clock.getElapsedTime()) * 0.3)
    )
    return (
        <group ref={ref}>
            <Text hAlign='left' position={[0, 4.2, 0]} children='REACT' />
            <Text hAlign='left' position={[0, 0, 0]} children='THREE' />
            <Text hAlign='left' position={[0, -4.2, 0]} children='FIBER' />
            <Text hAlign='left' position={[12, 0, 0]} children='4' size={3} />
            <Text hAlign='left' position={[16.5, -4.2, 0]} children='X' />
        </group>
    )
}

// This component was auto-generated from GLTF by: https://github.com/react-spring/gltfjsx
function Bird({ speed, factor, url, ...props }) {
    const gltf = useLoader(GLTFLoader, url)
    const group = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useEffect(
        () => void mixer.clipAction(gltf.animations[0], group.current).play(),
        []
    )
    useFrame((state, delta) => {
        group.current.rotation.y +=
            Math.sin((delta * factor) / 2) *
            Math.cos((delta * factor) / 2) *
            1.5
        mixer.update(delta * speed)
    })
    return (
        <group ref={group}>
            <scene name='Scene' {...props}>
                <mesh
                    name='Object_0'
                    morphTargetDictionary={gltf.__$[1].morphTargetDictionary}
                    morphTargetInfluences={gltf.__$[1].morphTargetInfluences}
                    rotation={[1.5707964611537577, 0, 0]}
                >
                    <bufferGeometry
                        attach='geometry'
                        {...gltf.__$[1].geometry}
                    />
                    <meshStandardMaterial
                        attach='material'
                        {...gltf.__$[1].material}
                        name='Material_0_COLOR_0'
                    />
                </mesh>
            </scene>
        </group>
    )
}

function Birds() {
    return new Array(5).fill().map((_, i) => {
        const x =
            (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
        const y = -10 + Math.random() * 20
        const z = -5 + Math.random() * 10
        let bird = ['Stork', 'Parrot', 'Flamingo', 'Phoenix'][
            Math.round(Math.random() * 3)
        ]
        if (i < 2) {
            bird = 'Phoenix'
        }
        // bird = 'Phoenix'
        const xPos = bird != 'Phoenix' ? x : Math.abs(x)
        let speed =
            bird === 'Phoenix' || 'Stork' ? 0.5 : bird === 'Flamingo' ? 2 : 5
        let factor =
            bird === 'Phoenix' || 'Stork'
                ? 0.5
                : bird === 'Flamingo'
                ? 0.25 + Math.random()
                : 1 + Math.random() - 0.5
        if (i === 0) {
            return (
                <Phoenix2
                    key={i}
                    position={[xPos * 0.5, y, xPos * 0.5]}
                    id={i}
                    // rotation={[0, x > 0 ? Math.PI : 0, 0]}
                    speed={speed}
                    factor={factor}
                />
            )
        }
        return bird != 'Phoenix' ? (
            <Bird
                key={i}
                position={[x, y, z]}
                rotation={[0, x > 0 ? Math.PI : 0, 0]}
                speed={speed}
                factor={factor}
                url={`/${bird}.glb`}
            />
        ) : (
            <Phoenix
                key={i}
                position={[xPos * 0.5, y, xPos * 0.5]}
                id={i}
                // rotation={[0, x > 0 ? Math.PI : 0, 0]}
                speed={speed}
                factor={factor}
            />
        )
    })
}

const Controls = props => {
    const { camera } = useThree()
    const controls = useRef()
    useFrame((_, delta) => {
        controls.current && (camera.rotation.y += 0.1 * delta * Math.PI)
        controls.current && controls.current.update()
        console.log(controls.current)
    })
    return <orbitControls ref={controls} args={[camera]} {...props} />
}

function App() {
    // const [scroll, setScroll] = useState(0)
    useEffect(() => {
        function onKeyDown() {
            console.log('keydown')
        }
        window.addEventListener('keydown', onKeyDown, false)
    }, [])

    // useEffect(() => {
    //     function handleResize() {
    //         console.log(window.innerHeight)
    //     }
    //     window.addEventListener('resize', handleResize)
    //     return () => window.removeEventListener('resize', handleResize)
    // }, [])

    // useEffect(() => {
    //     function handleScroll() {
    //         setScroll(window.scrollY)
    //         console.log(window.scrollY)
    //     }
    //     window.onscroll = () => {
    //         console.log(window.pageYOffset)
    //     }
    //     function logOut() {
    //         console.log('logout')
    //     }
    //     window.addEventListener('scroll', handleScroll)
    //     // document.addEventListener('mousedown', logOut())
    //     // document.addEventListener('mousewheel', logOut())
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll)
    //         window.onscroll = null
    //     }
    // }, [])
    return (
        <Canvas camera={{ position: [0, 0, 35] }}>
            <ambientLight intensity={2} />
            <pointLight position={[40, 40, 40]} />
            <Controls enableDamping rotateSpeed={0.3} dampingFactor={0.1} />
            <Suspense fallback={null}>
                <Jumbo></Jumbo>
                <Birds />
            </Suspense>
        </Canvas>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
