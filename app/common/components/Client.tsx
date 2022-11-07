import { PropsWithChildren, useEffect, useState } from "react";

export function Client({children}: PropsWithChildren){
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, [])

	if(mounted) return <>{children}</>
	return null
}