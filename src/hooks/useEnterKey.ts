export function useEnterKey(action: (e: React.KeyboardEvent) => void): (event: React.KeyboardEvent) => void {
  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      action(event);
    }
  };
}
