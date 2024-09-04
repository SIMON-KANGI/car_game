'use client'

import React, { useRef } from 'react'
import { useBox, useCylinder, useSphere, usePointToPointConstraint } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import useKeyboardControls from '../hooks/useKeyboard'

function Vehicle() {
  const { camera } = useThree()
  const bodyRef = useRef()
  const { forward, backward } = useKeyboardControls()
  const speed = 5

  // Create the vehicle body
  const [bodyApi] = useBox(() => ({
    mass: 1,
    position: [0, 1, 0],
    args: [2, 0.5, 1],
    ref: bodyRef,
  }))

  // Create the wheels
  const [frontWheelRef] = useSphere(() => ({
    mass: 0.5,
    position: [0, 0.7, 1.2],
    args: [0.3],
  }))

  const [backWheelRef1] = useCylinder(() => ({
    mass: 0.5,
    position: [-0.7, 0.7, -1.2],
    args: [0.2, 0.2, 0.2, 12],
    rotation: [Math.PI / 2, 0, 0],
  }))

  const [backWheelRef2] = useCylinder(() => ({
    mass: 0.5,
    position: [0.7, 0.7, -1.2],
    args: [0.2, 0.2, 0.2, 12],
    rotation: [Math.PI / 2, 0, 0],
  }))

  // Attach wheels to the body using constraints
  usePointToPointConstraint(bodyRef, frontWheelRef, {
    pivotA: [0, 0.3, 1.2],
    pivotB: [0, 0, 0],
  })

  usePointToPointConstraint(bodyRef, backWheelRef1, {
    pivotA: [-0.7, 0.3, -1.2],
    pivotB: [0, 0, 0],
  })

  usePointToPointConstraint(bodyRef, backWheelRef2, {
    pivotA: [0.7, 0.3, -1.2],
    pivotB: [0, 0, 0],
  })

  // Move the vehicle based on user input
  useFrame(() => {
    const direction = forward - backward

    if (bodyApi) {
      bodyApi.velocity.set(
        direction * speed,
        bodyApi.velocity.current[1],
        bodyApi.velocity.current[2]
      )
    }
  })

  return (
    <>
      <mesh ref={bodyRef}>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh ref={frontWheelRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
      <mesh ref={backWheelRef1}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
      <mesh ref={backWheelRef2}>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 12]} />
        <meshStandardMaterial color="darkblue" />
      </mesh>
    </>
  )
}

export default Vehicle
