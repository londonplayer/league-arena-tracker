import { useState } from "react";
import { useApi } from "../hooks/useApi";
import { Modal } from "../components/modal";

interface Champion {
	id: string;
	name: string;
	title: string;
	image: {
		full: string;
	};
	blurb: string;
}

interface ChampionApiResponse {
	data: Record<string, Champion>;
}

export function Home() {
	const { data, loading, error } = useApi<ChampionApiResponse>("champion");

	const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);

	const handleOpenModal = (champion: Champion) => {
		setSelectedChampion(champion);
	};

	const handleCloseModal = () => {
		setSelectedChampion(null);
	};

	return (
		<div>
			<div style={{ textAlign: "center", marginTop: "20px" }}>
				<h1>League Arena Tracker</h1>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			{data && (
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "5px",
						justifyContent: "center",
						margin: "20px 250px 20px 250px",
						maxWidth: "1200px",
					}}
				>
					{Object.values(data).map((champion) => (
						<div
							key={champion.id}
							style={{ cursor: "pointer" }}
							onClick={() => handleOpenModal(champion)}
						>
							<img
								style={{ width: "60px", height: "60px" }}
								src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${champion.image.full}`}
								alt={champion.name}
							/>
						</div>
					))}
				</div>
			)}

			<Modal isOpen={selectedChampion !== null} onClose={handleCloseModal}>
				{selectedChampion && (
					<div style={{ textAlign: "center" }}>
						<h2>{selectedChampion.name}</h2>
						<img
							style={{ width: "120px", height: "120px" }}
							src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${selectedChampion.image.full}`}
							alt={selectedChampion.name}
						/>
						<div style={{ marginTop: "10px" }}>
							<div style={{ display: "flex" }}>
								<input type="checkbox" />
								<label>Já jogou</label>
							</div>
							<div style={{ display: "flex" }}>
								<input type="checkbox" title="" />
								<label>Já pegou top 4</label>
							</div>
							<div style={{ display: "flex" }}>
								<input type="checkbox" title="" />
								<label>Já venceu</label>
							</div>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}
