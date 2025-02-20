import { useEffect, useState } from "react"
import "./demo5.css"//
 import FormComponent from "@/components/forms/FormComponent"
import { SquareTerminal } from 'lucide-react';


const PipelineEffect = () => {
     const [hoverPos, setHoverPos] = useState({ x: 0, y: 0, visible: false })

     const handleMouseMove = (e) => {
         const rect = e.currentTarget.getBoundingClientRect() // Get form position
         setHoverPos({
             x: e.clientX - rect.left, // Adjust X position
             y: e.clientY - rect.top, // Adjust Y position
             visible: true,
         })
     }

     const handleMouseLeave = () => {
         setHoverPos((prev) => ({ ...prev, visible: false }))
     }
    useEffect(() => {
        const pipeCount = 30
        const pipePropCount = 8
        const pipePropsLength = pipeCount * pipePropCount
        const turnCount = 8
        const turnAmount = (360 / turnCount) * (Math.PI / 180)
        const turnChanceRange = 58
        const baseSpeed = 0.5
        const rangeSpeed = 1
        const baseTTL = 100
        const rangeTTL = 300
        const baseWidth = 2
        const rangeWidth = 4
        const baseHue = 180
        const rangeHue = 60
        const backgroundColor = "hsla(150,80%,1%,1)"

        let container
        let canvas
        let ctx
        let center
        let tick
        let pipeProps

        function setup() {
            createCanvas()
            resize()
            initPipes()
            draw()
        }

        function initPipes() {
            pipeProps = new Float32Array(pipePropsLength)
            for (let i = 0; i < pipePropsLength; i += pipePropCount) {
                initPipe(i)
            }
        }

        function initPipe(i) {
            let x = rand(canvas.a.width)
            let y = center[1]
            let direction = Math.round(rand(1))
                ? Math.PI / 2
                : 2 * Math.PI - Math.PI / 2
            let speed = baseSpeed + rand(rangeSpeed)
            let life = 0
            let ttl = baseTTL + rand(rangeTTL)
            let width = baseWidth + rand(rangeWidth)
            let hue = baseHue + rand(rangeHue)
            pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i)
        }

        function updatePipes() {
            tick++
            for (let i = 0; i < pipePropsLength; i += pipePropCount) {
                updatePipe(i)
            }
        }

        function updatePipe(i) {
            let i2 = 1 + i,
                i3 = 2 + i,
                i4 = 3 + i,
                i5 = 4 + i,
                i6 = 5 + i,
                i7 = 6 + i,
                i8 = 7 + i
            let x = pipeProps[i]
            let y = pipeProps[i2]
            let direction = pipeProps[i3]
            let speed = pipeProps[i4]
            let life = pipeProps[i5]
            let ttl = pipeProps[i6]
            let width = pipeProps[i7]
            let hue = pipeProps[i8]

            drawPipe(x, y, life, ttl, width, hue)
            life++
            x += Math.cos(direction) * speed
            y += Math.sin(direction) * speed
            let turnChance =
                !(tick % Math.round(rand(turnChanceRange))) &&
                (!(Math.round(x) % 6) || !(Math.round(y) % 6))
            let turnBias = Math.round(rand(1)) ? -1 : 1
            direction += turnChance ? turnAmount * turnBias : 0

            pipeProps[i] = x
            pipeProps[i2] = y
            pipeProps[i3] = direction
            pipeProps[i5] = life

            checkBounds(x, y)
            if (life > ttl) initPipe(i)
        }

       function drawPipe(x, y, life, ttl, width, hue) {
           ctx.a.save()
           ctx.a.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.125})`
           ctx.a.beginPath()
           ctx.a.arc(x, y, width, 0, 2 * Math.PI)
           ctx.a.stroke()
           ctx.a.closePath()
           ctx.a.restore()
       }

       function draw() {
           updatePipes()
           render()

           // Stop animation after 5 seconds
           if (tick > 1500) {
               // Adjust this value for timing
               clearCanvas()
               setTimeout(() => {
                   tick = 0 // Reset the animation
                   initPipes() // Reinitialize pipes
                   draw() // Restart the loop
               }, 1000) // Pause for 2 seconds before restarting
           } else {
               window.requestAnimationFrame(draw)
           }
       }

       function clearCanvas() {
           ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height)
           ctx.b.clearRect(0, 0, canvas.b.width, canvas.b.height)
       }


        function checkBounds(x, y) {
            if (x > canvas.a.width) x = 0
            if (x < 0) x = canvas.a.width
            if (y > canvas.a.height) y = 0
            if (y < 0) y = canvas.a.height
        }

        function createCanvas() {
            container = document.querySelector(".content--canvas")
            canvas = {
                a: document.createElement("canvas"),
                b: document.createElement("canvas"),
            }
            canvas.b.style =
                "position: fixed; top: 0; left: 0; width: 100%; height: 100%;"
            container.appendChild(canvas.b)
            ctx = { a: canvas.a.getContext("2d"), b: canvas.b.getContext("2d") }
            center = []
            tick = 0
        }

        function resize() {
            const { innerWidth, innerHeight } = window
            canvas.a.width = innerWidth
            canvas.a.height = innerHeight
            ctx.a.drawImage(canvas.b, 0, 0)
            canvas.b.width = innerWidth
            canvas.b.height = innerHeight
            ctx.b.drawImage(canvas.a, 0, 0)
            center[0] = 0.5 * canvas.a.width
            center[1] = 0.5 * canvas.a.height
        }

        function render() {
            ctx.b.save()
            ctx.b.fillStyle = backgroundColor
            ctx.b.fillRect(0, 0, canvas.b.width, canvas.b.height)
            ctx.b.restore()
            ctx.b.save()
            ctx.b.filter = "blur(12px)"
            ctx.b.drawImage(canvas.a, 0, 0)
            ctx.b.restore()
            ctx.b.save()
            ctx.b.drawImage(canvas.a, 0, 0)
            ctx.b.restore()
        }

       

        const rand = (n) => Math.random() * n
        const fadeInOut = (t, m) => Math.sin((t / m) * Math.PI)

        window.addEventListener("resize", resize)
        setup()

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <main className="pipeline-container">
            <div className="frame"></div>

            <div className="content content--canvas">
                {/* Centered container with vertical alignment */}
                <div className="relative z-20 flex h-auto min-h-screen w-full flex-col items-center justify-center">
                    {/* Heading above the form */}
                    <h1 className="mb-4 flex items-center gap-2 text-4xl font-bold text-white">
                        Welcome to CodeNexus{" "}
                        
                        <span>
                            <SquareTerminal className="h-8 w-8" />
                        </span>
                    </h1>

                    {/* Form Component with Dynamic Glass Effect */}
                    <div
                        className="relative rounded-lg bg-white/10 p-6"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Dynamic glass effect overlay */}
                        {hoverPos.visible && (
                            <div
                                className="absolute rounded-full bg-white/20 backdrop-blur-sm transition-opacity duration-300"
                                style={{
                                    left: `${hoverPos.x}px`,
                                    top: `${hoverPos.y}px`,
                                    width: "60px",
                                    height: "60px",
                                    transform: "translate(-50%, -50%)",
                                    pointerEvents: "none",
                                }}
                            />
                        )}

                        <FormComponent />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PipelineEffect
