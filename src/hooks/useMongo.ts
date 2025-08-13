import { useContext } from "react";
import { MongoContext, type MongoContextType } from "../context/mongo";

export const useMongo = (): MongoContextType => {
	const context = useContext(MongoContext);
	if (!context) {
		throw new Error("useMongo must be used within a MongoProvider");
	}
	return context;
};
