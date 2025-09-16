"use client";
import React, { useEffect, useState } from "react";
import { IGameState } from "@/models/GameState"
import { MainMenu } from "@/components/GameStates/MainMenu";

export default function Game() {
  const [gameState, setGameState] = useState<IGameState>(
    new MainMenu(() => {})
  );

  useEffect(() => {
    setGameState(new MainMenu(setGameState));
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
      gameState.tick();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState]);

  return <div>{gameState.getView()}</div>;
}
