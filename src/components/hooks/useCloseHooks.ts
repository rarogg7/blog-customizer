import { useEffect, useCallback } from 'react';

export function useClose(
	isOpen: boolean,
	onClose: () => void,
	sidebarRef: React.RefObject<HTMLDivElement>
) {
	const handleEsc = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			const refElement = sidebarRef.current;
			if (!refElement) return;

			const target = event.target as Node;
			if (!refElement.contains(target)) {
				onClose();
			}
		},
		[onClose, sidebarRef]
	);

	useEffect(() => {
		if (!isOpen) return;

		document.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, handleEsc, handleClickOutside]);
}
