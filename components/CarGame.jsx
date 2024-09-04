'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import Vehicle from './Vehicle'
import FallingShapes from './fallingShapes'

function CarGame() {
  
  function handleGameOver() {
    alert("Game Over")
    window.location.reload()
  }

  return (
    <Canvas className='h-screen'>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <Physics>
        <Vehicle />
        <FallingShapes onGameOver={handleGameOver} />
        <mesh receiveShadow>
          <boxGeometry args={[100, 0.1, 100]} />
          <meshStandardMaterial color='green' />
        </mesh>
      </Physics>
      <gridHelper args={[10, 10]} />
    </Canvas>
  )
}

export default CarGame
