
import useCanvasCursor from '../../hooks/useCanvasCursor';

const CanvasCursor = () => {
    useCanvasCursor(); // Activate the cursor effect globally

    return (
        <div>
            {/* Canvas element for cursor effect */}
            <canvas id="canvas" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}></canvas>


        </div>
    );}
export default CanvasCursor
