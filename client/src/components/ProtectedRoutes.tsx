import React, { ReactNode, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import secureStorage from "../utils/secureStorage";

// This component will handle the protected routing logic
const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const redirect = async () => {
			const token = await secureStorage.getToken();
			const inAuthGroup = segments[0] === "(auth)";

			if (!token && !inAuthGroup) {
				// Redirect to the login page if the user is not logged in and not in the auth group
				router.replace("/(auth)/login");
			}
		};
		redirect();
	}, [segments]);

	return <>{children}</>;
};

export default ProtectedRoutes;
