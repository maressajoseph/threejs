import React, { Component } from 'react'
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

// Style
import './App.css'

let scene, camera, renderer, box, width, height

class App extends Component {
  componentDidMount() {
    width = window.innerWidth
    height = window.innerHeight
    scene = new THREE.Scene()
    camera  = new THREE.PerspectiveCamera(60, width/height, 1, 1000)
    camera.position.set(0, 0, 100)

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    document.getElementById('scene').appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xaaaaaa, 0.9)

    shadowLight.position.set(200, 250, 250)
    shadowLight.castShadow = true
      
    scene.add(shadowLight, hemisphereLight)

    this.addObjects()

    this.animate()

    window.addEventListener('resize', () => {
      width = window.innerWidth
      height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width/height
      camera.updateProjectionMatrix()
    }, false)
  }

  addObjects = () => {
    box = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshStandardMaterial({
        color: 0x795da3
      })
    )
    box.receiveShadow = true
    box.castShadow = true
    box.position.set(0,20,0)
    scene.add(box)
  }

  animate = () => {
    box.rotation.x += 0.01
    box.rotation.y += 0.01
    requestAnimationFrame(this.animate)
    renderer.render(scene, camera)
  }

  render() {
    return (
      <div id="scene" />
    )
  }
}

export default App
