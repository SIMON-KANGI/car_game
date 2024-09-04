'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useBox, useCylinder, useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'

const shapes = [
  { type: 'box', size: [1, 1, 1], mass: 1 },
  { type: 'sphere', size: [0.5], mass: 0.5 },
  { type: 'cylinder', size: [0.5, 1, 32], mass: 2 }
]

function FallingShapes({ onGameOver }) {
  const [fallingShapes, setFallingShapes] = useState([])
  const shapesRef = useRef([])

  useEffect(() => {
    shapesRef.current.forEach((shape) => {
      shape.addEventListener('collide', () => {
        onGameOver()
      })
    })
  }, [onGameOver])

  useFrame(() => {
    if (Math.random() > 0.95) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      setFallingShapes((prev) => [
        ...prev,
        { ...shape, id: Math.random().toString() }
      ])
    }
  })

  return (
    <>
      {fallingShapes.map((shape) => {
        switch (shape.type) {
          case 'box':
            return (
              <FallingBox
                key={shape.id}
                size={shape.size}
                mass={shape.mass}
                onCollide={onGameOver}
              />
            )
          case 'sphere':
            return (
              <FallingSphere
                key={shape.id}
                size={shape.size}
                mass={shape.mass}
                onCollide={onGameOver}
              />
            )
          case 'cylinder':
            return (
              <FallingCylinder
                key={shape.id}
                size={shape.size}
                mass={shape.mass}
                onCollide={onGameOver}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
export default FallingShapes

// Define the falling shape components with display names

const FallingBox = React.forwardRef(({ size, mass, onCollide }, ref) => {
  const [boxRef] = useBox(() => ({
    mass,
    position: [Math.random() * 5, 5, Math.random() * 5],
    args: size,
    onCollide: () => onCollide(),
  }))

  return (
    <mesh ref={ref ? ref : boxRef}>
      <boxGeometry args={size} />
      <meshStandardMaterial color='blue' />
    </mesh>
  )
})
FallingBox.displayName = 'FallingBox'

const FallingSphere = React.forwardRef(({ size, mass, onCollide }, ref) => {
  const [sphereRef] = useSphere(() => ({
    mass,
    position: [Math.random() * 5, 5, Math.random() * 5],
    args: size,
    onCollide: () => onCollide(),
  }))

  return (
    <mesh ref={ref ? ref : sphereRef}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color='green' />
    </mesh>
  )
})
FallingSphere.displayName = 'FallingSphere'

const FallingCylinder = React.forwardRef(({ size, mass, onCollide }, ref) => {
  const [cylinderRef] = useCylinder(() => ({
    mass,
    position: [Math.random() * 5, 5, Math.random() * 5],
    args: size,
    onCollide: () => onCollide(),
  }))

  return (
    <mesh ref={ref ? ref : cylinderRef}>
      <cylinderGeometry args={size} />
      <meshStandardMaterial color='red' />
    </mesh>
  )
})
FallingCylinder.displayName = 'FallingCylinder'
