import { useState, useEffect } from "react";

interface UseApiState<T> {
	data: T | null;
	loading: boolean;
	error: Error | null;
}

export const useApi = <T>(param: string): UseApiState<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (!param) {
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const response = await fetch(
					`https://ddragon.leagueoflegends.com/cdn/14.14.1/data/en_US/${param}.json`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const result = await response.json();

				setData(result.data as T);
			} catch (err) {
				setError(err as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [param]);

	return { data, loading, error };
};
