/**
 * /*
 * auto-generated by: https://github.com/react-spring/gltfjsx
 *
 * @format
 */

import * as THREE from 'three'
import React, { useEffect, useRef, useState } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Phoenix2({ speed, factor, ...props }) {
    const group = useRef()
    const bird = useRef()
    const { nodes, materials, animations } = useLoader(
        GLTFLoader,
        '/phoenix.glb'
    )

    const actions = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useFrame((state, delta) => {
        group.current.rotation.y +=
            Math.sin((delta * factor) / 2) * Math.cos((delta * factor) / 2) * 2
        mixer.update(delta * speed)
    })
    // useEffect(() => {
    //     actions.current = {
    //         'Take 001_Armature_0': mixer.clipAction(
    //             animations[0],
    //             group.current
    //         )
    //     }
    //     return () => animations.forEach(clip => mixer.uncacheClip(clip))
    // }, [])

    useEffect(
        () => void mixer.clipAction(animations[0], bird.current).play(),
        []
    )

    return (
        <group ref={group}>
            <group
                position={props.position}
                rotation={[0, Math.PI * 0.25, 0]}
                scale={[0.01, 0.01, 0.01]}
                ref={bird}
            >
                <scene name='Scene'>
                    <group name='RootNode_(gltf_orientation_matrix)'>
                        <group
                            name='RootNode_(model_correction_matrix)'
                            position={[-0.62, 0, -17.14]}
                            rotation={[0, 0.05, 0]}
                        >
                            <group
                                name='5f59736c86d4457fa045aec4aea6b7e0fbx'
                                rotation={[Math.PI / 2, 0, 0]}
                            >
                                <group name='Node'>
                                    <group name='RootNode'>
                                        <group name='Node001'>
                                            <group
                                                name='AMesh_Ride_FengHuang_01'
                                                rotation={[-Math.PI / 2, 0, 0]}
                                            />
                                            <group name='Armature_0'>
                                                <primitive
                                                    object={nodes._rootJoint}
                                                />
                                                <skinnedMesh
                                                    material={
                                                        materials.MatI_Ride_FengHuang_01a
                                                    }
                                                    geometry={
                                                        nodes
                                                            .AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01a_0
                                                            .geometry
                                                    }
                                                    skeleton={
                                                        nodes
                                                            .AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01a_0
                                                            .skeleton
                                                    }
                                                    name='AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01a_0'
                                                />
                                                <skinnedMesh
                                                    material={
                                                        materials.MatI_Ride_FengHuang_01b
                                                    }
                                                    geometry={
                                                        nodes
                                                            .AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01b_0
                                                            .geometry
                                                    }
                                                    skeleton={
                                                        nodes
                                                            .AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01b_0
                                                            .skeleton
                                                    }
                                                    name='AMesh_Ride_FengHuang_01_MatI_Ride_FengHuang_01b_0'
                                                />
                                            </group>
                                            <group
                                                name='Node002'
                                                rotation={[-Math.PI / 2, 0, 0]}
                                            />
                                        </group>
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </scene>
            </group>
        </group>
    )
}
