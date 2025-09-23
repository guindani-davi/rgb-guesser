"use client";
import React from "react";
import { useGameStateManager } from "@/hooks/useGameStateManager";

export default function Game() {
	const { gameStateManager } = useGameStateManager();

	return (
		<div>
			{gameStateManager.render()}
		</div>
	);
}
