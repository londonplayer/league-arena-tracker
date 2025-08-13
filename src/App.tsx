import { useMongo } from "./hooks/useMongo";
import { Home } from "./pages/Home";

function App() {
	const { db } = useMongo();

	if (!db) {
		console.log("Connecting to Database...");
	} else {
		console.log("Database connected:", db);
	}

	return (
		<div>
			<Home />
		</div>
	);
}

export default App;
