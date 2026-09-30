import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const LAYER_COUNTS = [5, 7, 8, 7, 5]
const LAYER_SPACING = 2.2
const PULSE_COUNT = 14
const ROTATION_SPEED = 0.06
const PULSE_SPEED = 0.45

const THEME_COLORS = {
  light: { node: 0x0b6b57, nodeOpacity: 0.7, line: 0x14584a, lineOpacity: 0.16, pulse: 0x0b6b57 },
  dark: { node: 0x3dbe9f, nodeOpacity: 0.75, line: 0xe8e6e1, lineOpacity: 0.12, pulse: 0x3dbe9f }
}

function buildNetwork() {
  const nodes = []
  const layers = []
  const xStart = (-(LAYER_COUNTS.length - 1) * LAYER_SPACING) / 2

  LAYER_COUNTS.forEach((count, layerIndex) => {
    const layer = []
    for (let i = 0; i < count; i += 1) {
      const y = (i - (count - 1) / 2) * 1.1 + (Math.random() - 0.5) * 0.5
      const z = (Math.random() - 0.5) * 2.4
      const x = xStart + layerIndex * LAYER_SPACING + (Math.random() - 0.5) * 0.3
      const position = new THREE.Vector3(x, y, z)
      layer.push(position)
      nodes.push(position)
    }
    layers.push(layer)
  })

  const edges = []
  for (let li = 0; li < layers.length - 1; li += 1) {
    for (const a of layers[li]) {
      const nearest = [...layers[li + 1]].sort((p, q) => a.distanceTo(p) - a.distanceTo(q))
      for (const b of nearest.slice(0, 2)) edges.push([a, b])
    }
  }
  return { nodes, edges }
}

export default function NeuralCanvas({ theme }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const colors = THEME_COLORS[theme] || THEME_COLORS.light

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return undefined // WebGL unavailable - the hero works fine without the visual
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    )
    camera.position.z = 9

    const tilt = new THREE.Group()
    const network = new THREE.Group()
    tilt.add(network)
    scene.add(tilt)

    const { nodes, edges } = buildNetwork()

    const nodeGeo = new THREE.SphereGeometry(0.045, 10, 10)
    const nodeMat = new THREE.MeshBasicMaterial({
      color: colors.node,
      transparent: true,
      opacity: colors.nodeOpacity
    })
    for (const position of nodes) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat)
      mesh.position.copy(position)
      network.add(mesh)
    }

    const linePositions = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      linePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], i * 6)
    })
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineBasicMaterial({
      color: colors.line,
      transparent: true,
      opacity: colors.lineOpacity
    })
    network.add(new THREE.LineSegments(lineGeo, lineMat))

    const pulseGeo = new THREE.SphereGeometry(0.07, 10, 10)
    const pulseMat = new THREE.MeshBasicMaterial({ color: colors.pulse })
    const randomEdge = () => edges[Math.floor(Math.random() * edges.length)]
    const pulses = []
    for (let i = 0; i < PULSE_COUNT; i += 1) {
      const mesh = new THREE.Mesh(pulseGeo, pulseMat)
      mesh.visible = !reducedMotion
      pulses.push({ mesh, edge: randomEdge(), t: Math.random() })
      network.add(mesh)
    }

    let targetTiltX = 0
    let targetTiltY = 0
    const onPointerMove = (event) => {
      targetTiltY = (event.clientX / window.innerWidth - 0.5) * 0.35
      targetTiltX = (event.clientY / window.innerHeight - 0.5) * 0.2
    }

    let inView = true
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { threshold: 0 }
    )
    visibilityObserver.observe(container)

    const clock = new THREE.Clock()
    let rafId = 0

    const renderFrame = () => renderer.render(scene, camera)

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!inView || document.hidden) return
      const dt = Math.min(clock.getDelta(), 0.05)

      network.rotation.y += ROTATION_SPEED * dt
      tilt.rotation.x += (targetTiltX - tilt.rotation.x) * 0.05
      tilt.rotation.y += (targetTiltY - tilt.rotation.y) * 0.05

      for (const pulse of pulses) {
        pulse.t += PULSE_SPEED * dt
        if (pulse.t > 1) {
          pulse.edge = randomEdge()
          pulse.t = 0
        }
        const [a, b] = pulse.edge
        pulse.mesh.position.set(
          a.x + (b.x - a.x) * pulse.t,
          a.y + (b.y - a.y) * pulse.t,
          a.z + (b.z - a.z) * pulse.t
        )
      }
      renderFrame()
    }

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container
      if (clientWidth === 0 || clientHeight === 0) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      if (reducedMotion) renderFrame()
    })
    resizeObserver.observe(container)

    if (reducedMotion) {
      network.rotation.y = 0.5
      renderFrame()
    } else {
      window.addEventListener('mousemove', onPointerMove, { passive: true })
      animate()
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onPointerMove)
      visibilityObserver.disconnect()
      resizeObserver.disconnect()
      nodeGeo.dispose()
      nodeMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      pulseGeo.dispose()
      pulseMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return <div ref={containerRef} className="neural-canvas" />
}
