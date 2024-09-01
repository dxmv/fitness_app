import { useEffect, useState } from "react";
import secureStorage from "../../utils/secureStorage";
import userApi from "../../api/userApi";

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const auth = async () => {
		const token = await secureStorage.getToken();
		if (token) {
			try {
				const user = await userApi.getCurrent();
				if (user) {
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			} catch (e) {
				// Invalid token
				setIsAuthenticated(false);
			}
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false);
	};

	useEffect(() => {
		auth();
	}, [auth]);

	return { isAuthenticated, loading };
};

export default useAuth;
