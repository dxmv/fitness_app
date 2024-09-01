import React, { ReactNode, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import useAuth from "../hooks/auth/useAuth";

// This component will handle the protected routing logic
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated, loading } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const inAuthGroup = segments[0] === "(auth)";
		if (!loading) {
			if (!isAuthenticated && !inAuthGroup) {
				router.replace("/(auth)/login");
			}
		}
	}, [segments, isAuthenticated, loading]);

	return <>{children}</>;
};

export default ProtectedRoutes;
