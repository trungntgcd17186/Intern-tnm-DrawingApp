import React, { useEffect, useState, useRef } from "react";
import "./style.css";

function Drawing(props) {
  const canvasRef = useRef();
  const ctxRef = useRef();

  //Set trạng thái
  const [isDrawing, setIsDrawing] = useState(false);
  //Set độ dày ngòi bút.
  const [lineWidth, setLineWidth] = useState(5);
  //Set màu của ngòi bút.
  const [color, setColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;

    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineWidth, color]);

  const handleStartDrawing = ({ nativeEvent }) => {
    //Lấy tọa độ x,y của vị trí người dùng target.
    const { offsetX, offsetY } = nativeEvent;
    //Bắt đầu một đoạn line.
    ctxRef.current.beginPath();
    //Di chuyển con trỏ chuột đến tọa độ x,y.
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const handleEndDrawing = () => {
    //Kết thúc vẽ khi người dùng thả chuột.
    ctxRef.current.closePath();
    setIsDrawing(false);
  };
  const handleDraw = ({ nativeEvent }) => {
    //Kiểm tra nếu không phải đang vẽ thì không làm gì cả.
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    //Vẽ đến vị trí muốn vẽ.
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  //Làm mới
  const handleCleanCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  //Tăng giá trị cho độ dày của đầu bút.
  const handleIncreaseLineWidth = () => {
    //Chỉ được tăng tối đa lên đến 50.
    if (lineWidth <= 45) {
      setLineWidth((prevState) => prevState + 5);
    }
  };

  //Giảm giá trị cho độ dày của đầu bút.
  const handleDecreaseLineWidth = () => {
    //Chỉ được giảm tối đa xuống đến 5.
    if (lineWidth >= 10) {
      setLineWidth((prevState) => prevState - 5);
    }
  };

  //Đổi màu qua bảng màu của input color.
  const handleChangeColor = (e) => {
    setColor(e);
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleStartDrawing}
        onMouseUp={handleEndDrawing}
        onMouseMove={handleDraw}
        width="800"
        height="700"
      ></canvas>
      <div className="toolbox">
        <button onClick={handleDecreaseLineWidth}>-</button>
        <span id="size">{lineWidth}</span>
        <button onClick={handleIncreaseLineWidth}>+</button>
        <input
          type="color"
          onChange={(e) => handleChangeColor(e.target.value)}
        />
        <button onClick={handleCleanCanvas}>X</button>
      </div>
    </div>
  );
}

export default Drawing;
