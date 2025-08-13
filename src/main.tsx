import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import MongoProvider from "./context/MongoProvider.js";
import "./index.css"; 

const rootElement = document.getElementById("root");
if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<MongoProvider>
				<App />
			</MongoProvider>
		</React.StrictMode>
	);
} else {
	console.error("Root element not found");
}
