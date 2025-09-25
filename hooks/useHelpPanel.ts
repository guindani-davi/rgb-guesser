import { useCallback, useState } from "react";

interface UseHelpPanelReturn {
  isHelpVisible: boolean;
  toggleHelp: () => void;
}

export function useHelpPanel(
  initialVisible: boolean = false
): UseHelpPanelReturn {
  const [isHelpVisible, setIsHelpVisible] = useState(initialVisible);

  const toggleHelp = useCallback(() => {
    setIsHelpVisible((prev) => !prev);
  }, []);

  return {
    isHelpVisible,
    toggleHelp,
  };
}
