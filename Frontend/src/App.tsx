import "./App.css";
import { useAccount, useContractRead } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import colorAbi from "../../Contract/artifacts/contracts/Cell.sol/BoardColor.json";
import { useEffect, useState } from "react";
import glowImg from "./assets/glow.avif";
import glareImg from "./assets/glare.avif";

function App() {
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [output, setOutput] = useState({
    x: "",
    y: "",
    id: 0,
    color: "",
  });
  const [board, setBoard] = useState<{ id: number; color: string }[][]>();

  const { isConnected } = useAccount();

  const boardContract = {
    address: "0x7d58894Cd6fD2b328B9409ee35AF70E1FD9A5759" as `0x${string}`,
    abi: colorAbi.abi,
  };

  // const {
  //   data: colorData,
  //   loading: colorLoading,
  //   error: colorError,
  // } = useContractRead({
  //   ...boardContract,
  //   functionName: "getCellColor",
  //   args: [x, y],
  //   watch: true,
  // });

  const {
    data: _boardData,
    loading: boardLoading,
    error: boardError,
  } = useContractRead({
    ...boardContract,
    functionName: "getAllArray",
  });

  useEffect(() => {
    if (isConnected) {
      const data = _boardData as number[][];
      setBoard(
        data.map((arr) =>
          arr.map((num) => ({
            id: num,
            color: "",
          }))
        )
      );
    }
  }, [_boardData, isConnected]);

  const colorGrid = (item: number): string =>
    item === 2 ? "black" : item === 3 ? "red" : item === 4 ? "blue" : "white";

  const handleQuery = () => {
    const _board = board;
    if (!_board || !x || !y) return;
    const _x = Number(x);
    const _y = Number(y);
    _board[_x][_y].color = colorGrid(_board[_x][_y].id);

    setOutput({
      x,
      y,
      ..._board[_x][_y],
    });

    setBoard(_board);
    setX("");
    setY("");
  };

  return (
    <div className="bg-slate-900 text-slate-50 h-screen w-screen p-8 lg:px-16  font-">
      <div>
        <img
          src={glowImg}
          alt=""
          className="w-[80vw] h-[60vh] absolute top-0 right-0"
        />
        <img
          src={glareImg}
          alt=""
          className="w-[70vw] h-[40vh] opacity-10 rotate-180 absolute bottom-0 left-0"
        />
      </div>

      <header className="flex justify-between items-center">
        <h1 className="text-4xl font-black">ColorBoard</h1>
        <ConnectButton />
      </header>

      {isConnected && board && (
        <main className="grid  gap-4 relative z-50  my-4 lg:my-16">
          <div className="max-w-md mx-auto">
            <div className="flex gap-x-4">
              <input
                type="text"
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="X coordinates (0 - 4)"
                className="rounded p-2 focus:ring-2 focus:outline-none w-full text-slate-900"
              />
              <input
                type="text"
                value={y}
                onChange={(e) => setY(e.target.value)}
                placeholder="Y coordinates (0 -6)"
                className="rounded p-2 focus:ring-2 focus:outline-none w-full text-slate-900"
              />
            </div>
            <button
              className="rounded p-2 mt-4 focus:ring-2 w-full bg-slate-900 shadow shadow-slate-700 disabled:bg-slate-400 disabled:opacity-40"
              onClick={() => handleQuery()}
              disabled={!x || !y}
            >
              Find
            </button>
          </div>
          <div className="flex gap-6 justify-center">
            <p>X coordinates: {output.x}</p>
            <p>Y coordinates: {output.y}</p>
            <p>Color ID: {output.id > 0 && output.id}</p>
            <p>Color: {output.color}</p>
          </div>
          <div className="grid gap-2 w-max mx-auto">
            {!boardLoading &&
              board?.map((data, indexOut) => (
                <div
                  className="grid grid-flow-col w-max gap-2 h-16"
                  key={indexOut}
                >
                  {data.map(({ id, color }, index) => (
                    <div
                      className="w-16 inset-0 rounded bg-white bg-opacity-20 border hover:cursor-pointer hover:scale-105 transition-all duration-75 active:scale-90 "
                      style={{ background: color }}
                      key={index}
                    ></div>
                  ))}
                </div>
              ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
